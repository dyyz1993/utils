import BaseStore, { IBaseStoreConfig } from "../base/BaseStore";


/**
 * 设计思路
 * {
 *   data:{},
 *   expires:过期时间
 * }
 */


/**
 * 基于localStorage 的缓存
 * 
 * @example 基础用法
 * const config = {
 *  prefix:"__test__",
 *  expire:"60s"
 * };
 * const store = new LocalStore(config);
 * store.set('1111','666');
 * store.get('1111');
 */
export default class LocalStore extends BaseStore {
    constructor(config: IBaseStoreConfig) {
        super(config);

    }

    _getData() {
        const str = localStorage.getItem(this._prefix) || '{}';
        let json: any = {};
        try {
            json = JSON.parse(str);
        } catch (e) { console.warn(e); }

        if (this._isExpired(json)) {
            return undefined;
        }
        return json.data;
    }

    _isExpired(json: any) {
        if (json.__expires__) {
            return json.__expires__ < Date.now()
        }
        return false;
    }

    _setData() {
        let str = '{}';
        try {
            str = JSON.stringify({
                data: this._store,
                __expires__: this._expires
            });
        } catch (e) { console.error(e); }
        localStorage.setItem(this._prefix, str);

    }
}
