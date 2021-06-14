import last from "../array/last";


interface Comment {
    tag: string;
    title: string;
    content: string;
}
/**
 * 
 * @param input 
 * ***
 ***/
export default function parserComment(input: string) {
    let ret = input.matchAll(/\/\*\*\s?([\s\S]*?)\**?\*\//gm);
    if (ret) {
        return [...ret].map(([, content]) => {
            // 内容分块
            return content.split('\n').reduce((arr: Comment[], line) => {
                let ret = line.match(/^\s*?\*+\s*?@\b([\S]*)\b\s?(.*)/);
                if (ret) {
                    arr.push({
                        title: ret[2],
                        tag: ret[1],
                        content: ''
                    })
                } else {
                    let item = last(arr);
                    if (item) {
                        let ret = line.match(/^\s*?\*+\s*?(.*)/);
                        if (ret) {
                            item.content += ret[1] + '\n'
                        } else {
                            item.content += line + '\n'
                        }

                    }
                }
                return arr;
            }, [])

        })
    }
    return [];
};

let test = `
/**
 * @tag title
 * xxxx
 * ****
 * @sss 
 * javascript
 * sss
**/
/**
 -
**/
/**
* @sss
**/
`
// console.log(parserComment(test))