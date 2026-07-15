import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";
import PlaceholderCard from "@/components/ui/PlaceholderCard";

const mockIdeas = [
  {
    id: "1",
    title: "AI Internship Platform",
    tag: "Idea",
    description:
      "Matches students with relevant internships using AI-driven profile and requirement analysis.",
  },
  {
    id: "2",
    title: "Smart Parking",
    tag: "Vision",
    description:
      "Sensor and app-based system to find and reserve open parking spots in real time.",
  },
  {
    id: "3",
    title: "Budget Buddy Pro",
    tag: "Idea",
    description:
      "A personal finance companion that turns spending patterns into simple, actionable habits.",
  },
];

export default function WorkspacePage() {
  return (
    <Container>
      <PageHeader
        eyebrow="Workspace"
        title="Your ideas"
        description="A long-term home for every idea and vision you're developing. These are example cards — real ideas will appear here once creation is wired up."
      />

      <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {mockIdeas.map((idea) => (
          <PlaceholderCard
            key={idea.id}
            tag={idea.tag}
            title={idea.title}
            description={idea.description}
            href={`/idea/${idea.id}/interview`}
          />
        ))}
      </div>
    </Container>
  );
}
