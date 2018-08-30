<template>
  <div :class="tabbarTabCls" @click="$parent.$emit('input',id)">
    <div class="wu-tabbar-tab-icon">
      <slot name="icon"></slot>
    </div>
    <div class="wu-tabbar-tab-title">
      <slot></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component, Prop, Provide, Emit } from "vue-property-decorator";

const prefixCls = "wu-tabbar-tab";

@Component
export default class WuTabbartab extends Vue {
  @Prop()
  private id!: string;

  get tabbarTabCls() {
    return [
      `${prefixCls}`,
      {
        // @ts-ignore
        [`${prefixCls}-is-selected`]: this.$parent.value === this.id
      }
    ];
  }
}
</script>

<style lang="scss">
@import "../../../style/index";
.wu-tabbar-tab {
  display: block;
  flex: 1;
  text-decoration: none;
  user-select: none;
  &-is-selected {
    color: $theme;
  }
  &-title {
    margin-top: 2px;
    font-size: 12px;
  }
}
</style>
