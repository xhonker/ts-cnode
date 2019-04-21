<template>
  <div class='wu-navbar'>
    <div @click='$emit("leftClick")' class='wu-navbar-left'>
      <slot name='left'></slot>
    </div>
    <div class='wu-navbar-content'>
      <slot></slot>
    </div>
    <div @click='$emit("rightClick")' class='wu-navbar-right'>
      <slot name='right'></slot>
    </div>
  </div>
</template> 

<script lang='ts'>
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
const prefixCls = "wu-navbar";

@Component
export default class NavBar extends Vue { }
</script>

<style lang='scss'>
@import "style/index";
.wu-navbar {
  position: relative;
  display: flex;
  height: 35px;
  width: 100%;
  user-select: none;
  font-size: 14px;
  color: #fff;
  align-items: center;
  overflow: hidden;
  background: $theme;
  &-left,
  &-right {
    position: absolute;
    border: 10px solid transparent;
    font-size: 10px;
    overflow: hidden;
  }
  &-left {
    left: 0;
  }
  &-right {
    right: 0;
  }
  &-content {
    flex: 1;
  }
}
</style>
