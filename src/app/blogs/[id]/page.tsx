import { getMicroCMSBlogById } from "@/features/blogs/microCMBlogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import appConfig from "@/config/appConfig";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
  try {
    const { id } = await params;
    const blog = await getMicroCMSBlogById(id);

    return (
      <div className="min-h-screen bg-black text-white">
        {/* ヘッダー部分 */}
        <div className="relative">
          {/* 戻るボタン */}
          <div className="absolute top-8 left-8 z-10">
            <Link 
              href="/blogs" 
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              記事一覧に戻る
            </Link>
          </div>

          {/* アイキャッチ画像 */}
          <div className="relative h-96 w-full overflow-hidden">
            <Image
              src={blog.eyecatch?.url || appConfig.api.microCMS.defaultThumbnail}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            {/* タイトルオーバーレイ */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-purple-600 text-white text-sm rounded-full">
                    {blog.category?.name || 'ブログ'}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {blog.title}
                </h1>
                <p className="text-gray-300 text-lg">
                  公開日: {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* メインコンテンツ */}
        <main className="container mx-auto max-w-4xl px-6 py-12">
          <article className="prose prose-invert prose-lg max-w-none">
            <div 
              className="text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          {/* 記事の下部 */}
          <div className="mt-16 pt-8 border-t border-gray-700">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0">
                <p className="text-gray-400">
                  投稿日: {new Date(blog.publishedAt).toLocaleDateString('ja-JP')}
                </p>
                <p className="text-gray-400">
                  カテゴリ: {blog.category?.name || 'その他'}
                </p>
              </div>
              
              <Link 
                href="/blogs"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                他の記事を見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error('ブログ記事の取得に失敗しました:', error);
    notFound();
  }
}

// 静的パラメータを生成（オプション）
export async function generateStaticParams() {
  // 必要に応じて、ビルド時に生成したいパラメータを返す
  return [];
}

// メタデータを生成
export async function generateMetadata({ params }: PageProps) {
  try {
    const { id } = await params;
    const blog = await getMicroCMSBlogById(id);
    
    return {
      title: `${blog.title} | Tech Blog`,
      description: blog.title,
      openGraph: {
        title: blog.title,
        description: blog.title,
        images: [
          {
            url: blog.eyecatch?.url || appConfig.api.microCMS.defaultThumbnail,
            width: blog.eyecatch?.width || 1200,
            height: blog.eyecatch?.height || 630,
            alt: blog.title,
          }
        ],
      },
    };
  } catch (error) {
    return {
      title: 'ブログ記事 | Tech Blog',
      description: 'ブログ記事',
    };
  }
} 