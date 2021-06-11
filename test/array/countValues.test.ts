//@ts-ignore
import { expect } from 'chai'
import countValues from '../../src/array/countValues'
describe('countValues', async () => {

    it('countValues success', async () => {
        expect(countValues(['a', 'a', 'b', 'c'])['a']).eq(2);
        expect(countValues(['a', 'a', 'b', 'c'])['c']).eq(1);
    })

    it('countValues throw', async () => {

    })

    it('countValues fail', async () => {
        expect(countValues(['a', 'a', 'b', 'c'])['c']).not.eq(0);
        expect(countValues(['a', 'a', 'b', 'c'])['g']).eq(undefined);

    })
})