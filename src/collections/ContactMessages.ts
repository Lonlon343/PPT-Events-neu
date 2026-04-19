import type { CollectionConfig } from 'payload';

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Kontaktnachricht',
    plural: 'Kontaktnachrichten',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'handled', 'createdAt'],
    group: 'Kommunikation',
    description:
      'Nachrichten aus dem Kontaktformular. Markiere bearbeitete Nachrichten als erledigt.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'handled',
      label: 'Bearbeitet',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
};
