
/**
 * 检验常用的类型
 * @param str 
 * @param type 
 * @example phone
 * strCheck('13751880081','phone') //=> true
 */
export default function strCheck(str: string, type: 'phone' | 'tel' | 'card' | 'pwd' | 'postal' | 'qq' | 'email' | 'money' | 'url' | 'ip' | 'number' | 'date' | 'english' | 'chinese' | 'lower' | 'upper' | 'html'): boolean {
    switch (type) {
        // 手机号码
        case 'phone':
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        // 座机
        case "tel":
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        // 身份证
        case 'card':
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        case 'pwd':
            return /^[a-zA-Z]\w{5,17}$/.test(str);
        // 邮政编码
        case "postal":
            return /[1-9]\d{5}(?!\d)/.test(str);
        // QQ号
        case 'qq':
            return /^[1-9][0-9]{4,9}$/.test(str);
        // 邮箱
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        // 金额(小数点2位)
        case 'money':
            return /^-?\d*(?:\.\d{0,2})?$/.test(str);
        // 网址
        case 'url':
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
        // IP
        case 'ip':
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        // 日期时间
        case 'date':
            return (
                /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) ||
                /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str)
            );
        // 数字
        case 'number':
            return /^[0-9]$/.test(str);
        // 英文
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        // 中文
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        // 小写
        case 'lower':
            return /^[a-z]+$/.test(str);
        // 大写
        case 'upper':
            return /^[A-Z]+$/.test(str);
        // HTML标记
        case 'html':
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return false;
    }
}
