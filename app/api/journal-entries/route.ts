// app/api/journal-entries/route.ts
import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const page = parseInt(searchParams.get('page') || '1');
  const pageSize = 10; // Adjust the page size as needed
  const offset = (page - 1) * pageSize;

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

    const query = date
      ? `SELECT * FROM JournalEntries WHERE date = '${date}'`
      : `SELECT * FROM JournalEntries`;
    
    // Count total entries for pagination
    const countQuery = date
      ? `SELECT COUNT(*) as total FROM JournalEntries WHERE date = '${date}'`
      : `SELECT COUNT(*) as total FROM JournalEntries`;

    const result = await sql.query(query);
    const countResult = await sql.query(countQuery);
    const totalEntries = countResult.recordset[0].total;
    const totalPages = Math.ceil(totalEntries / pageSize);

    return NextResponse.json({
      entries: result.recordset,
      totalPages,
    });
  } catch (err) {
    console.error('Error querying database:', err);
    return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
  }
}
