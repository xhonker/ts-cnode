import { shallowMount } from "@vue/test-utils";
import TabbarItem from "../index.vue";

describe("tabbarItem", () => {
  const propsData = {
    id: "test"
  };

  const Wrapper = shallowMount(TabbarItem, {
    propsData
  });

  it("tabbarItem props", () => {
    expect(Wrapper.props().id).toBe(propsData.id);
  });

  it("tabbarItem emit", () => {
    Wrapper.vm.$emit("input", 1);
    expect(Wrapper.emitted("input")).toBeTruthy();
  });
});
