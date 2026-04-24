import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

const SESSION_TOKEN = "ltoy_admin_session_valid";

async function isAuthed() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === SESSION_TOKEN;
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = path.extname(file.name).toLowerCase() || ".jpg";
  const filename = `ESSENTIALS${Date.now()}${ext}`;
  const filepath = path.join(process.cwd(), "public", filename);

  await fs.writeFile(filepath, buffer);

  return NextResponse.json({ path: `/${filename}` });
}
