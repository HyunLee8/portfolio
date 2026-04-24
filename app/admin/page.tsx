"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

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

const emptySong: Omit<Song, "id"> = {
  title: "",
  artist: "",
  album: "",
  year: "",
  image: "",
  note: "",
  url: "",
  genre: "",
  runtime: "",
  colors: ["#ffffff", "#bfbfbf", "#808080", "#404040", "#000000"],
};

function extractColorsFromImage(src: string): Promise<string[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      const pixels: [number, number, number][] = [];
      for (let i = 0; i < data.length; i += 4) {
        pixels.push([data[i], data[i + 1], data[i + 2]]);
      }

      let buckets: [number, number, number][][] = [pixels];

      while (buckets.length < 5) {
        let maxRange = -1;
        let maxIdx = 0;
        let maxCh = 0;

        for (let i = 0; i < buckets.length; i++) {
          for (let ch = 0; ch < 3; ch++) {
            let min = 255,
              max = 0;
            for (const p of buckets[i]) {
              if (p[ch] < min) min = p[ch];
              if (p[ch] > max) max = p[ch];
            }
            const range = max - min;
            if (range > maxRange) {
              maxRange = range;
              maxIdx = i;
              maxCh = ch;
            }
          }
        }

        const bucket = buckets[maxIdx];
        bucket.sort((a, b) => a[maxCh] - b[maxCh]);
        const mid = Math.floor(bucket.length / 2);
        buckets.splice(maxIdx, 1, bucket.slice(0, mid), bucket.slice(mid));
      }

      const colors = buckets.map((bucket) => {
        const avg = [0, 0, 0];
        for (const p of bucket) {
          avg[0] += p[0];
          avg[1] += p[1];
          avg[2] += p[2];
        }
        return (
          "#" +
          [0, 1, 2]
            .map((i) =>
              Math.round(avg[i] / bucket.length)
                .toString(16)
                .padStart(2, "0")
            )
            .join("")
        );
      });

      const lum = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return 0.299 * r + 0.587 * g + 0.114 * b;
      };
      colors.sort((a, b) => lum(b) - lum(a));

      resolve(colors);
    };
    img.onerror = () =>
      resolve(["#ffffff", "#bfbfbf", "#808080", "#404040", "#000000"]);
    img.src = src;
  });
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [editing, setEditing] = useState<Song | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Song, "id">>(emptySong);
  const [uploading, setUploading] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [imageDragOver, setImageDragOver] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/admin/check")
      .then((r) => {
        if (r.ok) {
          setAuthed(true);
          loadSongs();
        }
      })
      .finally(() => setChecking(false));
  }, []);

  async function login() {
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password");
      return;
    }
    setAuthed(true);
    loadSongs();
  }

  async function loadSongs() {
    const res = await fetch("/api/admin/songs");
    if (res.ok) setSongs(await res.json());
  }

  async function saveSong() {
    if (editing) {
      await fetch("/api/admin/songs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editing.id }),
      });
    } else {
      await fetch("/api/admin/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setEditing(null);
    setAdding(false);
    setForm(emptySong);
    loadSongs();
  }

  async function deleteSong(id: string) {
    if (!confirm("Delete this song?")) return;
    await fetch("/api/admin/songs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadSongs();
  }

  function startEdit(song: Song) {
    setEditing(song);
    setAdding(false);
    const { id, ...rest } = song;
    setForm(rest);
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(emptySong);
  }

  function cancelForm() {
    setEditing(null);
    setAdding(false);
    setForm(emptySong);
  }

  async function uploadFile(file: File) {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const { path } = await res.json();
      setForm((prev) => ({ ...prev, image: path }));
      autoExtractColors(path);
    }
    setUploading(false);
  }

  async function autoExtractColors(imagePath: string) {
    if (!imagePath) return;
    setExtracting(true);
    const colors = await extractColorsFromImage(imagePath);
    setForm((prev) => ({ ...prev, colors }));
    setExtracting(false);
  }

  const handleImageDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setImageDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith("image/")) {
        uploadFile(file);
      }
    },
    []
  );

  const handleImageDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setImageDragOver(true);
  }, []);

  const handleImageDragLeave = useCallback(() => {
    setImageDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
    },
    []
  );

  // Song list reordering
  function handleSongDragStart(idx: number) {
    setDragIdx(idx);
  }

  function handleSongDragOver(e: React.DragEvent, idx: number) {
    e.preventDefault();
    setDragOverIdx(idx);
  }

  async function handleSongDrop(idx: number) {
    if (dragIdx === null || dragIdx === idx) {
      setDragIdx(null);
      setDragOverIdx(null);
      return;
    }
    const reordered = [...songs];
    const [moved] = reordered.splice(dragIdx, 1);
    reordered.splice(idx, 0, moved);
    setSongs(reordered);
    setDragIdx(null);
    setDragOverIdx(null);

    await fetch("/api/admin/songs", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: reordered.map((s) => s.id) }),
    });
  }

  function handleSongDragEnd() {
    setDragIdx(null);
    setDragOverIdx(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-400">...</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-80 space-y-4">
          <h1 className="text-2xl font-light text-gray-900">Admin</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={login}
            className="w-full bg-gray-900 text-white py-2 text-sm hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-light text-gray-900">Song Admin</h1>
          <div className="flex gap-4">
            <Link
              href="/principles"
              className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-4"
            >
              View Principles
            </Link>
            <button
              onClick={startAdd}
              className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
            >
              + Add Song
            </button>
          </div>
        </div>

        {(editing || adding) && (
          <div className="border border-gray-200 p-6 mb-8 bg-gray-50">
            <h2 className="text-lg font-medium mb-4">
              {editing ? "Edit Song" : "Add Song"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Artist"
                value={form.artist}
                onChange={(e) => setForm({ ...form, artist: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Album"
                value={form.album}
                onChange={(e) => setForm({ ...form, album: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Year"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Genre"
                value={form.genre}
                onChange={(e) => setForm({ ...form, genre: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Runtime (e.g. 4:39)"
                value={form.runtime}
                onChange={(e) => setForm({ ...form, runtime: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />

              {/* Image drop zone */}
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-2 block">
                  Album Cover
                </label>
                <div
                  onDrop={handleImageDrop}
                  onDragOver={handleImageDragOver}
                  onDragLeave={handleImageDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded cursor-pointer transition-colors flex items-center gap-4 p-4 ${
                    imageDragOver
                      ? "border-gray-900 bg-gray-100"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {form.image ? (
                    <img
                      src={form.image}
                      alt=""
                      className="w-20 h-20 object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      No image
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    {uploading ? (
                      <p className="text-sm text-gray-500">Uploading...</p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-700">
                          Drop an image here or click to browse
                        </p>
                        {form.image && (
                          <p className="text-xs text-gray-400 mt-1 truncate">
                            {form.image}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <input
                placeholder="Spotify URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="col-span-2 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="col-span-2 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />

              {/* Color palette */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-gray-500">Color Palette</label>
                  <button
                    type="button"
                    onClick={() => autoExtractColors(form.image)}
                    disabled={!form.image || extracting}
                    className="text-xs text-gray-500 hover:text-gray-900 underline underline-offset-2 disabled:opacity-40 disabled:no-underline disabled:cursor-not-allowed"
                  >
                    {extracting ? "Extracting..." : "Extract from image"}
                  </button>
                </div>
                <input
                  placeholder="#ffffff, #bfbfbf, #808080, #404040, #000000"
                  value={form.colors.join(", ")}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      colors: e.target.value.split(",").map((c) => c.trim()),
                    })
                  }
                  className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
                />
                <div className="flex gap-1 mt-2">
                  {form.colors.map((c, i) => (
                    <div
                      key={i}
                      className="h-6 flex-1 border border-gray-200"
                      style={{ background: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={saveSong}
                className="bg-gray-900 text-white px-4 py-2 text-sm hover:bg-gray-800 transition-colors"
              >
                {editing ? "Update" : "Add"}
              </button>
              <button
                onClick={cancelForm}
                className="border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {songs.map((song, idx) => (
            <div
              key={song.id}
              draggable
              onDragStart={() => handleSongDragStart(idx)}
              onDragOver={(e) => handleSongDragOver(e, idx)}
              onDrop={() => handleSongDrop(idx)}
              onDragEnd={handleSongDragEnd}
              className={`flex items-center gap-4 border p-4 transition-all ${
                dragIdx === idx
                  ? "opacity-30 border-gray-200"
                  : dragOverIdx === idx
                  ? "border-gray-900 bg-gray-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 select-none text-lg leading-none">
                &#8942;&#8942;
              </div>
              {song.image && (
                <img
                  src={song.image}
                  alt=""
                  className="w-14 h-14 object-cover border border-gray-200"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {song.title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {song.artist} — {song.album} ({song.year})
                </p>
              </div>
              <div className="flex gap-1">
                {song.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 border border-gray-200"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => startEdit(song)}
                  className="text-sm text-gray-500 hover:text-gray-900 underline underline-offset-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSong(song.id)}
                  className="text-sm text-red-400 hover:text-red-600 underline underline-offset-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
