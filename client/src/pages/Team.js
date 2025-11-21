import React from 'react';

function Team() {
  const teamMembers = [
    {
      name: 'Yesol Jung',
      nickname: '(Mrs. Jung)',
      title: 'Founder & Teacher',
      image: '/assets/images/yesol_profile.jpeg',
      linkedin: 'https://www.linkedin.com/in/yesol-jung-ab62a22b2',
      details: [
        'Education: B.A, University of Washington; M.Ed., Seattle University',
        'Certifications: Washington State Teaching Certificates in Elementary Education, ELL, and Korean Language',
        'National Board Certified Teacher',
        'Experience: 10+ years in public education, teaching in 20+ schools across Washington State',
        'Specialty: Writing, Reading Comprehension, Bilingual Literacy'
      ]
    },
    {
      name: 'Stephanie Jung',
      nickname: '(Ms. Stephanie)',
      title: 'Teacher',
      image: '/assets/images/stephanie_profile.jpeg',
      details: [
        'Education: A.A., Irvine Valley College; TEFL Certificate, University of California, Irvine',
        'Certifications: TEFL Certified, OPI Trained Korean Instructor',
        'Experience: Currently teaching Korean in the SOFTS program, working with U.S. military members. Experienced in teaching children and adults through creative, student-centered lessons.',
        'Specialty: Korean Language Learning, Student Engagement'
      ]
    }
  ];

  return (
    <div style={{ marginTop: '80px' }}>
      <main className="container" style={{ maxWidth: '1200px', margin: '48px auto', padding: '2rem 1rem' }}>
        <h1 style={{ textAlign: 'center', color: '#6b5b47', marginBottom: '3rem' }}>Meet Our Team</h1>

        <section
          className="profile-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2.5rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
        >
          {teamMembers.map((member, index) => (
            <section
              key={index}
              className="profile-card"
              style={{
                background: '#fff',
                borderRadius: '18px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                padding: '2.5rem 2rem',
                textAlign: 'center'
              }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="profile-img"
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  margin: '0 auto 1.5rem',
                  display: 'block'
                }}
              />

              <h2 style={{ color: '#6b5b47', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
                {member.name}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: '8px',
                      verticalAlign: 'middle',
                      textDecoration: 'none',
                      color: '#0077b5'
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ verticalAlign: 'middle' }}
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                )}
              </h2>

              <h2 style={{ color: '#888', fontSize: '1.1rem', marginBottom: '0.5rem', fontWeight: 400 }}>
                {member.nickname}
              </h2>

              <h3 style={{ color: '#6b5b47', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>
                {member.title}
              </h3>

              <ul
                className="profile-details"
                style={{
                  listStyle: 'none',
                  padding: 0,
                  textAlign: 'left',
                  color: '#555',
                  lineHeight: '1.8'
                }}
              >
                {member.details.map((detail, idx) => (
                  <li
                    key={idx}
                    style={{
                      marginBottom: '0.75rem',
                      paddingLeft: '1rem',
                      position: 'relative'
                    }}
                  >
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '0.4rem',
                        width: '6px',
                        height: '6px',
                        background: '#6b5b47',
                        borderRadius: '50%'
                      }}
                    />
                    {detail}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </section>
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

export default Team;
