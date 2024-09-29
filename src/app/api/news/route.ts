import { sql } from "@vercel/postgres";

export async function GET() {
    const result = await sql `
    SELECT * FROM news
    `;
    const rows = result.rows;
    return new Response(JSON.stringify(rows));
}