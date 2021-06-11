export default function objToStr(val: unknown) {
    const ObjToStr = Object.prototype.toString;
    return ObjToStr.call(val);
};
