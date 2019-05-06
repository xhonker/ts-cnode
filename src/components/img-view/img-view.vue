<template>
  <div :class='$style.imgView' @click='show = false' v-if='show'>
    <img :src='src'>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ImgView extends Vue {
  private show: boolean = true;
  @Prop() private src!: string;
  mounted() {
    this.$nextTick(() => {
      this.$el.scrollLeft = (this.$el.scrollWidth - this.$el.clientWidth) / 2;
    });
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.imgView {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  z-index: $fixed-zIndex;
  img {
    margin: auto;
  }
}
</style>
