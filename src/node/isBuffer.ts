import isFn from "../function/isFn";

export default function isBuffer(val: any): boolean {
    if (val == null) return false;
    if (val._isBuffer) return true;

    return (
        val.constructor &&
        isFn(val.constructor.isBuffer) &&
        val.constructor.isBuffer(val)
    );
};
