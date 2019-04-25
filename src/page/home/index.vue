<template>
  <div :class='$style.home'>
    <nav-bar>首页</nav-bar>
    <div :class='$style.content'>
      <tabs v-model='topicsTab'>
        <tabs-item :id='tab.id' :key='tab.id' v-for='tab in topicTabs'>{{tab.value}}</tabs-item>
      </tabs>
      <tab-container
        :style='styContent'
        @scroll='handlerScroll'
        @touchend='handlerTouchend'
        @touchmove='handlerTouchmove'
        @touchstart='handlerTouchStart'
        ref='topicsContent'
      >
        <tab-container-item
          :class='$style.tabContainerItem'
          :key='key'
          v-for='(topic, key) in topics'
        >
          <router-link :to='path.details(topic.id)'>
            <topics-card :topics='topic'/>
          </router-link>
        </tab-container-item>
        <scroll :loadMore='handlerLoad' :offset='160'>
          <Skeleton/>
          <Skeleton/>
        </scroll>
      </tab-container>
    </div>
    <transition name='scroll-top'>
      <div
        :class='["iconfont","icon-top",$style.iconTop]'
        @click='$refs.topicsContent.$el.scrollTop=0'
        v-show='showTop'
      ></div>
    </transition>
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
import Scroll from '@/components/scroll/index.vue'
import Skeleton from "./skeleton.vue";
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
    TopicsCard,
    Scroll,
    Skeleton
  },
  inject: ["path"]
})
export default class WuHome extends Vue {
  private page: number = 1;
  private showTop: boolean = false;
  private currentScrollTop: number = 0;
  private topicTabs: Array<TabsInfo> = topicTabs;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private contentH: number = 0;
  private calcTouch: number = 0;
  @Action(type.REQUEST__TOPICS) requestTopics!: requestTopics;
  @Action(type.TOPICS__CHANGE__TAB) topicsChangeTab!: (tab: string) => void;
  @Action(type.SET__TOPICS__SCROLL) setTopicsScroll!: (scrollTop: number) => void;
  @State(state => state.topics.topics) topics!: Array<TopicInfo>;
  @State(state => state.topics.topicsScroll) scroll!: number;
  @State(state => state.topics.currentTab) currentTab!: string;
  handlerScroll({ srcElement }: Event) {
    //@ts-ignore
    let { clientHeight, scrollTop, scrollHeight } = srcElement;
    this.currentScrollTop = scrollTop;
    this.showTop = scrollTop > 400;
  }
  handlerLoad() {
    this.requestTopics({ tab: this.topicsTab, page: ++this.page });
  }
  handlerTouchStart({ touches }: TouchEvent) {
    let { pageX } = touches[0];
    this.touchStartX = pageX;
  }
  handlerTouchmove({ touches }: TouchEvent) {
    let { pageX } = touches[0];
    this.touchEndX = pageX;
    let touchX = this.touchEndX - this.touchStartX;
    let isTouchX = Math.abs(touchX) < 50;
    if (isTouchX) return;
    this.calcTouch = touchX;
  }
  handlerTouchend() {
    let screenW = window.screen.width / 3;
    let isSlide = Math.abs(this.calcTouch) > screenW;
    isSlide && this.touchEndX > 0 ? this.touchSwitchTab() : this.resetTouchStatus();
  }
  touchSwitchTab() {
    let isFirstTab = this.tabIndex === 0 && this.calcTouch > 0;
    let isLastTab = this.tabIndex === topicTabs.length - 1 && this.calcTouch < 0;

    if (isFirstTab || isLastTab) {
      return this.resetTouchStatus();
    }
    let tabId = this.calcTouch > 0 ? this.tabIndex - 1 : this.tabIndex + 1;
    this.topicsTab = topicTabs[tabId].id;
    this.resetTouchStatus();
  }
  resetTouchStatus() {
    this.calcTouch = 0;
    this.touchEndX = 0;
    this.touchStartX = 0;
  }
  get calcTouchDist() {
    return this.touchStartX - this.touchEndX;
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
      height: `${this.contentH}px`,
      transform: `translateX(${this.calcTouch}px)`
    };
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

<style lang='scss' module>
@import "style/index";
.home {
  :global(.scroll-top-enter-active) {
    transition: all 0.3s ease;
  }
  :global(.scroll-top-leave-active) {
    transition: all 0.8s ease-in-out;
  }
  :global(.scroll-top-enter),
  :global(.scroll-top-leave-to) {
    opacity: 0;
  }
}
.content {
  overflow: hidden;
  background-color: #eee;
}
.tabContainerItem {
  margin: 5px 7px;
}
.iconTop {
  position: absolute;
  bottom: 80px;
  right: 20px;
  color: $theme;
  font-size: 40px !important;
}
</style>
