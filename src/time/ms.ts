import isStr from "../string/isStr";


//https://github.com/XmanLin/MyUtils/blob/master/dateUtil/dateUtil.js
/**
 * Convert time string formats to milliseconds.
 * @param str {string | number } 'ms' | 's' | 'm' | 'h' | 'd' | 'y'
 */
export default function ms<T extends string | number>(str: T, isForceConvertMilliseconds?: boolean): number | string {

    if (isStr(str)) {
        const match: null | unknown[] = (str as string).match(regStrTime);

        if (!match) return 0;
        let key: SuffixKey = match[2] as SuffixKey || 'ms';
        return (+(match[1] as number) * factor[key]! as number);
    } else if (isForceConvertMilliseconds) {
        return str as number;
    } else {
        const num: number = str as number;
        let suffix: SuffixKey = 'ms';

        for (let i = 0, len = suffixList.length; i < len; i++) {
            if (num >= factor[suffixList[i]]!) {
                suffix = suffixList[i];
                break;
            }
        }
        return +(num / factor[suffix]!).toFixed(2) + suffix;
    }
};



type SuffixKey = 'ms' | 's' | 'm' | 'h' | 'd' | 'y';

const factor: Partial<Record<SuffixKey, number>> = {
    ms: 1,
    s: 1000,
};
factor.m = factor.s! * 60;
factor.h = factor.m * 60;
factor.d = factor.h * 24;
factor.y = factor.d * 365.25;

const suffixList: SuffixKey[] = ['y', 'd', 'h', 'm', 's', 'ms'];

const regStrTime = /^((?:\d+)?\.?\d+) *(s|m|h|d|y|ms)?$/;