
/**
 * 包裹函数
 * @param value 
 * @param wrapper 
 * @example
 * function a(value:number){ return value } 
 * const _A = wrap(a,function(fn:any,...values){
 *      return fn(...values) + 5
 * })
 * _A(5) //=> 10
 */
export default function wrap<T, TArgs, TResult>(value: T, wrapper: (value: T, ...args: TArgs[]) => TResult): (...args: TArgs[]) => TResult {
    return function () {
        return wrapper(value, ...arguments)
    }
};
