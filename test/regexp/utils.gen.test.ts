import { expect } from "chai";
import { isTrainNum, isHttpAndPort, isDecimal } from "../../src/regexp/utils";
describe("utils", async () => {
  it(``, async function () {
    expect(isTrainNum("G44")).eq(true);
  });
  it(`isHttpAndPort`, async function () {
    expect(isHttpAndPort("http://baidu.com:80/xx")).eq(true);
    expect(isHttpAndPort("http://baidu.com:80")).eq(true);
    expect(isHttpAndPort("ftp://baidu.com:80/xx")).eq(true);
    expect(isHttpAndPort("https://baidu.com:80/xx")).eq(true);
    expect(isHttpAndPort("https://baidu.com/xx")).eq(false);
  });
  it(`-11.00`, async function () {
    expect(isDecimal("-111.00")).eq(true);
    expect(isDecimal("111.0")).eq(true);
    expect(isDecimal("-111")).eq(false);
  });
});
