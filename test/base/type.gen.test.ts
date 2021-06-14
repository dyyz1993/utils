/** generate code from docs */
import { expect } from "chai";
import type from "../../src/base/type";
describe("type", async () => {
  it(`[] is array`, async function () {
    expect(type([])).eq("array");
  });
  it(`{} is object`, async function () {
    expect(type({})).eq("object");
  });
  it(`NaN is nan`, async function () {
    expect(type(NaN)).eq("nan");
  });
  it(`111 is number`, async function () {
    expect(type(111)).eq("number");
  });
  it(`undefined is undefined`, async function () {
    expect(type(undefined)).eq("undefined");
  });
  it(`null is null`, async function () {
    expect(type(null)).eq("null");
  });
  it(`false is boolean`, async function () {
    expect(type(false)).eq("boolean");
  });
  it(`function(){} is function`, async function () {
    expect(type(function () {})).eq("function");
  });
  it(`/\d/ is regexp`, async function () {
    expect(type(/\d/)).eq("regexp");
  });
  it(`symbol is symbol`, async function () {
    expect(type(Symbol())).eq("symbol");
  });
});
