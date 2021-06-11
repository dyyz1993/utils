import { expect } from 'chai'
import sameOrigin from '../../src/url/sameOrigin'
describe('sameOrigin', async () => {

    it(`sameOrigin success`, async () => {
        const url1 = 'http://example.com/a.html';
        const url2 = 'http://example.com/b.html';
        expect(sameOrigin(url1, url2)).true
    })

    it(`sameOrigin port same success`, async () => {
        const url1 = 'http://example.com:80/a.html';
        const url2 = 'http://example.com/b.html';
        expect(sameOrigin(url1, url2)).true
    })

    it(`sameOrigin port diff success`, async () => {
        const url1 = 'http://example.com:900/a.html';
        const url2 = 'http://example.com/b.html';
        expect(sameOrigin(url1, url2)).false
    })

    it(`sameOrigin false`, async () => {
        const url1 = 'http://example.com/a.html';
        const url2 = 'http://example.com/b.html';
        const url3 = 'http://licia.liriliri.io';
        expect(sameOrigin(url1, url3)).false

    })
})