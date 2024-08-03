// Import necessary dependencies and styles
import "./_DailyActivityChart.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { getActivity } from "../../../services/userServices";
import { formatDailyActivityData } from "../../../services/formatUserDataServices";
import Loader from "../../Loader/Loader";

// Variable to store formatted data
let formattedData;

// Main component: DailyActivityChart
export default function DailyActivityChart() {
    // Extract userId from URL parameters
    const { userId } = useParams();
    // State variables
    const [userActivity, setUserActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Effect hook to fetch and process user activity data
    useEffect(() => {
        if (!userId) {
            console.log("No user ID provided.");
            setIsLoading(false);
            return;
        }

        getActivity(parseInt(userId))
            .then((sessions) => {
                console.log("Activity sessions retrieved:", sessions);
                formattedData = formatDailyActivityData(sessions);
                setUserActivity(formattedData);
                console.log("Formatted activity data:", formattedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(
                    "Error retrieving activity data:",
                    error
                );
                setIsLoading(false);
            });
    }, [userId]);

    // Display loader while data is being fetched
    if (isLoading) {
        return <Loader />;
    }

    // Display message if no user activity data is found
    if (!userActivity || userActivity.length === 0) {
        return (
            <div>
                No user activity found or user without activity sessions.
            </div>
        );
    }

    // Render the daily activity chart
    return (
        <div className="activity_wrapper">
            <p className="title_charts">Daily Activity</p>
            <ResponsiveContainer width="100%" height={255}>
                <BarChart
                    data={formattedData}
                    margin={{ top: 5, right: 30, left: 30, bottom: 0 }}
                    barGap={7}
                >
                    {/* CartesianGrid configuration */}
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={true}
                        vertical={false}
                        horizontalCoordinatesGenerator={({ height }) => {
                            const topAndBottomMargin = 30;
                            const usableHeight = height - 2 * topAndBottomMargin;
                            const lineSpacing = usableHeight / 3;
                            return [
                                topAndBottomMargin + lineSpacing,
                                topAndBottomMargin + lineSpacing * 2,
                                topAndBottomMargin + lineSpacing * 3,
                            ];
                        }}
                    />
                    
                    {/* X-axis configuration */}
                    <XAxis
                        dataKey="dayIndex"
                        interval={0}
                        stroke="#9B9EAC"
                        padding={{ left: 11, right: 11 }}
                        tickLine={false}
                        tickMargin={10}
                        axisLine={{ stroke: '#d5d5d5' }}
                        scale="point"
                    >
                        {' '}
                    </XAxis>
                    
                    {/* Y-axes configuration */}
                    <YAxis yAxisId="left" orientation="left" hide={true} />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        tickCount={3}
                        interval="preserveStartEnd"
                        type="number"
                        domain={['dataMin - 2', 'dataMax + 1']}
                        stroke="#9B9EAC"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={30}
                    />
                    
                    {/* Tooltip configuration */}
                    <Tooltip
                        content={({ active, payload }) => {
                            if (active && payload) {
                                return (
                                    <div
                                        className="custom-tooltip"
                                        style={{
                                            color: '#fff',
                                            backgroundColor: '#FF0101',
                                            padding: '10px',
                                            fontSize: '7px',
                                            width: '39px',
                                            height: '63px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {payload.map((entry, index) => (
                                            <p key={index}>
                                                {entry.name === 'Weight (kg)'
                                                    ? `${entry.value}kg`
                                                    : `${entry.value}Kcal`}
                                            </p>
                                        ))}
                                    </div>
                                );
                            }
            
                            return null;
                        }}
                        labelFormatter={() => ''}
                    />
                    
                    {/* Legend configuration */}
                    <Legend
                        verticalAlign="top"
                        align="right"
                        content={({ payload }) => {
                            if (payload) {
                                return (
                                    <ul
                                        style={{
                                            listStyle: 'none',
                                            margin: 0,
                                            padding: 0,
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            gap: '10px',
                                        }}
                                    >
                                        {payload.map((entry, index) => (
                                            <li
                                                key={`item-${index}`}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    marginBottom: 5,
                                                }}
                                            >
                                                <svg
                                                    width="10"
                                                    height="10"
                                                    style={{ marginRight: 5, paddingTop: 1 }}
                                                >
                                                    <circle cx="4" cy="4" r="4" fill={entry.color} />
                                                </svg>
                                                <span style={{ color: '#74798c' }}>{entry.value}</span>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }
                        }}
                        wrapperStyle={{
                            paddingTop: '25px',
                            paddingBottom: '30px',
                            height: '90px',
                        }}
                    />
                    
                    {/* Bar configurations */}
                    <Bar
                        yAxisId="right"
                        dataKey="kilogram"
                        barSize={7}
                        name="Weight (kg)"
                        fill="#000"
                        radius={[10, 10, 0, 0]}
                    />
                    <Bar
                        yAxisId="left"
                        dataKey="calories"
                        name="Calories Burned"
                        barSize={7}
                        fill="#FF0101"
                        radius={[10, 10, 0, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}