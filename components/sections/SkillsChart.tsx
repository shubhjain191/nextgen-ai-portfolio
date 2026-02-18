"use client";

import { motion } from "motion/react";
import { Code, Database, Brain, Cloud, Terminal, Layout } from "lucide-react";

interface Skill {
  name: string | null;
  category: string | null;
  proficiency: string | null;
  percentage: number | null;
  yearsOfExperience: number | null;
  color: string | null;
}

interface SkillsChartProps {
  skills: Skill[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  frontend: <Layout className="w-5 h-5" />,
  backend: <Terminal className="w-5 h-5" />,
  "ai-mi": <Brain className="w-5 h-5" />,
  database: <Database className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
  other: <Code className="w-5 h-5" />,
};

export function SkillsChart({ skills }: SkillsChartProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || "other";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const categories = Object.keys(groupedSkills);

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, categoryIndex) => {
          const displayLabel = category
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="group relative bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-lg"
            >
               {/* Background Glow Effect */}
               <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors pointer-events-none" />

              {/* Header */}
              <div className="p-5 border-b border-border/40 bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {CATEGORY_ICONS[category.toLowerCase()] || <Code className="w-5 h-5" />}
                    </div>
                    <h3 className="text-xl font-bold">{displayLabel}</h3>
                </div>
                <span className="text-xs font-medium text-muted-foreground bg-background/50 px-2 py-1 rounded-md border border-border/20">
                    {groupedSkills[category].length} skills
                </span>
              </div>

              {/* Skills List */}
              <div className="p-5 space-y-5">
                {groupedSkills[category]?.map((skill, index) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 1,
                                delay: 0.2 + index * 0.05,
                                ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-linear-to-r from-primary/80 to-primary"
                            style={{
                                backgroundColor: skill.color || undefined,
                             }}
                        />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}