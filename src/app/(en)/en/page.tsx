import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata = buildMetadata("en", "home");

export default function Page() {
  return <HomeView locale="en" />;
}
