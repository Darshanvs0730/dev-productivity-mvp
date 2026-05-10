// Dim_Developers
const developers = [
  { id: 'DEV-001', name: 'Ava Chen', level: 'SDE2', team: 'Payments API' },
  { id: 'DEV-002', name: 'Noah Patel', level: 'SDE1', team: 'Payments API' },
  { id: 'DEV-003', name: 'Mia Lopez', level: 'SDE1', team: 'Checkout Web' },
  { id: 'DEV-004', name: 'Lucas Reed', level: 'SDE2', team: 'Checkout Web' },
  { id: 'DEV-005', name: 'Emma Roy', level: 'SDE1', team: 'Mobile Growth' },
  { id: 'DEV-006', name: 'Ishan Mehta', level: 'SDE3', team: 'Payments API' },
  { id: 'DEV-007', name: 'Owen Brooks', level: 'SDE2', team: 'Mobile Growth' },
  { id: 'DEV-008', name: 'Zara Khan', level: 'SDE1', team: 'Checkout Web' }
];

// We will construct the Fact tables dynamically to perfectly match the requested metrics.
const expectedMetrics = {
  'DEV-001': { '2026-03': { cycle: 3.95, lead: 2.40, bugs: 0 }, '2026-04': { cycle: 3.90, lead: 3.35, bugs: 0 } },
  'DEV-002': { '2026-03': { cycle: 5.90, lead: 4.30, bugs: 0 }, '2026-04': { cycle: 5.40, lead: 3.75, bugs: 1 } },
  'DEV-003': { '2026-03': { cycle: 4.05, lead: 3.85, bugs: 1 }, '2026-04': { cycle: 3.05, lead: 3.55, bugs: 0 } },
  'DEV-004': { '2026-03': { cycle: 3.85, lead: 2.10, bugs: 0 }, '2026-04': { cycle: 3.55, lead: 2.90, bugs: 0 } },
  'DEV-005': { '2026-03': { cycle: 5.95, lead: 4.95, bugs: 1 }, '2026-04': { cycle: 6.50, lead: 4.70, bugs: 0 } },
  'DEV-006': { '2026-03': { cycle: 3.75, lead: 2.35, bugs: 0 }, '2026-04': { cycle: 3.70, lead: 2.35, bugs: 1 } },
  'DEV-007': { '2026-03': { cycle: 4.55, lead: 4.30, bugs: 1 }, '2026-04': { cycle: 4.80, lead: 3.65, bugs: 0 } },
  'DEV-008': { '2026-03': { cycle: 3.80, lead: 3.15, bugs: 0 }, '2026-04': { cycle: 3.85, lead: 3.40, bugs: 1 } }
};

const jiraIssues = [];
const pullRequests = [];
const ciDeployments = [];
const bugReports = [];

let issueId = 1;
let prId = 1;
let deployId = 1;
let bugId = 1;

developers.forEach(dev => {
  ['2026-03', '2026-04'].forEach(month => {
    const metrics = expectedMetrics[dev.id][month];
    
    // Create 2 issues per month to match cycle time
    // Bug rate is bugs / issues done. If bugs = 1, Bug rate = 1/2 = 50%
    jiraIssues.push({ id: `ISS-${issueId++}`, developer_id: dev.id, month_done: month, status: 'Done', cycle_time_days: metrics.cycle });
    jiraIssues.push({ id: `ISS-${issueId++}`, developer_id: dev.id, month_done: month, status: 'Done', cycle_time_days: metrics.cycle });
    
    // Create 2 PRs per month for PR Throughput
    // Avg review wait hours can be simulated based on cycle/lead times
    pullRequests.push({ id: `PR-${prId++}`, developer_id: dev.id, month_merged: month, status: 'merged', avg_review_wait_hours: metrics.lead > 4 ? 24 : 8 });
    pullRequests.push({ id: `PR-${prId++}`, developer_id: dev.id, month_merged: month, status: 'merged', avg_review_wait_hours: metrics.lead > 4 ? 24 : 8 });
    
    // Create 2 Deployments per month for Deployment Frequency & Lead Time
    ciDeployments.push({ id: `DEP-${deployId++}`, developer_id: dev.id, month_deployed: month, status: 'success', lead_time_days: metrics.lead });
    ciDeployments.push({ id: `DEP-${deployId++}`, developer_id: dev.id, month_deployed: month, status: 'success', lead_time_days: metrics.lead });
    
    // Create Bugs if needed
    if (metrics.bugs > 0) {
      // Cause can be simulated
      const cause = metrics.cycle > 5 ? 'edge case' : 'test gap';
      bugReports.push({ id: `BUG-${bugId++}`, escaped_to_prod: 'Yes', month_found: month, root_cause: cause, severity: 'High', developer_id: dev.id });
    }
  });
});

module.exports = {
  developers,
  jiraIssues,
  pullRequests,
  ciDeployments,
  bugReports
};
