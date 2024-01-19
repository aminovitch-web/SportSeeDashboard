import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import HeroWelcome from "../../components/Dashboard/HeroWelcome/HeroWelcome";
import DailyActivityChart from "../../components/Dashboard/DailyActivityChart/DailyActivityChart";  
import AverageSessionChart from "../../components/Dashboard/AverageSessionChart/AverageSessionChart";
import PerformanceChart from "../../components/Dashboard/PerformanceChart/PerformanceChart";
import MacroNutritionCard from "../../components/Dashboard/MacroNutritionCard/MacroNutritionCard";
import { getUserInfos } from "../../services/userServices";
import Loader from "../../components/Loader/Loader";
import "./_Dashboard.css";
import { motion } from "framer-motion";
import { fadeInAnimation } from '../../utils/animation/FadeInAnimation';


export default function Dashboard() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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

    if (!userId) {
        return <Navigate to="/error404" />;
    }

    if (error) {
        return <Navigate to="/error404" />;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (user) {
        console.log("user :", user.data.userInfos.firstName);
        return (
            <div id="dashboard_wrapper">
                <div className="dashboard_header">
                    <motion.div
                        {...fadeInAnimation}
                    >
                        <HeroWelcome
                            firstName={user.data.userInfos.firstName}
                        />
                    </motion.div>
                </div>
                <div className="dashboard_content">
                  <div className="dashboard_section_left">
                    <div className="dashboard_section_left_first">
                      <motion.div
                        {...fadeInAnimation}
                      >
                      <DailyActivityChart/>
                      </motion.div>
                    </div>
                    <div className="dashboard_section_left_second">
                      <motion.div
                      {...fadeInAnimation}
                      >
                      <AverageSessionChart/>
                      </motion.div>
                      <motion.div
                      {...fadeInAnimation}
                      >
                      <PerformanceChart/>
                      </motion.div>
                      </div>
                    </div>
                    <div className="dashboard_section_right">
                      <motion.div
                      {...fadeInAnimation}>
                       <MacroNutritionCard keyData={user.data.keyData}/>
                      </motion.div>
                      </div>
                  </div>
            </div>
        );
    }
}
