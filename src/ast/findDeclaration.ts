import t from '@babel/types';
import traverse from '@babel/traverse';
import { parse, ParserOptions } from '@babel/parser'
export default function findDeclaration(ast: t.File, name: string) {
    for (let node of ast.program.body) {
        // export function a(){}
        // export const a = ''
        if (node.type === 'ExportNamedDeclaration') {
            if (node.declaration && node.declaration?.type === 'FunctionDeclaration') {
                if (node.declaration.id) {
                    if (name === node.declaration.id.name) {
                        return node;
                    }
                }
            }
            if (node.declaration && node.declaration.type === 'VariableDeclaration') {
                for (let _var of node.declaration.declarations) {
                    if (_var.id && _var.id.type === 'Identifier' && _var.id.name === name) {
                        return node;
                    }
                }
            }
        }
        // const a = ''
        // var a = '';
        if (node.type === 'VariableDeclaration') {
            for (let _var of node.declarations) {
                if (_var.id && _var.id.type === 'Identifier' && _var.id.name === name) {
                    return node;
                }
            }
        }
        //function a(){}
        if (node.type === 'FunctionDeclaration' && node.id && node.id.type === 'Identifier' && node.id.name === name) {
            return node;
        }

        //class A {}
        if (node.type === 'ClassDeclaration' && node.id && node.id.name === name) {
            return node;
        }

        // export default function a()
        // export default a;
        if (node.type === "ExportDefaultDeclaration") {
            if (node.declaration.type === 'Identifier' && node.declaration.name === name) {
                return node;
            }
            if (node.declaration.type === 'FunctionDeclaration' && node.declaration.id && node.declaration.id.name === name) {
                return node;
            }
        }
    }
    return null;
};
