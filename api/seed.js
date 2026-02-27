require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const connectDB = require('./db');
const Class = require('./models/Class');

const classes = [
  // ── Book Club ──────────────────────────────────────────────
  {
    name: 'Book Club (K-1)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Wed 4:00–5:00',
    description: '10 weeks · 1 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },
  {
    name: 'Book Club (2-3)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Mon 5:00–6:00 or Thu 5:00–6:30',
    description: 'Choose one day: Mon 5:00–6:00 or Thu 5:00–6:30 · 10 weeks',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },
  {
    name: 'Book Club (4-5)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Thu 6:30–8:00',
    description: '10 weeks · 1.5 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },
  {
    name: 'Book Club (6-8)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Sat 5:00–6:30',
    description: '10 weeks · 1.5 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },

  // ── Reading Comprehension ──────────────────────────────────
  {
    name: 'Reading Comprehension (2-3)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Tue 6:00–7:00',
    description: '10 weeks · 1 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },
  {
    name: 'Reading Comprehension (4-5)',
    category: 'reading',
    quarter: 'spring-2026',
    schedule: 'Wed 7:00–8:00',
    description: '10 weeks · 1 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },

  // ── Writing ────────────────────────────────────────────────
  {
    name: 'Academic Writing Foundations (2-3)',
    category: 'writing',
    quarter: 'spring-2026',
    schedule: 'Tue 4:00–5:00',
    description: '10 weeks · 1 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },
  {
    name: 'Academic Writing Foundations (4-5)',
    category: 'writing',
    quarter: 'spring-2026',
    schedule: 'Mon 7:30–8:30',
    description: '10 weeks · 1 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },
  {
    name: "Writer's Workshop (3-6)",
    category: 'writing',
    quarter: 'spring-2026',
    schedule: 'Sat 1:30–3:00',
    description: '10 weeks · 1.5 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },

  // ── Korean ─────────────────────────────────────────────────
  {
    name: 'K-1 Hangeul Lev.1',
    category: 'korean',
    quarter: 'spring-2026',
    schedule: 'Sat 3:30–5:00',
    description: '10 weeks · 1.5 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },
  {
    name: 'K-1 Hangeul Lev. 2',
    category: 'korean',
    quarter: 'spring-2026',
    schedule: 'Wed 2:30–4:00 or Fri 4:30–6:00',
    description: '10 weeks · 1.5 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },
  {
    name: 'Gr.2-3 Hangeul',
    category: 'korean',
    quarter: 'spring-2026',
    schedule: 'Thu 2:15–3:45',
    description: '10 weeks · 1.5 hr/session',
    price: 600,
    earlyBirdPrice: 510,
    capacity: 4,
  },
  {
    name: 'Korean Book Club (Advanced)',
    category: 'korean',
    quarter: 'spring-2026',
    schedule: 'Fri 6:30–8:00',
    description: '10 weeks · 1.5 hr/session',
    price: 700,
    earlyBirdPrice: 595,
    capacity: 4,
  },

  // ── 1:1 Private Lesson ─────────────────────────────────────
  {
    name: '1:1 Private Lesson',
    category: '1on1',
    quarter: 'spring-2026',
    schedule: 'Multiple time slots available',
    description: '10 weeks · 1 hr/session · Individual Pricing',
    price: 600,
    priceMax: 1000,
    earlyBirdPrice: null,
    capacity: 4,
  },
];

async function seed() {
  await connectDB();
  await Class.deleteMany({ quarter: 'spring-2026' });
  console.log('Cleared existing spring-2026 classes.');
  const inserted = await Class.insertMany(classes);
  console.log(`Inserted ${inserted.length} classes for spring-2026.`);
  process.exit(0);
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
