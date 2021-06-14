/**
 * 是否为空对象
 * @param obj 
 * @returns 
 */
export default function isEmptyObject<T>(obj: T): boolean {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false
    return !Object.keys(obj).length
};
