import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import NewIdeaForm from "@/components/intake/NewIdeaForm";

export default function NewIdeaPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Startup Intake"
        title="Stress-Test Your Startup Concept"
        description="Submit your product or problem hypothesis. Founder Companion analyzes active market incumbents, evaluates historical case studies, and delivers a rigorous strategic evaluation."
      />

      <div className="mt-8">
        <NewIdeaForm />
      </div>
    </Container>
  );
}
