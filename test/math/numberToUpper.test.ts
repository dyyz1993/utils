import { expect } from 'chai'
import numberToUpper from '../../src/math/numberToUpper'
describe('numberToUpper', async () => {
    it(`numberToUpper(9999999999) === '玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整'`, function () {
        expect(numberToUpper(9999999999)).eq("玖拾玖亿玖仟玖佰玖拾玖万玖仟玖佰玖拾玖元整")
    });
    it(`numberToUpper(0) === '零元整'`, function () {
        expect(numberToUpper(0)).eq("零元整")
    });
    it(`numberToUpper(-235423545) === '欠贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元整'`, function () {
        expect(numberToUpper(-235423545)).eq("欠贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元整")
    });
    it(`numberToUpper(2354235.45) === '欠贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元整'`, function () {
        expect(numberToUpper(-235423545)).eq("欠贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元整")
    });
    it(`numberToUpper(2354235.4508) === '贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元肆角伍分捌厘'`, function () {
        expect(numberToUpper(235423545.4508)).eq("贰亿叁仟伍佰肆拾贰万叁仟伍佰肆拾伍元肆角伍分捌厘")
    });
    it(`numberToUpper(-99.99) === '欠玖拾玖元玖角玖分'`, function () {
        expect(numberToUpper(-99.99)).eq("欠玖拾玖元玖角玖分")
    });
})