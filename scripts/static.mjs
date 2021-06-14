import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import tempy from "tempy";
import st from "st";
import createEsmUtils from "esm-utils";

const { __dirname } = createEsmUtils(import.meta);

const DUCK_SERVE_URL = "http://0.0.0.0:9810";
const ST_PORT = 1337;

const srcDir = path.join(__dirname, "../src");
const tempDir = tempy.directory();

const tmpIndexHtmlFilePath = path.join(tempDir, "index.html");
fs.copyFileSync(path.join(srcDir, "index.html"), tmpIndexHtmlFilePath);
fs.copyFileSync(
  path.join(srcDir, "styles.css"),
  path.join(tempDir, "styles.css")
);

const data = fs.readFileSync(tmpIndexHtmlFilePath, "utf-8");
fs.writeFileSync(
  tmpIndexHtmlFilePath,
  data.replace("./index.js", `${DUCK_SERVE_URL}/compile?id=index`)
);

http
  .createServer(st({ path: tempDir, url: "/", index: "index.html" }))
  .listen(ST_PORT);
console.log(`Serving index.html http://localhost:${ST_PORT}`);
