"use client";

import { useState } from "react";

type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  year: string;
  image: string;
  note: string;
  url: string;
  genre: string;
  runtime: string;
  colors: string[];
};

export default function SongGrid({ songs }: { songs: Song[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-16 sm:gap-y-20">
      {songs.map((song) => (
        <PosterCard key={song.id} song={song} />
      ))}
    </div>
  );
}

function PosterCard({ song }: { song: Song }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={song.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-gray-50 border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-500"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="overflow-hidden border border-gray-200 shadow-lg mb-6">
        <img
          src={song.image}
          alt={`Album cover for ${song.title}`}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          {song.title}
        </h2>
        <p className="text-base sm:text-lg text-gray-700 font-medium">
          {song.artist}
        </p>

        <div className="pt-2 border-t border-gray-200">
          <div className="flex gap-4 text-xs text-gray-500 font-mono mb-3 uppercase tracking-widest">
            <span>{song.album}</span>
            <span>•</span>
            <span>{song.year}</span>
            <span>•</span>
            <span>{song.runtime}</span>
          </div>

          <div className="border-l-2 border-gray-200 pl-4 group-hover:border-gray-900 transition-colors duration-300">
            <p className="text-gray-600 leading-relaxed text-sm italic">
              {song.note}
            </p>
          </div>
        </div>

        <div className="flex gap-1 pt-3">
          {song.colors.map((color, i) => (
            <div
              key={i}
              className="h-5 flex-1 transition-transform duration-500"
              style={{
                background: color,
                transform: hovered ? "translateY(-2px)" : "translateY(0)",
                transitionDelay: `${i * 40}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </a>
  );
}
