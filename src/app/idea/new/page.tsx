import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import NewIdeaForm from "@/components/intake/NewIdeaForm";

export default function NewIdeaPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Startup Intake"
        title="Stress-Test Your Startup Concept"
        description="Submit your solution or problem hypothesis. Founder Companion searches active players, scours the failure graveyard, and returns a ruthless viability verdict."
      />

      <div className="mt-8">
        <NewIdeaForm />
      </div>
    </Container>
  );
}
