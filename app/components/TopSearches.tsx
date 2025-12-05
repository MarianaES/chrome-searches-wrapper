interface SearchItem {
  query: string;
  count: number;
}

interface TopSearchesProps {
  searches: SearchItem[];
}

function TopSearches({ searches }: TopSearchesProps) {
  const topSearches = searches.sort((a, b) => b.count - a.count).slice(0, 10);

  return (
    <div className="w-full px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-[clamp(32px,8vw,48px)] font-black text-center mb-4">
          Top Searches
        </h2>
        <p className="text-[clamp(16px, 3vw, 20px)] text-gray-400 text-center mb-12">
          Your most frequent queries of the year
        </p>
        <div className="space-y-4">
          {topSearches.map((search, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-2xl p-6 border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  <div className="text-lg md:text-xl font-semibold text-white truncate">
                    {search.query}
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400">
                    {search.count.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">searches</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopSearches;
