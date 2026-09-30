import Hero from "@/components/Hero";
import {
  AboutSection,
  CTASection,
  FacilitiesMobile,
  FacilitiesSection,
  GalleryPreview,
  GoverningSection,
  MarqueeBand,
  NoticesEvents,
  StatsSection,
} from "@/components/HomeSections";
import { getAlbums, getEvents, getNotices } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [notices, events, albums] = await Promise.all([getNotices(5), getEvents(), getAlbums()]);
  return (
    <>
      <Hero />
      <MarqueeBand />
      <StatsSection />
      <AboutSection />
      <FacilitiesSection />
      <FacilitiesMobile />
      <NoticesEvents notices={notices} events={events} />
      <GalleryPreview albums={albums} />
      <GoverningSection />
      <CTASection />
    </>
  );
}
