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
    interface CloudinaryResponse {  
        secure_url: string;  
      }  
    const formData = await request.formData();  
    const title = formData.get('title') as string;  
    const content = formData.get('content') as string;  
    const imageFile = formData.get('image') as File;  
  
    if (!title || !content || !imageFile) {  
      return NextResponse.json({ error: 'جميع الحقول مطلوبة' }, { status: 400 });  
    }  
  
    try {  
      // قراءة الصورة في Buffer  
      const arrayBuffer = await imageFile.arrayBuffer();  
      const buffer = Buffer.from(arrayBuffer);  
  
      // إنشاء Promise للتحكم في النتائج  
      const uploadResultPromise = new Promise<CloudinaryResponse>((resolve, reject) => {  
        const uploadStream = cloudinary.v2.uploader.upload_stream({   
          resource_type: 'auto'  
        }, (error, result) => {  
          if (error) {  
            reject(error);  
          } else {  
            resolve(result as CloudinaryResponse);  
          }  
        });  
  
        uploadStream.end(buffer);  
      });  
  
      // انتظار الرفع  
      const uploadResult = await uploadResultPromise;  
  
      // تخزين البيانات في Vercel Postgres  
      const res = await sql`  
        INSERT INTO news(title, content, image)   
        VALUES (${title}, ${content}, ${uploadResult.secure_url})  
        RETURNING id;  
      `;  
  
      return NextResponse.json({ id: res.rows[0].id, message: 'تم إنشاء الخبر بنجاح' }, { status: 201 });  
      
    } catch (error) {  
      console.error(error);  
      return NextResponse.json({ error: 'فشل في إنشاء الخبر' }, { status: 500 });  
    } 
}