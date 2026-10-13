import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import WorkspaceView from "@/components/workspace/WorkspaceView";

export default function WorkspacePage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Triage Workspace"
        title="Startup Portfolio & Triage Board"
        description="Filter and manage your startup concepts across stages. Isolate fatal flaws early, discard dead ideas into the graveyard, and focus execution on defensible survivors."
      />

      <div className="mt-8">
        <WorkspaceView />
      </div>
    </Container>
  );
}
