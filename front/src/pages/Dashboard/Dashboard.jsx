import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeroWelcome from "../../components/Dashboard/HeroWelcome/HeroWelcome";
import DailyActivityChart from "../../components/Dashboard/DailyActivityChart/DailyActivityChart";  
import AverageSessionChart from "../../components/Dashboard/AverageSessionChart/AverageSessionChart";
import PerformanceChart from "../../components/Dashboard/PerformanceChart/PerformanceChart";
import GoalChart from "../../components/Dashboard/GoalChart/GoalChart";
import MacroNutritionContainer from "../../components/Dashboard/MacroNutritionContainer/MacroNutritionContainer";
import { getUserInfos } from "../../services/userServices";
import Loader from "../../components/Loader/Loader";
import "./_Dashboard.css";
import { motion } from "framer-motion";
import { fadeInAnimation } from '../../utils/animation/FadeInAnimation';

// Main Dashboard component
export default function Dashboard() {
    // State and hooks
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Effect to fetch user data
    useEffect(() => {
        console.log("user id :", userId);
        if (!userId) {
            setError("UserId manquant");
            return;
        }

        setIsLoading(true);
        const timer = setTimeout(() => {
            getUserInfos(userId)
                .then((data) => {
                    setUser(data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError(err);
                    setIsLoading(false);
                });
        }, 1000);

        return () => clearTimeout(timer);
    }, [userId]);

    // Redirect if no userId
    if (!userId) {
        return <Navigate to="/error404" />;
    }

    // Error handling
    if (error) {
        return <Navigate to="/error404" />;
    }

    // Loading state
    if (isLoading) {
        return <Loader />;
    }

    // Render dashboard when user data is available
    if (user) {
        console.log("user :", user.data.userInfos.firstName);
        console.log("keydata :", user.data.keyData);
        
        return (
            <div id="dashboard_wrapper">
                {/* Dashboard header */}
                <div className="dashboard_header">
                    <motion.div {...fadeInAnimation}>
                        <HeroWelcome firstName={user.data.userInfos.firstName} />
                    </motion.div>
                </div>
                {/* Dashboard content */}
                <div className="dashboard_content">
                    {/* Left section */}
                    <div className="dashboard_section_left">
                        <div className="dashboard_section_left_first">
                            <motion.div {...fadeInAnimation}>
                                <DailyActivityChart/>
                            </motion.div>
                        </div>
                        <div className="dashboard_section_left_second">
                            <motion.div {...fadeInAnimation}>
                                <AverageSessionChart/>
                            </motion.div>
                            <motion.div {...fadeInAnimation}>
                                <PerformanceChart/>
                            </motion.div>
                            <GoalChart userData={user.data} />
                        </div>
                    </div>
                    {/* Right section */}
                    <div className="dashboard_section_right">
                        <MacroNutritionContainer keyData={user.data.keyData}/>
                    </div>
                </div>
            </div>
        );
    }
}