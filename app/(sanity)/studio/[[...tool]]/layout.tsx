import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextGen Portfolio Studio",
  description: "NextGen Portfolio Studio",
};

function layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default layout;
