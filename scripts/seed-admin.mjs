import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '../src/lib/db/schema.js';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  const email = 'bitrus@trueweb.ng';
  const password = 'TrueWeb2024!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingArgs = await db.select().from(schema.users).where(eq(schema.users.email, email));

  if (existingArgs.length > 0) {
    await db.update(schema.users)
      .set({ password: hashedPassword, role: 'owner' })
      .where(eq(schema.users.email, email));
    console.log('Admin user updated successfully.');
  } else {
    await db.insert(schema.users).values({
      id: crypto.randomUUID(),
      name: 'Bitrus J-K Gadzama',
      email,
      password: hashedPassword,
      role: 'owner',
    });
    console.log('Admin user created successfully.');
  }
}

seed().catch(console.error).finally(() => process.exit(0));
