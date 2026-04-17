import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

const SESSION_TOKEN = "ltoy_admin_session_valid";
const SONGS_PATH = path.join(process.cwd(), "data", "songs.json");

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === SESSION_TOKEN;
}

async function readSongs() {
  const data = await fs.readFile(SONGS_PATH, "utf-8");
  return JSON.parse(data);
}

async function writeSongs(songs: unknown[]) {
  await fs.writeFile(SONGS_PATH, JSON.stringify(songs, null, 2));
}

export async function GET() {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const songs = await readSongs();
  return NextResponse.json(songs);
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const songs = await readSongs();
  const song = await req.json();
  song.id = String(Date.now());
  songs.push(song);
  await writeSongs(songs);
  return NextResponse.json(song);
}

export async function PUT(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const songs = await readSongs();
  const updated = await req.json();
  const index = songs.findIndex((s: { id: string }) => s.id === updated.id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  songs[index] = updated;
  await writeSongs(songs);
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  let songs = await readSongs();
  songs = songs.filter((s: { id: string }) => s.id !== id);
  await writeSongs(songs);
  return NextResponse.json({ ok: true });
}
