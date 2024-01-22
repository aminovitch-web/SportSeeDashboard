export function formatDailyActivityData(sessions) {
    return sessions.map((session, index) => ({
        dayIndex: index + 1, 
        day: session.day || `Day ${index + 1}`, 
        kilogram: Number(session.kilogram) || 0, 
        calories: Number(session.calories) || 0, 
    }));
}

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

export function formatValueMacroNutrition(value) {
    let formattedValue = value.toString();
    if (formattedValue.length > 3) {
        formattedValue = formattedValue.slice(0, 1) + ',' + formattedValue.slice(1);
    }
    return formattedValue;
}
