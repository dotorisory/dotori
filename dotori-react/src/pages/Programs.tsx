import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type Category = 'reading' | 'writing' | 'creative' | 'tutor' | 'extend'

interface ProgramCard {
  id: string
  category: Category
  title: string
  duration: string
  schedule?: string
  description?: string
  features: string[]
  ctaText: string
  ctaLink: string
  ctaStyle?: React.CSSProperties
  isDownload?: boolean
}

const programs: ProgramCard[] = [
  {
    id: 'tutor',
    category: 'tutor',
    title: '1:1 Tutoring',
    duration: 'Available on Saturdays · Flexible scheduling with the instructor',
    features: [
      'Arrange sessions directly with the instructor to fit your schedule',
      'Personalized support in reading, writing, or homework help',
      "Tailored lessons to meet each student's unique needs"
    ],
    ctaText: 'Contact Us',
    ctaLink: '/contact'
  },
  {
    id: 'lounge',
    category: 'extend',
    title: 'Dotori Lounge',
    duration: 'Ongoing · Available for Dotori students only',
    description:
      "Dotori Lounge is an open space available for students before and after their class. It's a comfortable place to settle in, unwind, and enjoy purposeful activities at a relaxed pace.",
    features: [
      'Get ready for class or wind down before/after lessons',
      'Work on homework independently',
      'Play educational board games and Korean language games',
      'Read books from the Dotori Library',
      'Join rotating enrichment activities such as: Art of the Month, Math Mystery, Word Ladder & word games, Seasonal STEAM mini-activities',
      'Flexible pickup time — no rush for parents'
    ],
    ctaText: '',
    ctaLink: ''
  },
  {
    id: 'book-club',
    category: 'reading',
    title: 'Book Club',
    duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
    schedule: '🟢 K–1 · Thu · 4:00–5:00 PM\n🔵 Gr. 2–3 · Mon · 5:00–6:30 PM\n🟣 Gr. 4–5 · Thu · 6:30–8:00 PM',
    description:
      'Strengthen core literacy skills while exploring both fiction and nonfiction stories that students choose themselves. Through guided reading, discussions, and collaborative projects, learners build the tools they need to read thoughtfully and with confidence.',
    features: [
      'Read two books (one fiction + one nonfiction) over 10 weeks',
      'Expand vocabulary and background knowledge',
      'Develop comprehension and close reading skills',
      'Practice communication through discussion, written responses, and projects',
      'Weekly homework to reinforce skills at home'
    ],
    ctaText: 'Download Brochure',
    ctaLink: '/assets/pdf/brochure_reading2.pdf',
    isDownload: true
  },
  {
    id: 'reading-comprehension',
    category: 'reading',
    title: 'Reading Comprehension',
    duration: '10 weeks · 1 class/week · 60 minutes · Max 4 students/class',
    schedule: '🔵 Gr. 2–3 · Tue · 6:00–7:00 PM\n🟣 Gr. 4–5 · Mon · 7:00–8:00 PM\n🟠 Gr. 6–8 · Wed · 7:00–8:00 PM',
    description:
      'A focused program that strengthens reading comprehension through structured skill-building and guided practice. Students learn to understand texts more deeply and respond with clarity and confidence.',
    features: [
      'Improve reading accuracy and detail recognition',
      'Develop close reading strategies',
      'Apply skills for main idea, inference, and context clues',
      'Expand academic vocabulary',
      'Practice text-based responses',
      'Weekly homework to reinforce learning'
    ],
    ctaText: 'Contact Us',
    ctaLink: '/contact'
  },
  {
    id: 'academic-writing',
    category: 'writing',
    title: 'Academic Writing Foundations',
    duration: '10 weeks · 1 class/week · 60 minutes · Max 4 students/class',
    schedule: '🔵 Gr. 2–3 · Tue · 5:00–6:00 PM\n🟣 Gr. 4–5 · Mon · 6:30–7:30 PM',
    description:
      'Build strong academic writing foundations by learning how to communicate ideas clearly, accurately, and with purpose. Students explore meaningful science and social studies topics while developing the language and structure needed for effective written expression.',
    features: [
      'Explore engaging informational topics to build background knowledge',
      'Learn academic and topic-specific vocabulary to enhance clarity and expression',
      'Develop writing skills step-by-step: sentence → paragraph → short composition',
      'Practice key writing purposes used across subjects (describe, explain, persuade)',
      'Weekly homework to reinforce skills at home'
    ],
    ctaText: 'Download Brochure',
    ctaLink: '/assets/pdf/brochure_writing2.pdf',
    isDownload: true
  },
  {
    id: 'writers-workshop',
    category: 'writing',
    title: "Writer's Workshop",
    duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
    schedule: '🟣 Gr. 3–6 · Sat · 1:30–3:00 PM',
    description:
      'A small-group writing workshop focused on revising, editing, and polishing writing with precision. Each student works on individual writing tasks while the teacher meets with students one-on-one throughout the session to provide personalized feedback for improvement. Perfect for learners who already write basic paragraphs and want to strengthen the quality, accuracy, and clarity of their writing.',
    features: [
      'Improve grammar, usage, and writing mechanics',
      'Apply editing (punctuation, capitalization, spelling)',
      'Strengthen clarity through purposeful revision',
      'Receive individualized 1:1 feedback during class',
      'Practice short compositions and text-based responses',
      'Weekly homework to reinforce skills'
    ],
    ctaText: 'Contact Us',
    ctaLink: '/contact'
  },
  {
    id: 'korean-beginners',
    category: 'creative',
    title: 'Korean Language for Beginners',
    duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
    schedule:
      '🟢 K–1 · Fri · 4:30–6:00 PM\n🔵 Gr. 2–3 · Wed · 2:30–4:00 PM\n🟣 Gr. 4–5 · Wed · 5:00–6:30 PM\n🟤 Gr. 6–8 · Sat · 3:30–5:00 PM\n⚫ Adult · Fri · 7:00–8:00 PM',
    description:
      'A welcoming class for both heritage and non-heritage learners to build beginner Korean reading, writing, and speaking skills. Students learn Hangul, essential grammar, and useful expressions through stories and authentic Korean media, including K-pop, short video clips, and cultural content.',
    features: [
      'Develop Hangul reading fluency and spelling patterns',
      'Learn essential grammar for accurate communication',
      'Practice speaking through routines, role-play, and guided conversation',
      'Grow vocabulary through meaningful and engaging topics',
      'Weekly homework to reinforce learning'
    ],
    ctaText: 'Download Brochure',
    ctaLink: '/assets/pdf/brochure_korean2.pdf',
    isDownload: true
  },
  {
    id: 'korean-book-club',
    category: 'creative',
    title: 'Korean Book Club (Advanced)',
    duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
    schedule:
      '🟣 Open to all advanced Korean readers · Fri · 6:30–8:00 PM\n(Students must already read and write in Korean fluently)',
    description:
      'A deep reading and discussion class offered in a full Korean immersion environment. Students explore various genres—fiction, nonfiction, informational texts, folktales, and poetry—while strengthening comprehension, vocabulary, and academic communication in Korean.',
    features: [
      'Master advanced sentence structures and grammar patterns',
      'Apply close reading strategies to understand complex texts',
      'Expand both everyday and academic vocabulary',
      'Engage in Korean-only discussions to express ideas clearly and confidently',
      'Build Korean literacy for real-world communication and academic success'
    ],
    ctaText: 'Download Brochure',
    ctaLink: '/assets/pdf/brochure_korean2.pdf',
    isDownload: true
  },
  {
    id: 'korean-events',
    category: 'creative',
    title: 'Korean Event Classes',
    duration: 'TBD',
    description: 'One-day Korean cultural and language experiences for all ages.',
    features: [
      'Themed activities such as art, read-alouds, and games',
      'Seasonal events tied to Korean holidays and traditions',
      'Hands-on, interactive learning in a fun setting'
    ],
    ctaText: 'Join Waitlist',
    ctaLink: '/contact',
    ctaStyle: { background: '#b48b5f', border: 'none' }
  }
]

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState<Category>('reading')

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const filteredPrograms = programs.filter((p) => p.category === activeFilter)

  const filters: { key: Category; label: string }[] = [
    { key: 'reading', label: 'Reading' },
    { key: 'writing', label: 'Writing' },
    { key: 'creative', label: 'Korean' },
    { key: 'tutor', label: '1:1' },
    { key: 'extend', label: 'Extended Hours' }
  ]

  return (
    <main>
      <div className="container">
        <div className="page-header">
          <h1>Our Programs</h1>
          <p style={{ textAlign: 'left' }}>
            Choose from our comprehensive range of programs in Reading, Writing, and Korean Language—each
            designed to spark curiosity, strengthen literacy, and develop critical thinking. At Dotori
            School, we blend rich content with engaging instruction to help students grow in confidence,
            communication, and a love of learning.
          </p>
        </div>

        <div className="filter-tabs">
          {filters.map((filter) => (
            <div
              key={filter.key}
              className={`filter-tab ${activeFilter === filter.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </div>
          ))}
        </div>

        <div className="programs-grid" id="programsGrid">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="program-card animate-in" data-category={program.category}>
              <h3>
                {program.title}
                {program.id === 'korean-events' && (
                  <span style={{ color: '#b48b5f', fontSize: '1rem', fontWeight: 500 }}> (Coming Soon)</span>
                )}
              </h3>
              <div className="program-duration">{program.duration}</div>
              {program.schedule && (
                <div
                  className="program-schedule"
                  style={{
                    margin: '1rem 0',
                    padding: '0.75rem',
                    background: '#f8f6f3',
                    borderRadius: '8px',
                    fontSize: '0.9rem'
                  }}
                >
                  <strong>Class Schedule</strong>
                  <br />
                  {program.schedule.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              )}
              {program.description && <div className="program-description">{program.description}</div>}
              <ul className="program-features">
                {program.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              {program.ctaText && (
                <div className="program-cta">
                  {program.isDownload ? (
                    <a
                      href={program.ctaLink}
                      className="btn btn-primary"
                      download
                      style={{ width: '100%', textAlign: 'center', ...program.ctaStyle }}
                    >
                      {program.ctaText}
                    </a>
                  ) : (
                    <Link
                      to={program.ctaLink}
                      className="btn btn-primary"
                      style={{ width: '100%', textAlign: 'center', ...program.ctaStyle }}
                    >
                      {program.ctaText}
                    </Link>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Programs
