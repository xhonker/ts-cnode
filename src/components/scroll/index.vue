<template>
  <div :class='$style.scroll' ref='node'>
    <slot v-if='loading'></slot>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component
export default class Scroll extends Vue {
  @Prop({ default: false }) useDocument!: boolean;
  @Prop({ default: 50 }) offset!: number;
  @Prop() loadMore!: Function;
  @State(state => state.request) loading!: boolean // 如果是vuex 需要 一个接口请求loading的状态
  mounted() {
    this.scrollContainer.addEventListener('scroll', this.handlerScroll);
    console.log(this.loading)
  }
  beforeDestroy() {
    this.scrollContainer.removeEventListener('scroll', this.handlerScroll);
  }
  handlerScroll({ target }: Event) {
    if (this.loading) return;
    let { clientHeight, scrollHeight, scrollTop } = this.scrollContainer;
    let _height = clientHeight + scrollTop;
    let _offsetHeight = scrollHeight - this.offset;
    if (_height >= _offsetHeight) {
      this.loadMore();
    }
  }
  get scrollContainer(): Element {
    //@ts-ignore
    return this.useDocument ? window : this.refsNode.parentNode;
  }
  get refsNode(): Element {
    //@ts-ignore
    return this.$refs.node;
  }
}
</script>
  
<style lang='scss' module>
.scroll {
}
</style>