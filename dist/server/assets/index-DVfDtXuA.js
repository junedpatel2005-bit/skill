import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { ac as setFavoriteJob } from "../server.js";
import { b as createServerFn } from "./server-B8npIiGW.js";
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
const saveFavoriteJob_createServerFn_handler = createServerRpc({
  id: "79c8bfa0dc26a63cfce8d4b298efcd3cbde99f92285a5b43927deab15e082529",
  name: "saveFavoriteJob",
  filename: "src/client/index.tsx"
}, (opts) => saveFavoriteJob.__executeServer(opts));
const saveFavoriteJob = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(saveFavoriteJob_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return {
      ok: false,
      error: "Log in to save favorite jobs."
    };
  }
  return {
    ok: true,
    favorite: setFavoriteJob(viewer.id, data.jobId, data.favorite)
  };
});
export {
  saveFavoriteJob_createServerFn_handler
};
