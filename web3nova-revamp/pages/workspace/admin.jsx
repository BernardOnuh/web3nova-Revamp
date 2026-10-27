import Head from "next/head";
import WorkspaceAdmin from "@/components/Workspace/WorkspaceAdmin";

// Password-protected by proxy.js (WORKSPACE_ADMIN_PASSWORD).
export default function WorkspaceAdminPage() {
  return (
    <>
      <Head>
        <title>Workspace Admin | Web3Nova</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <WorkspaceAdmin />
    </>
  );
}
