import { expect } from 'chai'
import removeUndefined from '../../src/object/removeUndefined'
describe('removeUndefined', async () => {

    it(`移除未定义的属性`, async () => {
        expect(removeUndefined({ a: undefined, b: 1 })).to.be.ownProperty("b", 1)
    })

    it(`返回相同的引用`, async () => {
        let object = { a: undefined, b: 1 }
        expect(removeUndefined(object)).to.equals(object)
    })

    it(`返回相同不同的引用`, async () => {
        let object = { a: undefined, b: 1 }
        expect(removeUndefined(object, true)).to.not.equals(object)
    })
})