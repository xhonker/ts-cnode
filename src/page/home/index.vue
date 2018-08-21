<template>
  <div class="wu-home">
    <nav-bar>
      首页
    </nav-bar>
    <div class="content">
      <tabs v-model="topicsTab">
        <tabs-item :id="tab.id" v-for="tab in topicTabs" :key="tab.id">{{tab.value}}</tabs-item>
      </tabs>
      <tab-container class="topics__item" @scroll="handlerScroll" ref="topicsContent">
        <tab-container-item class="tab__container__item" v-for="(topic, key) in topics" :key="key">
          <router-link :to="path.details(topic.id)">
            <topics-card :topics='topic' />
          </router-link>
        </tab-container-item>
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
    [TabContainer.name]: TabContainer,
    [TabContainerItem.name]: TabContainerItem,
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [TabsItem.name]: TabsItem,
    [TopicsCard.name]: TopicsCard
  },
  inject: ["path"]
})
export default class WuHome extends Vue {
  private page: number = 1;
  private contentHeight: number = 0;
  private showTop: boolean = false;
  private currentScrollTop: number = 0;
  private topicTabs: Array<TabsInfo> = topicTabs;
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
      this.requestTopics({ tab: this.topicsTab, page: this.page }); // 一定要判断有没有数据，否则切换TAB会触发到底部了。
  }
  get topicsTab(): string {
    return this.currentTab;
  }
  set topicsTab(tab: string) {
    this.page = 1;
    this.topicsChangeTab(tab);
    this.requestTopics({ tab, page: 1 });
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
    //@ts-ignore
    this.$refs.topicsContent.$el.setAttribute("style", `height:${h}px`);
  }
  beforeDestroy() {
    this.setTopicsScroll(this.currentScrollTop);
  }
}
</script>

<style lang='scss'>
.topics__item {
  overflow: scroll;
  background: rgb(238, 238, 238);
}
.tab__container__item {
  margin: 5px 7px;
}
.loading {
  overflow: hidden;
  animation: loading 1s infinite;
}
.icon-top {
  position: absolute;
  bottom: 80px;
  right: 20px;
  color: #108ee9;
  font-size: 40px !important;
}
@keyframes loading {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>
