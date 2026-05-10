import React from 'react';

const DeveloperSelector = ({ developers, selectedDev, setSelectedDev, selectedMonth, setSelectedMonth }) => {
  if (!developers || developers.length === 0) return <div>Loading...</div>;

  return (
    <div className="selector-container">
      <select 
        value={selectedDev} 
        onChange={(e) => setSelectedDev(e.target.value)}
      >
        <option value="" disabled>Select Developer</option>
        {developers.map(dev => (
          <option key={dev.id} value={dev.id}>
            {dev.name} ({dev.level} - {dev.team})
          </option>
        ))}
      </select>

      <select 
        value={selectedMonth} 
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        <option value="2026-03">March 2026</option>
        <option value="2026-04">April 2026</option>
      </select>
    </div>
  );
};

export default DeveloperSelector;
