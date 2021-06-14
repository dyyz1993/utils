/**
 * 验证火车车次
 * @param { string } value
 * @example 
 * isTrainNum('G44') //=> true
 */
export const isTrainNum = (value: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value);


/**
 * 验证火车车次
 * @param { string } value
 * @example 
 * isTrainNum2('G44') //=> true
 */
export const isTrainNum2 = (value: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/g.test(value);