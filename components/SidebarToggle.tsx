"use client";

import { SignInButton, useUser } from "@clerk/nextjs";
import { MessageSquare, Sparkles } from "lucide-react";
import { useSidebar } from "./ui/sidebar";

function SidebarToggle() {
  const { toggleSidebar, open, isMobile, openMobile } = useSidebar();
  const { isSignedIn } = useUser();

  const isSidebarOpen = isMobile ? openMobile : open;

  if (isSidebarOpen) return null;

  // Matches the clean, minimal aesthetic of the portfolio
  const buttonStyles = `relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full 
    bg-primary text-primary-foreground 
    shadow-2xl shadow-primary/20
    hover:scale-110 hover:shadow-primary/30
    transition-all duration-300 ease-out
    border border-primary/10`;

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 group">
      {/* Tooltip - hidden on mobile */}
      <div className="hidden md:block absolute bottom-full right-0 mb-3 px-4 py-2 rounded-xl bg-card text-card-foreground border border-border/50 text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none shadow-xl shadow-black/5 origin-bottom-right scale-95 group-hover:scale-100">
        Chat with My AI Twin
      </div>

      {isSignedIn ? (
        <button
          type="button"
          onClick={toggleSidebar}
          className={buttonStyles}
          aria-label="Chat with AI Twin"
        >
          <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
          
          {/* Status/AI Badge */}
          <div className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-background flex items-center justify-center border border-border shadow-sm">
            <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 text-amber-500 fill-amber-500" />
          </div>
        </button>
      ) : (
        <SignInButton mode="modal">
          <button
            type="button"
            className={buttonStyles}
            aria-label="Sign in to chat with AI Twin"
          >
            <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
             {/* Status/AI Badge */}
             <div className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 rounded-full bg-background flex items-center justify-center border border-border shadow-sm">
              <Sparkles className="h-2.5 w-2.5 md:h-3 md:w-3 text-amber-500 fill-amber-500" />
            </div>
          </button>
        </SignInButton>
      )}
    </div>
  );
}

export default SidebarToggle;