import { expect } from 'chai'
import lottery from '../../src/biz/lottery'
describe('lottery', async () => {

    it(`过滤 空奖品 `, async () => {
        let gifts = [
            { name: 'prize1', rate: 10, count: 1 },
            { name: 'prize2', rate: 10, count: 1 },
            { name: 'prize3', rate: 10, count: 0 }
        ]
        expect(lottery(gifts, { isFilterEmpty: true })).to.not.property('name', 'prize3')
    })

    it(`不过滤空奖品`, async () => {
        let gifts = [
            { name: 'prize1', rate: 10, count: 0 },
            { name: 'prize2', rate: 10, count: 1 },
            { name: 'prize3', rate: 10, count: 0 }
        ]
        expect(lottery(gifts)).to.property('name').oneOf(gifts.map(i => i.name))
    })

    it(`概率奖品数量为0`, async () => {
        let gifts = [
            { name: 'prize1', rate: 0, count: 10 },
            { name: 'prize2', rate: 0, count: 10 },
            { name: 'prize3', rate: 0, count: 10 }
        ]
        expect(lottery(gifts)).to.null
    })

    it(`所有奖品数量为0`, async () => {
        let gifts = [
            { name: 'prize1', rate: 10, count: 0 },
            { name: 'prize2', rate: 10, count: 0 },
            { name: 'prize3', rate: 10, count: 0 }
        ]
        expect(lottery(gifts, { isFilterEmpty: true })).to.null
    })

    it(`options.rateKey 设置不对`, async () => {
        let gifts = [
            { name: 'prize1', rate2: 10, count: 0 },
            { name: 'prize2', rate2: 10, count: 0 },
            { name: 'prize3', rate2: 10, count: 0 }
        ]
        expect(lottery(gifts)).to.null
    })
})