import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { defineQuery } from "next-sanity";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_QUERY = defineQuery(`*[_id == "singleton-profile"][0]{
  firstName,
  lastName,
  fullBio,
  yearsOfExperience,
  stats,
  email,
  phone,
  location
}`);

export async function AboutSection() {
  const { data: profile } = await sanityFetch({ query: ABOUT_QUERY });

  if (!profile) {
    return null;
  }

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/60">Me</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Get to know me better
          </p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {profile.fullBio && (
            <PortableText
              value={profile.fullBio}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                      {children}
                    </p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground tracking-tight">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl md:text-2xl font-semibold mt-8 mb-4 text-foreground/90">
                      {children}
                    </h3>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/50 bg-secondary/30 p-6 rounded-r-lg italic my-8 text-foreground/80">
                      {children}
                    </blockquote>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                  em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
                  link: ({ children, value }) => {
                    const href = value?.href || "";
                    const isExternal = href.startsWith("http");
                    return (
                      <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        className="text-primary font-medium hover:underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all"
                      >
                        {children}
                      </Link>
                    );
                  },
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc list-outside ml-6 space-y-3 mb-6 text-muted-foreground marker:text-primary/70">
                      {children}
                    </ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal list-outside ml-6 space-y-3 mb-6 text-muted-foreground marker:text-primary/70 font-medium">
                      {children}
                    </ol>
                  ),
                },
              }}
            />
          )}
        </div>

        {/* Stats from CMS */}
        {profile.stats && profile.stats.length > 0 && (
          <div className="@container mt-20 pt-10 border-t border-border/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {profile.stats.map((stat: { value: string; label: string }, idx: number) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="group relative p-6 rounded-2xl bg-card/50 border-2 border-border/50 hover:border-primary/20 hover:bg-card transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider group-hover:text-foreground/80 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}