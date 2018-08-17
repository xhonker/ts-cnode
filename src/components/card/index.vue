<template>
  <div class="wu-card">
    <div class="wu-card-container">
      <div class="wu-card__header">
        <slot name="header"></slot>
      </div>
      <div class="wu-card__body">
        <slot name="body"></slot>
      </div>
      <div class="wu-card__footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class Card extends Vue {}
</script>

<style lang='scss'>
.wu-card {
  background: #fff;
  color: #333;
  height: 100%;
  width: 100%;
  &-container {
    height: inherit;
    width: inherit;
    align-items: center;
    overflow: hidden;
  }
  &__header,
  &__body,
  &__footer {
    overflow: hidden;
  }
  &__body {
    // border-bottom: 1px solid #eee;
  }
}
</style>
