import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { TopTickerBar } from "@/components/TopTickerBar";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-mesh-bg flex min-h-full flex-col">
      <TopTickerBar />
      <Header />
      <div className="flex flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
