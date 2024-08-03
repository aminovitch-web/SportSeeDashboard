// Import necessary dependencies and components
import "./_AverageSessionChart.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Line,
    LineChart,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { getAverageSessions } from "../../../services/userServices";
import { formatAverageSessionsData } from "../../../services/formatUserDataServices";
import Loader from "../../Loader/Loader";
import CustomCursor from "../../CustomCursor/CustomCursor";

// Define the AverageSessionChart component
export default function _AverageSessionChart() {
    // Initialize state variables
    const { userId } = useParams();
    const [userActivity, setUserActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [chartSize, setChartSize] = useState(260);

    // Effect hook to handle chart size based on window dimensions
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth === 1024 && window.innerHeight === 780) {
                setChartSize(200);
            } else {
                setChartSize(260);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Effect hook to fetch and process user activity data
    useEffect(() => {
        if (!userId) {
            console.log("Aucun ID utilisateur fourni.");
            setIsLoading(false);
            return;
        }

        getAverageSessions(parseInt(userId))
            .then((sessions) => {
                console.log(
                    "Sessions d'activité moyenne (avg) récupérées :",
                    sessions
                );
                const formattedData = formatAverageSessionsData(sessions);
                setUserActivity(formattedData);
                console.log(
                    "Données d'activité moyenne (avg) formatées :",
                    formattedData
                );
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

    // Render loading state
    if (isLoading) {
        return <Loader />;
    }

    // Render message if no user activity found
    if (!userActivity || userActivity.length === 0) {
        return (
            <div>
                Aucune activité utilisateur trouvée ou utilisateur sans sessions
                d'activité.
            </div>
        );
    }

    // Render the average session chart
    return (
        <div className="session_wrapper">
            <p className="session_title">durée moyenne des sessions</p>
            <ResponsiveContainer width="100%" height={chartSize}>
                <LineChart
                    width={230}
                    height={chartSize}
                    data={userActivity}
                    margin={{ top: chartSize * 0.3, right: 20, bottom: 0, left: 20 }}
                >
                    {/* Configure XAxis */}
                    <XAxis
                        dataKey="dayName"
                        stroke="#FF8181"
                        axisLine={false}
                        tickLine={false}
                    />
                    {/* Configure YAxis */}
                    <YAxis
                        hide={true}
                        domain={[
                            (dataMin) => Math.floor(dataMin * 0.6),
                            (dataMax) => Math.ceil(dataMax * 1.4),
                        ]}
                    />

                    {/* Configure Tooltip */}
                    <Tooltip
                        cursor={<CustomCursor />}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                    <div
                                        className="custom-tooltip"
                                        style={{
                                            color: "black",
                                            backgroundColor: "white",
                                            padding: "5px",
                                            fontSize: "8px",
                                            width: "39px",
                                            height: "25px",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p>{`${data.sessionLength} min`}</p>
                                    </div>
                                );
                            }

                            return null;
                        }}
                        labelFormatter={() => ""}
                    />
                    {/* Configure Line */}
                    <Line
                        type="natural"
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