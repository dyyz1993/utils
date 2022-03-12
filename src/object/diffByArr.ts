



export default function diffByArr<T>(origin: T[], target: T[], predicate: (value: T, index: number, obj: T[]) => unknown) {
    target.forEach((tObj) => {
        let oObj = origin.find(predicate);
        if (oObj === undefined) {

        } else {

        }
    })
}

[].find