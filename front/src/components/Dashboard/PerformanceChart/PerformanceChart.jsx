// Import necessary dependencies and components
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";
import { getUserPerformance } from "../../../services/userServices";
import { formatUserPerformance } from "../../../services/formatUserDataServices";
import Loader from "../../Loader/Loader";
import "./_PerformanceChart.css";

// Define the PerformanceChart component
export default function PerformanceChart() {
  // Extract userId from URL parameters
  const { userId } = useParams(); 
  // Initialize state variables
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fontSize, setFontSize] = useState(12);

  // Effect hook to handle font size based on window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth === 1024 && window.innerHeight === 780) {
        setFontSize(8);
      } else {
        setFontSize(12);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect hook to fetch and set performance data
  useEffect(() => {
    if (!userId) {
      console.log("No user ID provided.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getUserPerformance(parseInt(userId))
      .then(data => {
        console.log("Performance data received:", data); 
        const formattedData = formatUserPerformance(data); 
        console.log("Formatted performance data:", formattedData); 
        setPerformanceData(formattedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user performance:", error);
        setIsLoading(false);
      });
  }, [userId]);

  console.log("Performance data state at render:", performanceData);

  // Render loading state or no data message if applicable
  if (isLoading) return <Loader />;
  if (!performanceData || performanceData.length === 0) return <div>No performance data found.</div>;

  // Render the performance chart
  return (
    <div className="performance_wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart outerRadius={80} data={performanceData}>
          <PolarGrid
            gridType="polygon"
            radialLines={false}
            polarRadius={[0, 16, 32, 48, 64, 80]}
          />
          <PolarAngleAxis
            dataKey="kind"
            tick={{ fontSize: fontSize, fill: 'white' }}
            axisLine={false}
          />
          <PolarRadiusAxis
            domain={[0, 200]}
            tick={false}
            stroke="transparent"
          />
          <Radar
            name="performance"
            dataKey="value"
            stroke="none"
            fill="#ff0101"
            fillOpacity={0.7}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}