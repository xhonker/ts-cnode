interface myEvents {
  on(name: String, fn: Function): void;
  emit(name: String): void;
}

class myEvent implements myEvents {
  private list: Array<{ name; fn }> = [];
  on(name: String, fn: Function): void {
    this.list.push({ name, fn });
    console.log(this.list);
  }
  emit(name: String, ...arg: Array<Object>): void {
    this.list.map(data => {
      if (name === data.name) {
        data.fn(arg);
      }
    });
  }
}

let temps = new myEvent();

temps.on('test', d => {
  console.log('test', d);
});

temps.emit('test', { a: 1 }, { b: 2 });

interface API {
  '/user': { name: string };
  '/menu': { foods: Array<any> };
}
const get = <URL extends keyof API>(url: URL): Promise<API[URL]> => { // keyof 应用
  return fetch(url).then(res => res.json());
};

get('/menu').then(data => data.foods);

type DeepReadonly<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

const a = { foo: { bar: 22 } };
const b = a as DeepReadonly<typeof a>;
