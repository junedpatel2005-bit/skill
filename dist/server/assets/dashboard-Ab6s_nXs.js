import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { I as getClientProfileByUserId, H as getClientJobsByUserId, O as getOpenClientJobs, aj as updateClientJobStatus } from "../server.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
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
const getDashboardAccess_createServerFn_handler = createServerRpc({
  id: "12163bba88d4762a9cb6b72f6c7362484b1d32999fba614b513a46288400c7ac",
  name: "getDashboardAccess",
  filename: "src/client/dashboard.tsx"
}, (opts) => getDashboardAccess.__executeServer(opts));
const getDashboardAccess = createServerFn({
  method: "GET"
}).handler(getDashboardAccess_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  if (viewer.role === "CLIENT") {
    const clientProfile = getClientProfileByUserId(viewer.id);
    const clientJobs = getClientJobsByUserId(viewer.id);
    return {
      viewer,
      clientProfile,
      clientJobs,
      openJobs: []
    };
  }
  return {
    viewer,
    clientProfile: null,
    clientJobs: [],
    openJobs: getOpenClientJobs()
  };
});
const setClientJobStatus_createServerFn_handler = createServerRpc({
  id: "d10fd46a0f32cdc7ad911170dd8cf534414c29108be8166833d5526f9cdb0ea7",
  name: "setClientJobStatus",
  filename: "src/client/dashboard.tsx"
}, (opts) => setClientJobStatus.__executeServer(opts));
const setClientJobStatus = createServerFn({
  method: "POST"
}).inputValidator((data) => data).handler(setClientJobStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    return {
      ok: false,
      formError: "Only clients can manage posted jobs."
    };
  }
  const job = updateClientJobStatus(viewer.id, data.jobId, data.status);
  if (!job) {
    return {
      ok: false,
      formError: "Job not found."
    };
  }
  return {
    ok: true,
    job
  };
});
export {
  getDashboardAccess_createServerFn_handler,
  setClientJobStatus_createServerFn_handler
};
