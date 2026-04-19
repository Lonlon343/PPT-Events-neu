'use client';

import React from 'react';
import { Button, useDocumentInfo } from '@payloadcms/ui';

export function EventParticipantsExportButton() {
  const { data, collectionSlug } = useDocumentInfo();

  if (collectionSlug !== 'events' || !data?.id) {
    return null;
  }

  const href = `/api/events/${data.id}/participants.csv`;

  return (
    <div style={{ marginBottom: '16px' }}>
      <Button
        el="anchor"
        url={href}
        buttonStyle="secondary"
        icon={['plus']}
      >
        Teilnehmer exportieren (CSV)
      </Button>
    </div>
  );
}

export default EventParticipantsExportButton;
