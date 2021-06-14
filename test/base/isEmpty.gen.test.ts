/** generate code from docs */
import { expect } from "chai";
import isEmpty from "../../src/base/isEmpty";
describe("isEmpty", async () => {
  it(`null is isEmpty`, async function () {
    expect(isEmpty(null)).eq(true);
  });
  it(`'null' is isEmpty`, async function () {
    expect(isEmpty("null")).eq(true);
  });
  it(`0 is isEmpty`, async function () {
    expect(isEmpty(0)).eq(true);
  });
  it(`'0' is isEmpty`, async function () {
    expect(isEmpty("0")).eq(true);
  });
  it(`false is isEmpty`, async function () {
    expect(isEmpty(false)).eq(true);
  });
  it(`'false' is isEmpty`, async function () {
    expect(isEmpty("false")).eq(true);
  });
  it(`'undefined' is isEmpty`, async function () {
    expect(isEmpty("undefined")).eq(true);
  });
  it(`undefined is isEmpty`, async function () {
    expect(isEmpty(undefined)).eq(true);
  });
  it(`[] is isEmpty`, async function () {
    expect(isEmpty([])).eq(true);
  });
  it(`{} is isEmpty`, async function () {
    expect(isEmpty({})).eq(true);
  });
  it(`'{}' is isEmpty`, async function () {
    expect(isEmpty("{}")).eq(true);
  });
  it(`'[]' is isEmpty`, async function () {
    expect(isEmpty("[]")).eq(true);
  });
});
