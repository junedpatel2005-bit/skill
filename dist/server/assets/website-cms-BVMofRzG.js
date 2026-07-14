import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { listLegalPages } from "./legal-cms.server-CFOZocwu.js";
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
const loadWebsiteCmsData_createServerFn_handler = createServerRpc({
  id: "aec19aa73a307cd432310028eaa0eed27043384ac6eee443f8aec6a9b8ecda9b",
  name: "loadWebsiteCmsData",
  filename: "src/routes/website-cms.tsx"
}, (opts) => loadWebsiteCmsData.__executeServer(opts));
const loadWebsiteCmsData = createServerFn({
  method: "GET"
}).handler(loadWebsiteCmsData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer: null,
      pages: []
    };
  }
  return {
    viewer,
    pages: listLegalPages()
  };
});
const saveWebsiteCmsPage_createServerFn_handler = createServerRpc({
  id: "fb9aa94d0347ab202806b7721a9146d2982139847d35e2d034072254935e44c8",
  name: "saveWebsiteCmsPage",
  filename: "src/routes/website-cms.tsx"
}, (opts) => saveWebsiteCmsPage.__executeServer(opts));
const saveWebsiteCmsPage = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(saveWebsiteCmsPage_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can update website CMS pages.");
  }
  const {
    saveLegalPage
  } = await import("./legal-cms.server-CFOZocwu.js");
  return saveLegalPage(data.slug, {
    title: data.title,
    content: data.content,
    status: data.status
  });
});
export {
  loadWebsiteCmsData_createServerFn_handler,
  saveWebsiteCmsPage_createServerFn_handler
};
