import type from "../base/type";

/**
 * 
 * @param origin 
 * @param target 
 * @param returnCallBack 返回什么类型的值
 * @param equalCallBack 判断是否相等
 * @example diff object
 * let a = {
 *  a:1,
 *  b:3
 * }
 * let b = { a:1,b:2,e:1 }
 * diffBy(a,b)[0] //=> 'b'
 * diffBy(a,b)[1] //=> 'e'
 * 
 * diffBy(a,b,(k,v)=>v)[0] //=> 2
 * diffBy(a,b,(k,v)=>k)[0] //=> 'b'
 * 
 * @example diffBy different two object 
 * let t = {a:1,b:[1]};
 * let o = {a:[],b:[1]}
 * diffBy(t,o)[0] //=> "a"
 * diffBy(t,o,(k,v)=>v).length //=> 2
 * diffBy(t,o,(k,v)=>k,(o,t)=>t.length===o.length).length //=> 1
 * 
 * @example two different simple array
 * let t = [1,2,3];
 * let o = [1,2,3,4];
 * diffBy(t,o)[0] //=> "3"
 * diffBy(t,o,(k,v)=>v)[0] //=> 4
 * 
 * @example two different object array
 * let t = [{value:1,name:'姓名'}];
 * let o = [{value:2,name:'姓名'},{value:2,name:'手指'}];
 * diffBy(t,o)[0].value //=> undefined
 * diffBy(t,o,(k,v)=>v)[0].value //=> 2
 * diffBy(t,o,(k,v)=>v,(t,o)=>t!==undefined && t.value===o.value).map(d=>d.name)[0] //=> '姓名'
 * diffBy(t,o,(k,v)=>v,(t,o)=>t!==undefined && t.value===o.value).map(d=>d.name)[1] //=> '手指'
 */
export default function diffBy(origin: any, target: any, returnCallBack?: (key: string | number, t: any) => {}, equalCallBack?: (o: any, t: any) => {},): any[] {
    let diffKeys: any[] = [];
    equalCallBack = equalCallBack || function (a: any, b: any) { return a === b }
    returnCallBack = returnCallBack || function (k: any, v: any) { return k }

    Object.keys(target).forEach((k: any) => {
        if (!equalCallBack!(origin[k], target[k])) {
            diffKeys.push(returnCallBack!(k, target[k]))
        }
    })

    return diffKeys;
}