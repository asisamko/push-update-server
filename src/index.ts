import { Elysia } from "elysia";

const app = new Elysia()
  .get("/", () => {
    return {
      status: "ok"
    }
  })

  .get("/update/android", async ({ query }) => {
    const update = await Bun.file("./update.json").json();
    const currentVersionCode = Number(query.versionCode ?? 0);

    return {
      updateAvailable:
        currentVersionCode < update.versionCode,
      ...update
    };
  })

  .listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
