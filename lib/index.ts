import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import * as babelParser from '@babel/parser'
import generate from "@babel/generator";
import getFileName from '../src/path/getFileName';
import * as  commentParser from 'comment-parser/lib'
const getFunctionLocation = require('get-function-location');



export default async (fn: Function, ctx: Mocha.Context) => {
    let a = await getFunctionLocation(fn);
    const str = fs.readFileSync(a.source.replace('file://', ''), 'utf-8');
    // let arr = str.split('\n');
    const { program } = babelParser.parse(str, {
        sourceType: "module",
        plugins: ['typescript']
    })
    const programItem = program.body.find((item) => item.loc!.end.line === a.line - 1);
    programItem!.leadingComments?.forEach((item) => {
        let json = commentParser.parse(`/** \n ${item.value} */`);
        // 找到相同的例子
        let findSameExampleIndex = json[0].source.findIndex((item) => {
            return item.tokens.tag.indexOf('example') !== -1
        }) || -1
        json[0] && json[0].source.splice(findSameExampleIndex, 0, {
            "number": 0,
            "source": "",
            "tokens": {
                "start": " ",
                "delimiter": "*",
                "postDelimiter": " ",
                "tag": "@example",
                "postTag": " ",
                "name": "",
                "postName": " ",
                "type": "",
                "postType": " ",
                "description": "\n * sum(1,2) // => 3",
                "end": ""
            }
        })
        item.value = json.map((item) => commentParser.stringify(item)).join('\n').replace('/*', '').replace(/.*(\*\/)$/, '')
    })

    const gg = generate(program)
    fs.writeFileSync(path.resolve(__dirname, '../gen/', getFileName(a.source) + path.extname(a.source)), gg.code,)

    console.log(a, programItem, gg);

    ctx.assert = assert;
    ctx.file = a;
    return ctx;
};