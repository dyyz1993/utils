import { expect } from 'chai'
import forOf from '../../src/array/forOf'
describe('forOf', async () => {

    it(`return true break`, async () => {
        let count = 0;
        forOf([1, 2, 3], (item) => {
            count++;
            return item == 2
        })
        expect(count).eq(2);
    })

    it(`return false `, async () => {
        let count = 0;
        forOf([1, 2, 3], () => {
            count++;
            return false
        })
        expect(count).eq(3);
    })


    it(`not return`, async () => {
        let count = 0;
        forOf([1, 2, 3], () => {
            count++;
        })
        expect(count).eq(3);
    })
})