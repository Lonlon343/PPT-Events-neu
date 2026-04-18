import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: true,
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (typeof value === 'string' && value.trim()) return value;
            const filename = (data as { filename?: string } | undefined)?.filename;
            if (!filename) return value;
            return filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ');
          },
        ],
      },
    },
  ],
};
