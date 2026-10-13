import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssumptionsPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/idea/${id}/report`);
}
