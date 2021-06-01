//@ts-ignore
import { expect } from 'chai'
import pregQuote from '../../src/regexp/pregQuote'
describe('pregQuote', async () => {

    it('pregQuote success', async () => {
        expect(pregQuote("\\.+*?[^]$(){}=!<>|:")).eq('\\\\\\.\\+\\*\\?\\[\\^\\]\\$\\(\\)\\{\\}\\=\\!\\<\\>\\|\\:');
        expect(pregQuote("*RRRING* Hello?")).eq('\\*RRRING\\* Hello\\?');
        expect(pregQuote("$40")).eq('\\$40');

    })

    it('pregQuote success', async () => {
        let parentheses = ['"', '"'];
        let reg = new RegExp(`${pregQuote(parentheses[0])}([^]*)${pregQuote(parentheses[1])}`, 'm');
        expect('"(1)"'.match(reg)![1]).eq('(1)')

    })

    it('pregQuote success', async () => {
        let parentheses = ['.', '.'];
        let reg = new RegExp(`${pregQuote(parentheses[0])}([^]*)${pregQuote(parentheses[1])}`, 'm');
        expect('.(.1.).'.match(reg)![1]).eq('(.1.)')

    })
})