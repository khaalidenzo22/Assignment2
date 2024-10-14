function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    const isFriday = (date) => date.getDay() === 5;

    function getWorkingDaysExcludingFridays(year, month) {
        let workingDays = 0;
        let daysInMonth = new Date(year, month + 1, 0).getDate();
        for (let day = 1; day <= daysInMonth; day++) {
            let date = new Date(year, month, day);
            if (date.getDay() !== 0 && date.getDay() !== 6 && !isFriday(date)) {
                workingDays++;
            }
        }
        return workingDays;
    }

    function getWorkedDaysExcludingFridays(year, month, startDay, endDay) {
        let workedDays = 0;
        for (let day = startDay; day <= endDay; day++) {
            let date = new Date(year, month, day);
            if (date.getDay() !== 0 && date.getDay() !== 6 && !isFriday(date)) {
                workedDays++;
            }
        }
        return workedDays;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    let daysExcludingFridays = [];
    let daysWorkedExcludingFridays = [];
    let monthlyTargets = [];
    let totalWorkedDays = 0;
    let totalDaysExcludingFridays = 0;

    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
        let startMonth = (year === start.getFullYear()) ? start.getMonth() : 0;
        let endMonth = (year === end.getFullYear()) ? end.getMonth() : 11;

        for (let month = startMonth; month <= endMonth; month++) {
            let daysInMonth = new Date(year, month + 1, 0).getDate();

            let totalWorkingDays = getWorkingDaysExcludingFridays(year, month);
            daysExcludingFridays.push(totalWorkingDays);

            let startDay = (year === start.getFullYear() && month === start.getMonth()) ? start.getDate() : 1;
            let endDay = (year === end.getFullYear() && month === end.getMonth()) ? end.getDate() : daysInMonth;
            let workedDays = getWorkedDaysExcludingFridays(year, month, startDay, endDay);
            daysWorkedExcludingFridays.push(workedDays);

            totalWorkedDays += workedDays;
            totalDaysExcludingFridays += totalWorkingDays;
        }
    }

    for (let workedDays of daysWorkedExcludingFridays) {
        let proportion = workedDays / totalWorkedDays;
        monthlyTargets.push((totalAnnualTarget * proportion).toFixed(2)); // Precision fix
    }

    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget: parseFloat(monthlyTargets.reduce((sum, target) => sum + parseFloat(target), 0)).toFixed(2)
    };
}

console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));