<template>
  <div
    :class='[$style.tabsItem,{[$style.selected]:id === $parent.value}]'
    @click='$parent.$emit("input",id)'
  >
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
const prefixCls = "wu-tabs-item";

@Component
export default class TabsItem extends Vue {
  @Prop()
  private id!: string;
}
</script>

<style lang='scss' module>
@import "style/index";
.tabsItem {
  flex: 1;
}
.selected {
  color: $theme;
  position: relative;
  font-size: 14px;
  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 60%;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 2px solid $theme;
    animation: selected 0.5s ease-in-out;
  }
}
@keyframes selected {
  0% {
    transform: translateX(-40%);
  }
  50% {
    transform: translateX(-60%);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
