/**
 * 数字超过规定大小加上加号“+”，如数字超过99显示99+
 * @param val 
 * @param maxNum 
 * @returns 
 * @example outOfNum
 * outOfNum(100,99) //=> '99+'
 * outOfNum(100,1) //=> '1+'
 * outOfNum(-100,1) //=> -100
 * outOfNum(10,99) //=> 10
 * 
 */
export default function outOfNum(val: number, maxNum: number) {
    val = val ? val - 0 : 0;
    if (val > maxNum) {
        return `${maxNum}+`
    } else {
        return val;
    }
};
