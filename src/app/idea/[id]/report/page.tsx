import Container from "@/components/layout/Container";
import ReportPageClient from "@/components/report/ReportPageClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <Container className="py-10">
      <ReportPageClient id={id} />
    </Container>
  );
}
