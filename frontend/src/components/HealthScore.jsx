import React from 'react';

const HealthScore = ({ score, pattern }) => {
  let color = 'var(--color-good)';
  if (score < 60) color = 'var(--color-critical)';
  else if (score < 80) color = 'var(--color-warning)';

  return (
    <div className="card" style={{ marginBottom: '2rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e2e8f0" strokeWidth="10" />
          <circle 
            cx="60" cy="60" r="50" 
            fill="none" 
            stroke={color} 
            strokeWidth="10" 
            strokeDasharray={`${(score / 100) * 314} 314`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="60" textAnchor="middle" dy="10" fontSize="28" fontWeight="bold" fill="var(--text-primary)">
            {score}
          </text>
        </svg>
      </div>
      
      <div>
        <h2 style={{ margin: '0 0 0.5rem 0' }}>Health Score</h2>
        <div style={{ fontSize: '1.25rem', fontWeight: '500', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          Pattern: <strong style={{ color: 'var(--text-primary)' }}>{pattern}</strong>
        </div>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
          Score is weighted heavily by bug rate (30%) and delivery speeds (50%).
        </p>
      </div>
    </div>
  );
};

export default HealthScore;
