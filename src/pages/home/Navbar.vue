<template>
  <div :class='$style.navbar'>
    <header :class='$style.header'>
      <div class='toolBar' ref='toolBar'>
        <icon :class='$style.iconUser' @click='handlerClickUser' type='user'/>
        <span :class='$style.toolBarTitle'>主页</span>
        <router-link :to='path.message()'>
          <icon :class='$style.iconMessage' type='message'/>
        </router-link>
      </div>
      <tabs v-model='topicsTab'>
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
export default class Navbar extends Vue {
  private page: number = 1;
  private showAside: boolean = false;

  @State(state => state.topics.currentTab) currentTab!: string;
  @Action(type.TOPICS__CHANGE__TAB) topicsChangeTab!: (tab: string) => void;
  mounted() {
    window.onscroll = this.handlerScroll;
  }
  handlerScroll() {
    if (!this.$refs.toolBar) return; // TODO：切换路由的时候有为空的时候
    let winPageY = window.pageYOffset;
    let diffX = winPageY - beforeScrollTop;
    if (winPageY > 500) {
      this.$emit('show');
    } else {
      this.$emit('hidden')
    }
    if (diffX > 0) {
      this.setToolBarStyle('height', '0px')
    } else {
      if (Math.abs(diffX) > 30) {
        this.setToolBarStyle('height', '60px')
      }
    }
    if (pageYOffset < 10) {
      this.setToolBarStyle('height', '60px')
    }
    beforeScrollTop = winPageY;
  }
  setToolBarStyle(prop: string, val: string) {
    //@ts-ignore
    this.$refs.toolBar.style[prop] = val;
  }
  handlerClickUser() {
    this.showAside = true;
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
.iconUser {
  margin-right: 20px;
}
.toolBarTitle {
  flex: 1;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  user-select: none;
}
</style>