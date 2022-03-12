import { isNumber } from "../regexp/utils";
import ms from "../time/ms";

export interface IBaseStore {
    get<T>(key: string): T
    set<T>(key: string, val: T): void
    clear(): void
    has(key: string): boolean
    keys(): string[]
}

export interface IBaseStoreConfig {
    // 前缀
    prefix: string,
    // 生存时间 -> ms 'ms' | 's' | 'm' | 'h' | 'd' | 'y' | number ms
    expire?: number | string,
}

export default class BaseStore implements IBaseStore {
    _store: any;
    _prefix: string;
    _expires: string | number | undefined;
    /**
     * 
     * @param config 
     * @param config.expire 默认一个月  30d 
     * @param data 
     */
    constructor(config: IBaseStoreConfig) {
        this._prefix = config.prefix;
        this._expires = ms(config.expire!, true) as number + Date.now();
    }

    init(data: any) {
        this._store = data;
        this._setData();
    }

    get<T>(key: string): T {
        this._store = this._getData();
        return this._store[key]
    }

    set<T>(key: string, val: T) {
        this._store = this._getData();
        this._store[key] = val;
        this._setData();
    }

    clear() {
        this._store = {};
        this._setData();
    }

    has(key: string) {
        this._store = this._getData();
        return this._store[key] !== undefined;
    }
    keys() {
        this._store = this._getData();
        return Object.keys(this._store)
    }

    delete(key: string) {
        this._store = this._getData();
        this._store = Object.fromEntries(Object.entries(this._store).filter(([k]) => k !== key))
        this._setData();
    }

    // 设置过期时间
    setExpired(expire: string | number = '30d') {
        // this._expires = expire + Date.now();
    }

    // ====================底层统一实现以下方法==================//
    // 是否过期
    _isExpired(json: any): boolean {
        return false
    }
    _getData(): any { }
    _setData() { }
    _isExist() { }
}
