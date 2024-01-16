import React from 'react';

const BASE_URL = 'http://localhost:5173/src/mocksData/';

export async function getUserPerformance(userId) {
    try {
        const response = await fetch(`${BASE_URL}${userId}/userPerformanceData.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch user performance data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAverageSessions(userId) {
    try {
        const response = await fetch(`${BASE_URL}${userId}/userAverageSessions.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch user average sessions data');
        }
        const data = await response.json();
        return data.sessions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getUserInfos(userId) {
    try {
        const response = await fetch(`${BASE_URL}${userId}/userData.json`);
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
    try {
        const response = await fetch(`${BASE_URL}${userId}/userActivityData.json`);
        if (!response.ok) {
            throw new Error('Failed to fetch user activity data');
        }
        const data = await response.json();
        return data.sessions;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
