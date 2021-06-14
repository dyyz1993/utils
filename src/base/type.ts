import isBuffer from "../node/isBuffer";
import objToStr from "../object/objToStr";

/**
 * 获取数据类型
 * @param val 
 * @param lower 转小写 @default true
 * @returns object array string undefined bool number null function storage location nan arraybuffer buffer asyncfunction generatorfunction...
 */
export default function type(val: any, lower: boolean = true) {
    let ret;
    if (isNaN(val)) ret = 'NaN';
    if (isBuffer(val)) ret = 'Buffer';

    if (!ret) {
        ret = objToStr(val).match(/^\[object\s+(.*?)\]$/);
        if (ret) ret = ret[1];
    }

    if (!ret) return '';

    return lower ? ret.toLowerCase() : ret;
};
