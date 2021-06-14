/**
 * 是否为闰年
 * @param year 年
 */
export default function isLeapYear(year: number) {
    if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) {
        return true
    }
    return false;
};
