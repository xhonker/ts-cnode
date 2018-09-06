<template>
  <transition name="toast">
    <div :class="toast" v-if="show">
      <div :class="iconCls" v-if="isLoading"></div>
      <div class="wu-toast-content">
        {{message}}
      </div>
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
  @Prop({ default: false })
  private isLoading!: boolean;
  @Prop({ default: "center" })
  private position!: string;
  mounted() {
    if (this.duration > 0) {
      setTimeout(() => {
        this.show = !this.show;
      }, this.duration);
    }
  }
  get iconCls() {
    return [
      "iconfont",
      {
        [`loading`]: this.isLoading
      }
    ];
  }
  get toast() {
    return [`${prefixCls}`, `${prefixCls}-${this.position}`];
  }
}
</script>

<style lang='scss'>
.wu-toast {
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  text-align: center;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  padding: 5px 10px;
  z-index: 1000;
  &-center {
    top: 50%;
  }
  &-top {
    top: 0;
  }
  &-content {
    font-weight: 200;
  }
  .loading {
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 5px;
    width: 20px;
    height: 20px;
    background: url("../../assets/img/loading.png") no-repeat;
    background-size: cover;
    animation: loading 1s linear infinite;
  }
}
@keyframes loading {
  to {
    transform: rotate(1turn);
  }
  from {
    transform: rotate(0);
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
