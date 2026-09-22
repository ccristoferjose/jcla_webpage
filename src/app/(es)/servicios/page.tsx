import { buildMetadata } from "@/lib/seo";
import { ServicesView } from "@/views/ServicesView";

export const metadata = buildMetadata("es", "services");

export default function Page() {
  return <ServicesView locale="es" />;
}
