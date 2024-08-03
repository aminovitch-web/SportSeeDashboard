// This file contains utility functions for formatting user data

/**
 * Formats daily activity data
 * @param {Array} sessions - Array of daily activity sessions
 * @returns {Array} Formatted daily activity data
 */
export function formatDailyActivityData(sessions) {
    return sessions.map((session, index) => ({
        dayIndex: index + 1, 
        day: session.day || `Day ${index + 1}`, 
        kilogram: Number(session.kilogram) || 0, 
        calories: Number(session.calories) || 0, 
    }));
}

/**
 * Formats average sessions data
 * @param {Array} sessions - Array of average session data
 * @returns {Array} Formatted average sessions data
 */
export function formatAverageSessionsData(sessions) {
    const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    return sessions.map((session) => {
        const dayName = daysOfWeek[session.day - 1];
        return {
            dayName: dayName,
            sessionLength: Number(session.sessionLength) || 0,
        };
    });
}

/**
 * Formats macro nutrition value
 * @param {number} value - Macro nutrition value
 * @returns {string} Formatted macro nutrition value
 */
export function formatValueMacroNutrition(value) {
    let formattedValue = value.toString();
    if (formattedValue.length > 3) {
        formattedValue = formattedValue.slice(0, 1) + ',' + formattedValue.slice(1);
    }
    return formattedValue;
}

/**
 * Formats today's score data
 * @param {Object} userData - User data object
 * @returns {Array} Formatted score data
 */
export function formatTodayScore(userData) {
    const score = userData.todayScore !== undefined ? userData.todayScore : (userData.score !== undefined ? userData.score : 0);
    const pourcentScore = score * 100;
    const data = [{ name: 'score', score: pourcentScore, fill: '#FF0101'}];

    return data;
}

/**
 * Formats user performance data
 * @param {Object} response - Response object containing performance data
 * @returns {Array} Formatted performance data
 */
export function formatUserPerformance(response) {
    const { data: performanceData } = response;

    if (!performanceData || !Array.isArray(performanceData)) {
        console.error("Performance data is not an array:", performanceData);
        return [];
    }

    const translateKind = {
        1: 'Cardio',
        2: 'Energie',
        3: 'Endurance',
        4: 'Force',
        5: 'Vitesse',
        6: 'Intensité',
    };

    const sortedPerformanceData = performanceData.sort((a, b) => b.kind - a.kind);

    return sortedPerformanceData.map(perf => ({
        kind: translateKind[perf.kind] || 'Inconnu',
        value: perf.value,
        fullMark: 200,
    }));
}