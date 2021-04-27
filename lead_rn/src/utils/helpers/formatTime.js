export const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * parse a date with a defined format to be rendered on screen
 * @param  {Date} date
 * @param  {array} monthNames
 */
export const parseDate = (myDate, monthNames) => {
    let date = myDate;
    if (typeof myDate === 'string') date = new Date(myDate);
    if (typeof date !== 'object') return {};
    const hours = date.getHours();
    const trailing = hours >= 12 ? 'pm' : 'am';
    const parsedHours = hours >= 12 ? hours - 12 : hours;
    return {
        date: `${monthNames[date.getMonth()]} ${date.getDay()}`,
        time: `${parsedHours}:${date.getMinutes()} ${trailing}`
    }
}