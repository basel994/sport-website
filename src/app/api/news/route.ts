import { sql } from "@vercel/postgres";  
import { NextRequest, NextResponse } from "next/server";   

export async function GET(request: NextRequest) {
    const contentType = request.headers;
    contentType.get("Content-Type");
    try {  
        const result = await sql`SELECT * FROM news`;  
        return NextResponse.json(result.rows);  
    } catch (error) {  
        return NextResponse.json({ error: `Failed to fetch news : ${error}` }, { status: 500 });  
    }  
}  

export async function POST(request: NextRequest) {  
    try {  
        const requestBody = await request.json();  
        const { title, content} = requestBody;  

        // تأكد من أن جميع الحقول موجودة  
        if (!title || !content) {  
            return NextResponse.json({ error: "Title, content, and image are required." }, { status: 400 });  
        }  

        const add = await sql`  
            INSERT INTO news (title, content)   
            VALUES (${title}, ${content})   
            RETURNING id`;  

        return NextResponse.json({ message: "Created successfully", id: add.rows[0].id });  
    } catch (error) {  
        return NextResponse.json({ error: `Failed to create new news : ${error}` }, { status: 500 });  
    }  
}