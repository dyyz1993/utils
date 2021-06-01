/**
 * 获取文件名
 * @param s 
 * @param isSuffix 是否返回后缀
 * @returns 
 */
function getFileName(s: String, isSuffix: boolean = true): null | string {
    let ret = s.match(/\/([^\/]*)$/);
    if (ret) {
        if (!isSuffix) {
            let ret2 = ret[1].match(/([^\s]+?)(?:\.*)\b([^\s\.]*)\b$/);
            if (ret2) {
                return ret2[1]
            } else {
                return null;
            }
        }
        return ret[1]
    } else {
        return null;
    }
}

export default getFileName;