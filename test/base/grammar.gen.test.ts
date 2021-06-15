/** generate code from docs */
import { expect } from "chai";
import { _parseInt, _toString } from "../../src/base/grammar";
describe("grammar", async () => {
  it(`除了“0、1”外，其它数字都不是有效二进制数字`, async function () {
    expect(_parseInt("1", 2)).eq(1);
    expect(_parseInt("0", 2)).eq(0);
    expect(_parseInt("2", 2)).NaN;
    expect(_parseInt("3", 2)).NaN;
  });
  it(`radix = 1 ,不是有效的数据,  2 到 36`, async function () {
    expect(_parseInt("1", 1)).NaN;
    expect(_parseInt("0", 1)).NaN;
  });
  it(`radix = 0 ｜ undefined, 3种解析; 0x => 16 , 0 => 10 ,其他值开头，默认10进制`, async function () {
    expect(_parseInt("1", 0)).eq(1);
    expect(_parseInt("1")).eq(1);
    expect(_parseInt("F")).NaN;
    expect(_parseInt("F", 16)).eq(15);
    expect(_parseInt("0xF")).eq(15);
    expect(_parseInt("0010")).eq(10);
  });
  it(`拓展题 https://juejin.cn/post/6973498008360976398?utm_source=gold_browser_extension`, async function () {
    let ret = ["1", "2", "3"].map(_parseInt);
    expect(ret[0]).eq(1);
    expect(ret[1]).NaN;
    expect(ret[2]).NaN;
  });
  it(``, async function () {
    expect(2 + 1).eq(3);
    expect("s" + 2).eq("s2");
    expect(2 + "s").eq("2s");
  });
});
