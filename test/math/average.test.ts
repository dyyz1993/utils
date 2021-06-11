import { expect } from 'chai'
import average from '../../src/math/average'
describe('average', async () => {

    it('average success', async () => {
        expect(average(1, 3, 5)).eq(3)
    })

    it('average throw', async () => {

    })

    it('average fail', async () => {
        expect(average(1, 3, 4)).not.eq(3)

    })
})