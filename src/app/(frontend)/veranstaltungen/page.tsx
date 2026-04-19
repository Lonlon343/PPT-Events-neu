import type { Metadata } from "next";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { mapPayloadEventToCard, type PayloadEvent } from "@/lib/events";
import { EventsListingClient } from "@/app/(frontend)/veranstaltungen/EventsListingClient";

export const dynamic = 'force-dynamic';

export default async function VeranstaltungenPage() {
  const payload = await getPayload({ config: configPromise });

  let eventsPayload: PayloadEvent[] = [];
  let locations: string[] = [];
  let speakers: string[] = [];

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
      sort: "startDate",
      limit: 200,
    });
    eventsPayload = docs as PayloadEvent[];

    locations = Array.from(
      new Set(eventsPayload.map((d) => d.location).filter(Boolean) as string[]),
    ).sort((a, b) => a.localeCompare(b, 'de'));
    speakers = Array.from(
      new Set(eventsPayload.map((d) => d.speaker).filter(Boolean) as string[]),
    ).sort((a, b) => a.localeCompare(b, 'de'));
  } catch (err) {
    console.error("Payload db error:", err);
  }

  const mappedEvents = eventsPayload.map(mapPayloadEventToCard);

  return (
    <main className="min-h-screen bg-[#FBFCFC] pt-32 pb-24">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-ppt-blue">
            Veranstaltungen
          </h1>
        </div>

        <EventsListingClient
          events={mappedEvents}
          locations={locations}
          speakers={speakers}
        />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: 'Veranstaltungen',
  description: 'Alle kommenden Veranstaltungen und Events von PPT-Events.',
};
