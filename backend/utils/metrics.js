const {
  jiraIssues,
  pullRequests,
  ciDeployments,
  bugReports
} = require('../data/mockData');

// 1. Lead Time for Changes
// avg(lead_time_days) from Fact_CI_Deployments WHERE developer_id = X AND month_deployed = M AND status = 'success'
const calculateLeadTime = (developerId, month) => {
  const deploys = ciDeployments.filter(d => d.developer_id === developerId && d.month_deployed === month && d.status === 'success');
  if (deploys.length === 0) return 0;
  const sum = deploys.reduce((acc, curr) => acc + curr.lead_time_days, 0);
  return Number((sum / deploys.length).toFixed(2));
};

// 2. Cycle Time
// avg(cycle_time_days) from Fact_Jira_Issues WHERE developer_id = X AND month_done = M AND status = 'Done'
const calculateCycleTime = (developerId, month) => {
  const issues = jiraIssues.filter(i => i.developer_id === developerId && i.month_done === month && i.status === 'Done');
  if (issues.length === 0) return 0;
  const sum = issues.reduce((acc, curr) => acc + curr.cycle_time_days, 0);
  return Number((sum / issues.length).toFixed(2));
};

// 3. PR Throughput
// COUNT(*) from Fact_Pull_Requests WHERE developer_id = X AND month_merged = M AND status = 'merged'
const calculatePRThroughput = (developerId, month) => {
  return pullRequests.filter(pr => pr.developer_id === developerId && pr.month_merged === month && pr.status === 'merged').length;
};

// 4. Deployment Frequency
// COUNT(*) from Fact_CI_Deployments WHERE developer_id = X AND month_deployed = M AND status = 'success'
const calculateDeploymentFrequency = (developerId, month) => {
  return ciDeployments.filter(d => d.developer_id === developerId && d.month_deployed === month && d.status === 'success').length;
};

// 5. Bug Rate
// COUNT(escaped bugs in month M for dev X) / COUNT(issues done in month M for dev X)
const calculateBugRate = (developerId, month) => {
  const issuesDone = jiraIssues.filter(i => i.developer_id === developerId && i.month_done === month && i.status === 'Done').length;
  if (issuesDone === 0) return 0;
  
  const escapedBugs = bugReports.filter(b => b.developer_id === developerId && b.month_found === month && b.escaped_to_prod === 'Yes').length;
  return Number((escapedBugs / issuesDone).toFixed(2));
};

const calculateAllMetrics = (developerId, month) => {
  return {
    leadTime: calculateLeadTime(developerId, month),
    cycleTime: calculateCycleTime(developerId, month),
    prThroughput: calculatePRThroughput(developerId, month),
    deploymentFrequency: calculateDeploymentFrequency(developerId, month),
    bugRate: calculateBugRate(developerId, month)
  };
};

module.exports = {
  calculateLeadTime,
  calculateCycleTime,
  calculatePRThroughput,
  calculateDeploymentFrequency,
  calculateBugRate,
  calculateAllMetrics
};
