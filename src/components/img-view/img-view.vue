<template>
  <div class="wu-imgView" v-if="show" @click="show = false">
    <img :src="src">
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ImgView extends Vue {
  private show: boolean = true;
  @Prop()
  src!: string;
  mounted() {
    this.$nextTick(() => {
      this.$el.scrollLeft = (this.$el.scrollWidth - this.$el.clientWidth) / 2;
    });
  }
}
</script>

<style lang='scss'>
.wu-imgView {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  overflow: scroll;
  z-index: 1024;
  img {
    margin: auto;
  }
}
</style>
