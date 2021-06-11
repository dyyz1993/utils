export interface IBaseStore {
    get<T>(key: string): T
    set<T>(key: string, val: T): void
    clear(): void
    has(key: string): boolean
    keys(): string[]
}

export default class BaseStore implements IBaseStore {
    _store: { [key: string]: any };
    constructor(name: string, data: { [key: string]: any } = {}) {
        this._store = data;
    }
    get<T>(key: string): T {
        return this._store[key]
    }
    set<T>(key: string, val: T) {
        this._store[key] = val;
    }
    clear() {
        this._store = {};
    }
    has(key: string) {
        return (this._store[key] !== undefined)
    }
    keys() {
        return Object.keys(this._store)
    }
}
