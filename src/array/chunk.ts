/**
 * 平分数组元素
 * @param arr 
 * @param size 
 * @returns {array[][]}
 */
export default function chunk<T>(arr: T[], size: number = 1): T[][] {
    const ret: T[][] = [];

    size = size || 1;

    for (let i = 0, len = Math.ceil(arr.length / size); i < len; i++) {
        const start = i * size;
        const end = start + size;

        ret.push(arr.slice(start, end));
    }

    return ret;
};
