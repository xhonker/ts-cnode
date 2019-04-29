<template>
  <div :class='$style.aside'>
    <div
      :class='$style.asideBackground'
      :style='asideBackground'
      @click='$parent.showAside = false'
      @touchmove.prevent
    ></div>
    <aside :class='$style.asideContent' :style='asideBase' @touchmove.prevent>
      <div :class='[$style.asideItem,$style.itemTop10]'>
        <image-lazy :class='$style.avatar' :src='avatar'/>
        <router-link :to='path.login()'>
          <span :class='$style.login'>登录</span>
        </router-link>
      </div>
      <div :class='[$style.asideItem,$style.itemTop10]'>
        <icon type='edit'/>
        <span :class='$style.asideItemText'>发布</span>
      </div>
      <div :class='$style.asideItem'>
        <icon type='message'/>
        <span :class='$style.asideItemText'>消息</span>
      </div>
      <div :class='[$style.asideItem,$style.itemTop10]'>
        设置
      </div>
      <div :class='$style.asideItem'>
        关于
      </div>
    </aside>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
import { State } from "vuex-class";
import Icon from "@/components/icon/index.vue";
@Component({
  components: {
    Icon
  },
  inject: ['path']
})
export default class Aside extends Vue {
  @Prop({ default: false }) private show!: boolean;
  @State(state => state.user.avatar_url) avatar!: string;
  get asideBase() {
    return {
      transform: `translateX(${this.transformX}vw)`,
    }
  }
  get asideBackground() {
    return {
      backgroundColor: `rgba(0,0,0,${this.background})`,
      transform: `translateX(${this.transformX}vw)`
    }
  }
  get transformX() {
    return this.show ? 0 : -100;
  }
  get background() {
    return this.show ? 0.4 : 0;
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.aside {
}
.fixed {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $fixed-zIndex;
}
.asideContent {
  @extend .fixed;
  width: 70vw;
  background-color: #f8f8f8;
  transition: all 0.5s ease;
}

.asideBackground {
  @extend .fixed;
  background-color: rgba($color: #000000, $alpha: 0);
  transition: background-color 1.5s ease;
}
.asideItem {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background-color: #fff;
  &:first-child {
    &::before {
      display: none;
    }
  }
  &:last-child {
    &::before {
      display: none;
    }
  }
  @include thinnerBorder();
}
.itemTop10 {
  margin-top: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.login {
  margin-left: 10px;
  font-size: 14px;
  color: #ababab;
}
.asideItemText {
  margin-left: 10px;
}
</style>