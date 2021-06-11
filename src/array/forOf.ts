/**
 * 遍历数组,支持中途退出
 * @param arr 
 * @param fn 
 */
export default function forOf<T>(arr: T[], fn: (item: T) => boolean | void): void {
    for (const item of arr) {
        let ret = fn(item);
        if (ret === true) {
            break;
        }
    }
};
