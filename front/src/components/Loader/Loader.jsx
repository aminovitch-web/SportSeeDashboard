// Import React and the associated CSS file
import React from 'react'
import './_Loader.css'

// Define and export the Loader component
export default function Loader() {
  return (
    // Container for the loader
    <div className="container">
      {/* Individual balls for the loading animation */}
      <div className="ball ball1"></div>
      <div className="ball ball2"></div>
      <div className="ball ball3"></div>
      <div className="ball ball4"></div>
    </div>
  )
}