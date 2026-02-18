"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useSidebar } from "./ui/sidebar";
import { cn } from "@/lib/utils";

interface ProfileImageProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  className?: string;
}

export function ProfileImage({
  imageUrl,
  firstName,
  lastName,
  className,
}: ProfileImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleSidebar, open } = useSidebar();
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  return (
    <button
      type="button"
      onClick={() => (isSignedIn ? toggleSidebar() : openSignIn())}
      className={cn(
        "relative aspect-square rounded-2xl overflow-hidden border-4 border-primary/20 block group cursor-pointer w-full",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle AI Chat Sidebar"
    >
      <Image
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        fill
        unoptimized
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />

      {/* Online Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <div className="absolute inset-0 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
        </div>
        <span className="text-xs font-medium text-white">Online</span>
      </div>
    </button>
  );
}