"use client";

import { useState, useEffect } from "react";
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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [editing, setEditing] = useState<Song | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Song, "id">>(emptySong);

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
              <input
                placeholder="Image path (e.g. /album.jpg)"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Spotify URL"
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <input
                placeholder="Note"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                className="col-span-2 border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-gray-900"
              />
              <div className="col-span-2">
                <label className="text-xs text-gray-500 mb-2 block">
                  Colors (5 hex values, comma separated)
                </label>
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

        <div className="space-y-3">
          {songs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-4 border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
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
