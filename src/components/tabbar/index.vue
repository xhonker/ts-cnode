<template>
  <div :class="className">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Provide } from "vue-property-decorator";

const prefixCls = "wu-tabbar";
type postion = "top" | "bottom";

@Component
export default class WuTabbar extends Vue {
  @Prop({ default: "bottom" })
  private tabbarPosition!: postion;

  @Prop() private value!: string;

  get className() {
    return [`${prefixCls}`, `${prefixCls}-${this.tabbarPosition}`];
  }
}
</script>

<style lang='scss'>
.wu-tabbar {
  position: fixed;
  display: flex;
  width: 100%;
  height: 50px;
  background: #fff;
  align-items: center;
  &-top {
    top: 0;
  }
  &-bottom {
    bottom: 0;
  }
}
</style>
