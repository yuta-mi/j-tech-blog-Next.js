import { getMicroCMSBlogData } from "@/features/blogs/microCMBlogs";

export async function GET() {
  try {
    const data = await getBlogs();
    
    return Response.json({ 
      success: true,
      data: data,
    })

  } catch (error) {
    console.error('Qiita API Error:', error)
    return Response.json(
      { 
        success: false,
        error: 'Failed to fetch data from Qiita API' 
      },
      { status: 500 }
    )
  }
}

const getBlogs = async () => {
  return await getMicroCMSBlogData();
}