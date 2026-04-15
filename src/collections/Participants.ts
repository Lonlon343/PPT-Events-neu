import type { CollectionConfig } from 'payload';

export const Participants: CollectionConfig = {
  slug: 'participants',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'event', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'firstName',
      label: 'Vorname',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Nachname',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'company',
      label: 'Firma (optional)',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Nachricht',
      type: 'textarea',
    },
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
};
