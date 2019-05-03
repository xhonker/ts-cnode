import { shallowMount } from "@vue/test-utils";
import Toast from "../toast.vue";
import { toast } from "../";

describe("Toast", () => {
  let test = shallowMount(Toast, { propsData: { message: "test" } });
  it("toast vue template", () => {
    expect(test.props().message).toBe("test");
  });
  it("show", () => {
    let show = toast.show("test");
    expect(show.$el.className).toContain("wu-toast");
    expect(show.$el.textContent).toContain("test");
  });
});
