/** generate code from docs */
import { expect } from "chai";
import outOfNum from "../../src/math/outOfNum";
describe("outOfNum", async () => {
  it(`outOfNum`, async function () {
    expect(outOfNum(100, 99)).eq("99+");
    expect(outOfNum(100, 1)).eq("1+");
    expect(outOfNum(-100, 1)).eq(-100);
    expect(outOfNum(10, 99)).eq(10);
  });
});
