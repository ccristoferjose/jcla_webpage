import { buildMetadata } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata = buildMetadata("es", "home");

export default function Page() {
  return <HomeView locale="es" />;
}
