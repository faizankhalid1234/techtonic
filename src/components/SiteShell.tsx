import { Header } from "@/components/Header";
import { TopTickerBar } from "@/components/TopTickerBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopTickerBar />
      <Header />
      {children}
    </>
  );
}
