// Password-protects the workspace admin page and its API with HTTP Basic Auth.
// Set WORKSPACE_ADMIN_PASSWORD (and optionally WORKSPACE_ADMIN_USER, default "admin") in Vercel.
import { NextResponse } from "next/server";

export function proxy(request) {
  const password = process.env.WORKSPACE_ADMIN_PASSWORD;
  if (!password) {
    return new NextResponse("Set WORKSPACE_ADMIN_PASSWORD to open the workspace admin.", { status: 503 });
  }
  const user = process.env.WORKSPACE_ADMIN_USER || "admin";
  const header = request.headers.get("authorization") || "";
  if (header.startsWith("Basic ")) {
    const [u, ...rest] = atob(header.slice(6)).split(":");
    if (u === user && rest.join(":") === password) return NextResponse.next();
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Web3Nova Workspace Admin"' },
  });
}

export const config = {
  matcher: ["/workspace/admin", "/workspace/admin/:path*", "/api/workspace/admin/:path*", "/_next/data/:build/workspace/admin.json"],
};
