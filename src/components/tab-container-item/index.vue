<template>
  <div class="wu-tab-container-item" v-show="id === $parent.value">
    <slot></slot>
  </div>
</template> 

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class TabContainerItem extends Vue {
  @Prop() private id!: string;
}
</script>

<style lang='scss'>
</style>
