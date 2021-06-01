//@ts-ignore
import { expect } from 'chai';
import removeOuterParentheses from '../../src/string/removeOuterParentheses'
describe('removeOuterParentheses', async () => {

    it(' (1) success', async () => {
        let str2 = `(1)`;
        expect(removeOuterParentheses(str2)).members(["1"])
    })

    it(' ((1)) success', async () => {
        let str3 = `((1))`;
        expect(removeOuterParentheses(str3)).members(["(1)"])
    })

    it(' {((1))} success', async () => {
        let str3 = `{((1))}`;
        expect(removeOuterParentheses(str3, '', ['{', '}'])[0]).eq("((1))")
    })

    it(' "{((1))}" success', async () => {
        let str3 = `"{((1))}"`;
        expect(removeOuterParentheses(str3, '', ['"', '"'])[0]).eq("{((1))}")
    })

    it(' () success', async () => {
        let str = `()`;
        expect(removeOuterParentheses(str)).members([''])
    })

    it(' prefix  success', async () => {
        let str = `()expect(((
            
            1
            )))`;
        expect(removeOuterParentheses(str)[0].replace(/[\t\n\t\s]/g, '')).eq('')
        expect(removeOuterParentheses(str)[1].replace(/[\t\n\t\s]/g, '')).eq('((1))')
    })


    it('prefix expect  success', async () => {
        let str = `()expect(((
            1
            )))()`;
        expect(removeOuterParentheses(str, 'expect')).length(1)
        expect(removeOuterParentheses(str, 'expect')[0].replace(/[\t\n\t\s]/g, '')).eq('((1))')
    })
    it('prefix expect 2 () success', async () => {
        let str = `expect 2 ()`;
        expect(removeOuterParentheses(str, 'expect')).length(0)
    })


    it('prefix expect 2 success', async () => {
        let str = `it('prefix expect 2 success', async () => {
            let str = ()expect(((
                1
                )))();
            expect(removeOuterParentheses(str, 'expect')).length(1)
            expect(removeOuterParentheses(str, 'expect')[0].replace(/[\t\n\t\s]/g, '')).eq('((1))')
        })
    
        it('removeOuterParentheses throw', async () => {
            expect(removeOuterParentheses).throw()
        })`;
        let ret = removeOuterParentheses(str, 'expect')
        expect(ret).length(4)
        // expect(removeOuterParentheses(str, 'expect')[0].replace(/[\t\n\t\s]/g, '')).eq('((1))')
    })

    it('removeOuterParentheses throw', async () => {
        expect(removeOuterParentheses).throw()
    })

    it('removeOuterParentheses fail', async () => {
        expect(removeOuterParentheses(``)).members([])
    })
})