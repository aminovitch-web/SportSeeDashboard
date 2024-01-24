import React from 'react';
import { NavLink } from 'react-router-dom';
import './_Home.css';
import DataSourceCheckbox from '../../components/Home/DataSourceCheckbox/DataSourceCheckbox';
import userIcon from '../../assets/images/userIcon.png';
import { motion } from 'framer-motion';
import { fadeInAnimation } from '../../utils/animation/FadeInAnimation';

export default function Home() {
  return (
    <>
      <div id="home">
        <div class="home_container">
        <motion.div 
        {...fadeInAnimation}
        >
        <DataSourceCheckbox />
        </motion.div>
        <motion.div
         {...fadeInAnimation}
         >
        <h1>Sélectionner un Utilisateur</h1>
        </motion.div>
        <div className="userList">
          <motion.div
          {...fadeInAnimation}
          >
          <NavLink to="/dashboard/12" className="userprofile">
            <img src={userIcon} alt="userIcon" />
            <p>Karlos</p>
          </NavLink>
          </motion.div>
          <motion.div
          {...fadeInAnimation}
          >
          <NavLink to="/dashboard/18" className="userprofile">
            <img src={userIcon} alt="userIcon" />
            <p>Cécilia</p>
          </NavLink>
          </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
