
const MOCK_BASE_URL = 'http://localhost:5173/src/mocksData/';
const BACK_BASE_URL = 'http://localhost:3000/user/';

function getBaseUrl() {
    const dataSource = localStorage.getItem('dataSelection');
    const baseUrl = dataSource === 'API' ? BACK_BASE_URL : MOCK_BASE_URL;
    console.log(`Data source is: ${dataSource}, using base URL: ${baseUrl}`);
    return baseUrl;
  }
  

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

