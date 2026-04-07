"use client";

import { useState } from "react";
import Link from "next/link";

type Song = {
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

const songs: Song[] = [
  {
    title: "I Always Wanna Die (Sometimes)",
    artist: "The 1975",
    album: "A Brief Inquiry into Online Relationships",
    year: "2018",
    image: "/ESSENTIALS4.jpeg",
    note: "true.",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "ALTERNATIVE",
    runtime: "4:39",
    colors: ["#f4f1ec", "#d9d4cb", "#a8a29a", "#4a4a48", "#141414"],
  },
  {
    title: "About You",
    artist: "The 1975",
    album: "Being Funny in a Foreign Language",
    year: "2022",
    image: "/ESSENTIALS2.png",
    note: "The best bridge in a song",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "INDIE POP",
    runtime: "5:26",
    colors: ["#ffffff", "#bfbfbf", "#808080", "#404040", "#000000"],
  },
  {
    title: "여전히 아름다운지",
    artist: "TOY | Yoo Hee Yeol",
    album: "Fermata",
    year: "1999",
    image: "/TOY1.jpg",
    note: "crème de la crème | All time no. 1",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "K-POP BALLAD",
    runtime: "4:52",
    colors: ["#ffffff", "#bfbfbf", "#808080", "#404040", "#000000"],
  },
  {
    title: "Back To Me",
    artist: "The Marias",
    album: "Back To Me",
    year: "2025",
    image: "/BACKTOME.jpg",
    note: "Holy Elec",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "PSYCHEDELIC POP",
    runtime: "3:47",
    colors: ["#ffffff", "#bfbfbf", "#808080", "#404040", "#000000"],
  },
  {
    title: "Stars burn out",
    artist: "Cykim",
    album: "Stars Burn out",
    year: "2023",
    image: "/ESSENTIALS6.jpeg",
    note: "yes",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "AMBIENT",
    runtime: "3:21",
    colors: ["#e6e8ee", "#9aa4b8", "#4a5a78", "#1f2a40", "#0a0f1c"],
  },
  {
    title: "Lily of the Valley",
    artist: "DANIEL",
    album: "Flower",
    year: "2021",
    image: "/ESSENTIALS5.jpeg",
    note: "Selah",
    url: "https://open.spotify.com/playlist/0RzkIyS7OHaEBcpDYZ8Wak",
    genre: "WORSHIP",
    runtime: "5:08",
    colors: ["#f4f1e8", "#d8d2bc", "#9ea87a", "#4a5a2a", "#1a220d"],
  },
];

export default function Principles() {
  return (
    <div className="min-h-screen p-4 sm:p-8 bg-white">
      <Link
        href="/"
        className="fixed top-4 sm:top-10 left-1/2 -translate-x-1/2 font-medium text-sm hover:underline underline-offset-4 transition-all z-50"
      >
        ← back
      </Link>

      <div className="max-w-6xl mx-auto py-16 sm:py-20">
        <div className="mb-12 sm:mb-20">
          <h1 className="text-4xl sm:text-6xl font-light text-gray-900 mb-4 tracking-wide">
            Yes
          </h1>
          <div className="w-32 h-0.5 bg-gray-900"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-x-16 sm:gap-y-20">
          {songs.map((song, index) => (
            <PosterCard key={index} song={song} />
          ))}
        </div>
      </div>
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
