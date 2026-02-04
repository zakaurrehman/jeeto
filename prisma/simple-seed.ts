import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const connectionString = 'postgresql://neondb_owner:npg_UvlLy1zgo2Mm@ep-green-field-aixr0w5q-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing prizes
  await prisma.prize.deleteMany({});
  console.log('✓ Cleared existing prizes');

  // Create prizes from mockup
  const prizes = await prisma.prize.createMany({
    data: [
      {
        name: 'iPhone 17 Pro',
        description: 'Latest iPhone 17 Pro with advanced features and pro camera system',
        imageUrl: '/images/iphone-17-pro.png',
        marketValue: 420000,
        ticketPrice: 100,
        totalTickets: 4200,
        soldTickets: 2013,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE',
        category: 'tech',
      },
      {
        name: 'iPhone 17 Pro Max',
        description: 'iPhone 17 Pro Max - The ultimate smartphone with largest display',
        imageUrl: '/images/iphone-17-pro-max.png',
        marketValue: 480000,
        ticketPrice: 150,
        totalTickets: 3200,
        soldTickets: 2078,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE',
        category: 'tech',
      },
      {
        name: 'iPad',
        description: 'Latest iPad with stunning Liquid Retina display and Apple Pencil support',
        imageUrl: '/images/ipad.png',
        marketValue: 220000,
        ticketPrice: 80,
        totalTickets: 2750,
        soldTickets: 1912,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE',
        category: 'tech',
      },
      {
        name: 'Apple Watch',
        description: 'Apple Watch - Your perfect health and fitness companion',
        imageUrl: '/images/apple-watch.png',
        marketValue: 150000,
        ticketPrice: 50,
        totalTickets: 3000,
        soldTickets: 2785,
        drawDate: new Date('2026-02-28'),
        status: 'ACTIVE',
        category: 'tech',
      },
      {
        name: 'Mercedes C-Class 2024',
        description: 'Luxury Mercedes C-Class 2024 - Premium sedan with cutting-edge technology',
        imageUrl: '/images/mercedes-c-class.png',
        marketValue: 30000000,
        ticketPrice: 1000,
        totalTickets: 30000,
        soldTickets: 1481,
        drawDate: new Date('2026-03-15'),
        status: 'ACTIVE',
        category: 'car',
      },
    ],
  });

  console.log(`✓ Created ${prizes.count} prizes`);
  console.log('✅ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
