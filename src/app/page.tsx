import Link from "next/link";
import { BlogThumbCard } from "@/components/BlogThumbCard";
import { getQiitaBlogDataForMain } from "@/features/qiita/qiitaData";
import { getMicroCMSBlogDataLimited } from "@/features/blogs/microCMBlogs";
import appConfig from "@/config/appConfig";
import { formatDate } from "@/utils/dateFormat";

export default async function Page() {
  // メインページでは9件のみ表示
  const qiitaData = await getQiitaBlogDataForMain();
  const data = [...qiitaData];

  const microCMSBlogData = await getMicroCMSBlogDataLimited(3);
  const cmsData = microCMSBlogData.contents;

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
            <h1 className="text-5xl md:text-7xl font-bold mb-8 pb-2 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
              Tech Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
              自分の開発ノウハウを色々な記事に纏めています。
            </p>
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
        <div className="container mx-auto px-6 py-12">
          {/* セクションタイトル */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Qiitaの最新記事
              </h2>
              <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto md:mx-0 rounded-full"></div>
            </div>
            <Link 
              href="/all" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer text-sm md:text-base"
            >
              <span>さらに記事を見る</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* カードグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {data.map((item, index) => (
              <div 
                key={`${item.title}-${index}`}
                className="transform transition-all duration-500 hover:scale-105 opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: 'forwards'
                }}
              >
                <BlogThumbCard {...item} />
              </div>
            ))}
          </div>


        </div>

        <div className="container mx-auto px-6 py-10">
          {/* セクションタイトル */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                個人ブログの最新記事
              </h2>
              <div className="w-full h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto md:mx-0 rounded-full"></div>
            </div>
            <Link 
              href="/blogs" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer text-sm md:text-base"
            >
              <span>さらに記事を見る</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* カードグリッド */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {cmsData.map((item, index) => (
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
