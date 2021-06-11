/**
 * Split path into dir, name and ext. 
 * @param path 
 */
export default function splitPath(path: string): Record<'dir' | 'name' | 'ext', string | null> {
    const regSplit = /^([\s\S]*?)((?:\.{1,2}|[^\\/]+?|)(\.[^./\\]*|))(?:[\\/]*)$/;
    const [, dir, name, ext] = path.match(regSplit)!;

    return {
        dir: dir,
        name: name,
        ext: ext
    };
};
