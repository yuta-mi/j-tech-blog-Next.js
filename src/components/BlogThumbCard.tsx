type BlogThumbCardProps = {
  title: string;
  date: string;
  url: string;
  thumbnail: string;
};

export const BlogThumbCard = ({ title, date, url, thumbnail }: BlogThumbCardProps) => {
  return (
    <div className="group relative max-w-sm w-full">
      {/* カード本体 */}
      <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/25 hover:shadow-2xl hover:border-purple-500/30 hover:scale-[1.02]">
        
        {/* 背景グラデーション効果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* サムネイル画像 */}
        <div className="relative overflow-hidden">
          <img 
            src={thumbnail} 
            alt={title} 
            className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* 画像上のグラデーションオーバーレイ */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* ホバー時の光る効果 */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        {/* カードコンテンツ */}
        <div className="relative p-6 space-y-4">
          
          {/* 日付ラベル */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
            <span className="text-sm text-gray-400 font-medium">{date}</span>
          </div>

          {/* タイトル */}
          <h3 className="text-xl font-bold text-white leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h3>

          {/* 記事を読むボタン */}
          <div className="pt-4">
            <a 
              href={url} 
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 backdrop-blur-sm border border-purple-500/30 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:-translate-y-0.5 group/btn"
            >
              <span>記事を読む</span>
              <svg 
                className="ml-2 w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* カード下部のアクセントライン */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* カードの影とグロー効果 */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
    </div>
  );
};