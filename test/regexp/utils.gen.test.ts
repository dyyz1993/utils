import { expect } from "chai";
import { isTrainNum, isTrainNum2 } from "../../src/regexp/utils";
describe("utils", async () => {
  it("", async function () {
    expect(isTrainNum("G44")).eq(true);
  });
  it("", async function () {
    expect(isTrainNum2("G44")).eq(true);
  });
});
