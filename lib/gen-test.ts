// 生成测试用例
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import last from '../src/array/last';
import parserComment from '../src/ast/parserComment';
import removeOuterParentheses from '../src/string/removeOuterParentheses';
import { parse } from '@babel/parser'
import t from '@babel/types'
import prettier from 'prettier';
import getExportDeclaration from '../src/ast/getExportDeclaration';
const srcPath = path.resolve(__dirname, '../src/**/*.ts');
const srcFiles = glob.sync(srcPath);


const srcFilePaths = srcFiles.reduce((arr: string[][], file) => {
    let ret = file.match(/\/src\/(.*)\.ts$/);
    if (ret) {
        arr.push([ret[1], file])
    }
    return arr;
}, [])


const templeStr = fs.readFileSync(path.resolve(__dirname, './test.temple.ejs')).toString()
const templeGenStr = fs.readFileSync(path.resolve(__dirname, './gen.test.temple.ejs')).toString()
srcFilePaths.forEach(([file, sourceFile]) => {
    const ast = parse(fs.readFileSync(sourceFile).toString(), {
        plugins: ['typescript'],
        sourceType: "module",
    })

    const filename = last(file.split('/'))
    const srcPath = path.relative(__dirname, Array(file.split('/').length - 1).fill('../').join('') + './src/' + file)
    if (ast.program.body.filter(i => i.type === 'ExportDefaultDeclaration').length > 0) {
        //生成测试用例壳子

        const filePath = path.resolve(__dirname, '../test/' + file + '.test.ts')
        let ret = fs.pathExistsSync(filePath);
        if (!ret)
            fs.outputFileSync(filePath, prettier.format(ejs.render(templeStr, {
                name: filename,
                filePath: srcPath
            }), {
                parser: 'typescript'
            }))

    }


    //根据docs生成测试用例
    const { imports, defaultImport, blocks } = docs2test(ast);
    const fileGenPath = path.resolve(__dirname, '../test/' + file + '.gen.test.ts')
    if (blocks.length > 0) {
        let importsArr = [];
        imports.length > 0 && importsArr.push(`import {${imports.join(',')}} from '${srcPath}'`)
        defaultImport.length > 0 && importsArr.push(`import ${defaultImport[0]} from '${srcPath}'`)
        fs.outputFileSync(fileGenPath, prettier.format(ejs.render(templeGenStr, {
            name: filename,
            filePath: srcPath,
            code: blocks.join('\n'),
            imports: importsArr.join('\n')
        }), {
            parser: 'typescript'
        }))
    }


})

// srcGenFilePaths.forEach(([fileName, sourceFile]) => {
//     const fileGenPath = path.resolve(__dirname, '../test/' + fileName + '.gen.test.ts')
//     const filename = last(fileName.split('/'))
//     // const code = genItCode(fs.readFileSync(file).toString())



// })

function docs2test(ast: t.File) {

    let data: {
        imports: string[],
        defaultImport: string[],
        blocks: string[]
    } = {
        imports: [],
        defaultImport: [],
        blocks: []
    };
    getExportDeclaration(ast).forEach((item) => {
        if (item.comments) {
            let blockCode = genItCode(item.comments);
            if (!blockCode) {
                return
            }
            if (item.isDefault) {
                data.defaultImport.push(item.declaration)
            } else {
                data.imports.push(item.declaration)
            }
            data.blocks.push(blockCode)

        }

    })
    return data;
}

function genItCode(input: string) {

    let comment = parserComment(input);
    let examples = comment.reduce((arr, item) => {
        return arr.concat(item.filter(i => i.tag === 'example'))
    }, [])
    let tempArr: any = [];
    examples.forEach((spec) => {
        let strArr = removeOuterParentheses(spec.content, '', ['```', '```']);
        let temp = '';
        let str = strArr.length != 0 ? strArr[0] : spec.content
        let ret = str.matchAll(/([\s\S]*?)\s?(.*)\n?\/\/\s*=>(.*)/gm);

        // 分解内容和表达式
        temp += [...ret].reduce((arr, item) => {
            if (item[1].trim()) {
                arr.push(item[1].trim())
            }
            return arr.concat(`expect(${item[2].trim()}).eq(${item[3].trim()});`)
        }, []).join('\n ');
        temp = `it(\`${spec.title.trim()}\`,async function(){\n${temp}\n})`
        tempArr.push(temp)
    })
    return tempArr.join('\n');
}


// console.log(srcPath, srcFiles, srcFilePaths);
// console.log(diffFiles)







