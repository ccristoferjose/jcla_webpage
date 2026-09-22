import { buildMetadata } from "@/lib/seo";
import { AboutView } from "@/views/AboutView";

export const metadata = buildMetadata("en", "about");

export default function Page() {
  return <AboutView locale="en" />;
}
