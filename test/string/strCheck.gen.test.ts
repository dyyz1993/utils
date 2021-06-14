/** generate code from docs */
import { expect } from "chai";
import strCheck from "../../src/string/strCheck";
describe("strCheck", async () => {
  it(`phone`, async function () {
    expect(strCheck("13751880081", "phone")).eq(true);
  });
});
