type state = 'pending' | 'fulfilled' | 'rejected';
type resolve = number | string | boolean | symbol | object | IPromise;

interface iPromise {
  then(resolve: <T>(resolve: T) => T, reject?: Function): IPromise;
}

class IPromise implements iPromise {
  private _state: state;
  private _rejected: string;
  private _value: resolve;

  constructor(execute: Function) {
    this._state = 'pending';
    this._rejected = undefined;
    this._value = undefined;

    let resolve = (val: resolve) => {
      if (this._state === 'pending') {
        this._state = 'fulfilled';
        this._value = val;
      }
    };
    let reject = (val: resolve) => {
      if (this._state === 'pending') {
        this._state = 'rejected';
        this._value = val;
      }
    };
    try {
      execute(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(resolve: Function, reject?: Function): IPromise {
    let _ref;
    let promise2 = new IPromise(() => {});

    this._state === 'fulfilled' && (_ref = resolve(this._value));

    if (_ref instanceof IPromise) {
      promise2._state = _ref._state;
      promise2._value = _ref._value;
    } else {
      promise2._value = _ref;
      promise2._state = 'fulfilled';
    }
    reject && reject(this._rejected);

    return promise2;
  }
}

let temp = new IPromise(resolve => {
  resolve(1);
});

temp
  .then(data => data * 2)
  .then(data => data * 5)
  .then(data => console.log(data));

interface TAbc {
  getName(): string;
}

abstract class Animal {
  private name: string;
  constructor(name: string) {
    this.name = name;
  }
  move(): void {
    console.log(`${this.name} is move`);
  }
  getName(): string {
    return this.name;
  }
  abstract bark(): void;
}

class Dog extends Animal {
  constructor(name: string) {
    super(name);
  }
  bark(): void {
    console.log(`${this.getName()} bark wang wang wang`);
  }
}

class Cat extends Animal {
  constructor(name: string) {
    super(name);
  }
  bark(): void {
    console.log(`${this.getName()} bark miao miao miao`);
  }
}
let dog = new Dog('dog');
let cat = new Cat('cat');
dog.bark();
cat.bark();
dog.move();
cat.move();

enum Color {
  red,
  green,
  pick,
}
namespace Color {
  export function minColor() {
    Color.green;
  }
}
