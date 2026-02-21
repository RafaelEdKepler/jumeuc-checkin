import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const userData: Prisma.AttendeeCreateInput[] = [
  {    
    name: "Teste",
    createdAt: new Date(),
    id: Math.random()
  },  
];

export async function main() {
  for (const u of userData) {
    await prisma.attendee.create({ data: u });
  }
}

main();