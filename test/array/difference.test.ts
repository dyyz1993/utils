//@ts-ignore
import { expect } from 'chai'
import difference from '../../src/array/difference'
describe('difference', async () => {

    it('difference success', async () => {
        expect(difference(['a', 'b', 'c', '2'], ['a', 'b', '3'])).members(['c', '2'])
        expect(difference(['a', 'b', 'c'], ['a', 'b', '2'])).members(['c'])
        expect(difference(['a', 'b'], ['a', 'b'])).length(0)
    })

    it('difference throw', async () => {

    })

    it('difference fail', async () => {

    })
})