function ago(time: Date) {
  const date3 = new Date().getTime() - new Date(time).getTime();
  const days = Math.floor(date3 / (24 * 3600 * 1000));

  // 计算出小时数
  const leave1 = date3 % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
  const hours = Math.floor(leave1 / (3600 * 1000));
  // 计算相差分钟数
  const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
  const minutes = Math.floor(leave2 / (60 * 1000));
  // 计算相差秒数
  const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
  const seconds = Math.round(leave3 / 1000);
  // alert(" 相差 " + days + "天 " + hours + "小时 " + minutes + " 分钟" + seconds + " 秒")
  if (days !== 0) {
    if (days > 365) {
      return `${Math.floor(days / 365)}年前`;
    } else if (days > 30) {
      return `${Math.floor(days / 30)}月前`;
    } else if (days < 0) {
      return "刚刚";
    }

    return `${days}天前`;
  } else if (hours !== 0) {
    return `${hours}小时前`;
  } else if (minutes !== 0) {
    return `${minutes}分钟前`;
  } else if (seconds !== 0) {
    return `${seconds}秒前`;
  } else if (seconds === 0) {
    return "刚刚";
  }
}
function getTab(tab: string) {
  switch (tab) {
    case "share":
      return "分享";
    case "ask":
      return "问答";
    case "good":
      return "精华";
    case "job":
      return "招聘";
    default:
      return "";
  }
}
export const publicMethods = {
  methods: {
    ago,
    getTab
  }
};
