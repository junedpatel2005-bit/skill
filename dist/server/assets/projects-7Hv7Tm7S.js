import { c as createServerRpc } from "./createServerRpc-U-JonifX.js";
import { g as getCurrentUser } from "./current-user.server-BW6vbPnK.js";
import { F as getClientHireRequests, K as getClientTrackedProjects, X as getProjectNegotiationsForClient, J as getClientProjectRequests, H as getClientJobsByUserId, I as getClientProfileByUserId, al as updateClientProjectRequestStatus, N as getOpenClientJobById, aj as updateClientJobStatus, p as deleteClientJob, a6 as rateCompletedProject, ae as startClientHireProject, a as cancelProjectTracking, c as cancelHireProject, t as deleteRejectedHireRequest } from "../server.js";
import { q as queueAccountEmailNotification } from "./notification-email.server-BIoXYmjh.js";
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
const getProjectsPageData_createServerFn_handler = createServerRpc({
  id: "7cf9b549da54905b15de3ab7fd7d0d87c0adfbccbaf92c4aef93c08a5496bf86",
  name: "getProjectsPageData",
  filename: "src/client/projects.tsx"
}, (opts) => getProjectsPageData.__executeServer(opts));
const getProjectsPageData = createServerFn({
  method: "GET"
}).handler(getProjectsPageData_createServerFn_handler, async () => {
  const viewer = getCurrentUser();
  if (!viewer) {
    return null;
  }
  if (viewer.role !== "CLIENT") {
    return {
      viewer,
      clientProfile: null,
      projects: [],
      projectRequests: [],
      projectNegotiations: [],
      trackedProjects: [],
      hireRequests: []
    };
  }
  return {
    viewer,
    clientProfile: getClientProfileByUserId(viewer.id),
    projects: getClientJobsByUserId(viewer.id),
    projectRequests: getClientProjectRequests(viewer.id),
    projectNegotiations: getProjectNegotiationsForClient(viewer.id),
    trackedProjects: getClientTrackedProjects(viewer.id),
    hireRequests: getClientHireRequests(viewer.id)
  };
});
const updateProjectRequest_createServerFn_handler = createServerRpc({
  id: "b6df212eaa2ab587a99f249bda564bc2a1ae2f9d46be29facb860d178cdcdefb",
  name: "updateProjectRequest",
  filename: "src/client/projects.tsx"
}, (opts) => updateProjectRequest.__executeServer(opts));
const updateProjectRequest = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateProjectRequest_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can update project requests.");
  }
  const existingRequest = getClientProjectRequests(viewer.id).find((request2) => request2.id === data.requestId);
  const request = updateClientProjectRequestStatus(viewer.id, data.requestId, data.status);
  if (request) {
    const projectTitle = existingRequest?.projectTitle || getOpenClientJobById(request.jobId)?.title || "your project";
    const clientName = `${viewer.firstName} ${viewer.lastName}`.trim() || viewer.email;
    const statusLabel = data.status === "ACCEPTED" ? "accepted" : "rejected";
    queueAccountEmailNotification(request.professionalId, {
      subject: `Your project request was ${statusLabel}`,
      title: `Request ${statusLabel}`,
      body: `${clientName} ${statusLabel} your request for ${projectTitle}. ${data.status === "ACCEPTED" ? "Project tracking is ready for the next steps." : "You can review other open projects from your professional dashboard."}`,
      actionLabel: data.status === "ACCEPTED" ? "View project" : "View requests",
      actionPath: "/professional-stats"
    });
  }
  return request;
});
const updateProjectStatus_createServerFn_handler = createServerRpc({
  id: "8970e96279146b0b7c89d98104e63c2be6bfe7fad738b480a637de26025eacf7",
  name: "updateProjectStatus",
  filename: "src/client/projects.tsx"
}, (opts) => updateProjectStatus.__executeServer(opts));
const updateProjectStatus = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(updateProjectStatus_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can update projects.");
  }
  return updateClientJobStatus(viewer.id, data.projectId, data.status);
});
const removeProjectImmediately_createServerFn_handler = createServerRpc({
  id: "99f8bc625c4f192187c9842ee3a566892709d8486e62910e3a0b50dd648a03ff",
  name: "removeProjectImmediately",
  filename: "src/client/projects.tsx"
}, (opts) => removeProjectImmediately.__executeServer(opts));
const removeProjectImmediately = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(removeProjectImmediately_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can remove projects.");
  }
  return deleteClientJob(viewer.id, data.projectId);
});
const rateProjectProfessional_createServerFn_handler = createServerRpc({
  id: "d45d657e65d2dc91c1038c27ffcc9dc1643d278a30371f0a7552c8d53f5b1561",
  name: "rateProjectProfessional",
  filename: "src/client/projects.tsx"
}, (opts) => rateProjectProfessional.__executeServer(opts));
const rateProjectProfessional = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(rateProjectProfessional_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can rate completed projects.");
  }
  return rateCompletedProject(viewer.id, data);
});
const startDirectHireProject_createServerFn_handler = createServerRpc({
  id: "7289ddbee63ffc3afac939be6d4a48afb6b87577e64db0027216d793e1797742",
  name: "startDirectHireProject",
  filename: "src/client/projects.tsx"
}, (opts) => startDirectHireProject.__executeServer(opts));
const startDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(startDirectHireProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can start direct hire projects.");
  }
  return startClientHireProject(viewer.id, data.contractId);
});
const cancelTrackedProject_createServerFn_handler = createServerRpc({
  id: "e8e7f8df643a91f5fa16310b31c9084324d8df716e972d847ad9fbb636a8bc2c",
  name: "cancelTrackedProject",
  filename: "src/client/projects.tsx"
}, (opts) => cancelTrackedProject.__executeServer(opts));
const cancelTrackedProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(cancelTrackedProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can cancel projects from this page.");
  }
  return cancelProjectTracking(viewer.id, data.trackingId);
});
const cancelDirectHireProject_createServerFn_handler = createServerRpc({
  id: "1b101f8aa7fd0e5406cfeb84f019d600f221056e114340a2506230526a899ad4",
  name: "cancelDirectHireProject",
  filename: "src/client/projects.tsx"
}, (opts) => cancelDirectHireProject.__executeServer(opts));
const cancelDirectHireProject = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(cancelDirectHireProject_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can cancel direct hire projects from this page.");
  }
  return cancelHireProject(viewer.id, data.contractId);
});
const deleteRejectedDirectHire_createServerFn_handler = createServerRpc({
  id: "bf64e5b60e364c05c09598f2a23046d9968e10d4acbb03fcece2f8c40c48e1dc",
  name: "deleteRejectedDirectHire",
  filename: "src/client/projects.tsx"
}, (opts) => deleteRejectedDirectHire.__executeServer(opts));
const deleteRejectedDirectHire = createServerFn({
  method: "POST"
}).inputValidator((input) => input).handler(deleteRejectedDirectHire_createServerFn_handler, async ({
  data
}) => {
  const viewer = getCurrentUser();
  if (!viewer || viewer.role !== "CLIENT") {
    throw new Error("Only clients can delete rejected direct hire requests from this page.");
  }
  return deleteRejectedHireRequest(viewer.id, data.contractId);
});
export {
  cancelDirectHireProject_createServerFn_handler,
  cancelTrackedProject_createServerFn_handler,
  deleteRejectedDirectHire_createServerFn_handler,
  getProjectsPageData_createServerFn_handler,
  rateProjectProfessional_createServerFn_handler,
  removeProjectImmediately_createServerFn_handler,
  startDirectHireProject_createServerFn_handler,
  updateProjectRequest_createServerFn_handler,
  updateProjectStatus_createServerFn_handler
};
