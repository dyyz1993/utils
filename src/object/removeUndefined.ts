/**
 * 移除对象中的undefined
 * @param object 对象
 * @param isNewValue 是否返回新值
 * @returns {any | T}
 */
//TODO 返回声明不对
export default function removeUndefined<T>(object: T, isNewValue: boolean = false): Partial<T> {
    if (isNewValue) {
        return Object.fromEntries(Object.entries(object).filter(([, value]) => value !== undefined)) as Partial<T>
    }
    Object.keys(object).forEach((key) => object[key as keyof typeof object] === undefined && delete object[key as keyof typeof object])
    return object
};