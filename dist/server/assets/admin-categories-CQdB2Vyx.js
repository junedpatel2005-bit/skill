import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { g as getServiceCategories, u as updateServiceCategory, c as createServiceCategory, d as deleteServiceCategory } from "./services-db.server-TN8NQzQl.js";
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
const loadAdminCategoriesData_createServerFn_handler = createServerRpc({
  id: "547642466553dd72bf7aad332cf0b891936c04e214045162a610d5727ff09263",
  name: "loadAdminCategoriesData",
  filename: "src/routes/admin-categories.tsx"
}, (opts) => loadAdminCategoriesData.__executeServer(opts));
const loadAdminCategoriesData = createServerFn({
  method: "GET"
}).handler(loadAdminCategoriesData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    return {
      viewer: null,
      categories: []
    };
  }
  return {
    viewer,
    categories: getServiceCategories()
  };
});
const saveServiceCategory_createServerFn_handler = createServerRpc({
  id: "e6474fabb0c7002835fe9cf233562b70c976f1753e8258ac38019f98d7b13067",
  name: "saveServiceCategory",
  filename: "src/routes/admin-categories.tsx"
}, (opts) => saveServiceCategory.__executeServer(opts));
const saveServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(saveServiceCategory_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can manage service categories.");
  }
  if (data.id) {
    return updateServiceCategory(data.id, data);
  }
  return createServiceCategory(data);
});
const removeServiceCategory_createServerFn_handler = createServerRpc({
  id: "576fe12dd784cc869a9ca756e2b212df90341c076f6142ed21f5ba66874fffc2",
  name: "removeServiceCategory",
  filename: "src/routes/admin-categories.tsx"
}, (opts) => removeServiceCategory.__executeServer(opts));
const removeServiceCategory = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(removeServiceCategory_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "ADMIN") {
    throw new Error("Only admins can manage service categories.");
  }
  return deleteServiceCategory(data.id);
});
export {
  loadAdminCategoriesData_createServerFn_handler,
  removeServiceCategory_createServerFn_handler,
  saveServiceCategory_createServerFn_handler
};
