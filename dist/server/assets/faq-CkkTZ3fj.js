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
const loadFaqPage_createServerFn_handler = createServerRpc({
  id: "a172767e0829445458bae5e557f8faaa303ac6ae415111c949002c34f3898285",
  name: "loadFaqPage",
  filename: "src/client/faq.tsx"
}, (opts) => loadFaqPage.__executeServer(opts));
const loadFaqPage = createServerFn({
  method: "GET"
}).handler(loadFaqPage_createServerFn_handler, async () => {
  const {
    getPublishedLegalPageBySlug
  } = await import("./legal-cms.server-CFOZocwu.js");
  return {
    cmsPage: getPublishedLegalPageBySlug("faq") || null
  };
});
export {
  loadFaqPage_createServerFn_handler
};
