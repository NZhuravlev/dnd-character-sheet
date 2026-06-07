import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const clientDir = path.join(distDir, "client");
const serverDir = path.join(distDir, "server");
const openaiDir = path.join(distDir, ".openai");

const assetDefinitions = [
  { source: "index.html", route: "/", contentType: "text/html; charset=utf-8" },
  { source: "index.html", route: "/index.html", contentType: "text/html; charset=utf-8" },
  { source: "styles.css", route: "/styles.css", contentType: "text/css; charset=utf-8" },
  { source: "app.js", route: "/app.js", contentType: "text/javascript; charset=utf-8" },
  { source: "data/character.json", route: "/data/character.json", contentType: "application/json; charset=utf-8" }
];

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(clientDir, "data"), { recursive: true });
await mkdir(serverDir, { recursive: true });
await mkdir(openaiDir, { recursive: true });

const assets = [];

for (const asset of assetDefinitions) {
  const absolutePath = path.join(root, asset.source);
  const body = await readFile(absolutePath, "utf8");
  assets.push({
    route: asset.route,
    contentType: asset.contentType,
    body
  });

  const clientTarget = path.join(clientDir, asset.source);
  await mkdir(path.dirname(clientTarget), { recursive: true });
  await writeFile(clientTarget, body, "utf8");
}

const workerSource = `const ASSETS = new Map(${JSON.stringify(assets)});

function responseFor(asset) {
  return new Response(asset.body, {
    headers: {
      "content-type": asset.contentType,
      "cache-control": asset.route === "/" || asset.route === "/index.html"
        ? "no-cache"
        : "public, max-age=300"
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const asset = ASSETS.get(url.pathname);

    if (asset) {
      return responseFor(asset);
    }

    if (!url.pathname.includes(".") || url.pathname.endsWith("/")) {
      return responseFor(ASSETS.get("/"));
    }

    return new Response("Not Found", { status: 404 });
  }
};
`;

await writeFile(path.join(serverDir, "index.js"), workerSource, "utf8");
await writeFile(
  path.join(openaiDir, "hosting.json"),
  await readFile(path.join(root, ".openai", "hosting.json"), "utf8"),
  "utf8"
);

console.log(`Built Sites artifact in ${distDir}`);
