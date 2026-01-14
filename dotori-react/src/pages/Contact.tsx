import { useState, type FormEvent } from 'react'

interface StudentField {
  id: number
  name: string
}

const Contact = () => {
  const [parentFirstName, setParentFirstName] = useState('')
  const [parentLastName, setParentLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [students, setStudents] = useState<StudentField[]>([{ id: 1, name: '' }])
  const [formMessage, setFormMessage] = useState('')
  const [formMessageColor, setFormMessageColor] = useState('')

  const addStudent = () => {
    const newId = students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1
    setStudents([...students, { id: newId, name: '' }])
  }

  const removeStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id))
  }

  const updateStudentName = (id: number, name: string) => {
    setStudents(students.map((s) => (s.id === id ? { ...s, name } : s)))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormMessage('')

    const data = {
      parentFirstName,
      parentLastName,
      email,
      phone,
      message,
      newsletter,
      students: students.map((s) => s.name).filter((name) => name.trim())
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setParentFirstName('')
        setParentLastName('')
        setEmail('')
        setPhone('')
        setMessage('')
        setNewsletter(false)
        setStudents([{ id: 1, name: '' }])
        setFormMessageColor('#6b5b47')
        setFormMessage('Thank you! Your message has been sent.')
      } else {
        const responseData = await res.json()
        setFormMessageColor('red')
        setFormMessage(responseData.error || 'Failed to send message. Please try again.')
      }
    } catch {
      setFormMessageColor('red')
      setFormMessage('Network error. Please try again.')
    }
  }

  return (
    <section className="container contact-section" style={{ maxWidth: '700px', margin: '48px auto' }}>
      <div
        style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem'
        }}
      >
        <h1 style={{ textAlign: 'center', color: '#6b5b47', marginBottom: '2rem' }}>Contact Us</h1>
        <form
          id="contactForm"
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
          autoComplete="off"
        >
          {/* Parent Information */}
          <div className="contact-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="parentFirstName" style={{ color: '#6b5b47', fontWeight: 600 }}>
                Parent First Name <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <br />
              <input
                type="text"
                id="parentFirstName"
                name="parentFirstName"
                required
                value={parentFirstName}
                onChange={(e) => setParentFirstName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  marginTop: '0.3rem'
                }}
              />
            </div>
            <div>
              <label htmlFor="parentLastName" style={{ color: '#6b5b47', fontWeight: 600 }}>
                Parent Last Name <span style={{ color: '#e74c3c' }}>*</span>
              </label>
              <br />
              <input
                type="text"
                id="parentLastName"
                name="parentLastName"
                required
                value={parentLastName}
                onChange={(e) => setParentLastName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.7rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  marginTop: '0.3rem'
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" style={{ color: '#6b5b47', fontWeight: 600 }}>
              Parent Email <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginTop: '0.3rem'
              }}
            />
          </div>

          <div>
            <label htmlFor="phone" style={{ color: '#6b5b47', fontWeight: 600 }}>
              Phone Number <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            <br />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginTop: '0.3rem'
              }}
            />
          </div>

          {/* Student Information */}
          <div id="studentContainer">
            {students.map((student, index) => (
              <div key={student.id} className="student-info" style={{ marginBottom: '1rem', position: 'relative' }}>
                <div>
                  <label htmlFor={`studentFirstName${student.id}`} style={{ color: '#6b5b47', fontWeight: 600 }}>
                    Student First Name <span style={{ color: '#e74c3c' }}>*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    id={`studentFirstName${student.id}`}
                    name={`studentFirstName${student.id}`}
                    required
                    value={student.name}
                    onChange={(e) => updateStudentName(student.id, e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      marginTop: '0.3rem'
                    }}
                  />
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeStudent(student.id)}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Another Student Button */}
          <div>
            <button
              type="button"
              onClick={addStudent}
              style={{
                color: '#6b5b47',
                background: 'none',
                border: 'none',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>⊕</span> Add another student
            </button>
          </div>

          {/* Newsletter Subscription */}
          <div style={{ margin: '1rem 0' }}>
            <label
              style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#6b5b47', cursor: 'pointer' }}
            >
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                style={{ marginTop: '0.2rem' }}
              />
              <span>
                Yes, I would like to receive information about new courses, seasonal schedules, and event
                announcements from Dotori School.
              </span>
            </label>
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" style={{ color: '#6b5b47', fontWeight: 600 }}>
              Message
            </label>
            <br />
            <textarea
              id="message"
              name="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginTop: '0.3rem'
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: '0.8rem 2rem',
              borderRadius: '30px',
              background: '#d2691e',
              color: '#fff',
              fontSize: '1.1rem',
              fontWeight: 600,
              border: 'none',
              marginTop: '1rem'
            }}
          >
            SUBMIT
          </button>
        </form>

        {formMessage && (
          <div id="formMessage" style={{ marginTop: '1rem', textAlign: 'center', color: formMessageColor }}>
            {formMessage}
          </div>
        )}

        <div style={{ marginTop: '2.5rem', textAlign: 'center', color: '#888' }}>
          <p>
            <strong>Email:</strong> info@dotorischool.org
          </p>
          <p>
            <strong>Phone:</strong> (425) 405-0822 (Please leave a voice or text message)
          </p>
          <p>
            <strong>Address:</strong> 12721 NE Bel Red Rd. #220 Bellevue WA 98005
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
