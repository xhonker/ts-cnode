<template>
  <img :class='$style.image' :data-src='src' :src='placeholder' ref='img'>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
let observer: IntersectionObserver | null;
let observerNum: number = 0;

if (!('IntersectionObserver' in window)) {
  let script = document.createElement('script');
  script.src = 'https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver';
  document.body.appendChild(script);
}

@Component
export default class ImageLazy extends Vue {
  @Prop({ default: true }) private lazy!: boolean;
  @Prop() private fallback!: string;
  @Prop() private src!: string;
  @Prop({ default: "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" }) private placeholder!: string;
  mounted() {
    const $img = this.$refs.img;
    if (!this.lazy) {
      this.loadImg($img as HTMLImageElement);
      return;
    }
    if (!observer) {
      observer = new IntersectionObserver(this.handerIntersecationObserver, { threshold: 1 });
    }
    observer.observe($img as HTMLImageElement);
    observerNum++;
  }
  handerIntersecationObserver(entries: IntersectionObserverEntry[]) {
    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      if (entry.intersectionRatio > 0) {
        observer!.unobserve(entry.target);
        observerNum--;
        this.loadImg(entry.target as HTMLImageElement);

        if (observerNum === 0) {
          this.unObserve();
        }
      }
    }
  }
  unObserve() {
    observer!.disconnect();
    observer = null;
  }
  async loadImg(img: HTMLImageElement) {
    const src = img.dataset.src!;
    try {
      await this.fetchImage(src);
    } catch (error) {
      console.log("img loading errr  %o", error)
      return;
    }
    img.src = src;
  }
  fetchImage(url: string) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = resolve;
      image.onerror = reject;
    });
  }
}
</script>

<style lang='scss' module>
.image {
  background-color: #eee;
}
</style>