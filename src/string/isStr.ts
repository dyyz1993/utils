import objToStr from "../object/objToStr";
/**
 * Check if value is a string primitive.
 * @param val 
 * @returns 
 */
export default function isStr(val: unknown) {
    return objToStr(val) === '[object String]';
};
