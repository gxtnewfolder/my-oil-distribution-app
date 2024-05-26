// app/api/inventory-stock-card/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import { StockData } from '@/types/financial';

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

    // SQL Query (assuming you have a table to store inventory data)
    const query = `SELECT * FROM InventoryStockCard`; // Adjust table name if needed

    const result = await sql.query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: "No inventory stock data found" }, { status: 404 });
    }

    const stockData: StockData = {};
    for (const entry of result.recordset) {
      stockData[entry.DETAIL] = { // Use the correct column name for patrol type
        GASOHOL95: entry.GASOHOL,    // Use the correct column name for gasohol95
        DIESEL: entry.DIESEL,        // Use the correct column name for diesel
      };
    }

    return NextResponse.json(stockData);
  } catch (err) {
    console.error("Error querying database:", err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}
