const Schedule = () => {
  return (
    <section className="container" style={{ maxWidth: '900px', margin: '48px auto', paddingTop: '56px' }}>
      <h1 style={{ textAlign: 'center', color: '#6b5b47', marginBottom: '2rem' }}>Class Schedule</h1>
      <div
        style={{
          background: '#fff',
          borderRadius: '18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          padding: '2.5rem 2rem'
        }}
      >
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f5f2', color: '#6b5b47' }}>
              <th style={{ padding: '1rem' }}>Grade</th>
              <th style={{ padding: '1rem' }}>Day</th>
              <th style={{ padding: '1rem' }}>Time</th>
              <th style={{ padding: '1rem' }}>Subject</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.8rem' }}>K-1</td>
              <td style={{ padding: '0.8rem' }}>Mon, Wed</td>
              <td style={{ padding: '0.8rem' }}>3:00pm - 4:00pm</td>
              <td style={{ padding: '0.8rem' }}>Reading</td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem' }}>2-3</td>
              <td style={{ padding: '0.8rem' }}>Tue, Thu</td>
              <td style={{ padding: '0.8rem' }}>4:15pm - 5:15pm</td>
              <td style={{ padding: '0.8rem' }}>Writing</td>
            </tr>
            <tr>
              <td style={{ padding: '0.8rem' }}>4-5</td>
              <td style={{ padding: '0.8rem' }}>Fri</td>
              <td style={{ padding: '0.8rem' }}>3:00pm - 5:00pm</td>
              <td style={{ padding: '0.8rem' }}>Literacy Activities</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Schedule
