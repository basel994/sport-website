import { sql } from "@vercel/postgres";  
import { NextRequest, NextResponse } from "next/server";  
import fs from "fs";  
import path from "path";  

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
        const uploadsDir = path.join(process.cwd(), "public/images/home/news/uploads");  
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });  
        }  
        const requestBody = await request.json();  
        const { title, content, image } = requestBody;  

        // تأكد من أن جميع الحقول موجودة  
        if (!title || !content || !image) {  
            return NextResponse.json({ error: "Title, content, and image are required." }, { status: 400 });  
        }  

        const filename = `${Date.now()}-${image.name}`;  
        const filepath = path.join(uploadsDir, filename);  
        const buffer = Buffer.from(await image.arrayBuffer());  

        fs.writeFileSync(filepath, buffer);  
        const storedPath = `/images/home/news/uploads/${filename}`;  

        const add = await sql`  
            INSERT INTO news (title, content, image)   
            VALUES (${title}, ${content}, ${storedPath})   
            RETURNING id`;  

        return NextResponse.json({ message: "Created successfully", id: add.rows[0].id });  
    } catch (error) {  
        return NextResponse.json({ error: `Failed to create new news : ${error}` }, { status: 500 });  
    }  
}