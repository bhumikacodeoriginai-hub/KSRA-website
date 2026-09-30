import type { Metadata } from "next";
import { PageHero } from "@/components/motion-ui";
import GalleryGrid from "@/components/GalleryGrid";
import { getAlbums } from "@/lib/data";

export const metadata: Metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const albums = await getAlbums();
  return (
    <>
      <PageHero eyebrow="Gallery" title="Through the lens." sub="Championships, felicitations and everyday training from the range." />
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl"><GalleryGrid albums={albums} /></div>
      </section>
    </>
  );
}
