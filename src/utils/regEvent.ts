import { ViewImg } from "@/components/img-view/index";
/**
 * 事件注册
 * 处理点击用户以及图片
 */
export const regEvent = () => {
  document.querySelector("#app")!.addEventListener("click", (e: Event) => {
    let ev = e || window.event;
    let target = ev.target;
    // @ts-ignore
    let isRelativeURL = target.host === window.location.host;
    //@ts-ignore
    if (target.nodeName.toLowerCase() === "a") {
      // @ts-ignore
      if (isRelativeURL && ~target.textContent.indexOf("@")) {
        // @ts-ignore
        let user = target.textContent.replace("@", ""); // @xhonker
        e.preventDefault();
        let { origin, pathname } = location;
        location.href = `${origin}${pathname}#/user/${user}`;
      }
    }
    // @ts-ignore
    if (target.nodeName.toLowerCase() === "img") {
      //@ts-ignore
      ViewImg(target.currentSrc);
    }
  });
};
