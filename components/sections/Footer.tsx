import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";
import { TextHoverEffect } from "@/components/ui/text-hover-effect";
import { Github, Linkedin, Twitter, Mail, MapPin } from "lucide-react";

const FOOTER_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  location,
  socialLinks,
  email
}`);

export async function Footer() {
  const { data: profile } = await sanityFetch({ query: FOOTER_QUERY });

  if (!profile) return null;

  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim();

  return (
    <footer className="relative bg-muted/10 border-t border-border/40 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-12 md:py-20 lg:py-24">
        {/* Top: Signature Area */}
        <div className="w-full flex flex-col items-center justify-center space-y-8">
          <div className="w-full h-40 md:h-60 flex items-center justify-center overflow-hidden">
            <TextHoverEffect text={fullName || "SHUBH JAIN"} />
          </div>

          {/* Social Links Group */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {profile.socialLinks?.github && (
              <Link
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <div className="p-2 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">GitHub</span>
              </Link>
            )}
            {profile.socialLinks?.linkedin && (
              <Link
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <div className="p-2 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">LinkedIn</span>
              </Link>
            )}
            {profile.socialLinks?.twitter && (
              <Link
                href={profile.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <div className="p-2 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Twitter className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">Twitter</span>
              </Link>
            )}
            {profile.email && (
              <Link
                href={`mailto:${profile.email}`}
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
              >
                <div className="p-2 rounded-full bg-primary/5 border border-primary/10 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium hidden sm:inline">Email</span>
              </Link>
            )}
          </div>
        </div>

        {/* Separator / Bottom Metadata */}
        <div className="mt-16 md:mt-24 pt-8 text-center border-t border-border/20 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-muted-foreground">
          <p className="font-medium">
            &copy; {new Date().getFullYear()} {fullName}. All rights reserved.
          </p>
        </div>
      </div>

      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-5 pointer-events-none -z-10" />
    </footer>
  );
}
