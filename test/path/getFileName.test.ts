//@ts-ignore
import { expect } from 'chai'
import getFileName from '../../src/path/getFileName'
describe('getFileName', async () => {

    it('getFileName success', async () => {
        let filename = getFileName('/test/string/removeOuterParentheses.test.ts', true)
        expect(filename).eq('removeOuterParentheses.test.ts');
    })

    it('getFileName isSuffix=true success', async () => {
        let filename = getFileName('/test/string/removeOuterParentheses.test.ts', false)
        expect(filename).eq('removeOuterParentheses.test');

    })

    it('getFileName fail', async () => {
        let filename = getFileName('/test/string/removeOuterParentheses')
        expect(filename).eq('removeOuterParentheses');
    })
})