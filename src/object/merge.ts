/**  重载函数,最先匹配 @see https://www.cnblogs.com/vickylinj/p/12193253.html */

import _merge from "lodash/merge";
export default function merge<TObject, TSource>(object: TObject, source: TSource): TObject & TSource;
/**
 * @see _.merge
 */
export default function merge<TObject, TSource1, TSource2>(object: TObject, source1: TSource1, source2: TSource2): TObject & TSource1 & TSource2;
/**
 * @see _.merge
 */
export default function merge<TObject, TSource1, TSource2, TSource3>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3): TObject & TSource1 & TSource2 & TSource3;
/**
 * @see _.merge
 */
export default function merge<TObject, TSource1, TSource2, TSource3, TSource4>(object: TObject, source1: TSource1, source2: TSource2, source3: TSource3, source4: TSource4): TObject & TSource1 & TSource2 & TSource3 & TSource4;

/**
 * 混合多个对象
 * @param object 
 * @param otherArgs 
 * @returns 
 * @example 同名覆盖
 * merge({a:1},{a:2}).a //=> 2
 * @example 深度混合
 * merge({a:{a:1}},{a:{v:2},b:2}).a.v //=> 2
 * merge({a:{a:1}},{a:{v:2},b:2}).a.a //=> 1
 * @example 数组覆盖
 * merge({a:{a:1}},{a:{a:[1]},b:2}).a.a[0] //=> 1
 * @example 多对象混合
 * let obj = merge({a:{a:1}},{a:{a:[1]},b:2},{a:{c:2},b:3})
 * obj.a.c //=> 2
 * obj.b //=> 3
 */
export default function merge(object: any, ...otherArgs: any[]): any {
    return _merge(object, ...otherArgs)
}