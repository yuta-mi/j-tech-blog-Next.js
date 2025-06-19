import getQiitaOptions from "./qiitaOptions";

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
    const data = await getQiitaBlogData()
    
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

const getQiitaBlogData = async () => {
  
  const qiitaToken = process.env.QIITA_ACCESS_TOKEN
  const apiSecret = process.env.API_SECRET_KEY
  
  const query = new URLSearchParams(getQiitaOptions({}));
  const url = 'https://qiita.com/api/v2/items?' + query;

  console.log(url);

  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(qiitaToken && { 'Authorization': `Bearer ${qiitaToken}` }),
    },
  })

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`)
  }

  const data = await res.json()

  return data
}