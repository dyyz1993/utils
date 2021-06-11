import { expect } from 'chai'
import ms from '../../src/time/ms'
describe('ms', async () => {

    it("ms('1ms')", async () => {
        expect(ms('1ms')).eq(1)
    })

    it(`ms('1s')`, async () => {
        expect(ms('1s')).eq(1000)
    })


    it(`ms('1m')`, async () => {
        expect(ms('1m')).eq(60000)
    })

    it(`ms('1h')`, async () => {
        expect(ms('1h')).eq(3600000)
    })

    it(`ms('1d')`, async () => {
        expect(ms('1d')).eq(86400000)
    })

    it(`ms('1y')`, async () => {
        expect(ms('1y')).eq(31557600000)
    })

    it(`ms('1000')`, async () => {
        expect(ms('1000')).eq(1000)
    })

    it(`ms(1000)`, async () => {
        expect(ms(1000)).eq('1s')
    })

    it(`ms(60000)`, async () => {
        expect(ms(60000)).eq('1m')
    })

})