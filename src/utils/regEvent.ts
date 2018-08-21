import { ViewImg } from "@/components/img-view/index";
/**
 * 事件注册
 * 处理点击用户以及图片
 */
export const regEvent = () => {
  document.querySelector("#app")!.addEventListener("click", e => {
    let ev = e || window.event;
    let target = ev.target;
    //@ts-ignore
    if (target.nodeName.toLowerCase() === "a") {
      // @ts-ignore
      if (~target.textContent.indexOf("@")) {
        // 如果是用户 则阻止跳转
        // @ts-ignore
        let user = target.textContent.replace("@", ""); // @xhonker
        e.preventDefault();
        window.location.href = `${window.location.origin}/#/user/${user}`;
      }
    }
    // @ts-ignore
    if (target.nodeName.toLowerCase() === "img") {
      //@ts-ignore
      ViewImg(target.currentSrc);
    }
  });
};
