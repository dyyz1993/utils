import t from '@babel/types';
import traverse from '@babel/traverse';
import { parse, ParserOptions } from '@babel/parser'
import findDeclaration from './findDeclaration';

export default function getExportDeclaration(ast: t.File) {
    const nodes: {
        node: t.ExportDefaultDeclaration | t.ExportNamedDeclaration | t.FunctionDeclaration | t.VariableDeclaration,
        declaration: string,
        comments: string,
        isDefault?: boolean
    }[] = [];
    traverse(ast, {
        ExportNamedDeclaration({ node }) {
            if (node.declaration) {
                if (node.declaration?.type === 'VariableDeclaration') {
                    node.declaration.declarations.forEach((_var) => {
                        if (_var.type === 'VariableDeclarator') {
                            if (_var.id.type === 'Identifier') {
                                if (_var.id.name) {
                                    nodes.push({
                                        declaration: _var.id.name,
                                        node,
                                        comments: node.leadingComments ? node.leadingComments.map(i => '/*' + i.value + '*/').join('\n') : ''
                                    })
                                }
                            }
                        }
                    })

                }
                // export function a(){}
                // export class a(){}
                if (node.declaration?.type === 'FunctionDeclaration' || node.declaration?.type === 'ClassDeclaration') {
                    if (node.declaration.id?.type === 'Identifier') {
                        let declaration = node.declaration.id.name;
                        if (declaration) {
                            nodes.push({
                                declaration: declaration,
                                node,
                                comments: node.leadingComments ? node.leadingComments.map(i => '/*' + i.value + '*/').join('\n') : ''
                            })
                        }
                    }
                }
            }
        },
        ExportDefaultDeclaration({ node }) {
            if (node.declaration) {
                // function a(){}; export default a;
                if (node.declaration.type === 'Identifier' && node.declaration.name) {

                    let _node = findDeclaration(ast, node.declaration.name);
                    if (_node && _node.leadingComments) {
                        nodes.push({
                            declaration: node.declaration.name,
                            node: _node,
                            isDefault: true,
                            comments: _node.leadingComments ? _node.leadingComments.map(i => '/*' + i.value + '*/').join('\n') : ''
                        })
                    }

                }
                //export default function a(){}
                //export default class {}
                if ((node.declaration.type === 'FunctionDeclaration' || node.declaration.type === 'ClassDeclaration') && node.declaration.id && node.declaration.id.name) {
                    nodes.push({
                        declaration: node.declaration.id.name,
                        node,
                        isDefault: true,
                        comments: node.leadingComments ? node.leadingComments.map(i => '/*' + i.value + '*/').join('\n') : ''
                    })
                }
            }

        },
    })
    return nodes;
};





// let ast = parse(str, {
//     plugins: ['typescript'],
//     sourceType: "module",
// })

// let nodes = getExportDeclaration(ast);

// console.log(nodes);