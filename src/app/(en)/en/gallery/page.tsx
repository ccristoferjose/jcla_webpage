import { buildMetadata } from "@/lib/seo";
import { GalleryView } from "@/views/GalleryView";

export const metadata = buildMetadata("en", "gallery");

export default function Page() {
  return <GalleryView locale="en" />;
}
