import glob from 'glob';
import path from 'path';
import fs from 'fs-extra';
import splitPath from '../gen/path/splitPath';

const browserPaths = path.resolve(__dirname, '../gen/!(node|ast)*/*.ts');
const nodePaths = path.resolve(__dirname, '../gen/?(node|ast)/*.ts');
const allPaths = path.resolve(__dirname, '../gen/*/*.ts');
const browserFiles = glob.sync(browserPaths);
const nodeFiles = glob.sync(nodePaths);
const allFiles = glob.sync(allPaths);

gen(browserFiles, path.resolve(__dirname, '../gen/index.browser.ts'))
gen(nodeFiles, path.resolve(__dirname, '../gen/index.node.ts'))
gen(allFiles, path.resolve(__dirname, '../gen/all.ts'))


function gen(files: string[], outFile: string) {
    let importStr = '', exportStr = '';
    files.reduce((arr: { parentPath: string, name: string }[], file: string) => {
        let ret = file.match(/\/gen\/([^\/\s]+)\/([^\/\s]+)\.ts/);
        if (ret) {
            return arr.concat({
                parentPath: ret[1],
                name: ret[2],
            })
        } else {
            return arr;
        }
    }, []).forEach(({ name, parentPath }) => {

        importStr += `import _${name} from './${parentPath}/${name}'\n`;
        exportStr += `export const ${name} = _${name};\n`
    })

    fs.outputFileSync(outFile, importStr + exportStr)
}