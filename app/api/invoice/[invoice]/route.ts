// app/api/purchase-orders/[invoice]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest, { params }: { params: { invoice: string } }) {
  const invoice = params.invoice; // Get invoice from the URL

  // Azure SQL Database Configuration
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
    request.input('invoice', sql.NVarChar, invoice);

    // SQL Query to fetch a single purchase order by invoice
    const query = `
      SELECT *
      FROM PurchaseOrders 
      WHERE invoice = @invoice
    `; 

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      // No purchase order found
      return NextResponse.json({ message: 'Purchase order not found' }, { status: 404 }); 
    }

    const Invoice = result.recordset[0];

    return NextResponse.json(Invoice);
  } catch (err) {
    console.error('Error querying database:', err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
