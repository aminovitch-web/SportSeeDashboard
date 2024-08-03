// Import necessary styles and dependencies
import './_GoalChart.css'
import { formatTodayScore } from '../../../services/formatUserDataServices';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import React from 'react'

// Define the GoalChart component
export default function GoalChart({ userData }) {
  // Format the user data for the chart
  const data = formatTodayScore(userData);
  console.log("Score formaté :", data);
  
  // Render the component
  return (
    <div className="score_wrapper">
      {/* Chart title */}
      <h3 className="score_title">Score</h3>

      {/* Inner circle with score display */}
      <div className="inner-circle">
        <p className="score-text">{data[0].score.toFixed(0)}%</p>
        <p className="sub-text">de votre objectif</p>
      </div>

      {/* Responsive container for the chart */}
      <ResponsiveContainer width="100%" height={260}>
        {/* Radial bar chart configuration */}
        <RadialBarChart
          width={260}
          height={260}
          innerRadius={80}
          outerRadius={110}
          data={data}
          startAngle={180}
          endAngle={-180}
          barSize={10}
        >
          {/* Polar angle axis configuration */}
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          {/* Radial bar configuration */}
          <RadialBar cornerRadius="10px" dataKey="score" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}