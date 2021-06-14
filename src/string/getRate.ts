/**
 * 获取评分字符串
 * @param rate 
 * @param total 总数 default 5
 * @returns 
 * @example 
 * getRate(5) //=> '★★★★★'
 * getRate(5,6) //=> '★★★★★☆'
 * getRate(0) //=> '☆☆☆☆☆'
 */
export default function getRate(rate: number, total: number = 5) {
    if (rate > total) {
        throw new Error('rate 不能大于 total')
    }
    return (Array(total).fill('★').join('') + Array(total).fill('☆').join('')).slice(total - rate, 2 * total - rate)
};
