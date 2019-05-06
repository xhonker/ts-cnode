<template>
  <div :class='$style.notfound'>
    <p :class='$style.notFoundContent'>404 页面未找到</p>
    <router-link :class='$style.home' to='/'>回到首页</router-link>
    <a :class='$style.issues' href='https://github.com/xhonker/ts-cnode/issues/new'>问题反馈</a>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class NotFound extends Vue {}
</script>

<style lang='scss' module>
@import "style/index";
.notfound {
}
.notFoundContent {
  margin: 0;
  padding: 10px;
  font-size: 16px;
  font-weight: 700;
  @include thinnerBorder();
}
.home,
.issues {
  display: inline-block;
  padding: 8px;
  margin: 10px;
  color: #fff;
  font-size: 12px;
  background-color: $theme;
  border-radius: 4px;
  box-shadow: 0 0 5px $theme;
}
</style>