import type from "./type"
/**
 * 是否为空对象
 * @param value 
 * @returns {boolean}
 * @example null is isEmpty
 * isEmpty(null) //=> true
 * @example 'null' is isEmpty
 * isEmpty('null') //=> true
 * @example 0 is isEmpty
 * isEmpty(0) //=> true
 * @example '0' is isEmpty
 * isEmpty('0') //=> true
 * @example false is isEmpty
 * isEmpty(false) //=> true
 * @example 'false' is isEmpty
 * isEmpty('false') //=> true
 * @example 'undefined' is isEmpty
 * isEmpty('undefined') //=> true
 * @example undefined is isEmpty
 * isEmpty(undefined) //=> true
 * @example [] is isEmpty
 * isEmpty([]) //=> true
 * @example {} is isEmpty
 * isEmpty({}) //=> true
 * @example '{}' is isEmpty
 * isEmpty('{}') //=> true
 * @example '[]' is isEmpty
 * isEmpty('[]') //=> true
 */
export default function isEmpty(value: any): boolean {
    if (value === void (0) || value === null) return true
    else if (type(value) === 'object') return !Object.keys(value).length
    else if (type(value) === 'array') return !value.length

    else if (type(value) === 'string') {
        if (value === 'undefined' || value === '0' || value === 'false' || value === 'null' || value === '[]' || value === '{}') {
            return true;
        }
        return !value
    }
    else return !value
};
