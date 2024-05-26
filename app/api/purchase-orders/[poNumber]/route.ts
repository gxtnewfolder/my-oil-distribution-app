import { NextRequest, NextResponse } from "next/server";
import sql from "mssql";

export async function GET(request: NextRequest, { params }: { params: { poNumber: string } }) {
  const poNumber = params.poNumber;
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
    const request = new sql.Request();

    const query = `
      SELECT *
      FROM PurchaseOrders
      WHERE poNumber = @po_number
    `;

    request.input("po_number", sql.NVarChar, poNumber);

    const result = await request.query(query);

    if (result.recordset.length === 0) {
      return NextResponse.json({ message: "Purchase order not found" }, { status: 404 });
    }
    
    // Assuming your `items` column stores item details in JSON format
    const po = result.recordset[0];
    po.items = JSON.parse(po.items); // Parse the JSON string

    return NextResponse.json(po);
  } catch (err) {
    console.error("Error querying database:", err);
    return NextResponse.json({ error: "Database query failed" }, { status: 500 });
  }
}