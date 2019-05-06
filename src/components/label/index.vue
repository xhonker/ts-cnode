<template>
  <div class='label'>
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Label extends Vue {
  @Prop() private value!: string;
}
</script>
