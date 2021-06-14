import { expect } from 'chai'

import filterQuery from '../../src/url/filterQuery'
describe('filterQuery', async () => {

    it(`过滤url参数`, async () => {
        let url = 'http://aa.com/?a=1&code=2';
        let resUrl = 'http://aa.com/?a=1';
        expect(filterQuery(['code'], {}, url)).to.be.eq(resUrl)
    })
    it(`拼接参数`, async () => {
        let url = 'http://aa.com/?a=1&code=2';
        let resUrl = 'http://aa.com/?a=1&b=2&code=2';
        expect(filterQuery([], { b: 2 }, url)).to.be.eq(resUrl)
        expect(filterQuery(['b'], { b: 2 }, url)).to.be.eq(resUrl)
        expect(filterQuery(['c'], { b: 2 }, url)).to.be.eq(resUrl)
    })
    it(`过滤url参数且拼接参数`, async () => {
        let url = 'http://aa.com/?a=1&code=2#?code=1';
        let resUrl = 'http://aa.com/?a=1&b=2#?code=1';
        expect(filterQuery(['code'], { b: 2 }, url)).to.be.eq(resUrl)
        expect(filterQuery(['code'], { code: 3 }, url)).to.be.eq('http://aa.com/?a=1&code=3#?code=1')
    })
    it(`拼接参数同名参数-覆盖`, async () => {
        let url = 'http://aa.com/?a=1&code=2';
        let resUrl = 'http://aa.com/?a=1&code=3';
        expect(filterQuery([], { code: 3 }, url)).to.be.eq(resUrl)
    })

    it(`hash 无法识别参数`, async () => {
        let url = 'http://aa.com/#xxx?a=1&code=2';
        let resUrl = 'http://aa.com/?code=3#xxx?a=1&code=2';
        expect(filterQuery(['code'], { code: 3 }, url)).to.be.eq(resUrl)
    })
})