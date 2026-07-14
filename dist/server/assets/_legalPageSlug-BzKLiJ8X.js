import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
import "../server.js";
import "node:crypto";
import "node:fs/promises";
import "node:path";
import "zod";
import "better-sqlite3";
import "nodemailer";
import "node:async_hooks";
import "h3-v2";
import "jsdom";
import "dompurify";
import "socket.io-client";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
const loadLegalPage_createServerFn_handler = createServerRpc({
  id: "0e146aa39fde9d262e6e06f126a0893e440b786e0b8895f309e09355d861878f",
  name: "loadLegalPage",
  filename: "src/routes/$legalPageSlug.tsx"
}, (opts) => loadLegalPage.__executeServer(opts));
const loadLegalPage = createServerFn({
  method: "GET"
}).inputValidator((input) => input).handler(loadLegalPage_createServerFn_handler, async ({
  data
}) => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-CFOZocwu.js");
  return getPublishedLegalPageBySlug(data.slug) || null;
});
export {
  loadLegalPage_createServerFn_handler
};
