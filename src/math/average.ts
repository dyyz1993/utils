/**
 * 平均数
 * @param numbers 
 * @returns {number}
 */
export default function average(...numbers: number[]): number {
    return numbers.reduce((total, i) => total += i, 0) / numbers.length
};
