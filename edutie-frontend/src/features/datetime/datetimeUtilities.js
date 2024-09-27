
export const daysAgo = (n) => {
    let d = new Date();
    d.setDate(d.getDate() - Math.abs(n));
    return d;
};

export function getDayName(date)
{
    return date.toLocaleDateString("pl-PL", { weekday: 'long' });        
}
