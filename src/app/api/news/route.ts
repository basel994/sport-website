import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: NextRequest) {
    const headers = new Headers(request.headers);
    headers.get("Content-Type");
    const result = await sql `
    SELECT * FROM news
    `;
    const rows = result.rows;
    return new Response(JSON.stringify(rows));
}
export async function POST(request: NextRequest) {
    const uploadsDir = path.join(process.cwd(), 'public', 'images', 'home', 'news', 'uploads');  
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const {title, content, image}:{title: string, content: string, image: File} = await request.json();
    if(title && content && image){
        const blobImage = image as Blob;
        const filename = `${Date.now()}-${image.name}`;
        const filepath = path.join(uploadsDir, filename);
        const buffer = Buffer.from(await blobImage.arrayBuffer());
        fs.writeFileSync(filepath, buffer); 
        const storedPath = `/images/home/news/uploads/${filename}`
        const add = await sql `
        INSERT INTO news (title, content, image) VALUES (${title}, ${content}, ${storedPath}) RETURNING id
        `;
        return new NextResponse(JSON.stringify({message: "created successfully", id: add.rows[0].id}));
    }
    else {
        return new NextResponse(JSON.stringify({message: "error"}));
    }
}