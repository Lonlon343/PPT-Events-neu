import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
} from '@react-email/components';
import React from 'react';

interface EventReminderEmailProps {
  firstName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventType: 'online' | 'in-person';
  onlineLink?: string;
}

export function EventReminderEmail({
  firstName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventType,
  onlineLink,
}: EventReminderEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Erinnerung: {eventTitle} findet bald statt</Preview>
      <Tailwind>
        <Body className="bg-gray-50 font-sans">
          <Container className="mx-auto py-12 px-6 max-w-xl">
            <Section className="bg-[#00325B] rounded-t-2xl px-8 py-8 text-center">
              <Text className="text-[#F018D5] font-bold uppercase tracking-widest text-sm m-0 mb-2">
                Pars pro Toto Events
              </Text>
              <Heading className="text-white text-2xl font-extrabold m-0">
                Erinnerung an dein Event
              </Heading>
            </Section>

            <Section className="bg-white rounded-b-2xl px-8 py-8 shadow-sm">
              <Text className="text-[#00325B] text-lg font-bold">Hallo {firstName} 👋</Text>
              <Text className="text-zinc-600 leading-relaxed">
                Dein Event findet bald statt. Hier sind die wichtigsten Infos auf einen Blick:
              </Text>

              <Hr className="border-zinc-100 my-6" />

              <Section className="bg-zinc-50 rounded-xl p-6">
                <Heading as="h2" className="text-[#00325B] text-xl font-extrabold m-0 mb-4">
                  {eventTitle}
                </Heading>
                <Text className="text-zinc-600 m-0 mb-2">
                  <span className="font-bold text-[#00325B]">📅 Datum:</span> {eventDate}
                </Text>
                <Text className="text-zinc-600 m-0 mb-2">
                  <span className="font-bold text-[#00325B]">🕐 Uhrzeit:</span> {eventTime} Uhr
                </Text>
                {eventType === 'online' ? (
                  <Text className="text-zinc-600 m-0">
                    <span className="font-bold text-[#00325B]">💻 Online-Link:</span>{' '}
                    {onlineLink ? (
                      <a href={onlineLink} className="text-[#F018D5]">
                        {onlineLink}
                      </a>
                    ) : (
                      'Wird dir rechtzeitig zugeschickt.'
                    )}
                  </Text>
                ) : (
                  <Text className="text-zinc-600 m-0">
                    <span className="font-bold text-[#00325B]">📍 Ort:</span> {eventLocation}
                  </Text>
                )}
              </Section>

              <Hr className="border-zinc-100 my-6" />

              <Text className="text-zinc-500 text-sm leading-relaxed">
                Falls du Fragen hast, erreichst du uns jederzeit unter{' '}
                <a href="mailto:support@ppt-events.de" className="text-[#F018D5]">
                  support@ppt-events.de
                </a>.
              </Text>

              <Text className="text-[#00325B] font-bold text-sm m-0 mt-6">
                Dein PPT-Events Team
              </Text>
            </Section>

            <Text className="text-center text-zinc-400 text-xs mt-6">
              © {new Date().getFullYear()} PPT-Events · Pars pro Toto ·{' '}
              <a href="https://ppt-events.de" className="text-zinc-400">
                ppt-events.de
              </a>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default EventReminderEmail;
