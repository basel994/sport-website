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
    const formData = await request.formData();  
    const title = formData.get('title') as string;  
    const content = formData.get('content') as string;  
    const imageFile = formData.get('image') as File; 
    try{
        const arrayBuffer = await imageFile.arrayBuffer();  
        const buffer = Buffer.from(arrayBuffer);  
    
        // رفع الصورة إلى Cloudinary  
        const uploadResult = cloudinary.v2.uploader.upload_stream({   
          resource_type: 'auto',   
          buffer   
        });
        return new Promise((resolve, reject) => {  
            uploadResult.on('end', async (result: any) => {  
              // تخزين البيانات في Vercel Postgres  
              const res = await sql`  
                INSERT INTO news(title, content, image)   
                VALUES (${title}, ${content}, ${result.secure_url})  
                RETURNING id;  
              `;  
              
              resolve(NextResponse.json({ id: res.rows[0].id, message: 'تم إنشاء الخبر بنجاح' }, { status: 201 }));  
            });  
      
            uploadResult.on('error', (error: any) => {  
              console.error(error);  
              reject(NextResponse.json({ error: 'فشل في رفع الصورة' }, { status: 500 }));  
            });  
      
            uploadResult.end(buffer);  
          });
    } catch(error) {
        return NextResponse.json({ error: `error with add new : ${error}` }, { status: 500 }); 
    }
}