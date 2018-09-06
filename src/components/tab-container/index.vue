<template>
  <div class="wu-tab-container" @scroll="handlerScroll" @touchmove="handlerTouchmove" @touchstart="handlerTouchstart" @touchend="handlerTouchend">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TabContainer extends Vue {
  @Prop()
  private value!: string;

  handlerScroll(e: Event) {
    this.$emit("scroll", e);
  }
  handlerTouchmove(e: TouchEvent) {
    this.$emit("touchmove", e);
  }
  handlerTouchstart(e: TouchEvent) {
    this.$emit("touchstart", e);
  }
  handlerTouchend(e: TouchEvent) {
    this.$emit("touchend", e);
  }
}
</script>

<style lang='scss'>
.wu-tab-container {
  height: 100%;
  overflow: scroll;
}
</style>
