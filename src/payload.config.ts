import { buildConfig } from 'payload';
import { sqliteAdapter } from '@payloadcms/db-sqlite';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';

import { Users } from './collections/Users';
import { Media } from './collections/Media';
import { Events } from './collections/Events';
import { Participants } from './collections/Participants';
import { ReminderLogs } from './collections/ReminderLogs';

const dirname = path.resolve(process.cwd(), 'src');
const databaseUri = process.env.DATABASE_URL || '';
const isPostgres = databaseUri.startsWith('postgres');

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Events, Participants, ReminderLogs],
  editor: lexicalEditor({}),
  db: isPostgres
    ? postgresAdapter({ pool: { connectionString: databaseUri } })
    : sqliteAdapter({ client: { url: 'file:./payload.db' } }),
  secret: process.env.PAYLOAD_SECRET || 'change-me-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
