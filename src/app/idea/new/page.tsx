import { Suspense } from "react";
import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import NewIdeaForm from "@/components/intake/NewIdeaForm";
import { Loader2 } from "lucide-react";

export default function NewIdeaPage() {
  return (
    <Container className="py-10">
      <PageHeader
        eyebrow="Startup Intake"
        title="Stress-Test Your Startup Concept"
        description="Submit your product or problem hypothesis. Founder Companion analyzes active market incumbents, evaluates historical case studies, and delivers a rigorous strategic evaluation."
      />

      <div className="mt-8">
        <Suspense
          fallback={
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-teal-800" />
            </div>
          }
        >
          <NewIdeaForm />
        </Suspense>
      </div>
    </Container>
  );
}
