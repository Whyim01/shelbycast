"use client";
import { useState } from "react";
import Link from "next/link";

export default function Upload() {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
        <Link href="/" className="text-pink-500 text-2xl font-bold">▶ Shelbycast</Link>
        <div className="flex items-center gap-6 text-zinc-400 text-sm">
          <Link href="/" className="hover:text-white">Explore</Link>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600">
            Connect Wallet
          </button>
        </div>
      </nav>

      {/* Upload Form */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-2">Upload Video</h1>
        <p className="text-zinc-400 mb-8">Your video will be stored on Shelby Protocol — decentralized & permanent.</p>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center mb-6 transition cursor-pointer
            ${dragOver ? "border-pink-500 bg-pink-500/10" : "border-zinc-700 hover:border-zinc-500"}`}
        >
          {file ? (
            <div>
              <p className="text-green-400 text-lg font-semibold">✓ {file.name}</p>
              <p className="text-zinc-500 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          ) : (
            <div>
              <p className="text-5xl mb-4">🎬</p>
              <p className="text-zinc-300 font-medium">Drag & drop your video here</p>
              <p className="text-zinc-500 text-sm mt-1">MP4, MOV, AVI supported</p>
            </div>
          )}
        </div>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm text-zinc-400 mb-2">Video Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <label className="block text-sm text-zinc-400 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your video..."
            rows={4}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-pink-500 resize-none"
          />
        </div>

        <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-4 rounded-full text-lg transition">
          Upload to Shelby Protocol
        </button>
      </section>
    </main>
  );
}