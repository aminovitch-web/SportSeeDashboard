import React, { useState, useEffect } from 'react';
import './_DataSourceCheckbox.css';

// Component for selecting data source (API or MockData)
export default function DataSourceCheckbox({ onDataSourceChange }) {
  // State to store the selected data source
  const [selection, setSelection] = useState(localStorage.getItem('dataSelection') || 'API');

  // Effect to update localStorage when selection changes
  useEffect(() => {
    localStorage.setItem('dataSelection', selection);
    
    // Log the current value in localStorage (with a small delay)
    setTimeout(() => {
      console.log("Valeur actuelle dans localStorage: ", localStorage.getItem('dataSelection'));
    }, 0);
  }, [selection]);

  // Handler for selection change
  const handleSelectionChange = (event) => {
    const newSelection = event.target.value;
    setSelection(newSelection);
    onDataSourceChange(newSelection);
  };

  // Render the component
  return (
    <div className="datasourcecheckbox">
      {/* Radio button for API selection */}
      <label>
        <input
          type="radio"
          value="API"
          checked={selection === 'API'}
          onChange={handleSelectionChange}
        /> API
      </label>
      {/* Radio button for MockData selection */}
      <label>
        <input
          type="radio"
          value="MockData"
          checked={selection === 'MockData'}
          onChange={handleSelectionChange}
        /> MockData
      </label>
      {/* Display the currently selected data source */}
      <p>La source des données sélectionnée est : {selection}</p>
    </div>
  );
}