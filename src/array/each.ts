/**
 * 遍历方法，不返回则过滤数据
 */
export default function each<T>(arr: T[], fn: (item: T) => T | void): T[] {
    return arr.reduce((total: T[], item) => {
        let _item = fn(item);
        if (_item === void 0) {
            return total
        } else {
            return total.concat(_item)
        }
    }, [])
};
