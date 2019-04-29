import Vue from "vue";
import Router, { RouteConfig } from "vue-router";
Vue.use(Router);
let isDev = process.env.NODE_ENV === 'development';
let routes: Array<RouteConfig> = [];
//@ts-ignore
let registerRouter = require.context("./pages", true, /_router\.ts$/i);
registerRouter.keys().forEach((fileName: string) => {
  let file = registerRouter(fileName).default;
  if (file.private && !isDev) return; // 如果是开发环境不就打包本地测试的路由
  routes.push(file);
})

export default new Router({
  routes
})
