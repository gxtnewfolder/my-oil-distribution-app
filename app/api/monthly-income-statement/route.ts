// app/api/monthly-income-statement/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET() { // No need for the request parameter
  
  // Azure SQL Database Configuration (Load from environment variables)
  const config = {
    user: 'miniprogroup2',        // Replace with your Azure SQL username
    password: 'inc.372g2',    // Replace with your Azure SQL password
    server: 'minipro372-g2-server.database.windows.net', // Replace with your Azure SQL server name
    database: 'minipro372-g2-db', // Replace with your Azure SQL database name
    options: {
      encrypt: true, // Use encryption (recommended)
    }
  };

  try {
    await sql.connect(config);

    // SQL Query to get current month's income statement
    const query = `
      SELECT TOP 1 * 
      FROM incomestate
    `; // Assuming 'id' is your primary key and you want the latest record

    const result = await sql.query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: "No income statement data found" }, { status: 404 });
    }

    return NextResponse.json(result.recordset[0]); 
  } catch (err) {
    console.error("Error querying database:", err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
