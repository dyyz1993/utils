export default function countValues(arr: string[]): { [key: string]: number } {
    let obj: { [key: string]: number } = {}
    arr.forEach((value) => {
        obj[value] === undefined ? obj[value] = 1 : obj[value]++;
    })
    return obj;
};
