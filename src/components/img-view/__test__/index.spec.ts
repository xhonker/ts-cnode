import { mount } from "@vue/test-utils";
import ImgView from "../img-view.vue";
describe("imgView", () => {
  let view = mount(ImgView, {
    propsData: { src: "logo.png" }
  });
  it("show", () => {
    expect(view.props().src).toBe("logo.png");
    expect(view.vm.$data.show).toBe(true);
    expect(view.classes()).toContain("wu-imgView");
  });
  it("close", () => {
    view.element.click();
    expect(view.vm.$data.show).toBe(false);
    expect(view.html()).toBe(undefined);
  });
});
