<template>
  <div
    :class='[$style.labelItem,{[$style.selected]:$parent.value === id}]'
    @click='$parent.$emit("input",id)'
  >
    <span>{{label}}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class Label extends Vue {
  @Prop() private id!: string;
  @Prop() private label!: string;
}
</script>

<style lang='scss' module>
@import "style/index";
.labelItem {
  display: inline-block;
  padding: 5px 8px;
  user-select: none;
  color: #a7b1bb;
  background: #eff3f4;
  border-radius: 4px;
  margin: 0 4px;
}
.selected {
  color: #fff;
  background: $theme;
}
</style>
