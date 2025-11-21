import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    message: '',
    newsletter: false,
    students: [{ firstName: '', lastName: '', grade: '' }]
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleStudentChange = (index, field, value) => {
    const newStudents = [...formData.students];
    newStudents[index][field] = value;
    setFormData({ ...formData, students: newStudents });
  };

  const addStudent = () => {
    setFormData({
      ...formData,
      students: [...formData.students, { firstName: '', lastName: '', grade: '' }]
    });
  };

  const removeStudent = (index) => {
    const newStudents = formData.students.filter((_, i) => i !== index);
    setFormData({ ...formData, students: newStudents });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/api/contact', formData);
      if (response.data.success) {
        setSuccess(true);
        setFormData({
          parentFirstName: '',
          parentLastName: '',
          email: '',
          phone: '',
          message: '',
          newsletter: false,
          students: [{ firstName: '', lastName: '', grade: '' }]
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <main>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
          <div className="page-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#6b5b47', marginBottom: '1rem' }}>Contact Us</h1>
            <p style={{ fontSize: '1.1rem', color: '#444' }}>
              We'd love to hear from you! Fill out the form below and we'll get back to you as soon as
              possible.
            </p>
          </div>

          <div
            style={{
              background: '#fff',
              borderRadius: '18px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
              padding: '2.5rem 2rem'
            }}
          >
            {success && (
              <div
                style={{
                  padding: '1rem',
                  background: '#d4edda',
                  border: '1px solid #c3e6cb',
                  borderRadius: '8px',
                  color: '#155724',
                  marginBottom: '1.5rem'
                }}
              >
                Thank you for contacting us! We'll be in touch soon.
              </div>
            )}

            {error && (
              <div
                style={{
                  padding: '1rem',
                  background: '#f8d7da',
                  border: '1px solid #f5c6cb',
                  borderRadius: '8px',
                  color: '#721c24',
                  marginBottom: '1.5rem'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <h3 style={{ color: '#6b5b47', marginBottom: '1rem' }}>Parent Information</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="parentFirstName"
                    value={formData.parentFirstName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="parentLastName"
                    value={formData.parentLastName}
                    onChange={handleChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      fontSize: '1rem'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <h3 style={{ color: '#6b5b47', marginBottom: '1rem', marginTop: '2rem' }}>Student Information</h3>

              {formData.students.map((student, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1rem',
                    background: '#f8f6f3',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ margin: 0, color: '#6b5b47' }}>Student {index + 1}</h4>
                    {formData.students.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStudent(index)}
                        style={{
                          background: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          padding: '0.5rem 1rem',
                          borderRadius: '6px',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={student.firstName}
                        onChange={(e) => handleStudentChange(index, 'firstName', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={student.lastName}
                        onChange={(e) => handleStudentChange(index, 'lastName', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontSize: '0.9rem' }}>
                        Grade *
                      </label>
                      <input
                        type="text"
                        value={student.grade}
                        onChange={(e) => handleStudentChange(index, 'grade', e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '1rem'
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addStudent}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginBottom: '1.5rem',
                  fontWeight: '600'
                }}
              >
                + Add Another Student
              </button>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#555', fontWeight: '600' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                  placeholder="Tell us about your needs, questions, or interests..."
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                  />
                  <span style={{ color: '#555' }}>Subscribe to our newsletter for updates and news</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: loading ? '#999' : '#6b5b47',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div
            style={{
              marginTop: '3rem',
              padding: '2rem',
              background: '#f8f6f3',
              borderRadius: '12px',
              textAlign: 'center'
            }}
          >
            <h3 style={{ color: '#6b5b47', marginBottom: '1rem' }}>Other Ways to Reach Us</h3>
            <p style={{ color: '#555', marginBottom: '0.5rem' }}>
              <strong>Email:</strong> info@dotorischool.org
            </p>
            <p style={{ color: '#555', marginBottom: '0.5rem' }}>
              <strong>Address:</strong> 12721 NE Bel Red Rd. #220 (2nd Floor), Bellevue WA 98005
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ background: '#f7f5f2', padding: '2rem 0', textAlign: 'center', color: '#888', marginTop: '3rem' }}>
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

export default Contact;
