import React from 'react';

const formatMetric = (name, value) => {
  if (name === 'Bug Rate') return `${(value * 100).toFixed(0)}%`;
  if (name.includes('Time')) return `${value} days`;
  return value;
};

const getBadgeClass = (level) => {
  if (level === 'critical') return 'badge badge-critical';
  if (level === 'warning') return 'badge badge-warning';
  return 'badge badge-good';
};

const MetricCard = ({ title, value, insight }) => {
  const level = insight ? insight.level : 'good';
  
  return (
    <div className="card metric-card">
      <div className="flex-between">
        <span className="metric-name">{title}</span>
        {insight && (
          <span className={getBadgeClass(level)}>
            {level === 'good' ? 'Healthy' : level === 'warning' ? 'Watch' : 'Action Needed'}
          </span>
        )}
      </div>
      <div className="metric-value">
        {formatMetric(title, value)}
      </div>
    </div>
  );
};

export default MetricCard;
