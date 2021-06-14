//https://github.com/cgxqd/utilscore/blob/master/libs.web/index.js

/**
 * 在客户端触发文件下载
 * @param fileName 文件名
 * @param content 文件内容
 * @param type 
 */
export default function downloadFile(fileName: string, content: string | Blob | File, type: string = 'text/plain') {
    var el = document.createElement('a');
    var blob = new Blob([content], { type });
    el.href = URL.createObjectURL(blob)
    el.download = fileName
    el.addEventListener('click', e => e.stopImmediatePropagation());
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
};
