<template>
  <div :class='$style.home'>
    <temp-nav-bar @hidden='showTop = false' @show='showTop= true'>
      <tab-container
        :class='$style.content'
        :style='tabContentStyle'
        @touchend='handlerTouchend'
        @touchmove='handlerTouchmove'
        @touchstart='handlerTouchStart'
        ref='topicsContent'
      >
        <router-link
          :class='$style.tabContainerItem'
          :key='key'
          :to='path.details(topic.id)'
          v-for='(topic, key) in topics'
        >
          <topics-card :topics='topic'/>
        </router-link>
        <scroll :loadMore='handlerLoad' :offset='160' useDocument>
          <Skeleton/>
          <Skeleton/>
        </scroll>
      </tab-container>
    </temp-nav-bar>
    <transition name='scroll-top'>
      <div :class='["iconfont","icon-top",$style.iconTop]' @click='scrollToTop' v-show='showTop'></div>
    </transition>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import TabContainer from "@/components/tab-container/index.vue";
import TabContainerItem from "@/components/tab-container-item/index.vue";
import TopicsCard from "@/components/topics-card/index.vue";
import Scroll from '@/components/scroll/index.vue'
import tempNavBar from "./Navbar.vue";
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
    TopicsCard,
    Scroll,
    Skeleton,
    tempNavBar,
  },
  inject: ["path"]
})
export default class Home extends Vue {
  private page: number = 1;
  private showTop: boolean = false;
  private currentScrollTop: number = 0;
  private touchStartX: number = 0;
  private touchEndX: number = 0;
  private contentH: number = 0;
  private calcTouch: number = 0;
  @State(state => state.topics.topics) topics!: Array<TopicInfo>;
  @State(state => state.topics.currentTab) currentTab!: string;
  @State(state => state.topics.topicsScroll) scroll!: number;
  @Action(type.TOPICS__CHANGE__TAB) topicsChangeTab!: (tab: string) => void;
  @Action(type.SET__TOPICS__SCROLL) setTopicsScroll!: (scrollTop: number) => void;
  @Action(type.REQUEST__TOPICS) requestTopics!: requestTopics;
  mounted() {
    !this.topics.length && this.requestTopics();
    window.scrollTo(0, this.scroll);
  }
  beforeDestroy() {
    this.setTopicsScroll(this.currentScrollTop);
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
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  get tabContentStyle() {
    return {
      transform: `translateX(${this.calcTouch}px)`
    };
  }
  get tabIndex() {
    return topicTabs.findIndex(d => d.id === this.topicsTab);
  }
  get topicsTab(): string {
    return this.currentTab;
  }
  set topicsTab(tab: string) {
    this.page = 1;
    this.topicsChangeTab(tab);
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
  display: block;
  margin: 5px 7px;
}
.iconTop {
  position: fixed;
  bottom: 80px;
  right: 20px;
  color: $theme;
  font-size: 40px !important;
  z-index: $fixed-zIndex;
}
</style>
