<template>
  <div :class='$style.navbar'>
    <header :class='$style.header'>
      <div class='toolBar' ref='toolBar'>
        <div @click='handlerClickUser'>
          <span :class='$style.avatarContainer' v-if='isLogin'>
            <img :class='$style.avatar' :src='avatar'>
          </span>
          <icon :class='$style.iconUser' type='user' v-else/>
        </div>
        <span :class='$style.toolBarTitle'>主页</span>
        <router-link :to='path.message()' v-if='isLogin'>
          <icon :class='$style.iconMessage' type='message'/>
        </router-link>
      </div>
      <tabs :class='$style.tabs' ref='tabs' v-model='topicsTab'>
        <tabs-item :id='tab.id' :key='key' v-for='(tab,key) in tabs'>{{tab.value}}</tabs-item>
      </tabs>
    </header>
    <slot></slot>
    <Aside :show='showAside'/>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
import { State, Action } from "vuex-class";
import * as type from "@/store/topics/type";
import Icon from "@/components/icon/index.vue";
import Tabs from "@/components/tabs/index.vue";
import TabsItem from "@/components/tabs-item/index.vue";
import Aside from './aside.vue';
import topicTabs from "./config";
import { TopicInfo } from '@/store/interface/topics';
import { LoginInfo } from '../../store/interface/user';

let beforeScrollTop = window.pageYOffset;
@Component({
  components: {
    Tabs,
    TabsItem,
    Icon,
    Aside
  },
  inject: ['path']
})
export default class HomeNavbar extends Vue {
  private page: number = 1;
  private showAside: boolean = false;
  @State(state => state.user) user!: LoginInfo;
  @State(state => state.topics.currentTab) currentTab!: string;
  @Action(type.TOPICS__CHANGE__TAB) topicsChangeTab!: (tab: string) => void;
  mounted() {
    window.onscroll = this.handlerScroll;
  }
  beforeDestroy() {
    window.onscroll = null;
  }
  handlerScroll() {
    if (!this.$refs.toolBar) return; // TODO：切换路由的时候有为空的时候
    let winPageY = window.pageYOffset;
    let diffX = winPageY - beforeScrollTop;
    if (winPageY > 1000) {
      this.$emit('show');
    } else {
      this.$emit('hidden')
    }
    if (diffX > 0) {
      this.setToolBarStyle('transform', 'translateY(-60px)');
    } else {
      if (Math.abs(diffX) > 30) {
        this.setToolBarStyle('transform', 'translateY(0px)');
      }
    }
    if (pageYOffset < 10) {
      this.setToolBarStyle('transform', 'translateY(0px)');
    }
    beforeScrollTop = winPageY;
  }

  setToolBarStyle(prop: string, val: string) {
    //@ts-ignore
    this.$refs.toolBar.style[prop] = val;
    //@ts-ignore
    this.$refs.tabs.$el.style[prop] = val;
  }
  handlerClickUser() {
    this.showAside = true;
  }
  get isLogin(): boolean {
    return !!this.user.accessToken;
  }
  get avatar(): string {
    return this.user.avatar_url;
  }
  get tabs() {
    return topicTabs;
  }
  get topicsTab(): string {
    return this.currentTab;
  }
  set topicsTab(tab: string) {
    this.topicsChangeTab(tab);
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.navbar {
  margin-top: 80px;
  :global(.toolBar) {
    display: flex;
    align-items: center;
    padding: 0 10px;
    text-align: left;
    height: 60px;
    line-height: 60px;
    background-color: $theme;
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: $fixed-zIndex;
  :global(.iconfont) {
    color: #fff;
  }
}
.iconUser,
.iconMessage {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
}
.toolBarTitle {
  margin-left: 20px;
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  user-select: none;
}
.avatar {
  pointer-events: none;
  width: 100%;
}
.avatarContainer {
  display: flex;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #eee;
}
.tabs {
  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>