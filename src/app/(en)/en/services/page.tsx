import { buildMetadata } from "@/lib/seo";
import { ServicesView } from "@/views/ServicesView";

export const metadata = buildMetadata("en", "services");

export default function Page() {
  return <ServicesView locale="en" />;
}
