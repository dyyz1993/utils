import { expect } from "chai";
import merge from "../../src/object/merge";
describe("merge", async () => {
  it(`同名覆盖`, async function () {
    expect(merge({ a: 1 }, { a: 2 }).a).eq(2);
  });
  it(`深度混合`, async function () {
    expect(merge({ a: { a: 1 } }, { a: { v: 2 }, b: 2 }).a.v).eq(2);
    expect(merge({ a: { a: 1 } }, { a: { v: 2 }, b: 2 }).a.a).eq(1);
  });
  it(`数组覆盖`, async function () {
    expect(merge({ a: { a: 1 } }, { a: { a: [1] }, b: 2 }).a.a[0]).eq(1);
  });
  it(`多对象混合`, async function () {
    let obj = merge(
      { a: { a: 1 } },
      { a: { a: [1] }, b: 2 },
      { a: { c: 2 }, b: 3 }
    );
    expect(obj.a.c).eq(2);
    expect(obj.b).eq(3);
  });
});
