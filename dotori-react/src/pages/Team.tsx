const Team = () => {
  return (
    <main className="container" style={{ maxWidth: '1200px', margin: '48px auto', paddingTop: '56px' }}>
      <h1 style={{ textAlign: 'center', color: '#6b5b47', marginBottom: '2rem' }}>Meet Our Team</h1>
      <section className="profile-container">
        <section className="profile-card">
          <img src="/assets/images/yesol_profile.jpeg" alt="Teacher Yesol" className="profile-img" />
          <h2>
            Yesol Jung
            <a
              href="https://www.linkedin.com/in/yesol-jung-ab62a22b2"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: '8px', verticalAlign: 'middle', textDecoration: 'none' }}
            >
              <i className="fa fa-linkedin-square" style={{ fontSize: '24px' }}></i>
            </a>
          </h2>
          <h2>(Mrs. Jung)</h2>
          <h3>Founder &amp; Teacher</h3>
          <ul className="profile-details">
            <li>
              <strong>Education:</strong> B.A, University of Washington; M.Ed., Seattle University
            </li>
            <li>
              <strong>Certifications:</strong> Washington State Teaching Certificates in Elementary
              Education, ELL, and Korean Language
            </li>
            <li>
              <strong>National Board Certified Teacher</strong>
            </li>
            <li>
              <strong>Experience:</strong> 10+ years in public education, teaching in 20+ schools across
              Washington State
            </li>
            <li>
              <strong>Specialty:</strong> Writing, Reading Comprehension, Bilingual Literacy
            </li>
          </ul>
          <p style={{ textAlign: 'center', margin: '1rem 0 0 0' }}>
            <a
              href="mailto:yesoljung@dotorischool.org"
              style={{ color: '#6b5b47', textDecoration: 'underline', fontSize: '0.95rem' }}
            >
              yesoljung@dotorischool.org
            </a>
          </p>
        </section>
      </section>
    </main>
  )
}

export default Team
