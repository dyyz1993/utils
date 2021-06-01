/**
 * 预转译字符串
 * @param str 
 * @param delimiter 
 * @returns 
 */
function pregQuote(str: string, delimiter = '') {
    return (str + '')
        .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&')
}
export default pregQuote;