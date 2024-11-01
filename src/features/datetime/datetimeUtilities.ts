
export const daysAgo = (n: number) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
};

export function getDayName(date: Date)
{
    return date.toLocaleDateString("pl-PL", { weekday: 'long' });
}

export function isItSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export function isDateWithinLast3Minutes(date: Date): boolean {
    const threeMinutesAgo = new Date(new Date().getTime() - 3 * 60 * 1000); // 3 minutes in milliseconds
    return date >= threeMinutesAgo;
}