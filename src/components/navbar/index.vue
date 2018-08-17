<template>
  <div class="wu-navbar">
    <div class="wu-navbar-left" @click="$emit('leftClick')">
      <slot name="left"></slot>
    </div>
    <div class="wu-navbar-content">
      <slot></slot>
    </div>
    <div class="wu-navbar-right" @click="$emit('rightClick')">
      <slot name="right"></slot>
    </div>
  </div>
</template> 

<script lang='ts'>
import { Vue, Prop, Component, Emit } from "vue-property-decorator";
const prefixCls = "wu-navbar";

@Component
export default class NavBar extends Vue {}
</script>

<style lang='scss'>
.wu-navbar {
  display: flex;
  height: 35px;
  width: 100%;
  user-select: none;
  font-size: 14px;
  color: #fff;
  align-items: center;
  overflow: hidden;
  background: #108ee9;
  &-left,
  &-right {
    font-size: 10px;
    flex: 1;
    overflow: hidden;
  }
  &-left {
    text-align: left;
    margin-left: 10px;
  }
  &-right {
    text-align: right;
    margin-right: 10px;
  }
  &-content {
    // flex: 3;
  }
}
</style>
