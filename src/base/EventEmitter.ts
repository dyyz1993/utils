//https://github.com/IFmiss/d-utils/blob/master/src/lib/event/index.ts

interface IListener {
  callback: Function
  scope: any
  isOnce?: boolean
}
/**
 * @example 常规监听 on 
 * const event = new EventEmitter();
 * let count = 0;
 * event.on('q',function(){count++})
 * event.trigger('q')
 * count //=> 1
 * event.trigger('q')
 * count //=> 2
 * @example 一次性监听 once
 * const event = new EventEmitter();
 * let count = 0;
 * event.once('q',function(){count++})
 * event.trigger('q')
 * count //=> 1
 * event.trigger('q')
 * count //=> 1
 * @example 移除监听 off
 * const event = new EventEmitter();
 * let count = 0;
 * function fn(){count++}
 * event.on('q',fn)
 * event.trigger('q')
 * count //=> 1
 * event.off('q',fn)
 * event.trigger('q')
 * count //=> 1
 * @example 作用域不对无法移除 off
 * const event = new EventEmitter();let count = 0;function fn(){count++}
 * event.on('q',fn);event.trigger('q');
 * count //=> 1
 * event.off('q',fn,{});event.trigger('q');
 * count //=> 2
 * 
 * @example 移除某一类型的所有监听 offAll('name')
 * const event = new EventEmitter();let count = 0;function fn(){count++}
 * event.on('q',fn);event.trigger('q');
 * count //=> 1
 * event.offAll('q');event.trigger('q');
 * count //=> 1
 * @example 移除所有监听 offAll()
 * const event = new EventEmitter();let count = 0;function fn(){count++}
 * event.on('q',fn);event.on('q2',fn);event.trigger('q');event.trigger('q2')
 * count //=> 2
 * event.offAll();event.trigger('q');event.trigger('q2')
 * count //=> 2
 * @example 传递参数 on('q',fn)
 * const event = new EventEmitter();let count = 0;function fn(a:number){count+=a}
 * event.on('q',fn);event.trigger('q',5);
 * count //=> 5
 * @example 传递作用域 on(name,fn,scope)
 * const event = new EventEmitter();let count = 0;
 * function fn(){
 *  //@ts-ignore
 *  count+=this.a
 * }
 * event.on('q',fn,{a:5});event.trigger('q');
 * count //=> 5
 */
export default class EventEmitter {
  private $_listeners: { [key: string]: IListener[] } = {}
  constructor() {
  }

  on(name: string, callback: Function, scope: any = null) {
    this.$_listeners[name] = this.$_listeners[name] || [];
    this.$_listeners[name].push({
      callback,
      scope
    });
  }

  off(name: string, callback: Function, scope: any = null) {
    const listeners = this.$_listeners[name];
    if (Array.isArray(listeners)) {
      listeners.forEach((listener, index) => {
        // 移除作用域，回调函数一样的监听器
        if (listener.scope === scope && listener.callback === callback) {
          listeners.splice(index, 1)
        }
      })
    }
  }

  offAll(name?: string) {
    // 移除所有监听
    if (name === undefined) {
      this.$_listeners = {};
    } else {
      this.$_listeners[name] = [];
    }
  }

  once(name: string, callback: Function, scope: any = null) {
    this.$_listeners[name] = this.$_listeners[name] || [];
    this.$_listeners[name].push({
      callback,
      scope,
      isOnce: true
    });
  }

  trigger(name: string, ...params: any[]) {
    const listeners = this.$_listeners[name];
    if (Array.isArray(listeners) && listeners.length > 0) {
      listeners.forEach(listener => {
        if (listener && listener.callback instanceof Function) {
          const scope = listener.scope
          listener.callback.apply(scope, params)
          // 移除一次性监听
          if (listener.isOnce) {
            this.off(name, listener.callback, listener.scope)
          }
        }
      });
    }
  }

}