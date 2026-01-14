import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: "url('/assets/images/banner-bg.jpg') center/cover no-repeat",
          padding: '80px 0 40px',
          color: '#6b5b47',
          textAlign: 'center',
          marginTop: '56px'
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.8rem', fontWeight: 700, marginBottom: '1.2rem' }}>
            Welcome to Dotori School
          </h1>
          <img
            src="/assets/images/hero-image.png"
            alt="Dotori School"
            style={{ maxWidth: '70%', height: 'auto', borderRadius: '10px', marginBottom: '1.5rem' }}
          />
          <p style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>
            <strong>Small seeds. Big growth. Endless connections.</strong>
          </p>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
            <em>Where every student is seen, supported, and encouraged to thrive together.</em>
          </p>
          <Link
            to="/programs"
            className="btn btn-primary"
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '30px',
              background: '#6b5b47',
              color: '#fff',
              textDecoration: 'none'
            }}
          >
            Explore Programs
          </Link>
        </div>
      </section>

      {/* School Introduction */}
      <section className="container" style={{ maxWidth: '900px', margin: '48px auto' }}>
        <div
          style={{
            background: '#fff',
            borderRadius: '18px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
            padding: '2.5rem 2rem'
          }}
        >
          <h2 style={{ color: '#6b5b47', marginBottom: '1rem', textAlign: 'center' }}>About Dotori</h2>
          <p style={{ fontSize: '1.15rem', color: '#444', marginBottom: '1.5rem', textAlign: 'left' }}>
            Dotori (도토리)—Korean for "acorn"—is an in-person afterschool program located in the Redmond
            and Bellevue area.
            <br /><br />
            With classes of four students or fewer, we provide personalized guidance and close teacher
            support that help every child grow with confidence.
            <br /><br />
            Our program focuses on building strong foundations in English reading and writing, ensuring
            students develop the skills they need for long-term academic success. We also offer Korean
            language classes for families interested in meaningful cultural and heritage learning
            opportunities.
            <br /><br />
            Dotori is a great fit for families seeking small-group instruction, after-school enrichment,
            and a nurturing community that prioritizes each child's individual growth and potential.
          </p>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link
              to="/about"
              className="btn btn-secondary"
              style={{
                padding: '0.6rem 1.5rem',
                borderRadius: '24px',
                background: '#f7f5f2',
                color: '#6b5b47',
                textDecoration: 'none',
                textAlign: 'center'
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="container" style={{ maxWidth: '900px', margin: '48px auto', textAlign: 'center' }}>
        <h2 style={{ color: '#6b5b47', marginBottom: '1rem', textAlign: 'center' }}>
          Follow Us on Instagram
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink="https://www.instagram.com/dotori.school_yesol/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            borderRadius: '3px',
            boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
            margin: '1px auto',
            maxWidth: '540px',
            minWidth: '326px',
            padding: 0,
            width: '99.375%'
          }}
        >
          <div style={{ padding: '16px' }}>
            <a
              href="https://www.instagram.com/dotori.school_yesol/?utm_source=ig_embed&amp;utm_campaign=loading"
              style={{
                background: '#FFFFFF',
                lineHeight: 0,
                padding: '0 0',
                textAlign: 'center',
                textDecoration: 'none',
                width: '100%'
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: '#F4F4F4',
                    borderRadius: '50%',
                    flexGrow: 0,
                    height: '40px',
                    marginRight: '14px',
                    width: '40px'
                  }}
                ></div>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                  <div
                    style={{
                      backgroundColor: '#F4F4F4',
                      borderRadius: '4px',
                      flexGrow: 0,
                      height: '14px',
                      marginBottom: '6px',
                      width: '100px'
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: '#F4F4F4',
                      borderRadius: '4px',
                      flexGrow: 0,
                      height: '14px',
                      width: '60px'
                    }}
                  ></div>
                </div>
              </div>
              <div style={{ paddingTop: '8px' }}>
                <div
                  style={{
                    color: '#3897f0',
                    fontFamily: 'Arial,sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 550,
                    lineHeight: '18px'
                  }}
                >
                  View this profile on Instagram
                </div>
              </div>
            </a>
            <p
              style={{
                color: '#c9c8cd',
                fontFamily: 'Arial,sans-serif',
                fontSize: '14px',
                lineHeight: '17px',
                marginBottom: 0,
                marginTop: '8px',
                overflow: 'hidden',
                padding: '8px 0 7px',
                textAlign: 'center',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              <a
                href="https://www.instagram.com/dotori.school_yesol/?utm_source=ig_embed&amp;utm_campaign=loading"
                style={{
                  color: '#c9c8cd',
                  fontFamily: 'Arial,sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  lineHeight: '17px'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Yesol Jung | Dotori School
              </a>{' '}
              (@
              <a
                href="https://www.instagram.com/dotori.school_yesol/?utm_source=ig_embed&amp;utm_campaign=loading"
                style={{
                  color: '#c9c8cd',
                  fontFamily: 'Arial,sans-serif',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  lineHeight: '17px'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                dotori.school_yesol
              </a>
              ) - Instagram photos and videos
            </p>
          </div>
        </blockquote>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container" style={{ maxWidth: '900px', margin: '48px auto' }}>
        <div
          style={{
            background: '#6b5b47',
            color: '#fff',
            borderRadius: '18px',
            padding: '2.5rem 2rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ marginBottom: '1rem' }}>Ready to Get Started?</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            Contact us to schedule a visit or enroll your child in Dotori School!
          </p>
          <Link
            to="/contact"
            className="btn btn-primary"
            style={{
              padding: '0.8rem 2rem',
              fontSize: '1.1rem',
              borderRadius: '30px',
              background: '#fff',
              color: '#6b5b47',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
