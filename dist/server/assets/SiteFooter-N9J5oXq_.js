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
const loadFooterPages_createServerFn_handler = createServerRpc({
  id: "978f656b55bcfafae5855f5f72ec85ca2d229bcd432622e80f38a271889c3b0c",
  name: "loadFooterPages",
  filename: "src/components/SiteFooter.tsx"
}, (opts) => loadFooterPages.__executeServer(opts));
const loadFooterPages = createServerFn({
  method: "GET"
}).handler(loadFooterPages_createServerFn_handler, async () => {
  const {
    listLegalPages
  } = await import("./legal-cms.server-CFOZocwu.js");
  return listLegalPages().filter((page) => page.status === "PUBLISHED");
});
export {
  loadFooterPages_createServerFn_handler
};
