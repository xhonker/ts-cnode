<template>
  <div :class="labelItemCls" @click="$parent.$emit('input',id)">
    <span>{{label}}</span>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
const prefixCls = "wu-label-item";
@Component
export default class Label extends Vue {
  @Prop() private id!: string;
  @Prop() private label!: string;
  get labelItemCls() {
    return [
      `${prefixCls}`,
      {
        // @ts-ignore
        [`${prefixCls}-selected`]: this.$parent.value === this.id
      }
    ];
  }
}
</script>

<style lang='scss'>
.wu-label-item {
  display: inline-block;
  padding: 5px 8px;
  user-select: none;
  color: #a7b1bb;
  background: #eff3f4;
  border-radius: 4px;
  margin: 0 4px;
  &-selected {
    color: #fff;
    background: #108ee9;
  }
}
</style>
