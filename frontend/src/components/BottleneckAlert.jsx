import React from 'react';

const BottleneckAlert = ({ bottleneck }) => {
  if (!bottleneck) return null;

  return (
    <div className="bottleneck-alert">
      <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--color-critical)' }}>
        Critical Bottleneck Detected
      </div>
      <div>{bottleneck.headline} {bottleneck.action}</div>
    </div>
  );
};

export default BottleneckAlert;
