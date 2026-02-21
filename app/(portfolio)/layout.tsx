import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { FloatingDock } from "@/components/FloatingDock";
import { ModeToggle } from "@/components/DarkModeToggle";

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <SidebarInset>{children}</SidebarInset>

      <FloatingDock />

      <div className="fixed md:bottom-6 md:right-24 top-4 right-18 md:top-auto md:left-auto z-20">
        <div className="w-10 h-10 md:w-12 md:h-12">
          <ModeToggle />
        </div>
      </div>
    </SidebarProvider>
  );
}
