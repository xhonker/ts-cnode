import Vue from "vue";
import ImgView from "./img-view.vue";
let imgView = Vue.extend(ImgView);

const el = document.createElement("div");

class UImgView {
  constructor(src: string, ele: HTMLImageElement) {
    document.body.appendChild(new imgView({ el, propsData: { src, ele } }).$el);
  }
}

export const ViewImg = (src: string, ele: HTMLImageElement) =>
  new UImgView(src, ele);
