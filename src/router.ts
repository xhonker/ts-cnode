import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
Vue.use(Router);

let isDev = process.env.NODE_ENV === 'development';
let routes: Array<RouteConfig> = [];
let match: RouteConfig;
interface IRouteConfig extends RouteConfig {
  private: boolean; // 添加一个自定义属性
}

//@ts-ignore
let registerRouter = require.context("./pages", true, /_router\.ts$/i);
registerRouter.keys().forEach((fileName: string) => {
  let file: IRouteConfig = registerRouter(fileName).default;
  if (file.private && !isDev) return; // 如果是开发环境不就打包本地测试的路由
  if (file.path === '*') {
    match = file;
    return;
  }
  routes.push(file);
})

match! && routes.push(match!); // 如果是通配 确保在最后

export default new Router({
  routes
})
