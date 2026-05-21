'use client';

import React, { useState } from 'react';
import { Button, useDocumentInfo } from '@payloadcms/ui';
import { useRouter } from 'next/navigation';

export function EventDuplicateButton() {
  const { data, collectionSlug } = useDocumentInfo();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (collectionSlug !== 'events' || !data?.id) return null;

  async function handleClick() {
    if (!data?.id) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/events/${data.id}/duplicate`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? 'Fehler beim Erstellen');
        return;
      }
      router.push(`/admin/collections/events/${json.id}`);
    } catch {
      setError('Netzwerkfehler');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <Button onClick={handleClick} buttonStyle="secondary" disabled={loading}>
        {loading ? 'Wird erstellt…' : '+ Nächste Occurrence erstellen'}
      </Button>
      {error && (
        <p style={{ color: 'red', fontSize: '12px', marginTop: '6px' }}>{error}</p>
      )}
    </div>
  );
}

export default EventDuplicateButton;
