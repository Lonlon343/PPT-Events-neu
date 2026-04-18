import { Hero } from "@/components/Hero";
import { EventList } from "@/components/EventList";
import { Newsletter } from "@/components/Newsletter";
import { FAQ } from "@/components/FAQ";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { mapPayloadEventToCard, type PayloadEvent } from "@/lib/events";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const payload = await getPayload({ config: configPromise });
  let eventsPayload: PayloadEvent[] = [];
  
  try {
    const { docs } = await payload.find({
      collection: "events",
      where: {
        status: { equals: "published" },
        or: [
          { eventStatus: { equals: "upcoming" } },
          { eventStatus: { exists: false } },
        ],
      },
      limit: 3,
      sort: "startDate",
    });
    eventsPayload = docs as PayloadEvent[];
  } catch (err) {
    console.error("Payload db error:", err);
    eventsPayload = [];
  }

  const mappedEvents = eventsPayload.map(mapPayloadEventToCard);

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <EventList events={mappedEvents} />
      <Newsletter />
      <FAQ />
    </main>
  );
}
