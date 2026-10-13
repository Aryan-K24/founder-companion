import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InterviewPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/idea/${id}/report`);
}
