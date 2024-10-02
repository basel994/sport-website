import { sql } from "@vercel/postgres";  
import { NextRequest, NextResponse } from "next/server";  
import cloudinary from 'cloudinary';  

// إعداد Cloudinary  
cloudinary.v2.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET,  
});  

export async function GET(request: NextRequest) {  
    const contentType = request.headers;
    contentType.get("Content-Type");
    const result = await sql`SELECT * FROM news`;  
    return NextResponse.json(result.rows);  
}  

export async function POST(request: NextRequest) {  
    const requestBody = await request.json();  
    const { title, content, image } = requestBody;  

    // تأكد من أن جميع الحقول موجودة  
    if (!title || !content || !image) {  
        return NextResponse.json({ error: "Title, content, and image are required." }, { status: 400 });  
    }  

    const buffer = Buffer.from(await image.arrayBuffer());  

    try {  
        // رفع الصورة إلى Cloudinary  
        const response = cloudinary.v2.uploader.upload_stream(  
            { resource_type: 'image' },  
            async (error, result) => {  
                if (error) {  
                    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });  
                }  

                // تخزين المسار في قاعدة البيانات  
                const add = await sql`  
                    INSERT INTO news (title, content, image)   
                    VALUES (${title}, ${content}, ${result?.secure_url})   
                    RETURNING id`;  

                return NextResponse.json({ message: "Created successfully", id: add.rows[0].id });  
            }  
        );  

        // بدء الدفق لرفع الصورة  
        const writeStream = response;  
        writeStream.end(buffer);  

    } catch (error) {  
        return NextResponse.json({ error: `Failed to create new news : ${error}` }, { status: 500 });  
    }  
}