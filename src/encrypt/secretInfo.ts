import type from "../base/type"
/**
 * 给隐私信息标记号加密
 * @param info 
 * @param left default 3 
 * @param right default 3
 * @param replace default '*' 
 * @example 
 * secretInfo(123456789) //=> '123***789'
 * secretInfo(1234567) //=> '123*567'
 */
export default function secretInfo(info: any, left: number = 3, right: number = 3, replace: string = '*') {
    if (type(info) === 'number') {
        info = info.toString()
    }
    if (type(info) !== 'string') {
        throw new Error('参数类型错误')
    }
    if (info.length < 7) {
        throw new Error('参数长度需要大于7')
    }
    let reg = new RegExp('^([a-zA-Z\\d]{' + left + '})([a-zA-Z\\d]+)([a-zA-Z\\d]{' + right + '})$')
    return (info as string).replace(reg, function (x, r, c, l) {
        let i = ''
        while (i.length < c.length) {
            i += replace
        }
        return r + i + l
    })
}
