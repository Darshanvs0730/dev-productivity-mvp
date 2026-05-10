import React, { useState, useEffect } from 'react';

const ManagerView = ({ selectedMonth }) => {
  const [team, setTeam] = useState('Payments API');
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/manager?team=${encodeURIComponent(team)}&month=${selectedMonth}`)
      .then(res => res.json())
      .then(data => setSummary(data.summary))
      .catch(err => console.error(err));
  }, [team, selectedMonth]);

  return (
    <div>
      <div className="selector-container" style={{ marginTop: '2rem' }}>
        <select value={team} onChange={(e) => setTeam(e.target.value)}>
          <option value="Payments API">Payments API</option>
          <option value="Checkout Web">Checkout Web</option>
          <option value="Mobile Growth">Mobile Growth</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '1rem' }}>Developer</th>
              <th style={{ padding: '1rem' }}>Health Score</th>
              <th style={{ padding: '1rem' }}>Pattern</th>
              <th style={{ padding: '1rem' }}>Bug Rate</th>
              <th style={{ padding: '1rem' }}>Lead Time</th>
              <th style={{ padding: '1rem' }}>Cycle Time</th>
            </tr>
          </thead>
          <tbody>
            {summary.map(dev => (
              <tr key={dev.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: 600 }}>{dev.name}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{dev.level}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: dev.healthScore < 60 ? 'var(--color-critical)' : dev.healthScore < 80 ? 'var(--color-warning)' : 'var(--color-good)' 
                  }}>
                    {dev.healthScore}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{dev.pattern}</td>
                <td style={{ padding: '1rem' }}>{(dev.metrics.bugRate * 100).toFixed(0)}%</td>
                <td style={{ padding: '1rem' }}>{dev.metrics.leadTime}d</td>
                <td style={{ padding: '1rem' }}>{dev.metrics.cycleTime}d</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerView;
