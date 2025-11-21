import React from 'react';
import { Link } from 'react-router-dom';

function Programs() {
  const programs = [
    {
      title: '1:1 Tutoring',
      category: 'tutor',
      duration: 'Available on Saturdays · Flexible scheduling',
      description: '',
      features: [
        'Arrange sessions directly with Mrs. Jung to fit your schedule',
        'Personalized support in reading, writing, or homework help',
        'Tailored lessons to meet each student\'s unique needs'
      ]
    },
    {
      title: 'Dotori Lounge',
      category: 'extend',
      duration: 'Ongoing · Available for Dotori students only',
      description: 'Dotori Lounge is an open space available for students before and after their class.',
      features: [
        'Get ready for class or wind down before/after lessons',
        'Work on homework independently',
        'Play educational board games and Korean language games',
        'Read books from the Dotori Library',
        'Flexible pickup time — no rush for parents'
      ]
    },
    {
      title: 'Book Club',
      category: 'reading',
      duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
      schedule: 'K–1 · Thu · 4:00–5:00 PM | Gr. 2–3 · Mon · 5:00–6:30 PM | Gr. 4–5 · Thu · 6:30–8:00 PM',
      description: 'Strengthen core literacy skills while exploring both fiction and nonfiction stories.',
      features: [
        'Read two books (one fiction + one nonfiction) over 10 weeks',
        'Expand vocabulary and background knowledge',
        'Develop comprehension and close reading skills',
        'Practice communication through discussion and projects'
      ]
    },
    {
      title: 'Writing Workshop',
      category: 'writing',
      duration: '10 weeks · 1 class/week · 90 minutes · Max 4 students/class',
      schedule: 'Gr. 2–3 · Tue · 4:00–5:30 PM | Gr. 4–5 · Tue · 5:30–7:00 PM',
      description: 'Learn to write with purpose and creativity through structured lessons and peer feedback.',
      features: [
        'Practice different writing styles: narrative, informative, opinion',
        'Learn to organize ideas and revise work',
        'Receive feedback from peers and teacher',
        'Build confidence as a writer'
      ]
    },
    {
      title: 'Korean Language',
      category: 'korean',
      duration: '10 weeks · 1 class/week · 60 minutes · Max 4 students/class',
      schedule: 'K–1 · Wed · 4:00–5:00 PM | Gr. 2–5 · Wed · 5:00–6:00 PM',
      description: 'Learn Korean through interactive lessons, games, and cultural activities.',
      features: [
        'Build vocabulary and conversational skills',
        'Learn Hangul reading and writing',
        'Explore Korean culture and traditions',
        'Engage in fun, age-appropriate activities'
      ]
    }
  ];

  return (
    <div style={{ marginTop: '80px' }}>
      <main>
        <div className="container">
          <div className="page-header" style={{ marginBottom: '2rem' }}>
            <h1 style={{ color: '#6b5b47', textAlign: 'center', marginBottom: '1rem' }}>Our Programs</h1>
            <p style={{ textAlign: 'left', fontSize: '1.1rem', color: '#444', maxWidth: '900px', margin: '0 auto' }}>
              Choose from our comprehensive range of programs in Reading, Writing, and Korean Language—each
              designed to spark curiosity, strengthen literacy, and develop critical thinking. At Dotori
              School, we blend rich content with engaging instruction to help students grow in confidence,
              communication, and a love of learning.
            </p>
          </div>

          <div
            className="programs-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '2rem 1rem'
            }}
          >
            {programs.map((program, index) => (
              <div
                key={index}
                className="program-card"
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.1)',
                  padding: '2rem',
                  transition: 'transform 0.3s'
                }}
              >
                <h3 style={{ color: '#6b5b47', marginBottom: '0.75rem' }}>{program.title}</h3>
                <div
                  className="program-duration"
                  style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1rem' }}
                >
                  {program.duration}
                </div>
                {program.schedule && (
                  <div
                    style={{
                      margin: '1rem 0',
                      padding: '0.75rem',
                      background: '#f8f6f3',
                      borderRadius: '8px',
                      fontSize: '0.9rem'
                    }}
                  >
                    <strong>📅 Class Schedule:</strong>
                    <br />
                    {program.schedule}
                  </div>
                )}
                {program.description && (
                  <div style={{ marginBottom: '1rem', color: '#555' }}>{program.description}</div>
                )}
                <ul style={{ paddingLeft: '1.2rem', color: '#555', lineHeight: '1.7' }}>
                  {program.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                {program.category === 'tutor' && (
                  <div style={{ marginTop: '1.5rem' }}>
                    <Link
                      to="/contact"
                      style={{
                        display: 'block',
                        padding: '0.75rem',
                        background: '#6b5b47',
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600'
                      }}
                    >
                      Contact Mrs. Jung
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', margin: '3rem 0', padding: '2rem' }}>
            <h2 style={{ color: '#6b5b47', marginBottom: '1rem' }}>Ready to Enroll?</h2>
            <p style={{ marginBottom: '1.5rem', color: '#555' }}>
              Contact us to learn more about our programs and registration.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: '#6b5b47',
                color: '#fff',
                borderRadius: '25px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#f7f5f2', padding: '2rem 0', textAlign: 'center', color: '#888' }}>
        <div className="container">
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ margin: '0.3rem 0', color: '#6b5b47', fontWeight: 600 }}>
              12721 NE Bel Red Rd. #220 (2nd Floor) Bellevue WA 98005
            </p>
            <p style={{ margin: '0.3rem 0', color: '#6b5b47', fontWeight: 600 }}>
              info@dotorischool.org
            </p>
          </div>
          <p style={{ margin: 0 }}>&copy; 2025 Dotori School. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Programs;
