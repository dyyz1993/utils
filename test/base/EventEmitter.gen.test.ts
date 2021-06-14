/** generate code from docs */
import { expect } from "chai";
import EventEmitter from "../../src/base/EventEmitter";
describe("EventEmitter", async () => {
  it(`常规监听 on`, async function () {
    const event = new EventEmitter();
    let count = 0;
    event.on("q", function () {
      count++;
    });
    event.trigger("q");
    expect(count).eq(1);
    event.trigger("q");
    expect(count).eq(2);
  });
  it(`一次性监听 once`, async function () {
    const event = new EventEmitter();
    let count = 0;
    event.once("q", function () {
      count++;
    });
    event.trigger("q");
    expect(count).eq(1);
    event.trigger("q");
    expect(count).eq(1);
  });
  it(`移除监听 off`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn() {
      count++;
    }
    event.on("q", fn);
    event.trigger("q");
    expect(count).eq(1);
    event.off("q", fn);
    event.trigger("q");
    expect(count).eq(1);
  });
  it(`作用域不对无法移除 off`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn() {
      count++;
    }
    event.on("q", fn);
    event.trigger("q");
    expect(count).eq(1);
    event.off("q", fn, {});
    event.trigger("q");
    expect(count).eq(2);
  });
  it(`移除所有监听 offAll()`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn() {
      count++;
    }
    event.on("q", fn);
    event.on("q2", fn);
    event.trigger("q");
    event.trigger("q2");
    expect(count).eq(2);
    event.offAll();
    event.trigger("q");
    event.trigger("q2");
    expect(count).eq(2);
  });
  it(`传递参数 on('q',fn)`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn(a: number) {
      count += a;
    }
    event.on("q", fn);
    event.trigger("q", 5);
    expect(count).eq(5);
  });
  it(`传递作用域 on(name,fn,scope)`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn() {
      //@ts-ignore
      count += this.a;
    }
    event.on("q", fn, { a: 5 });
    event.trigger("q");
    expect(count).eq(5);
  });
  it(`移除某一类型的所有监听 offAll('name')`, async function () {
    const event = new EventEmitter();
    let count = 0;
    function fn() {
      count++;
    }
    event.on("q", fn);
    event.trigger("q");
    expect(count).eq(1);
    event.offAll("q");
    event.trigger("q");
    expect(count).eq(1);
  });
});
