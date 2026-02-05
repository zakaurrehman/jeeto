import { prisma } from './lib/prisma';

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...\n');

    // Get all prizes
    const prizes = await prisma.prize.findMany({
      orderBy: { createdAt: 'asc' },
    });

    console.log(`✅ Found ${prizes.length} prizes in database:\n`);

    prizes.forEach((prize, index) => {
      console.log(`${index + 1}. ${prize.name}`);
      console.log(`   - Market Value: PKR ${prize.marketValue.toLocaleString()}`);
      console.log(`   - Ticket Price: PKR ${prize.ticketPrice.toLocaleString()}`);
      console.log(`   - Total Tickets: ${prize.totalTickets.toLocaleString()}`);
      console.log(`   - Sold Tickets: ${prize.soldTickets}`);
      console.log(`   - Status: ${prize.status}`);
      console.log(`   - Draw Date: ${prize.drawDate.toLocaleDateString()}`);
      console.log(`   - Category: ${prize.category}`);
      console.log(`   - Image: ${prize.imageUrl}\n`);
    });

    // Test statistics
    const totalValue = prizes.reduce((sum, p) => sum + p.marketValue, 0);
    const totalTickets = prizes.reduce((sum, p) => sum + p.totalTickets, 0);
    const totalRevenuePotential = prizes.reduce((sum, p) => sum + (p.ticketPrice * p.totalTickets), 0);

    console.log('📊 Statistics:');
    console.log(`   - Total Prize Value: PKR ${totalValue.toLocaleString()}`);
    console.log(`   - Total Tickets Available: ${totalTickets.toLocaleString()}`);
    console.log(`   - Revenue Potential: PKR ${totalRevenuePotential.toLocaleString()}\n`);

    console.log('✅ Database test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabase();
