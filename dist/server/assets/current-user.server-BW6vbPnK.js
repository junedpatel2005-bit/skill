import { _ as getRequest, a7 as readSessionFromCookieHeader, w as findUserById } from "../server.js";
function getCurrentUser() {
  const request = getRequest();
  const session = readSessionFromCookieHeader(request.headers.get("cookie"));
  if (!session) {
    return null;
  }
  return findUserById(session.userId) ?? null;
}
function requireCurrentUser() {
  const user = getCurrentUser();
  if (!user) {
    throw new Error("Authentication required.");
  }
  return user;
}
function requireCurrentUserRole(role) {
  const user = requireCurrentUser();
  if (user.role !== role) {
    throw new Error("You do not have permission to access this page.");
  }
  return user;
}
export {
  requireCurrentUserRole as a,
  getCurrentUser as g,
  requireCurrentUser as r
};
