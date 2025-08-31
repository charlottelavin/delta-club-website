import { pgTable, text, boolean, integer, timestamp, uuid } from 'drizzle-orm/pg-core';

export const events = pgTable('events', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  committee: text('committee').notNull(),
  hours: text('hours'),
  description: text('description').notNull(),
  url: text('url'),
  featured: boolean('featured').default(false),
  address: text('address').notNull(),
  age: text('age').notNull(),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Event = typeof events.$inferSelect;
export type NewEvent = typeof events.$inferInsert;
