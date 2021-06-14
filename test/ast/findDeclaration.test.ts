import { expect } from "chai";
import findDeclaration from "../../src/ast/findDeclaration";
import { parse } from '@babel/parser'
describe("findDeclaration", async () => {
  it(`find export function `, async () => {
    let exampleStr = `
    export function b () {};
    `
    const ast = parse(exampleStr, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(findDeclaration(ast, 'b')?.type).eq('ExportNamedDeclaration')
  });

  it(`find function`, async () => {
    let exampleStr = `
    function b () {};
    `
    const ast = parse(exampleStr, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(findDeclaration(ast, 'b')?.type).eq('FunctionDeclaration')
  });



  it(`find var arrow function `, async () => {
    let exampleStr = `
    var  b  = () => {};
    `
    const ast = parse(exampleStr, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(findDeclaration(ast, 'b')?.type).eq('VariableDeclaration')
  });

  it(`find export default function `, async () => {
    let exampleStr = `
    export default function a(){}
    `
    const ast = parse(exampleStr, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(findDeclaration(ast, 'a')?.type).eq('ExportDefaultDeclaration')
  });

  it(`find export default declaration `, async () => {
    let exampleStr = `
    function a(){

    }
    `
    const ast = parse(exampleStr, {
      plugins: ['typescript'],
      sourceType: "module",
    })
    expect(findDeclaration(ast, 'a')?.type).eq('FunctionDeclaration')
  });
});
