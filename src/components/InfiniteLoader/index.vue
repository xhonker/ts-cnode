<template>
  <div :class='$style.scroll' ref='node'>
    <slot v-if='loading'></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

interface ScrollProperty {
  clientHeight: number,
  scrollTop: number,
  scrollHeight: number,
}

@Component
export default class InfiniteLoader extends Vue {
  @Prop({ default: false }) private useDocument!: boolean;
  @Prop({ default: 50 }) private offset!: number;
  @Prop() private loadMore!: Function;
  @State(state => state.request) loading!: boolean // 如果是vuex 需要 一个接口请求loading的状态
  mounted() {
    this.scrollContainer.addEventListener('scroll', this.handlerScroll);
  }
  beforeDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.handlerScroll);
  }
  handlerScroll() {
    if (this.loading) return;
    let { clientHeight, scrollTop, scrollHeight } = this.getScrollProperty();
    let _height = clientHeight + scrollTop;
    let _offsetHeight = scrollHeight - this.offset;
    if (_height >= _offsetHeight) {
      this.loadMore();
    }
  }
  getScrollProperty(): ScrollProperty {
    if (this.scrollContainer === window) {
      return {
        clientHeight: window.innerHeight,
        scrollTop: window.pageYOffset || document.body.scrollTop,
        scrollHeight: document.body.scrollHeight || document.body.offsetHeight
      }
    }
    return this.scrollContainer as ScrollProperty;
  }
  get scrollContainer(): Element | Window {
    //@ts-ignore
    return this.useDocument ? window : this.$refs.node.parentNode;
  }
}
</script>
  
<style lang='scss' module>
.scroll {
}
</style>