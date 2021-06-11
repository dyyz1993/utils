import URL from 'url-parse'
/**
 * Check if two urls pass the same origin policy
 */
export default function sameOrigin(url1: string, url2: string) {
    let _url1 = new URL(url1);
    let _url2 = new URL(url2);

    let port1 = _url1.port || (_url1.protocol === 'https' ? "443" : "80");
    let port2 = _url2.port || (_url2.protocol === 'https' ? "443" : "80");

    return (
        _url1.protocol === _url2.protocol &&
        _url1.hostname === _url2.hostname &&
        port1 === port2
    );
};
