import React from 'react';

const InsightCard = ({ metricName, insight }) => {
  if (!insight) return null;

  return (
    <div className="card insight-card" data-level={insight.level}>
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: '600' }}>
        {metricName} Insight
      </div>
      <div className="insight-headline">{insight.headline}</div>
      <div className="insight-cause">{insight.cause}</div>
      <div className="insight-action">
        <span>💡</span>
        <span>{insight.action}</span>
      </div>
    </div>
  );
};

const InsightPanel = ({ insights }) => {
  if (!insights) return null;

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Detailed Insights & Actions</h2>
      <div className="insights-container">
        <InsightCard metricName="Bug Rate" insight={insights.bugRate} />
        <InsightCard metricName="Lead Time" insight={insights.leadTime} />
        <InsightCard metricName="Cycle Time" insight={insights.cycleTime} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <InsightCard metricName="Deployment Frequency" insight={insights.deploymentFrequency} />
          <InsightCard metricName="PR Throughput" insight={insights.prThroughput} />
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
