'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Users2 } from 'lucide-react';
import { EventRegistrationButton } from '@/components/EventRegistrationButton';

type EventDetailsProps = {
  title: string;
  image?: string;
  dateLabel: string;
  timeLabel: string;
  location?: string;
  speaker?: string;
  onRegister: () => void;
  description?: React.ReactNode;
};

export function EventDetails({
  title,
  image,
  dateLabel,
  timeLabel,
  location,
  speaker,
  onRegister,
  description,
}: EventDetailsProps) {
  return (
    <section className="bg-[#FBFCFC] pb-24 pt-28 text-ppt-blue">
      <div className="container mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm"
          >
            {image && (
              <div className="relative h-64 w-full md:h-80">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover"
                  unoptimized={image.startsWith('http')}
                />
              </div>
            )}
            <div className="space-y-4 px-8 py-10">
              <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-ppt-pink" />
                  {dateLabel}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-ppt-pink" />
                  {timeLabel}
                </span>
                {location && (
                  <span className="flex items-center gap-2">
                    <MapPin size={16} className="text-ppt-pink" />
                    {location}
                  </span>
                )}
                {speaker && (
                  <span className="flex items-center gap-2">
                    <Users2 size={16} className="text-ppt-pink" />
                    {speaker}
                  </span>
                )}
              </div>

              {description && (
                <div className="prose prose-zinc max-w-none text-sm leading-relaxed">
                  {description}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-fit rounded-3xl border border-black/5 bg-white p-8 shadow-sm"
        >
          <h2 className="text-xl font-extrabold">Jetzt dabei sein</h2>
          <p className="mt-3 text-sm text-zinc-500">
            Sichere dir deinen Platz. Die Anmeldung dauert nur eine Minute.
          </p>
          <div className="mt-6">
            <EventRegistrationButton onClick={onRegister} />
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
