export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const parseDate = (date, monthNames) => {
    if (typeof date !== 'object') return {};
    const hours = date.getHours();
    const trailing = hours >= 12 ? 'pm' : 'am';
    const parsedHours = hours >= 12 ? hours - 12 : hours;
    return {
        date: `${monthNames[date.getMonth()]} ${date.getDay()}`,
        time: `${parsedHours}:${date.getMinutes()} ${trailing}`
    }
}