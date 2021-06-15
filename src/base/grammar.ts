

/**
 * @description 解析一个字符串并返回指定基数的十进制整数， radix 是2-36之间的整数，表示被解析字符串的基数。
 * @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
 * @example  除了“0、1”外，其它数字都不是有效二进制数字
 * _parseInt('1',2) //=>1
 * _parseInt('0',2) //=>0
 * _parseInt('2',2) //=> NaN
 * _parseInt('3',2) //=> NaN
 * @example radix = 1 ,不是有效的数据,  2 到 36
 * _parseInt('1',1) //=> NaN
 * _parseInt('0',1) //=> NaN
 * @example radix = 0 ｜ undefined, 3种解析; 0x => 16 , 0 => 10 ,其他值开头，默认10进制
 * _parseInt('1',0) //=>1
 * _parseInt('1') //=>1
 * _parseInt('F') //=> NaN
 * _parseInt('F',16) //=>15
 * _parseInt('0xF') //=>15
 * _parseInt('0010') //=>10
 * @example 拓展题 https://juejin.cn/post/6973498008360976398?utm_source=gold_browser_extension
 * let ret = ['1','2','3'].map(_parseInt)
 * ret[0] //=> 1
 * ret[1] //=> NaN
 * ret[2] //=> NaN
 * 
 */
export const _parseInt = parseInt;

/**
 * @description 隐式转换 (+-/*==><)
 * @see https://juejin.cn/post/6873215243804213262
 * @example 
 * 2 + 1 //=> 3
 * 's' + 2 //=> 's2'
 * 2 + 's' //=> '2s'
 */
export const _toString = Object.prototype.toString;