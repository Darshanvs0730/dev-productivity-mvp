const { pullRequests, bugReports } = require('../data/mockData');

// Determine the high-level pattern
const determinePattern = (metrics) => {
  if (metrics.bugRate > 0) return 'Quality watch';
  if (metrics.cycleTime > 6 && metrics.bugRate === 0) return 'Needs review';
  return 'Healthy flow';
};

// Calculate the weighted health score (0-100)
// Lower is better for cycle, lead, bug rate. Higher is better for PRs and deploys.
const calculateHealthScore = (metrics) => {
  // Normalize metrics to a 0-100 sub-score where 100 is best.
  // These thresholds are simple heuristics for the MVP.
  
  // Bug Rate: 0% = 100 points, 50%+ = 0 points (Weight 30%)
  const bugScore = Math.max(0, 100 - (metrics.bugRate * 200)); 
  
  // Lead Time: <= 2 = 100 points, >= 6 = 0 points (Weight 25%)
  const leadScore = Math.max(0, 100 - ((metrics.leadTime - 2) * 25));
  
  // Cycle Time: <= 3 = 100 points, >= 7 = 0 points (Weight 25%)
  const cycleScore = Math.max(0, Math.min(100, 100 - ((metrics.cycleTime - 3) * 25)));
  
  // Deploy Frequency: >= 4 = 100 points, 0 = 0 points (Weight 10%)
  const deployScore = Math.min(100, metrics.deploymentFrequency * 25);
  
  // PR Throughput: >= 4 = 100 points, 0 = 0 points (Weight 10%)
  const prScore = Math.min(100, metrics.prThroughput * 25);
  
  const totalScore = (bugScore * 0.30) + (leadScore * 0.25) + (cycleScore * 0.25) + (deployScore * 0.10) + (prScore * 0.10);
  
  return Math.round(totalScore);
};

// Generate Insights for each metric
const generateInsights = (developerId, month, metrics) => {
  const insights = {};

  // Bug Rate Insight
  if (metrics.bugRate > 0) {
    // Find a real cause from the data
    const bugs = bugReports.filter(b => b.developer_id === developerId && b.month_found === month);
    const rootCause = bugs.length > 0 ? bugs[0].root_cause : 'testing gap';
    
    insights.bugRate = {
      level: 'critical',
      headline: `Bug rate is high: ${(metrics.bugRate * 100).toFixed(0)}% of completed issues resulted in a bug.`,
      cause: `Data indicates the root cause is primarily a '${rootCause}'.`,
      action: `Review your testing strategy for '${rootCause}' scenarios before merging next PR.`
    };
  } else {
    insights.bugRate = {
      level: 'good',
      headline: 'Perfect quality score this month.',
      cause: 'No escaped bugs reported in production.',
      action: 'Keep up the current testing rigor.'
    };
  }

  // Lead Time Insight
  const prs = pullRequests.filter(pr => pr.developer_id === developerId && pr.month_merged === month);
  const avgReviewWait = prs.length > 0 ? prs.reduce((sum, pr) => sum + pr.avg_review_wait_hours, 0) / prs.length : 0;
  
  if (metrics.leadTime > 4) {
    insights.leadTime = {
      level: 'warning',
      headline: `Lead time is elevated at ${metrics.leadTime} days.`,
      cause: avgReviewWait > 12 ? `High review wait times (${avgReviewWait} hours) are bottlenecking delivery.` : 'Testing and deployment phases are taking longer than usual.',
      action: avgReviewWait > 12 ? 'Ask your team to prioritize PR reviews in the morning.' : 'Break down PRs into smaller, easily deployable chunks.'
    };
  } else {
    insights.leadTime = {
      level: 'good',
      headline: `Fast lead time at ${metrics.leadTime} days.`,
      cause: 'Code is moving swiftly from PR to production.',
      action: 'Maintain current PR size and review cadence.'
    };
  }

  // Cycle Time Insight
  if (metrics.cycleTime > 5) {
    insights.cycleTime = {
      level: 'warning',
      headline: `Cycle time is slow at ${metrics.cycleTime} days.`,
      cause: 'Issues might be scoped too broadly or blocked during progress.',
      action: 'Try to split tickets into smaller sub-tasks during sprint planning.'
    };
  } else {
    insights.cycleTime = {
      level: 'good',
      headline: `Efficient cycle time of ${metrics.cycleTime} days.`,
      cause: 'Work is well-scoped and moving without major blockers.',
      action: 'Continue current ticket breakdown practices.'
    };
  }

  // PR Throughput & Deploy Freq get simpler insights
  insights.prThroughput = {
    level: metrics.prThroughput >= 2 ? 'good' : 'warning',
    headline: `${metrics.prThroughput} PRs merged this month.`,
    cause: 'Reflects steady coding output.',
    action: metrics.prThroughput >= 2 ? 'Keep up the good work.' : 'Consider if you are blocked on other non-coding tasks.'
  };

  insights.deploymentFrequency = {
    level: metrics.deploymentFrequency >= 2 ? 'good' : 'warning',
    headline: `${metrics.deploymentFrequency} deployments this month.`,
    cause: 'CI/CD pipeline usage.',
    action: metrics.deploymentFrequency >= 2 ? 'Good release rhythm.' : 'Check if code is stuck waiting for a release window.'
  };

  return insights;
};

// Find the worst metric to feature as the bottleneck alert
const findBottleneck = (insights) => {
  const critical = Object.entries(insights).find(([_, data]) => data.level === 'critical');
  if (critical) return critical[1];
  
  const warning = Object.entries(insights).find(([_, data]) => data.level === 'warning');
  if (warning) return warning[1];
  
  return null; // All good
};

module.exports = {
  determinePattern,
  calculateHealthScore,
  generateInsights,
  findBottleneck
};
