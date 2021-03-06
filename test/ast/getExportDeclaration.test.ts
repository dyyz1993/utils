import { expect } from "chai";
import getExportDeclaration from "../../src/ast/getExportDeclaration";
import { parse } from '@babel/parser'
describe("getExportDeclaration", async () => {
  it(`case`, async () => {
    const str = `
/**
 * 现金转大写
 * @param n 
 * @example ssss 
 * numberToUpper(5000) //=> ssss
 * 
 */
 export default function numberToUpper(n: number): string {
    var fraction = ['角', '分'];
    var digit = [
        '零', '壹', '贰', '叁', '肆',
        '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零元整');
};

/**
 * 现2222
 * @param n 
 * @example ssss 
 * 
    * numberToUpper(5000) //=> ssss
 * 
 */
export function b (a:string):string {
	return '';
};
/**
 * 现2222
 * @param n 
 * @example ssss 
    * numberToUpper(5000) //=> ssss
 * 
 */
export const a=a

const c=a;

function d(){}
/**
* const const g = ()=>{}
*/
export const g = ()=>{}
/**
* const f = function (){}
*/
export const f = function (){}

export class Name{}

export default class Name2{}


`
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })

    expect(getExportDeclaration(ast)).length(7)

  });

  it(`export default b`, async () => {
    const str = `
/**
 * @param n 
 * @example ssss 
 */
    function b (n:string) {};
    export default b;
    `
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(getExportDeclaration(ast)).length(1)
    expect(getExportDeclaration(ast)[0].comments).eq(`/**\n * @param n \n * @example ssss \n */`)
  });
  it(`find class method `, async () => {

    const str = `
    /**
     * @param n 
     * @example ssss 
     */
    class Person{
      getName(){}
    }
    export default Person
        `
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(getExportDeclaration(ast)).length(2)
  });

  it(`find export default class method `, async () => {

    const str = `
    /**
     * @param n 
     * @example ssss 
     */
     export default class Person{
      getName(){}
    }
        `
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(getExportDeclaration(ast)).length(2)
  });

  it(`find export  class method `, async () => {

    const str = `
    /**
     * @param n 
     * @example ssss 
     */
    export class Person{
      getName(){}
    }
        `
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(getExportDeclaration(ast)).length(2)
  });



  it(`not find `, async () => {

    const str = `
    /**
     * @param n 
     * @example ssss 
     */
        function b (n:string) {};
        `
    let ast = parse(str, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(getExportDeclaration(ast)).length(0)
  });
});
