import Vue from "vue";
import vToast from "./toast.vue";

const NToast = Vue.extend(vToast);
const el = document.createElement("div");

interface IToast {
  loading(message: string): void;
  show(data: IToastData): void;
  hide(): void;
  clear(): void;
}

type position = "center" | "top";

interface IToastData {
  message?: string;
  duration?: number;
  show?: boolean;
  icon?: string;
  position?: position;
}
class Toast implements IToast {
  private _toast: any;
  private queue: Array<any> = [];
  private createToast(data: IToastData) {
    let toast = new NToast({ el, propsData: { ...data } });
    this._toast = toast;
    document.body.appendChild(toast.$el);
    this.queue.push(toast);
  }
  show(data: IToastData): void {
    this.createToast(data);
  }
  hide(): void {
    this.queue[this.queue.length - 1].show = false;
    this.queue.pop();
  }
  clear(): void {
    this.queue.map(toast => (toast.show = false));
  }
  loading(message: string) {
    this.createToast({ icon: "loading", message, duration: 0 });
  }
}

export const toast = new Toast();
