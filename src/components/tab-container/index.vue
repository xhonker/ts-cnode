<template>
  <div class="wu-tab-container" @scroll="handlerScroll">
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
}
</script>

<style lang='scss'>
.wu-tab-container {
  height: 100%;
  overflow: scroll;
}
</style>
