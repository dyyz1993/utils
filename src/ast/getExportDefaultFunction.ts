import { parse, ParserOptions } from '@babel/parser'
import traverse from '@babel/traverse';
import t from '@babel/types';

function getExportDefaultFunction(ast: t.File,): t.Node | null {
    let _node = null;
    let _funName: string;
    traverse(ast, {
        ExportDefaultDeclaration({ node }) {
            if (node.declaration.type === 'FunctionDeclaration') {
                _node = node;
            } else if (node.declaration.type === 'Identifier') {
                let funcName = node.declaration.name
                traverse(ast, {
                    FunctionDeclaration({ node }) {
                        if (node.id && node.id.name === funcName) {
                            _node = node;
                        }
                    }
                })
            }
        },
        FunctionDeclaration({ node }) {
            if (node.id && node.id?.name === _funName) {
                _node = node;
            }
        },
    })
    return _node
};

export default getExportDefaultFunction