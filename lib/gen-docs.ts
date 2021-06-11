import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import removeOuterParentheses from '../src/string/removeOuterParentheses';
import { parse } from '@babel/parser'
import { types } from '@babel/core'
import generate from "@babel/generator";
import traverse from '@babel/traverse';
import getFileName from '../src/path/getFileName';
import * as commentParser from 'comment-parser/lib'
import { Tokens } from 'comment-parser/lib';
import getExportDefaultFunction from '../src/ast/getExportDefaultFunction';
const testPath = path.resolve(__dirname, '../test/**/*.ts');
const testFiles = glob.sync(testPath);
export function seedTokens(tokens: Partial<Tokens> = {}): Tokens {
    return {
        start: ' ',
        delimiter: '*',
        postDelimiter: ' ',
        tag: '@example',
        postTag: ' ',
        name: '',
        postName: ' ',
        type: '',
        postType: '',
        description: '',
        end: '',
        ...tokens,
    };
}
function genCommentBlock(data: Partial<types.CommentBlock>): types.CommentBlock {
    return {
        type: 'CommentBlock',
        value: '',
        start: -1,
        end: -1,
        loc: {
            start: {
                line: -1,
                column: -1
            },
            end: {
                line: -1,
                column: -1
            }
        },
        ...data
    }
}
testFiles.forEach((file) => {
    let sourceStr = fs.readFileSync(file).toString();
    let ast = parse(sourceStr, {
        sourceType: "module",
        plugins: ['typescript']
    })
    let fileName = getFileName(file)!.split('.')[0];
    const genFilePath = file.replace(/(\/)(?:test\/)(.*)\.test(\.ts)$/, '$1gen/$2$3');
    const srcFilePath = file.replace(/(\/)(?:test\/)(.*)\.test(\.ts)$/, '$1src/$2$3');
    let arrExample: any[] = [];
    let importArr: {
        funNames: string[],
        path: string,
        importType: 'import' | 'require'
    }[] = [];
    traverse(ast, {
        ImportDeclaration(page) {
            if (page.parent.type !== 'Program') {
                return
            };

            const node = page.node;
            // page.
            // console.log(page.parent)
            let value = node.source.value;
            let names = node.specifiers.map((i) => i.local.name)
            importArr.push({
                funNames: names,
                path: value,
                importType: 'import'
            })
        },
        CallExpression({ node }) {
            if ((node.callee as any).name === "it") {
                let ret = node.arguments.map((arg) => {
                    if (arg.type === 'StringLiteral')
                        return '✅ ' + arg.value;
                    if (arg.type === 'TemplateLiteral')
                        return '✅ ' + sourceStr.substring(arg.start!, arg.end!).replace(/^`([^]*)`$/gm, '$1');
                    if (arg.type === 'FunctionExpression' || arg.type === 'ArrowFunctionExpression') {
                        if (arg.body.type === 'BlockStatement') {
                            const a = arg.body.body.map((statement) => {
                                let arr = [];
                                let text = sourceStr.substring(statement.start!, statement.end!)
                                if (/^expect\(/.test(text)) {
                                    // 处理结构
                                    const content = removeOuterParentheses(text, 'expect')[0];
                                    // arr.push(content);

                                    //TODO:只匹配关键词deep,not
                                    // [ 'Type','length','members' ]
                                    // [ '!','==','value' ]
                                    // let map = [
                                    //     [['eq', 'equal', 'equals'], `== $1`],
                                    //     [['an', 'a'], `== typeof $1`],
                                    //     [['undefined', 'null', 'true', "false"], `=== $k`],
                                    //     [['not'], `!$1`],
                                    // ]
                                    function formatText(text: string) {
                                        let arr: string[] = [];
                                        ['eq', 'equal', 'equals'].forEach((key) => {
                                            let result = removeOuterParentheses(text, key)[0]
                                            if (result !== undefined) {
                                                // 可能会匹配不对？ 例如 .eq('.not.') // expect('.not.')
                                                // TODO: AST的方式解析
                                                arr.push('//=> ', text.indexOf('.not.') !== -1 ? '!=' : '==', result);
                                            }
                                        })
                                        return arr.length === 0 ? '' : arr.join(' ');

                                    }
                                    let _text = formatText(text);
                                    arr.push(_text === '' ? text : content + _text)

                                } else {
                                    arr.push(text)
                                }

                                return arr
                            });
                            return a;
                        }
                        return sourceStr.substring(arg?.start!, arg?.end!)
                    }
                    return false;
                })
                arrExample.push(ret);
            }
        }
    })

    let result = importArr.some((item) => {
        // console.log(item.path)
        let ret = item.path.match(/\/([^\/]+)$/);
        let flag = false;
        // console.log(ret, fileName)
        if (ret && ret[1] === fileName && item.funNames.some(i => i === fileName)) {
            // console.log(item)
            if (item.importType === 'import') {
                // console.log()
                const filePath = path.resolve(__dirname, './src/', item.path);

                try {
                    let ast = parse(fs.readFileSync(require.resolve(filePath)).toString(), {
                        sourceType: 'module',
                        plugins: ['typescript']
                    })

                    let _funNode = getExportDefaultFunction(ast);

                    if (_funNode) {
                        let comment = _funNode.leadingComments ? _funNode.leadingComments[_funNode.leadingComments.length - 1].value : `*\n* `;
                        let json = commentParser.parse(`/** ${comment} */`)
                        let findSameExampleIndex = json[0].source.findIndex((item) => {
                            return item.tokens.tag.indexOf('example') !== -1
                        }) || -1

                        let items = arrExample.reduce((totalArr, arr) => {
                            // 每一个都是一个注释
                            return totalArr.concat({
                                "number": 0,
                                "source": "",
                                "tokens": seedTokens({
                                    tag: '@example',
                                    name: arr[0],
                                    description: ''

                                })
                            }, arr[1].map((text: any) => {
                                return {
                                    "number": 0,
                                    "source": "",
                                    "tokens": seedTokens({
                                        delimiter: '*',
                                        tag: '',
                                        name: '',
                                        description: Array.isArray(text) ? text.map(i => i.replace(/\*\//mg, '\* \/')) : text.replace(/\*\//mg, '\* \/')

                                    })
                                }
                            }))
                        }, [])

                        json[0] && json[0].source.splice(findSameExampleIndex, 0, ...items)


                        const transforms = commentParser.transforms.flow();
                        const comment_str = <any>json.map((item) => commentParser.stringify(transforms(item)).match(/\/\*([^]*)\*\//)![1]).join('\n')
                        // console.log(comment_str).
                        // if (node.name === 'getFileName') {
                        //     console.log(comment_str, JSON.stringify(json, null, 2))
                        // }
                        if (_funNode.leadingComments) {
                            _funNode.leadingComments[_funNode.leadingComments.length - 1].value = comment_str.replace(/^(\*)[^\*]*\*+/, '$1');
                        } else {
                            _funNode.leadingComments = [genCommentBlock({ value: comment_str.replace(/^(\*)[^\*]*\*+/, '$1') })];
                        }

                        const gg = generate(ast.program)
                        fs.outputFileSync(genFilePath, gg.code);
                        flag = true;
                    }
                    // let comment = node.leadingComments ? parent.leadingComments[parent.leadingComments.length - 1].value : `*\n* `;

                    // traverse(ast, {
                    //     Identifier({ node, parent }) {
                    //         // console.log(node.name, parent.leadingComments)
                    //         if (node.name === fileName && parent.type !== 'ExportDefaultDeclaration' && parent.type !== 'ImportDefaultSpecifier') {
                    //             let comment = parent.leadingComments ? parent.leadingComments[parent.leadingComments.length - 1].value : `*\n* `;
                    //             let json = commentParser.parse(`/** ${comment} */`)
                    //             let findSameExampleIndex = json[0].source.findIndex((item) => {
                    //                 return item.tokens.tag.indexOf('example') !== -1
                    //             }) || -1
                    //             // console.log(JSON.stringify(arrExample, null, 2))
                    //             // console.log(arrExample)
                    //             let items = arrExample.reduce((totalArr, arr) => {
                    //                 // 每一个都是一个注释
                    //                 return totalArr.concat({
                    //                     "number": 0,
                    //                     "source": "",
                    //                     "tokens": seedTokens({
                    //                         tag: '@example',
                    //                         name: arr[0],
                    //                         description: ''

                    //                     })
                    //                 }, arr[1].map((text: any) => {
                    //                     return {
                    //                         "number": 0,
                    //                         "source": "",
                    //                         "tokens": seedTokens({
                    //                             delimiter: '*',
                    //                             tag: '',
                    //                             name: '',
                    //                             description: text

                    //                         })
                    //                     }
                    //                 }))
                    //             }, [])

                    //             json[0] && json[0].source.splice(findSameExampleIndex, 0, ...items)


                    //             const transforms = commentParser.transforms.flow();
                    //             const comment_str = <any>json.map((item) => commentParser.stringify(transforms(item)).match(/\/\*([^]*)\*\//)![1]).join('\n')
                    //             // console.log(comment_str).
                    //             if (node.name === 'getFileName') {
                    //                 console.log(comment_str, JSON.stringify(json, null, 2))
                    //             }
                    //             if (parent.leadingComments) {
                    //                 parent.leadingComments[parent.leadingComments.length - 1].value = comment_str.replace(/^(\*)[^\*]*\*+/, '$1');
                    //             } else {
                    //                 parent.leadingComments = [genCommentBlock({ value: comment_str.replace(/^(\*)[^\*]*\*+/, '$1') })];
                    //             }

                    //             const gg = generate(ast.program)
                    //             fs.outputFileSync(genFilePath, gg.code);
                    //             flag = true;
                    //         }
                    //     }
                    // })
                } catch (error) {
                    console.error(error)

                }

            }


        }
        return flag;
        // item.path.includes(fileName)
    })
    if (!result) {
        // 回写

        fs.outputFileSync(genFilePath, fs.readFileSync(srcFilePath).toString(),);
        // console.log(result)
    }


})


//() ()
