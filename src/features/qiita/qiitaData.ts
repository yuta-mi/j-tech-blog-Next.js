import getQiitaOptions from "./qiitaOptions";
import { formatDate } from "@/utils/dateFormat";

interface QiitaItem {
  id: string
  title: string
  url: string
  user: {
    id: string
    name: string
  }
  created_at: string
  tags: Array<{ name: string }>
}

interface BlogCardData {
  title: string
  date: string
  url: string
  thumbnail: string
}

export async function fetchQiitaArticles(page: number = 1, per_page: number = 100): Promise<QiitaItem[]> {
  try {
    const qiitaToken = process.env.QIITA_ACCESS_TOKEN
    const query = new URLSearchParams(getQiitaOptions({page, per_page}));
    const url = 'https://qiita.com/api/v2/items?' + query;

    console.log(url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(qiitaToken && { 'Authorization': `Bearer ${qiitaToken}` }),
      },
      next: { revalidate: 3600 }
    })

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching articles:', error)
    return []
  }
}

export function convertQiitaToBlogCard(qiitaItems: QiitaItem[]): BlogCardData[] {
  return qiitaItems.map(item => ({
    title: item.title,
    date: formatDate(item.created_at),
    url: item.url,
    thumbnail: `https://qiita-user-contents.imgix.net/https%3A%2F%2Fcdn.qiita.com%2Fassets%2Fpublic%2Farticle-ogp-background-9f5428127621718a910c8b63951390ad.png?ixlib=rb-4.0.0&w=1200&mark64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTkxNiZoPTMzNiZ0eHQ9SmF2YVNjcmlwdCVFMyU4MSVBN1VSTCVFMyU4MSU4QiVFMyU4MiU4OU9HUCVFNSU4RiU5NiVFNSVCRSU5NyVFMyU4MSU5OSVFMyU4MiU4QiZ0eHQtY29sb3I9JTIzMjEyMTIxJnR4dC1mb250PUhpcmFnaW5vJTIwU2FucyUyMFc2JnR4dC1zaXplPTU2JnR4dC1jbGlwPWVsbGlwc2lzJnR4dC1hbGlnbj1sZWZ0JTJDdG9wJnM9NDM5YjY5NjY3Nzg3ZTExYzdmYTM2YjI1ZDg3NTcyN2Y&mark-x=142&mark-y=112&blend64=aHR0cHM6Ly9xaWl0YS11c2VyLWNvbnRlbnRzLmltZ2l4Lm5ldC9-dGV4dD9peGxpYj1yYi00LjAuMCZ3PTYxNiZ0eHQ9JTQwa3N5dW5ubm4mdHh0LWNvbG9yPSUyMzIxMjEyMSZ0eHQtZm9udD1IaXJhZ2lubyUyMFNhbnMlMjBXNiZ0eHQtc2l6ZT0zNiZ0eHQtYWxpZ249bGVmdCUyQ3RvcCZzPWUxMjJhOTA1NDdiNTMzNDI4MWY3YmU0M2U2Y2I1M2Rh&blend-x=142&blend-y=491&blend-mode=normal&s=1a611f7e8833ff640580434a1b03d27a`
  }))
}

export async function getQiitaBlogData(): Promise<BlogCardData[]> {
  // 全データを取得するため、per_pageを100に設定（Qiita APIの最大値）
  const qiitaItems = await fetchQiitaArticles()
  return convertQiitaToBlogCard(qiitaItems)
}

export async function getQiitaBlogDataForMain(): Promise<BlogCardData[]> {
  // メインページ用：3件のみ取得
  const qiitaItems = await fetchQiitaArticles(1, 3)
  return convertQiitaToBlogCard(qiitaItems)
} 