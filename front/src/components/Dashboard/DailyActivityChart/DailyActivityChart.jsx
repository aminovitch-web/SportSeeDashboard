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
import Loader from "../../Loader/Loader";

export default function DailyActivityChart() {
    const { userId } = useParams();
    const [userActivity, setUserActivity] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userId) {
            console.log("Aucun ID utilisateur fourni.");
            setIsLoading(false);
            return;
        }

        getActivity(parseInt(userId))
            .then((sessions) => {
                console.log("Sessions d'activité récupérées :", sessions);
                setUserActivity(sessions);
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

    const formattedData = userActivity.map((session) => ({
        day: session.day,
        kilogram: session.kilogram,
        calories: session.calories,
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart
                data={formattedData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Bar
                    yAxisId="left"
                    dataKey="kilogram"
                    fill="#8884d8"
                    name="Poids (kg)"
                />
                <Bar
                    yAxisId="right"
                    dataKey="calories"
                    fill="#82ca9d"
                    name="Calories brûlées"
                />
            </BarChart>
        </ResponsiveContainer>
    );
}
