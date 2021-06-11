import { expect } from 'chai'
import isPortFree from '../../src/node/isPortFree'
describe('isPortFree', async () => {

    it('isPortFree success', async () => {
        expect(await isPortFree(3000)).a('boolean')
    })

    it('isPortFree throw', async () => {

    })

    it('isPortFree fail', async () => {

    })
})