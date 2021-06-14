/** generate code from docs */
import { expect } from "chai";
import getRate from "../../src/string/getRate";
describe("getRate", async () => {
  it(``, async function () {
    expect(getRate(5)).eq("★★★★★");
    expect(getRate(5, 6)).eq("★★★★★☆");
    expect(getRate(0)).eq("☆☆☆☆☆");
  });
});
