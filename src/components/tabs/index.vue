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
  display: flex;
  height: 30px;
  line-height: 30px;
  user-select: none;
  align-items: center;
  font-size: 12px;
  justify-content: center;
}
</style>
