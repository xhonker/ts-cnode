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
      </tab-container>
    </div>
    <div
      :class='["iconfont","icon-top",$style.iconTop]'
      @click='$refs.topicsContent.$el.scrollTop=0'
      v-show='showTop'
    ></div>
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
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private touchEndX: number = 0;
  private contentH: number = 0;
  private calcTouch: number = 0;
  private isScroll: boolean = false;
  @Action(type.REQUEST__TOPICS) requestTopics!: requestTopics;
  @Action(type.TOPICS__CHANGE__TAB) topicsChangeTab!: (tab: string) => void;
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
    this.isScroll = true;
    let isBottom = scrollHeight - scrollTop === clientHeight;
    scrollTop > 400 ? (this.showTop = true) : (this.showTop = false);
    isBottom &&
      this.topics.length &&
      ++this.page &&
      this.requestTopics({ tab: this.topicsTab, page: this.page });
  }
  handlerTouchStart({ touches }: TouchEvent) {
    let { pageX, pageY } = touches[0];
    this.touchStartX = pageX;
    this.touchStartY = pageY;
  }
  handlerTouchmove({ touches }: TouchEvent) {
    let { pageX, pageY } = touches[0];
    this.touchEndX = pageX;
    let touchEndY = pageY;
    let touchY = this.touchStartY - touchEndY;
    if (Math.abs(touchY) < 50) {
      this.isScroll = false;
    }

    if (this.isScroll) return;
    if (Math.abs(this.calcTouchDist) < 15) return;
    this.calcTouch = ~(this.touchStartX - this.touchEndX) + 1; // 取反
  }
  handlerTouchend() {
    let screenW = window.screen.width / 3;
    let isSlide = Math.abs(this.calcTouch) > screenW;
    isSlide && this.touchEndX > 0 ? this.touchSwitchTab() : this.resetTouch();
    this.calcTouch = 0;
    this.touchStartY = 0;
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
    this.calcTouch = 0;
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
