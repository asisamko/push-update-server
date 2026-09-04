import { Elysia } from "elysia";

const PORT = Number(process.env.SERVER_PORT ?? process.env.PORT ?? 3000);
const HOST = process.env.SERVER_IP ?? "0.0.0.0";

const app = new Elysia()
  .get("/", () => ({ status: "ok" }))

  .get("/update/android", async ({ query }) => {
    const update = await Bun.file(`${import.meta.dir}/update.json`).json();
    const currentVersionCode = Number(query.versionCode ?? 0);

    return {
      updateAvailable: currentVersionCode < update.versionCode,
      ...update
    };
  })

  .listen({ port: PORT, hostname: HOST });

console.log(`🦊 Elysia running on http://${app.server?.hostname}:${app.server?.port}`);