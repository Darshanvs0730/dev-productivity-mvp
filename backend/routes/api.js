const express = require('express');
const router = express.Router();

const { developers } = require('../data/mockData');
const { calculateAllMetrics } = require('../utils/metrics');
const { determinePattern, calculateHealthScore, generateInsights, findBottleneck } = require('../utils/insights');

// GET /api/developers -> For the dropdown selector
router.get('/developers', (req, res) => {
  res.json(developers);
});

// GET /api/metrics?developer_id=DEV-002&month=2026-04
router.get('/metrics', (req, res) => {
  const { developer_id, month } = req.query;
  
  if (!developer_id || !month) {
    return res.status(400).json({ error: 'developer_id and month are required' });
  }

  const dev = developers.find(d => d.id === developer_id);
  if (!dev) {
    return res.status(404).json({ error: 'Developer not found' });
  }

  const metrics = calculateAllMetrics(developer_id, month);
  
  // To show trend delta (month-over-month), calculate previous month's metrics
  // For MVP, if month is 04, prev is 03.
  let prevMetrics = null;
  if (month === '2026-04') {
    prevMetrics = calculateAllMetrics(developer_id, '2026-03');
  }

  const pattern = determinePattern(metrics);
  const healthScore = calculateHealthScore(metrics);
  const insights = generateInsights(developer_id, month, metrics);
  const bottleneck = findBottleneck(insights);

  res.json({
    developer: dev,
    month,
    metrics,
    prevMetrics,
    pattern,
    healthScore,
    insights,
    bottleneck
  });
});

// GET /api/manager?team=Payments API&month=2026-04
router.get('/manager', (req, res) => {
  const { team, month } = req.query;
  
  if (!team || !month) {
    return res.status(400).json({ error: 'team and month are required' });
  }

  const teamDevs = developers.filter(d => d.team === team);
  
  const teamSummary = teamDevs.map(dev => {
    const metrics = calculateAllMetrics(dev.id, month);
    const pattern = determinePattern(metrics);
    const healthScore = calculateHealthScore(metrics);
    
    return {
      id: dev.id,
      name: dev.name,
      level: dev.level,
      metrics,
      pattern,
      healthScore
    };
  });

  res.json({ team, month, summary: teamSummary });
});

module.exports = router;
