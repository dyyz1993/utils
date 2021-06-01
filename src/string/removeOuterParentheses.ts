import pregQuote from "../regexp/pregQuote";
/**
 * 移除最外层闭合元素
 * @param S sss
 * @returns sss
 */
function removeOuterParentheses(S: string, prefix: string = '', parentheses: string[] = ['(', ')']) {
    let res = '', count = 0, stack = [], index = 0;

    if (parentheses[0] === parentheses[1]) {
        let reg = new RegExp(`${pregQuote(parentheses[0])}([^]*)${pregQuote(parentheses[1])}`, 'm');
        let ret = S.match(reg)
        if (ret && ret[1]) {
            stack.push(ret[1])
        }
    } else {
        for (let s of S) {
            if (count === 0) {
                if (Array(...prefix)[index] === s) {
                    index++;
                    continue;
                }
            }
            if (index === prefix.length) {
                if (s === parentheses[0]) {
                    count++;
                    if (count > 1) res += s;
                } else if (s === parentheses[1]) {
                    count--
                    if (count === 0) {
                        stack.push(res)
                        res = '';
                        index = 0;
                    } else {
                        res += s;
                    }
                } else if (count > 0) {
                    res += s;
                } else {
                    index = 0;
                }
            }
        }
    }

    return stack
};

export default removeOuterParentheses;