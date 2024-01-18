export function formatDailyActivityData(sessions) {
    return sessions.map((session, index) => ({
        dayIndex: index + 1, 
        day: session.day || `Day ${index + 1}`, 
        kilogram: Number(session.kilogram) || 0, 
        calories: Number(session.calories) || 0, 
    }));
}

