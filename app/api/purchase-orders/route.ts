// app/api/purchase-orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('query'); // Get optional search query

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

    // Prepare request
    const request = new sql.Request();

    // Build the SQL query dynamically
    let query = 'SELECT * FROM PurchaseOrders'; // Replace with your actual table name

    if (searchQuery) {
      query += ` WHERE po_number LIKE '%${searchQuery}%'`; // Filter by po_number
    }
    
    const result = await request.query(query);

    return NextResponse.json(result.recordset);
  } catch (err) {
    console.error('Error querying database:', err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
