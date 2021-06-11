import { expect } from 'chai'
import intersect from '../../src/array/intersect'
describe('intersect', async () => {

    it('intersect success', async () => {
        expect(intersect(['1', '2', '3'], ['1', '2'])).members(['1', '2'])
    })
    it('intersect success', async () => {
        expect(intersect(['1', '2', '3'], ['1', '2'], ['3'])).members([])
        expect(intersect(['1', '2', '3'], ['1', '2'], ['2'])).members(['2'])
    })

    it('intersect throw', async () => {

    })

    it('intersect fail', async () => {

    })
})