// This file contains services for fetching user data from either mock data or a backend API

// Base URLs for mock data and backend API
const MOCK_BASE_URL = 'http://localhost:5173/src/mocksData/';
const BACK_BASE_URL = 'http://localhost:3000/user/';

/**
 * Determines the base URL based on the selected data source
 * @returns {string} The base URL for data fetching
 */
function getBaseUrl() {
    const dataSource = localStorage.getItem('dataSelection');
    const baseUrl = dataSource === 'API' ? BACK_BASE_URL : MOCK_BASE_URL;
    console.log(`Data source is: ${dataSource}, using base URL: ${baseUrl}`);
    return baseUrl;
}

/**
 * Fetches user performance data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Object>} The user's performance data
 * @throws {Error} If the fetch operation fails
 */
export async function getUserPerformance(userId) {
    const baseUrl = getBaseUrl();
    const endpoint = baseUrl === MOCK_BASE_URL ? `${userId}/userPerformanceData.json` : `${userId}/performance`;
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user performance data');
        }
        const jsonData = await response.json();
        return jsonData.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetches user average sessions data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Array>} The user's average sessions data
 * @throws {Error} If the fetch operation fails
 */
export async function getAverageSessions(userId) {
    const baseUrl = getBaseUrl();
    const endpoint = baseUrl === MOCK_BASE_URL ? `${userId}/userAverageSessions.json` : `${userId}/average-sessions`;
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user average sessions data');
        }
        const jsonData = await response.json();
        return jsonData.data.sessions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetches user information
 * @param {number} userId - The ID of the user
 * @returns {Promise<Object>} The user's information
 * @throws {Error} If the fetch operation fails
 */
export async function getUserInfos(userId) {
    const baseUrl = getBaseUrl();
    const endpoint = baseUrl === MOCK_BASE_URL ? `${userId}/userData.json` : `${userId}`;
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetches user activity data
 * @param {number} userId - The ID of the user
 * @returns {Promise<Array>} The user's activity data
 * @throws {Error} If the fetch operation fails
 */
export async function getActivity(userId) {
    const baseUrl = getBaseUrl();
    const endpoint = baseUrl === MOCK_BASE_URL ? `${userId}/userActivityData.json` : `${userId}/activity`;
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user activity data');
        }
        const jsonData = await response.json();
        return jsonData.data.sessions; 
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Fetches data for all users
 * @returns {Promise<Array>} An array of user data objects
 */
export async function getAllUsers() {
    const userIDs = [12,18];
    let usersData = [];

    for (let userID of userIDs){
        try{
            const userInfo = await getUserInfos(userID);
            usersData.push(userInfo);
        } catch (error) {
            console.error(error);
        }
    }

    return usersData;
}