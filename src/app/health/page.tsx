import Container from "@/components/layout/Container";
import PageHeader from "@/components/layout/PageHeader";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

async function getHealthCheck(): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to reach the health check endpoint");
  }

  return res.json();
}

export default async function HealthPage() {
  const data = await getHealthCheck();

  return (
    <Container>
      <PageHeader
        eyebrow="System"
        title="Health"
        description="Confirms the app can reach an external API from a Server Component. Response below is fetched live on every load."
      />

      <div className="my-10 rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <p className="text-sm font-medium text-foreground">
            Endpoint reachable
          </p>
        </div>
        <pre className="overflow-x-auto rounded-lg bg-background p-4 text-sm leading-relaxed text-foreground">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </Container>
  );
}
