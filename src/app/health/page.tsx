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
    <Container className="py-10">
      <PageHeader
        eyebrow="System Health"
        title="Diagnostic Health Check"
        description="Confirms the platform can establish live outbound network connectivity from a Server Component. Telemetry fetched live on request."
      />

      <div className="my-10 rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden />
          <p className="text-sm font-semibold text-slate-900">
            External API Gateway Reachable (HTTP 200 OK)
          </p>
        </div>
        <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/80 p-4 font-mono text-xs leading-relaxed text-slate-800">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </Container>
  );
}
