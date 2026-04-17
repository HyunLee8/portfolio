import fs from "fs/promises";
import path from "path";
import Link from "next/link";
import SongGrid from "./SongGrid";

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

async function getSongs(): Promise<Song[]> {
  const filePath = path.join(process.cwd(), "data", "songs.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export const dynamic = "force-dynamic";

export default async function Principles() {
  const songs = await getSongs();

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

        <SongGrid songs={songs} />
      </div>
    </div>
  );
}
