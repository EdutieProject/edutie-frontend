
export const daysAgo = (n: number) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
};

export function getDayName(date: Date)
{
    return date.toLocaleDateString("pl-PL", { weekday: 'long' });
}
