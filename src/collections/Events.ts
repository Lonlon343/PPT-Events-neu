import type { CollectionConfig } from 'payload';

export const Events: CollectionConfig = {
  slug: 'events',
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        await req.payload.delete({
          collection: 'participants',
          where: { event: { equals: id } },
          req,
        });
      },
    ],
  },
  admin: {
    useAsTitle: 'title',
    components: {
      edit: {
        beforeDocumentControls: ['@/components/admin/EventParticipantsExportButton'],
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (value) return value;
            return data?.title
              ?.toLowerCase()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
          },
        ],
      },
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd. MMM yyyy HH:mm',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'd. MMM yyyy HH:mm',
        },
      },
    },
    {
      name: 'eventStatus',
      label: 'Status (Upcoming/Past)',
      type: 'select',
      defaultValue: 'upcoming',
      options: [
        { label: 'Upcoming', value: 'upcoming' },
        { label: 'Past', value: 'past' },
      ],
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Auto-set based on event dates.',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            const now = new Date();
            const end = data?.endDate ? new Date(data.endDate) : undefined;
            const start = data?.startDate ? new Date(data.startDate) : undefined;
            const compare = end ?? start;
            if (!compare || Number.isNaN(compare.getTime())) return 'upcoming';
            return compare < now ? 'past' : 'upcoming';
          },
        ],
      },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'eventType',
      label: 'Event-Typ',
      type: 'select',
      defaultValue: 'in-person',
      options: [
        { label: 'Präsenz', value: 'in-person' },
        { label: 'Online', value: 'online' },
      ],
    },
    {
      name: 'onlineLink',
      label: 'Online-Link (nur für Online-Events)',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.eventType === 'online',
      },
      validate: (value: unknown, { siblingData }: { siblingData?: { eventType?: string } }) => {
        if (siblingData?.eventType === 'online' && !value) {
          return 'Bitte einen Online-Link angeben.';
        }
        return true;
      },
    },
    {
      name: 'reminderHoursBefore',
      label: 'Erinnerung (Stunden vor Start)',
      type: 'number',
      defaultValue: 24,
      admin: {
        description: 'Standard: 24 (Erinnerung einen Tag vorher).',
      },
    },
    {
      name: 'speaker',
      label: 'Speaker / Organizer',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      label: 'Description (Rich Text)',
      type: 'richText',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'price',
      type: 'text',
      admin: {
        description: 'Leave empty if free (e.g., "Kostenlos" or "50€")',
      },
    },
    {
      name: 'capacity',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
};
