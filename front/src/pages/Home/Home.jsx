import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './_Home.css';
import DataSourceCheckbox from '../../components/Home/DataSourceCheckbox/DataSourceCheckbox';
import userIcon from '../../assets/images/userIcon.png';
import { motion } from 'framer-motion';
import { fadeInAnimation } from '../../utils/animation/FadeInAnimation';
import { getAllUsers } from '../../services/userServices';
import Loader from '../../components/Loader/Loader';

// Main Home component
export default function Home() {
  // State declarations
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(localStorage.getItem('dataSelection') || 'API');

  // Function to handle data source change
  const onDataSourceChange = (newDataSource) => {
    setLoading(true);
    setDataSource(newDataSource);
    localStorage.setItem('dataSelection', newDataSource);

    // Simulating API call with setTimeout
    setTimeout(async () => {
      if (newDataSource === 'API') {
        const userData = await getAllUsers();
        setUsers(userData);
      } else {
        // Mock data for non-API source
        setUsers([
          { data: { id: 12, userInfos: { firstName: "Stephane" } } },
          { data: { id: 18, userInfos: { firstName: "Olivia" } } }
        ]);
      }
      setLoading(false);
    }, 1000);
  };

  // Effect hook to load initial data
  useEffect(() => {
    onDataSourceChange(dataSource);
  }, []);

  // Component render
  return (
    <>
      <div id="home">
        <div className="home_container">
          {/* Data source selection */}
          <motion.div {...fadeInAnimation}>
            <DataSourceCheckbox onDataSourceChange={onDataSourceChange} />
          </motion.div>
          
          {/* Page title */}
          <motion.div {...fadeInAnimation}>
            <h1>Sélectionner un Utilisateur</h1>
          </motion.div>
          
          {/* User list */}
          <div className="userList">
            {loading ? (
              <Loader />
            ) : (
              users.map((user) => (
                <motion.div key={user.data.id} {...fadeInAnimation}>
                  <NavLink to={`/dashboard/${user.data.id}`} className="userprofile">
                    <img src={userIcon} alt="userIcon" />
                    <p>{user.data.userInfos.firstName}</p>
                  </NavLink>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}