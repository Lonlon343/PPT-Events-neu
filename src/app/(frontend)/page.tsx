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

  // Map to frontend EventType format
  const mappedEvents = eventsPayload.length > 0
    ? (eventsPayload as PayloadEvent[]).map(mapPayloadEventToCard)
    : [
        // Fallback placeholder data
        {
          id: 1,
          title: "Leadership Abend – Osnabrück",
          slug: "leadership-abend-osnabrueck-46",
          day: "14",
          month: "NOV",
          dateFull: "14. November",
          time: "19:00 - 21:00",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          location: "",
          image: "https://ppt-events.de/wp-content/uploads/2022/08/AdobeStock_249512191-scaled.jpeg", 
        },
        {
          id: 2,
          title: "Leadership Abend – Osnabrück",
          slug: "leadership-abend-osnabrueck-44",
          day: "12",
          month: "DEZ",
          dateFull: "12. Dezember",
          time: "19:00 - 21:00",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          location: "",
          image: "https://ppt-events.de/wp-content/uploads/2022/08/AdobeStock_249512191-scaled.jpeg",
        },
        {
          id: 3,
          title: "Betongoldabend",
          slug: "betongoldabend-22",
          day: "20",
          month: "JAN",
          dateFull: "20. Januar",
          time: "18:30 - 21:30",
          startDate: new Date().toISOString(),
          endDate: new Date().toISOString(),
          location: "",
          image: "https://ppt-events.de/wp-content/uploads/2022/08/AdobeStock_249512191-scaled.jpeg",
        },
      ];

  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <EventList events={mappedEvents} />
      <Newsletter />
      <FAQ />
    </main>
  );
}
