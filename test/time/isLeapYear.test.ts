import { expect } from 'chai'
import isLeapYear from '../../src/time/isLeapYear'
describe('isLeapYear', async () => {

    it(`isLeapYear(2008) should return true`, function () {
        expect(isLeapYear(2008)).true
    });
    it(`isLeapYear(2012) should return true`, function () {
        expect(isLeapYear(2012)).true
    });
    it(`isLeapYear(2016) should return true`, function () {
        expect(isLeapYear(2016)).true
    });
    it(`isLeapYear(2020) should return true`, function () {
        expect(isLeapYear(2020)).true
    });
    it(`isLeapYear(2024) should return true`, function () {
        expect(isLeapYear(2024)).true
    });
    it(`isLeapYear(2017) should return false`, function () {
        expect(isLeapYear(2017)).to.false
    });
    it(`isLeapYear(2018) should return false`, function () {
        expect(isLeapYear(2018)).to.false
    });
    it(`isLeapYear(2019) should return false`, function () {
        expect(isLeapYear(2019)).to.false
    });
    it(`isLeapYear(2000) should return true`, function () {
        expect(isLeapYear(2000)).to.true
    });
    it(`isLeapYear(3000) should return false`, function () {
        expect(isLeapYear(3000)).to.false
    });
})