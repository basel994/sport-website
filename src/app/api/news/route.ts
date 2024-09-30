import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.get("Content-Type");
    const result = await sql `
    SELECT * FROM news
    `;
    const rows = result.rows;
    return new Response(JSON.stringify(rows));
}