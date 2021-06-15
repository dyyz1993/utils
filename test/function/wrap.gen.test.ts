/** generate code from docs */
import { expect } from "chai";
import wrap from "../../src/function/wrap";
describe("wrap", async () => {
  it(``, async function () {
    function a(value: number) {
      return value;
    }
    const _A = wrap(a, function (fn: any, ...values) {
      return fn(...values) + 5;
    });
    expect(_A(5)).eq(10);
  });
});
