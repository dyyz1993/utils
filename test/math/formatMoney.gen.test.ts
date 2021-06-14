import { expect } from "chai";
import formatMoney from "../../src/math/formatMoney";
describe("formatMoney", async () => {
  it(`1000`, async function () {
    expect(formatMoney(1000)).eq("1,000");
  });
  it(`100`, async function () {
    expect(formatMoney(100)).eq("100");
  });
  it(`100000`, async function () {
    expect(formatMoney(100000)).eq("100,000");
  });
  it(`1000000`, async function () {
    expect(formatMoney(1000000)).eq("1,000,000");
  });
  it(`10000.01`, async function () {
    expect(formatMoney(10000.01)).eq("10,000.01");
  });
  it(`10000.00`, async function () {
    expect(formatMoney(10000.0)).eq("10,000");
  });
});
