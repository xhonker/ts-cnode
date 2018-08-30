<template>
  <div :class="className" @click="$parent.$emit('input',id)">
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

  get className() {
    return [
      `${prefixCls}`,
      {
        //@ts-ignore
        [`${prefixCls}-selected`]: this.id === this.$parent.value
      }
    ];
  }
}
</script>

<style lang='scss'>
@import "../../../style/index";
.wu-tabs-item {
  flex: 1;
  &-selected {
    color: $theme;
    position: relative;
    font-size: 14px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      width: 60%;
      bottom: 0;
      margin-left: 20%;
      border-bottom: 2px solid $theme;
      animation: selected 0.5s;
    }
  }
}

@keyframes selected {
  0% {
    margin-left: 10%;
  }
  50% {
    margin-left: 25%;
  }
  100% {
    margin-left: 20%;
  }
}
</style>
