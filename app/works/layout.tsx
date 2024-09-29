import { MainLayout } from "@/components/layout/main-layout";

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
