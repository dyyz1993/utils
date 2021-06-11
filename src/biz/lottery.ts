
const RATE = Symbol("RATE");
const START = Symbol("START");
const END = Symbol("END");

export interface IGift extends Record<string | symbol, any> {
    [RATE]: number;
    [START]: number;
    [END]: number;
}
export interface IOptions {
    rateKey: string,
    countKey: string,
    isFilterEmpty: boolean
}
/**
 * 根据分子抽奖
 * @param gifts 奖品的数组
 * @param options 
 * @param options.rateKey  奖品概率key 默认 rate
 * @param options.countKey  奖品剩余数量key  默认 count
 * @param options.isFilterEmpty  是否过滤剩余数量为0的奖品 默认 false
 * @returns { null | gift }
 */
export default function lottery<T extends Record<string, any>>(gifts: T[], options: Partial<IOptions> = {}): T | null {
    const _options: IOptions = Object.assign({
        rateKey: "rate",
        countKey: 'count',
        isFilterEmpty: false,
    }, options)
    let total = 0;
    const arr: Array<IGift & T> = gifts.reduce((arr: Array<IGift & T>, gift) => {
        // 过滤没有数量的奖品
        if (!(gift[_options.countKey] === 0 && _options.isFilterEmpty)) {
            const newGift: IGift & T = Object.assign({ [START]: total, [RATE]: gift[_options.rateKey], [END]: total }, gift);
            total += gift[_options.rateKey];
            newGift[END] = total;
            return arr.concat(newGift);
        }
        return arr;
    }, [])
    const random = Math.random() * total;
    for (const gift of arr) {
        if (gift[START] <= random && gift[END] > random) {
            return gift as T;
        }
    }
    return null;
}