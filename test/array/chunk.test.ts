import { expect } from 'chai'
import chunk from '../../src/array/chunk'
describe('chunk', async () => {

    it('chunk success', async () => {
        expect(chunk([1, 2])[0]).to.members([1])
        expect(chunk([1, 2])[1]).to.members([2])
    })

    it('chunk throw', async () => {

    })

    it('chunk fail', async () => {

    })
})