<template>
  <div :class='$style.card'>
    <div :class='$style.cardContainer'>
      <div :class='$style.cardHeader'>
        <slot name='header'></slot>
      </div>
      <div :class='bodyCls'>
        <slot name='body'></slot>
      </div>
      <div :class='$style.cardFooter'>
        <slot name='footer'></slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
@Component
export default class Card extends Vue {
  @Prop() bodyBorder!: boolean;
  get bodyCls() {
    return [
      `${this.getClass('cardBody')}`,
      {
        [`${this.getClass('cardBodyBorder')}`]: this.bodyBorder
      }
    ];
  }
  getClass(className: string) {
    //@ts-ignore
    return this.$style[className];
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.card {
  background: #fff;
  color: #333;
  height: 100%;
  width: 100%;
}
.cardContainer {
  height: inherit;
  width: inherit;
  align-items: center;
  overflow: hidden;
}
.cardHeader,
.cardBody,
.cardFotter {
  overflow: hidden;
}
.cardBodyBorder {
  @include thinnerBorder();
}
</style>
