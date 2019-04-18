<template>
  <div class='wu-tab-container' v-on='$listeners'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TabContainer extends Vue {
  @Prop()
  private value!: string;
}
</script>

<style lang='scss'>
.wu-tab-container {
  height: 100%;
  overflow: auto;
}
</style>
