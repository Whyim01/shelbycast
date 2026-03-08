"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Live() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLive, setIsLive] = useState(false);
  const [stream, setStream] = useState(null);

  const PIXEL_SIZE = 8;
  const SHELBY_COLORS = ["#ec4899", "#a855f7", "#7c3aed", "#1a1a2e"];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play();
      setStream(mediaStream);
      setIsLive(true);
    } catch (err) {
      alert("Camera access denied!");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsLive(false);
    }
  };

  useEffect(() => {
    if (!isLive) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const video = videoRef.current;

    const render = () => {
      if (!video || video.readyState !== 4) {
        requestAnimationFrame(render);
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      // Draw video to offscreen
      const offscreen = document.createElement("canvas");
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext("2d");
      offCtx.drawImage(video, 0, 0, w, h);

      const imageData = offCtx.getImageData(0, 0, w, h);
      const data = imageData.data;

      ctx.fillStyle = "#0a0a0f";
      ctx.fillRect(0, 0, w, h);

      for (let y = 0; y < h; y += PIXEL_SIZE) {
        for (let x = 0; x < w; x += PIXEL_SIZE) {
          const i = (y * w + x) * 4;
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;

          // Map brightness to Shelby purple/pink palette
          let color;
          if (brightness > 200) color = "#ec4899";
          else if (brightness > 140) color = "#a855f7";
          else if (brightness > 80) color = "#7c3aed";
          else color = "#0a0a0f";

          ctx.fillStyle = color;
          ctx.fillRect(x, y, PIXEL_SIZE - 1, PIXEL_SIZE - 1);
        }
      }

      requestAnimationFrame(render);
    };

    render();
  }, [isLive]);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-800">
        <Link href="/" className="text-pink-500 text-2xl font-bold">▶ Shelbycast</Link>
        <div className="flex items-center gap-6 text-zinc-400 text-sm">
          <Link href="/" className="hover:text-white">Explore</Link>
          <Link href="/upload" className="hover:text-white">Upload</Link>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm hover:bg-pink-600">
            Connect Wallet
          </button>
        </div>
      </nav>

      <div className="flex gap-6 p-6 max-w-7xl mx-auto">
        {/* Main Stream Area */}
        <div className="flex-1">
          <div className="relative bg-zinc-900 rounded-2xl overflow-hidden aspect-video">
            {/* Game Screen Placeholder */}
            <div className="w-full h-full flex items-center justify-center text-zinc-700 text-lg">
              {isLive ? (
                <span className="text-zinc-500">🎮 Game Screen Here</span>
              ) : (
                <span>Start streaming to go live</span>
              )}
            </div>

            {/* Pixel Art Face Overlay */}
            {isLive && (
              <div className="absolute bottom-4 left-4 border-2 border-pink-500 rounded-xl overflow-hidden shadow-lg shadow-pink-500/30">
                <canvas ref={canvasRef} width={160} height={120} />
              </div>
            )}

            {/* Live Badge */}
            {isLive && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                🔴 LIVE
              </div>
            )}
          </div>

          {/* Hidden video element */}
          <video ref={videoRef} className="hidden" muted />

          {/* Controls */}
          <div className="mt-4 flex items-center gap-4">
            {!isLive ? (
              <button
                onClick={startCamera}
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-8 py-3 rounded-full transition"
              >
                🎮 Go Live
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition"
              >
                ⏹ End Stream
              </button>
            )}
            <div>
              <h2 className="font-bold text-lg">Gaming Stream</h2>
              <p className="text-zinc-500 text-sm">Powered by Shelby Protocol</p>
            </div>
          </div>
        </div>

        {/* Chat */}
        <div className="w-72 bg-zinc-900 rounded-2xl flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-800 font-semibold text-sm">
            💬 Live Chat
          </div>
          <div className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto text-sm text-zinc-400">
            <p><span className="text-pink-400">viewer1</span>: lets gooo 🔥</p>
            <p><span className="text-purple-400">viewer2</span>: pixel face is sick!</p>
            <p><span className="text-pink-400">viewer3</span>: shelbycast LFG 🚀</p>
          </div>
          <div className="p-3 border-t border-zinc-800">
            <input
              type="text"
              placeholder="Send a message..."
              className="w-full bg-zinc-800 rounded-full px-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>
    </main>
  );
}