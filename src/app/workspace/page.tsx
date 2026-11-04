import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import WorkspaceView from "@/components/workspace/WorkspaceView";

export default function WorkspacePage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Triage Workspace"
        title="Startup Portfolio & Triage Board"
        description="Manage and filter your concepts across lifecycle stages. Identify critical vulnerabilities early, archive unviable ideas, and focus capital on high-conviction opportunities."
      />

      <div className="mt-8">
        <WorkspaceView />
      </div>
    </Container>
  );
}
