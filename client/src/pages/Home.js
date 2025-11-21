import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const dontShow = localStorage.getItem('hideRegistrationPopup');
    if (!dontShow) {
      const timer = setTimeout(() => setShowPopup(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = (dontShowAgain = false) => {
    if (dontShowAgain) {
      localStorage.setItem('hideRegistrationPopup', 'true');
    }
    setShowPopup(false);
  };

  return (
    <div>
      {/* Registration Popup */}
      {showPopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          fontFamily: 'Arial, sans-serif'
        }}>
          <div style={{
            background: '#f8f6f3',
            padding: '30px 35px',
            borderRadius: '15px',
            maxWidth: '480px',
            width: '90%',
            textAlign: 'left',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            position: 'relative',
            lineHeight: 1.5
          }}>
            <button
              onClick={() => closePopup(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#999',
                cursor: 'pointer',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              &times;
            </button>
            <div style={{
              background: '#f8f6f3',
              padding: '20px',
              borderRadius: '10px',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: '0 0 15px 0', color: '#2c5282', fontWeight: 600 }}>
                <span style={{ fontSize: '20px' }}>❄️</span> Winter Quarter Registration
              </h2>

              <div style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <p style={{ margin: '8px 0', color: '#333' }}>
                  <strong>Returning Students</strong><br />
                  <span style={{ fontSize: '16px' }}>👉</span> Opens December 1
                </p>

                <p style={{ margin: '8px 0', color: '#333' }}>
                  <strong>New Students — Early Bird Registration</strong><br />
                  <span style={{ fontSize: '16px' }}>👉</span> December 6 – 15
                </p>

                <p style={{ margin: '8px 0', color: '#333' }}>
                  <strong>General Registration Deadline</strong><br />
                  <span style={{ fontSize: '16px' }}>👉</span> December 28
                </p>
              </div>

              <p style={{ margin: '15px 0 10px 0', color: '#d2691e', fontWeight: 600, fontSize: '15px' }}>
                Returning students receive priority placement.
              </p>

              <p style={{ margin: '5px 0 0 0', color: '#e74c3c', fontWeight: 600, fontSize: '15px' }}>
                Max 4 students per class — spots fill quickly!
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#666',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                <input
                  type="checkbox"
                  id="dontShowAgain"
                  style={{ margin: 0 }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      localStorage.setItem('hideRegistrationPopup', 'true');
                    } else {
                      localStorage.removeItem('hideRegistrationPopup');
                    }
                  }}
                />
                <span>Don't show me this again</span>
              </label>
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  background: '#6b5b47',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '25px',
                  fontWeight: 600,
                  fontSize: '16px',
                  marginRight: '10px'
                }}
              >
                Contact Us
              </Link>
              <button
                onClick={() => closePopup(false)}
                style={{
                  padding: '12px 24px',
                  background: '#e0e0e0',
                  color: '#666',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background: 'url("/assets/images/banner-bg.jpg") center/cover no-repeat',
          padding: '80px 0 40px',
          color: '#6b5b47',
          textAlign: 'center',
          marginTop: '56px'
        }}
      >
        <div className="container">
          <h1 style={{ fontSize: '2.8rem', fontWeight: '700', marginBottom: '1.2rem' }}>
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
            and Bellevue area. With classes of four students or fewer, we provide personalized guidance and
            close teacher support that help every child grow with confidence. Our program focuses on building
            strong foundations in English reading and writing, ensuring students develop the skills they need
            for long-term academic success. We also offer Korean language classes for families interested in
            meaningful cultural and heritage learning opportunities. Dotori is a great fit for families seeking
            small-group instruction, after-school enrichment, and a nurturing community that prioritizes each
            child's individual growth and potential.
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
    </div>
  );
}

export default Home;
