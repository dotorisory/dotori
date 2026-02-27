require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const connectDB = require('./db');
const Class = require('./models/Class');

async function fix() {
  await connectDB();

  const updates = [
    {
      find: { quarter: 'spring-2026', name: /Book Club \(2-3\)/i },
      set: {
        schedule: 'Mon 5:00–6:00 or Thu 5:00–6:30',
        description: 'Choose one day: Mon 5:00–6:00 or Thu 5:00–6:30 · 10 weeks',
      },
    },
    {
      find: { quarter: 'spring-2026', name: /Korean Beginning \(K-1\) Lev\.?\s*1/i },
      set: { name: 'K-1 Hangeul Lev.1' },
    },
    {
      find: { quarter: 'spring-2026', name: /Korean Beginning \(K-1\) Lev\.?\s*2/i },
      set: { name: 'K-1 Hangeul Lev. 2' },
    },
    {
      find: { quarter: 'spring-2026', name: /Korean Beginning \(2-3\)/i },
      set: { name: 'Gr.2-3 Hangeul' },
    },
  ];

  for (const u of updates) {
    const result = await Class.updateOne(u.find, { $set: u.set });
    const label = u.set.name || u.set.schedule || JSON.stringify(u.set);
    console.log(`${result.matchedCount ? '✓' : '✗ (not found)'} → ${label}`);
  }

  console.log('Done.');
  process.exit(0);
}

fix().catch(err => { console.error('Error:', err.message); process.exit(1); });
