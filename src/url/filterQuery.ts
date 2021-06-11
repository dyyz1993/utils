import queryString from 'query-string';
import omit from 'lodash/omit'
/**
 * 过滤URL参数,支持添加新参数
 * @param filterParamNames 移除的属性名
 * @param addParams 增加属性
 * @param url 默认 location.href
 * @returns url
 */
export default function filterQuery(filterParamNames: string[], addParams: { [key: string]: any } = {}, url: string = window.location.href,): string {
    let ret = queryString.parseUrl(url);
    let _query = Object.assign(omit(ret.query, filterParamNames), addParams);
    return queryString.stringifyUrl({ ...ret, query: _query })
};
