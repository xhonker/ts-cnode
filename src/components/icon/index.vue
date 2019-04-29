<template>
  <i :class="className" v-on="$listeners"></i>
</template>

<script lang='ts'>
import { Vue, Component, Prop } from "vue-property-decorator";
const prefixCls = "iconfont";

@Component
export default class Icon extends Vue {
  @Prop()
  private type!: string;

  get className() {
    return [`${prefixCls}`, `icon-${this.type}`];
  }
}
</script>
