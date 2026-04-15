'use client';

import { Calendar, Clock, MapPin } from 'lucide-react';

type EventRegistrationSummaryProps = {
  dateFull: string;
  time: string;
  location?: string;
};

export function EventRegistrationSummary({
  dateFull,
  time,
  location,
}: EventRegistrationSummaryProps) {
  return (
    <div className="flex flex-wrap gap-3 text-sm text-white/80">
      <span className="flex items-center gap-1.5">
        <Calendar size={14} className="text-[#F018D5]" />
        {dateFull} · {time}
      </span>
      {location && (
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-[#F018D5]" />
          {location}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Clock size={14} className="text-[#F018D5]" />
        Check-in ab 30 Min vorher
      </span>
    </div>
  );
}
