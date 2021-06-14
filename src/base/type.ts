import isBuffer from "../node/isBuffer";
import objToStr from "../object/objToStr";

/**
 * 获取数据类型
 * @param val 
 * @param lower 转小写 @default true
 * @returns object array string undefined boolean number null nan function regexp  symbol storage location  arraybuffer buffer asyncfunction generatorfunction...
 * @example [] is array
 * type([]) //=> 'array'
 * @example {} is object
 * type({}) //=> 'object'
 * @example NaN is nan
 * type(NaN) //=> 'nan'
 * @example 111 is number
 * type(111) //=> 'number'
 * @example undefined is undefined
 * type(undefined) //=> 'undefined'
 * @example null is null
 * type(null) //=> 'null'
 * @example false is boolean
 * type(false) //=> 'boolean'
 * @example function(){} is function 
 * type(function(){}) //=> 'function'
 * @example /\d/ is regexp
 * type(/\d/) //=> 'regexp'
 * @example symbol is symbol
 * type(Symbol()) //=> 'symbol'
 */
export default function type(val: any, lower: boolean = true) {
    let ret;

    if (isBuffer(val)) ret = 'Buffer';

    if (!ret) {
        ret = objToStr(val).match(/^\[object\s+(.*?)\]$/);
        if (ret) ret = ret[1];
    }
    if (ret === 'Number' && isNaN(val)) {
        ret = 'NaN';
    }
    if (ret === 'object' && typeof val === 'boolean') {
        ret = 'boolean'
    }

    if (!ret) return '';

    return lower ? ret.toLowerCase() : ret;
};
