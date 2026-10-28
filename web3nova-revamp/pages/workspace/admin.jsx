import Seo from "@/components/Seo";
import WorkspaceAdmin from "@/components/Workspace/WorkspaceAdmin";

// Password-protected by proxy.js (WORKSPACE_ADMIN_PASSWORD).
export default function WorkspaceAdminPage() {
  return (
    <>
      <Seo title="Workspace Admin" noindex />
      <WorkspaceAdmin />
    </>
  );
}
