export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-pink-500 text-2xl font-bold">▶ Shelbycast</span>
        </div>
        <div className="flex items-center gap-6 text-zinc-400 text-sm">
          <a href="#" className="hover:text-white">Explore</a>
          <a href="#" className="hover:text-white">Upload</a>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-24 gap-6">
        <span className="bg-pink-500/10 text-pink-400 text-xs px-3 py-1 rounded-full border border-pink-500/20">
          Powered by Shelby Protocol
        </span>
        <h1 className="text-5xl font-bold max-w-2xl leading-tight">
          Decentralized Video Streaming for Everyone
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl">
          Upload, stream, and own your content. No censorship, no middlemen — just you and your audience.
        </p>
        <div className="flex gap-4 mt-4">
          <button className="bg-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-600">
            Start Watching
          </button>
          <button className="border border-zinc-700 text-white px-6 py-3 rounded-full font-semibold hover:border-zinc-500">
            Upload Video
          </button>
        </div>
      </section>

      {/* Featured Videos */}
      <section className="px-8 pb-24">
        <h2 className="text-2xl font-bold mb-6">Featured Videos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-zinc-900 rounded-2xl overflow-hidden hover:scale-105 transition cursor-pointer">
              <div className="w-full h-48 bg-zinc-800 flex items-center justify-center text-zinc-600 text-4xl">
                ▶
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white">Video Title #{i}</h3>
                <p className="text-zinc-500 text-sm mt-1">creator.shelby • 1.2K views</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}