import { expect } from "chai";
import numberToUpper from "../../src/math/numberToUpper";
describe("numberToUpper", async () => {
  it(`1 == 壹元整`, async function () {
    expect(numberToUpper(1)).eq("壹元整");
  });
  it(`2 == 贰元整`, async function () {
    expect(numberToUpper(2)).eq("贰元整");
  });
});
