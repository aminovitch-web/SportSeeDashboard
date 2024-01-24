import React, { useState, useEffect } from 'react';
import './_DataSourceCheckbox.css';

export default function DataSourceCheckbox() {
  
  const [selection, setSelection] = useState(localStorage.getItem('dataSelection') || 'API');

  
  useEffect(() => {
    localStorage.setItem('dataSelection', selection);
    
    setTimeout(() => {
      console.log("Valeur actuelle dans localStorage: ", localStorage.getItem('dataSelection'));
    }, 0);
  }, [selection]);

  
  const handleSelectionChange = (event) => {
    setSelection(event.target.value);
  };

  return (
    <div className="datasourcecheckbox">
      <label>
        <input
          type="radio"
          value="API"
          checked={selection === 'API'}
          onChange={handleSelectionChange}
        /> API
      </label>
      <label>
        <input
          type="radio"
          value="MockData"
          checked={selection === 'MockData'}
          onChange={handleSelectionChange}
        /> MockData
      </label>
      <p>La source des données sélectionnée est : {selection}</p>
    </div>
  );
}
