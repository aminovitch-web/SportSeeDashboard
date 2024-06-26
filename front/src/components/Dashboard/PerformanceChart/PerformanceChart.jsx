import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import "./_PerformanceChart.css"; 
import { getUserPerformance } from '../../../services/userServices'; 
import { formatUserPerformance } from '../../../services/formatUserDataServices'; 
import Loader from "../../Loader/Loader"; 

export default function PerformanceChart() {
  const { userId } = useParams(); 
  const [performanceData, setPerformanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      console.log("Aucun ID utilisateur fourni.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getUserPerformance(parseInt(userId))
      .then(data => {
        console.log("Données de performance reçues :", data); 
        const formattedData = formatUserPerformance(data); 
        console.log("Données de performance formatées :", formattedData); 
        setPerformanceData(formattedData);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des performances de l'utilisateur :", error);
        setIsLoading(false);
      });
  }, [userId]);

  console.log("État des données de performance au rendu :", performanceData);

  if (isLoading) return <Loader />;
  if (!performanceData || performanceData.length === 0) return <div>Aucune donnée de performance trouvée.</div>;

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
          tick={{ fontSize: '12px', fill: 'white' }}
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
        {/* <Legend /> */}
      </RadarChart>
    </ResponsiveContainer>
  </div>
  );
}
