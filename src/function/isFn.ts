import objToStr from "../object/objToStr";

export default function isFn<T>(val: T) {
    const objStr = objToStr(val);
    return (
        objStr === '[object Function]' ||
        objStr === '[object GeneratorFunction]' ||
        objStr === '[object AsyncFunction]'
    );
};
