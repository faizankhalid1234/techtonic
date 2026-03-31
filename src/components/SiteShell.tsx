import { AnnouncementBar } from "@/components/AnnouncementBar";
import { Header } from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      {children}
    </>
  );
}
