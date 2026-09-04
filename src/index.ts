import { Elysia } from "elysia";

const PORT = Number(process.env.SERVER_PORT ?? process.env.PORT ?? 3000);

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
  `🦊 Elysia is running at ${PORT}`
);
