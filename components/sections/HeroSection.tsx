import Link from "next/link";
import { defineQuery } from "next-sanity";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { ProfileImage } from "./ProfileImage";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@sanity/icons";

const HERO_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  headline,
  headlineStaticText,
  headlineAnimatedWords,
  headlineAnimationDuration,
  shortBio,
  email,
  phone,
  location,
  availability,
  socialLinks,
  yearsOfExperience,
  profileImage
}`);

export async function HeroSection() {
  const { data: profile } = await sanityFetch({ query: HERO_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden bg-background/50"
    >
      {/* Background Effects */}
      <BackgroundRippleEffect rows={8} cols={27} cellSize={56} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none opacity-50 dark:opacity-30 mix-blend-screen" />

      <div className="relative z-10 container mx-auto max-w-7xl">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 space-y-8 text-center lg:text-left z-10 w-full">
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700 ease-out fill-mode-forwards">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
                {profile.firstName}{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-primary/50 inline-block">
                  {profile.lastName}
                </span>
              </h1>

              <div className="min-h-12 sm:min-h-16 lg:min-h-20 flex items-center justify-center lg:justify-start">
                {profile.headlineStaticText &&
                profile.headlineAnimatedWords &&
                profile.headlineAnimatedWords.length > 0 ? (
                  <div className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                     <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                        {profile.headlineStaticText}
                     </span>
                    <LayoutTextFlip
                      text=""
                      words={profile.headlineAnimatedWords}
                      duration={profile.headlineAnimationDuration || 3000}
                      className="text-primary font-semibold text-2xl sm:text-3xl lg:text-4xl"
                    />
                  </div>
                ) : (
                  <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-medium">
                    {profile.headline}
                  </p>
                )}
              </div>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-forwards">
              {profile.shortBio}
            </p>

            {profile.socialLinks && (
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300 fill-mode-forwards">
                {profile.socialLinks.github && (
                  <Link
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border bg-background/40 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 flex items-center gap-2 group backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <GithubIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground/80 group-hover:text-primary" />
                    <span className="font-medium text-foreground/80 group-hover:text-primary">GitHub</span>
                  </Link>
                )}
                {profile.socialLinks.linkedin && (
                  <Link
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border bg-background/40 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 flex items-center gap-2 group backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <LinkedinIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground/80 group-hover:text-primary" />
                    <span className="font-medium text-foreground/80 group-hover:text-primary">LinkedIn</span>
                  </Link>
                )}
                {profile.socialLinks.twitter && (
                  <Link
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full border bg-background/40 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 flex items-center gap-2 group backdrop-blur-md shadow-sm hover:shadow-md hover:-translate-y-0.5"
                  >
                    <TwitterIcon className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground/80 group-hover:text-primary" />
                    <span className="font-medium text-foreground/80 group-hover:text-primary">Twitter</span>
                  </Link>
                )}
              </div>
            )}

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-forwards">
              {profile.email && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors cursor-default text-sm text-muted-foreground font-medium">
                  <span>📧</span>
                  <span className="truncate max-w-[200px]">{profile.email}</span>
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/50 backdrop-blur-sm hover:bg-secondary/50 transition-colors cursor-default text-sm text-muted-foreground font-medium">
                  <span>📍</span>
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.availability && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/5 border border-green-500/20 backdrop-blur-sm text-sm font-medium text-green-600 dark:text-green-400 cursor-default">
                  <div className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </div>
                  <span>{profile.availability}</span>
                </div>
              )}
            </div>
          </div>

          {/* Profile Image Area */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none animate-in fade-in zoom-in-95 duration-1000 delay-200 fill-mode-forwards flex justify-center lg:justify-end">
            <div className="relative aspect-square w-full max-w-[480px]">
              {/* Image Glow/Backdrop */}              
              <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl ring-1 ring-white/20 dark:ring-white/5 bg-background/20 backdrop-blur-sm p-2 transition-transform hover:scale-[1.01] duration-500">
                    {profile.profileImage && (
                    <ProfileImage
                        imageUrl={urlFor(profile.profileImage).url()}
                        firstName={profile.firstName || ""}
                        lastName={profile.lastName || ""}
                        className="rounded-[1.5rem] border-none"
                    />
                    )}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
