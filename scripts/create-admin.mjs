import pkg from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { Pool } from "pg";

const { PrismaClient } = pkg;

const [, , email, password, nameArg] = process.argv;

if (!email || !password) {
  console.error("Usage: npm run seed:admin -- admin@example.com supersecret \"Admin Name\"");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const name = nameArg || "Administrador";

try {
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { name, passwordHash, role: "admin" },
    create: { email, name, passwordHash, role: "admin" },
  });

  console.log(`Admin user ready: ${email}`);
} finally {
  await prisma.$disconnect();
  await pool.end();
}
