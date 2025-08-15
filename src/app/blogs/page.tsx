import { BlogThumbCard } from "@/components/BlogThumbCard";
import appConfig from "@/config/appConfig";
import { getMicroCMSBlogData } from "@/features/blogs/microCMBlogs";
import { formatDate } from "@/utils/dateFormat";

export default async function Page() {
  const microCMSBlogData = await getMicroCMSBlogData();
  const data = microCMSBlogData.contents;

  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        {/* 背景の装飾 */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10"></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 pb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-pulse leading-tight">
              Tech Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
              すべての技術記事をまとめてご覧いただけます
            </p>
            <div className="flex justify-center space-x-1 mb-12">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce"></div>
              <div className="w-3 h-3 rounded-full bg-pink-400 animate-bounce delay-75"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
        
        {/* 波形の装飾 */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L1440 120L1440 0C1440 0 1200 60 720 60C240 60 0 0 0 0L0 120Z" fill="currentColor" className="text-black"></path>
          </svg>
        </div>
      </section>

      {/* メインコンテンツ */}
      <main className="relative bg-black text-white">
        <div className="container mx-auto px-6 py-16">
          {/* セクションタイトル */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              すべての記事
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
            <p className="text-gray-400 mt-4 text-lg">
              これまでに投稿されたすべての技術記事を表示しています
            </p>
          </div>

          {/* カードグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {data.map((item, index) => (
              <div 
                key={`${item.title}-${index}`}
                className="transform transition-all duration-500 hover:scale-105 opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <BlogThumbCard
                  date={formatDate(item.publishedAt)}
                  url={`/blogs/${item.id}`}
                  thumbnail={item.eyecatch?.url || appConfig.api.microCMS.defaultThumbnail}
                  title={item.title}
                />
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}
