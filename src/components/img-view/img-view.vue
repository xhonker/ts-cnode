<template>
  <div class="imgView" v-if="show" @click="handlerClick">
    <img :src="src" :style="imgStyle">
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";

@Component
export default class ImgView extends Vue {
  private show: boolean = true;
  //@ts-ignore
  private x: number = this.ele.x;
  //@ts-ignore
  private y: number = this.ele.y;
  //@ts-ignore
  private naturalWidth: number = this.ele.clientWidth;
  //@ts-ignore
  private naturalHeight: number = this.ele.clientHeight;
  @Prop()
  src!: string;
  @Prop()
  ele!: HTMLImageElement
  mounted() {
    this.$nextTick(() => {
      let { x, y, clientHeight, clientWidth, naturalHeight, naturalWidth } = this.ele;
      let docE = document.documentElement;
      let isH = naturalHeight > docE.clientHeight;

      let multiple = Number.parseFloat((docE.clientHeight / naturalHeight).toFixed(2));

      this.naturalWidth = isH ? naturalWidth * multiple : naturalWidth;
      this.naturalHeight = isH ? naturalHeight * multiple : naturalHeight;

      this.x = (docE.clientWidth - this.naturalWidth) / 2;
      this.y = (docE.clientHeight - this.naturalHeight) / 2;
    })
  }
  get imgStyle() {
    return {
      transform: `translate3d(${this.x < 30 ? 30 : this.x}px,${this.y < 30 ? 30 : this.y}px,0)`,
      width: `${this.naturalWidth}px`,
      height: `${this.naturalHeight}px`
    }
  }
  handlerClick() {
    let { x, y, clientHeight, clientWidth } = this.ele;
    this.x = x;
    this.y = y;
    this.naturalWidth = clientWidth;
    this.naturalHeight = clientHeight;
    setTimeout(() => {
      this.show = !this.show;
    }, 300);
  }
}
</script>

<style lang='scss'>
.imgView {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  overflow: scroll;
  z-index: 9999;
  transition: background-color 0.3s ease-in-out;
  img {
    padding-bottom: 30px;
    padding-right: 30px;
    transition: all 0.3s ease-in-out;
    cursor: zoom-out;
  }
}
</style>
