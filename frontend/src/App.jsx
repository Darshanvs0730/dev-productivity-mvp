import React, { useState, useEffect } from 'react';
import DeveloperSelector from './components/DeveloperSelector';
import HealthScore from './components/HealthScore';
import MetricCard from './components/MetricCard';
import BottleneckAlert from './components/BottleneckAlert';
import InsightPanel from './components/InsightPanel';
import ManagerView from './components/ManagerView';

function App() {
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState('DEV-002'); // Default Noah Patel
  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  const [data, setData] = useState(null);
  const [view, setView] = useState('IC'); // 'IC' or 'Manager'

  // Fetch developers list
  useEffect(() => {
    fetch('http://localhost:3001/api/developers')
      .then(res => res.json())
      .then(data => setDevelopers(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch individual metrics
  useEffect(() => {
    if (selectedDev && selectedMonth && view === 'IC') {
      fetch(`http://localhost:3001/api/metrics?developer_id=${selectedDev}&month=${selectedMonth}`)
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.error(err));
    }
  }, [selectedDev, selectedMonth, view]);

  return (
    <div className="app-container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ margin: 0, color: 'var(--color-brand)' }}>DevPulse</h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>Developer Productivity Insight Engine</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              border: 'none', 
              cursor: 'pointer',
              background: view === 'IC' ? 'var(--color-brand)' : 'var(--border-color)',
              color: view === 'IC' ? 'white' : 'var(--text-primary)'
            }}
            onClick={() => setView('IC')}
          >
            IC View
          </button>
          <button 
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '0.25rem', 
              border: 'none', 
              cursor: 'pointer',
              background: view === 'Manager' ? 'var(--color-brand)' : 'var(--border-color)',
              color: view === 'Manager' ? 'white' : 'var(--text-primary)'
            }}
            onClick={() => setView('Manager')}
          >
            Manager View
          </button>
        </div>
      </header>

      {view === 'IC' ? (
        <>
          <DeveloperSelector 
            developers={developers} 
            selectedDev={selectedDev} 
            setSelectedDev={setSelectedDev}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />

          {data ? (
            <>
              <HealthScore score={data.healthScore} pattern={data.pattern} />
              <BottleneckAlert bottleneck={data.bottleneck} />
              
              <div className="metrics-grid">
                <MetricCard title="Bug Rate" value={data.metrics.bugRate} insight={data.insights.bugRate} />
                <MetricCard title="Lead Time" value={data.metrics.leadTime} insight={data.insights.leadTime} />
                <MetricCard title="Cycle Time" value={data.metrics.cycleTime} insight={data.insights.cycleTime} />
                <MetricCard title="PR Throughput" value={data.metrics.prThroughput} insight={data.insights.prThroughput} />
                <MetricCard title="Deployment Frequency" value={data.metrics.deploymentFrequency} insight={data.insights.deploymentFrequency} />
              </div>

              <InsightPanel insights={data.insights} />
            </>
          ) : (
            <div>Loading insights...</div>
          )}
        </>
      ) : (
        <ManagerView selectedMonth={selectedMonth} />
      )}
    </div>
  );
}

export default App;
