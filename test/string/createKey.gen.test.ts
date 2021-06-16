/** generate code from docs */
import { expect } from "chai";
import createKey from "../../src/string/createKey";
describe("createKey", async () => {
  it(`createKey('abc', 'def')`, async function () {
    expect(createKey("abc", "def")).eq("abcDef");
    expect(createKey("abc", "default")).eq("abc");
  });
});
