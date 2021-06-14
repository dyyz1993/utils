/** generate code from docs */
import { expect } from "chai";
import secretInfo from "../../src/encrypt/secretInfo";
describe("secretInfo", async () => {
  it(``, async function () {
    expect(secretInfo(123456789)).eq("123***789");
    expect(secretInfo(1234567)).eq("123*567");
  });
});
