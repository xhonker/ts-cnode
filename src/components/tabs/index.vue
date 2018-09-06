<template>
  <div class="wu-tabs">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Tabs extends Vue {
  @Prop()
  private value!: string;
}
</script>

<style lang='scss'>
.wu-tabs {
  position: relative;
  display: flex;
  height: 30px;
  line-height: 30px;
  user-select: none;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  background: #fff;
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: 0;
    box-shadow: 0px 1px 2px #aaa;
    z-index: 99;
  }
}
</style>
