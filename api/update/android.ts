import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const update = JSON.parse(
      await readFile(join(process.cwd(), "update.json"), "utf8")
    );
    const currentVersionCode = Number(request.query.versionCode ?? 0);

    response.status(200).json({
      updateAvailable: currentVersionCode < update.versionCode,
      ...update
    });
  } catch {
    response.status(500).json({ error: "Unable to read update metadata" });
  }
}