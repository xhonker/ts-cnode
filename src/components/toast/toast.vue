<template>
  <transition name='toast'>
    <div :class='toast' v-if='show'>
      <div class='wu-toast-content'>{{message}}</div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import Icon from "@/components/icon/index.vue";
const prefixCls = "wu-toast";

@Component({
  components: {
    Icon
  }
})
export default class Toast extends Vue {
  private show: boolean = true;
  @Prop()
  private message!: string;
  @Prop({ default: 3000 })
  private duration!: number;
  @Prop({ default: "center" })
  private position!: string;
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.show = !this.show;
      }, this.duration);
    }
  }
  get toast() {
    return [`${prefixCls}`, `${prefixCls}-${this.position}`];
  }
}
</script>

<style lang='scss'>
.wu-toast {
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 12px;
  z-index: 1000;
  &-center {
    top: 50%;
  }
  &-top {
    top: 0;
  }
  &-content {
    display: inline-block;
    text-align: justify;
    margin: auto;
    padding: 5px 10px;
    max-width: 80%;
    font-weight: 200;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
  }
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.5s;
}
.toast-enter,
.toast-leave-to {
  opacity: 0;
}
</style>
