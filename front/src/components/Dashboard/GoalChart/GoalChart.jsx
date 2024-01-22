import './_GoalChart.css'
import { formatTodayScore } from '../../../services/formatUserDataServices';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';
import React from 'react'

export default function GoalChart({ todayScore }) {
  const data = formatTodayScore(todayScore);
  console.log("todayScore :", data);
  return (
    <div className="score_wrapper">
      <h3 className="score_title">Score</h3>
      <div className="inner-circle">
      <p className="score-text">{data[0].score} %</p>

        <p className="sub-text">de votre objectif</p>
      </div>
      <ResponsiveContainer width="100%" height={260}>
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
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar cornerRadius="10px" dataKey="score" />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
