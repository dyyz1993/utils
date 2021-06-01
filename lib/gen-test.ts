// 生成测试用例
import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import ejs from 'ejs';
import last from '../src/array/last';
// import difference from '../src/array/difference';

const srcPath = path.resolve(__dirname, '../src/**/*.ts');
const srcFiles = glob.sync(srcPath);
const srcFilePaths = srcFiles.reduce((arr: string[], file) => {
    let ret = file.match(/\/src\/(.*)\.ts$/);
    if (ret) {
        arr.push(ret[1])
    }
    return arr;
}, [])
const templeStr = fs.readFileSync(path.resolve(__dirname, './test.temple.ejs')).toString()
srcFilePaths.forEach((file) => {
    const filename = last(file.split('/'))
    const filePath = path.resolve(__dirname, '../test/' + file + '.test.ts')
    let ret = fs.pathExistsSync(filePath);
    if (!ret)
        fs.outputFileSync(filePath, ejs.render(templeStr, {
            name: filename,
            filePath: path.relative(__dirname, Array(file.split('/').length - 1).fill('../').join('') + './src/' + file)
        }))

})


console.log(srcPath, srcFiles, srcFilePaths);
// console.log(diffFiles)







