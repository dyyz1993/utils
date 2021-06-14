/**
 * 判断浏览器是否支持webP格式图片
 * @returns 
 * @see https://github.com/proYang/outils/blob/master/src/support/isSupportWebP.js
 */
export default function isSupportWebP(): boolean {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;
};
