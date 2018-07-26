import { shallowMount } from "@vue/test-utils";
import Tabbar from "../index.vue";

describe("Tabbar", () => {
  const propsData = {
    tabbarPosition: "top"
  };
  const Wrapper = shallowMount(Tabbar, {
    propsData
  });

  it("tabbar props", () => {
    expect(Wrapper.props().tabbarPosition).toBe(propsData.tabbarPosition);
  });

  it("tabbar class", () => {
    expect(Wrapper.classes()).toContain("wu-tabbar-top");
  });
});
