export default {
  path: "/qrcode",
  name: "qrcode",
  component: () => import(/** webpackChunkName: "User" */'@/page/qrcode-login/index.vue'),
}