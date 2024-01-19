import "./_AverageSessionChart.css"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Line,
  LineChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAverageSessions } from '../../../services/userServices';
import { formatAverageSessionsData } from '../../../services/formatUserDataServices';
import Loader from "../../Loader/Loader";
import CustomCursor from '../../CustomCursor/CustomCursor';
let formattedData;

export default function _AverageSessionChart(){
  const { userId } = useParams();
  const [userActivity, setUserActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
        console.log("Aucun ID utilisateur fourni.");
        setIsLoading(false);
        return;
    }

    getAverageSessions(parseInt(userId))
        .then((sessions) => {
            console.log("Sessions d'activité moyenne (avg) récupérées :", sessions);
            formattedData = formatAverageSessionsData(sessions);
            setUserActivity(formattedData);
            console.log("Données d'activité moyenne (avg) formatées :", formattedData);
            setIsLoading(false);
        })
        .catch((error) => {
            console.error(
                "Erreur lors de la récupération des données d'activité :",
                error
            );
            setIsLoading(false);
        });
}, [userId]);

if (isLoading) {
    return <Loader />;
}

if (!userActivity || userActivity.length === 0) {
    return (
        <div>
            Aucune activité utilisateur trouvée ou utilisateur sans sessions
            d'activité.
        </div>
    );
}
return (
<div className="session_wrapper">
  <p className="session_title">durée moyenne des sessions</p>
  <ResponsiveContainer width="100%" height={260}>
        <LineChart
          width={230}
          height={250}
          data={formattedData}
          margin={{ top: 80, right: 20, bottom: 0, left: 20 }}
        >
          <XAxis
            dataKey="dayName"
            stroke="#FF8181"
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide={true} domain={['dataMin', 'dataMax']} />
          <Tooltip
            cursor={<CustomCursor />}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div
                    className="custom-tooltip"
                    style={{
                      color: 'black',
                      backgroundColor: 'white',
                      padding: '5px',
                      fontSize: '8px',
                      width: '39px',
                      height: '25px',
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <p>{`${data.sessionLength} min`}</p>
                  </div>
                );
              }

              return null;
            }}
            labelFormatter={() => ''}
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="white"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
</div>
);


}