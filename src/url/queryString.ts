import Url from 'url-parse';


// export function parseUrl(url) {

// }

/**
 * 
 * @param obj 
 * @example stringify URL with a query string
 * 
 * stringifyUrl({url: 'https://foo.bar?foo=baz', query: {foo: 'bar'}}) //=> 'https://foo.bar?foo=baz&foo=bar'
 * 
 * stringifyUrl({url: 'https://foo.bar?a=b', query: {foo: 'baz'}}) //=>  'https://foo.bar?a=b&foo=baz'
 * 
 * stringifyUrl({url: 'https://foo.bar', query: {foo: 'bar', a: 'b'}}) //=> 'https://foo.bar?a=b&foo=bar'
 * 
 * stringifyUrl({url: 'https://foo.bar/#top', query: {foo: 'bar'}}) //=> 'https://foo.bar/?foo=bar#top'
 * 
 * stringifyUrl({url: 'https://foo.bar?', query: {foo: 'bar'}}) //=> 'https://foo.bar?foo=bar'
 * 
 * stringifyUrl({url: 'https://foo.bar', query: {foo: 'bar'}}) //=> 'https://foo.bar?foo=bar'
 * @example stringify URL without a query string
 * 
 * stringifyUrl({url: 'https://foo.bar/'}) //=> 'https://foo.bar/'
 * stringifyUrl({url: 'https://foo.bar/', query: {}}) //=> 'https://foo.bar/'
 * stringifyUrl({url: 'https://foo.bar/#top', query: {}}) //=> 'https://foo.bar/#top'
 * stringifyUrl({url: '', query: {}}) //=> ''
 * stringifyUrl({url: 'https://foo.bar?', query: {}}) //=> 'https://foo.bar'
 * stringifyUrl({url: 'https://foo.bar?foo=bar', query: {}}) //=> 'https://foo.bar?foo=bar'
 * 
 * 
 * @example stringify URL with fragment identifier
 * stringifyUrl({url: 'https://foo.bar', query: {top: 'foo'}, fragmentIdentifier: 'bar'}) //=>  'https://foo.bar?top=foo#bar'
 * stringifyUrl({url: 'https://foo.bar/xx', query: {foo: 'bar'}, fragmentIdentifier: 'top'}) //=>  'https://foo.bar/xx?foo=bar#top'
 * stringifyUrl({url: 'https://foo.bar/', query: {}, fragmentIdentifier: 'top'}) //=>  'https://foo.bar/#top'
 * stringifyUrl({url: 'https://foo.bar/#abc', query: {}, fragmentIdentifier: 'top'}) //=>  'https://foo.bar/#top'
 * stringifyUrl({url: 'https://foo.bar', query: {}}) //=>  'https://foo.bar'
 * stringifyUrl({url: 'https://foo.bar', query: {}, fragmentIdentifier: 'foo bar'}) //=> 'https://foo.bar#foo%20bar'
 */
export function stringifyUrl(obj: {
    url: string,
    query?: any;
    fragmentIdentifier?: string
}) {

    const parsed = Url(obj.url, true);
    parsed.set('query', Object.assign({}, parsed.query, obj.query || {}))
    parsed.set('hash', obj.fragmentIdentifier || parsed.hash)

    // let path = obj.url.split('?')[0];
    // let querystring = obj.url.split('?')[1] || '';
    // let hashString = obj.fragmentIdentifier || obj.url.split('#')[1] || ''

    // // 处理成对象
    // let addQuery = obj.query && Object.entries(obj.query).map(([k, v]) => Array.isArray(v) ? v.map(i => `${k}=${i}`).join('&') : `${k}=${v}`).join('&') || '';
    // if (querystring) {
    //     querystring = querystring.split('#')[0];
    // }

    // if (addQuery) {
    //     querystring = (querystring ? querystring + '&' : '') + addQuery
    // }

    // if (querystring) {
    //     querystring = '?' + querystring
    // }

    // if (hashString) {
    //     hashString = '#' + hashString;
    // }

    // return `${path}${querystring}${hashString}`



    return parsed.toString()

}

export default {
    stringifyUrl
}