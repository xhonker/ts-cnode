<template>
  <div class="wu-home">
    <nav-bar>首页</nav-bar>
    <div class="content">
      <tabs v-model="topicsTab">
        <tabs-item :id="tab.id" v-for="tab in topicTabs" :key="tab.id">{{tab.value}}</tabs-item>
      </tabs>
      <tab-container
        class="topics__item"
        :style="styContent"
        @scroll="handlerScroll"
        ref="topicsContent"
        @touchmove="handlerTouchmove"
        @touchstart="handlerTouchStart"
        @touchend="handlerTouchend"
      >
        <tab-container-item class="tab__container__item" v-for="(topic, key) in topics" :key="key">
          <router-link :to="path.details(topic.id)">
            <topics-card :topics="topic"/>
          </router-link>
        </tab-container-item>
        <div :class="notTab" v-if="isShowSlideTips">别闹</div>
      </tab-container>
    </div>
    <div class="iconfont icon-top" v-show="showTop" @click="$refs.topicsContent.$el.scrollTop=0"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import TabContainer from "@/components/tab-container/index.vue";
import TabContainerItem from "@/components/tab-container-item/index.vue";
import NavBar from "@/components/navbar/index.vue";
import Tabs from "@/components/tabs/index.vue";
import TabsItem from "@/components/tabs-item/index.vue";
import TopicsCard from "@/components/topics-card/index.vue";
import * as type from "@/store/topics/type";
import { Action, Getter, State } from "vuex-class";
import { TopicInfo, TabsInfo } from "@/store/interface/topics";
import { calcClientHeight, docH } from "@/utils";
import topicTabs from "./config";
type requestTopics = (data?: { tab?: string; page?: number }) => void;

@Component({
  components: {
    TabContainer,
    TabContainerItem,
    NavBar,
    Tabs,
    TabsItem,
    TopicsCard
  },
  inject: ["path"]
})
export default class WuHome extends Vue {
  private page: number = 1;
  private showTop: boolean = false;
  private currentScrollTop: number = 0;
  private topicTabs: Array<TabsInfo> = topicTabs;
  private touchstart: number = 0;
  private touchend: number = 0;
  private contentH: number = 0;
  private touchRight: number | null = null;
  private touchLeft: number | null = null;
  @Action(type.REQUEST__TOPICS)
  requestTopics!: requestTopics;
  @Action(type.TOPICS__CHANGE__TAB)
  topicsChangeTab!: (tab: string) => void;
  @Action(type.SET__TOPICS__SCROLL)
  setTopicsScroll!: (scrollTop: number) => void;
  @State(state => state.topics.topics)
  topics!: Array<TopicInfo>;
  @State(state => state.topics.topicsScroll)
  scroll!: number;
  @State(state => state.topics.currentTab)
  currentTab!: string;
  handlerScroll(e: Event) {
    //@ts-ignore
    let { clientHeight, scrollTop, scrollHeight } = e.srcElement;
    this.currentScrollTop = scrollTop;
    let isBottom = scrollHeight - scrollTop === clientHeight;
    scrollTop > 400 ? (this.showTop = true) : (this.showTop = false);
    isBottom &&
      this.topics.length &&
      ++this.page &&
      this.requestTopics({ tab: this.topicsTab, page: this.page });
  }
  handlerTouchStart(e: TouchEvent) {
    this.touchend = 0;
    this.touchstart = e.touches[0].pageX;
  }
  handlerTouchmove(e: TouchEvent) {
    this.touchend = e.touches[0].pageX;
    console.log("​WuHome -> handlerTouchmove -> this.calcTouchDist", this.calcTouchDist);
    if (Math.abs(this.calcTouchDist) < 30) return;
    //@ts-ignore
    this.calcTouchDist > 0
      ? (this.touchRight = this.calcTouchDist)
      : (this.touchLeft = Math.abs(this.calcTouchDist));
  }
  handlerTouchend(e: TouchEvent) {
    let screenW = window.screen.width / 3;
    let isSlide = Math.abs(this.calcTouchDist) > screenW;
    isSlide && this.touchend > 0 ? this.touchSwitchTab() : this.resetTouch();
  }
  touchSwitchTab() {
    let tab;
    if (this.tabIndex === 0 && this.calcTouchDist < 0) return this.resetTouch();
    if (this.tabIndex === topicTabs.length - 1 && this.calcTouchDist > 0)
      return this.resetTouch();
    this.calcTouchDist > 0
      ? (tab = topicTabs[this.tabIndex + 1].id)
      : (tab = topicTabs[this.tabIndex - 1].id);
    this.topicsTab = tab;
    this.resetTouch();
  }
  resetTouch() {
    this.touchLeft = null;
    this.touchRight = null;
  }
  get calcTouchDist() {
    return this.touchstart - this.touchend;
  }
  get topicsTab(): string {
    return this.currentTab;
  }
  set topicsTab(tab: string) {
    this.page = 1;
    this.topicsChangeTab(tab);
    this.requestTopics({ tab, page: 1 });
  }
  get styContent() {
    return {
      // height: `${this.contentH}px`,
      right: this.touchRight ? `${this.touchRight}px` : null,
      left: this.touchLeft ? `${this.touchLeft}px` : null
    };
  }
  get notTab() {
    return [
      `topics__item-notab`,
      {
        [`topics__item-notab-left`]: this.tabIndex === 0,
        [`topics__item-notab-right`]: this.tabIndex === topicTabs.length - 1
      }
    ];
  }
  get isShowSlideTips() {
    return this.tabIndex === 0 || this.tabIndex === topicTabs.length - 1;
  }
  get tabIndex() {
    return topicTabs.findIndex(d => d.id === this.topicsTab);
  }
  mounted() {
    !this.topics.length && this.requestTopics();
    this.init();
    //@ts-ignore
    this.$refs.topicsContent.$el.scrollTop = this.scroll;
  }
  init() {
    let temp = [".wu-tabbar", ".wu-navbar", ".wu-tabs"];
    let h = docH - calcClientHeight(temp);
    this.contentH = h;
  }
  beforeDestroy() {
    this.setTopicsScroll(this.currentScrollTop);
  }
}
</script>

<style lang='scss'>
@import "../../../style/index";
.wu-home {
  display: flex;
  flex-direction: column;
  height: inherit;
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
  }
  .wu-navbar {
    flex: 0 0 auto;
  }
}
.topics__item {
  position: relative;
  overflow: scroll;
  background: rgb(238, 238, 238);
  &-notab {
    position: fixed;
    top: 45%;
    width: 1px;
    color: #ddd;
    font-size: 14px;
    &-left {
      margin-left: -15vw;
    }
    &-right {
      margin-left: 110vw;
    }
  }
}
.tab__container__item {
  margin: 5px 7px;
}
.icon-top {
  position: absolute;
  bottom: 80px;
  right: 20px;
  color: $theme;
  font-size: 40px !important;
}
</style>
