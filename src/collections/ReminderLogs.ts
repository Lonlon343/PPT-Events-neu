import type { CollectionConfig } from 'payload';

export const ReminderLogs: CollectionConfig = {
  slug: 'reminder-logs',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['event', 'participant', 'reminderAt'],
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'event',
      type: 'relationship',
      relationTo: 'events',
      required: true,
    },
    {
      name: 'participant',
      type: 'relationship',
      relationTo: 'participants',
      required: true,
    },
    {
      name: 'reminderAt',
      type: 'date',
      required: true,
    },
  ],
};
