import type { CollectionConfig } from 'payload';

export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: {
    singular: 'Newsletter-Abonnent',
    plural: 'Newsletter-Abonnenten',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'source', 'status', 'createdAt'],
    group: 'Newsletter',
    description:
      'Anmeldungen aus dem Newsletter-Formular. Getrennt von Event-Teilnehmern.',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        { label: 'Aktiv', value: 'active' },
        { label: 'Abgemeldet', value: 'unsubscribed' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website-footer',
      admin: {
        position: 'sidebar',
        description: 'Wo der/die Abonnent:in sich eingetragen hat.',
      },
    },
  ],
  timestamps: true,
};
