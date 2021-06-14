
/**
 * 金钱格式化，三位加逗号
 * @param num 
 * @returns 
 * @example 1000
 * formatMoney(1000) //=> '1,000'
 * @example 100
 * formatMoney(100) //=> '100'
 * @example 100000
 * formatMoney(100000) //=> '100,000'
 * @example 1000000
 * formatMoney(1000000) //=> '1,000,000'
 * @example 10000.01
 * formatMoney(10000.01) //=> '10,000.01'
 * @example 10000.00
 * formatMoney(10000.00) //=> '10,000'
 */
export default function formatMoney(num: number) {
    let str = num.toString();
    if (str.indexOf('.') !== -1) {
        return str.substring(0, str.indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + str.substring(str.indexOf('.'));
    } else {
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

};
