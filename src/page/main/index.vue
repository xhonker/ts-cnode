<template>
  <div class="container">
    <tab-container v-model="selected">
      <tab-container-item id="home">
        <nav-bar @leftClick='hanlderLeftClick' @rightClick='hanlderRightClick'>
          <Icon slot="left" type='menu' />
          <Icon slot="right" type='message' /> 首页
        </nav-bar>
        <div class="content">
          <tabs v-model="tab">
            <tabs-item :id="tab.id" v-for="tab in topicTabs" :key="tab.id">{{tab.value}}</tabs-item>
          </tabs>
          <tab-container class="topics__item" :style="contentStyle" @scroll="handlerScroll" ref="topicsContent">
            <tab-container-item class="tab__container__item" v-for="(topic, key) in topics" :key="key">
              <router-link :to="path.details(topic.id)">
                <topics-card :topics='topic' />
              </router-link>
            </tab-container-item>
          </tab-container>
        </div>
      </tab-container-item>
      <tab-container-item id="edit">
        <edit />
      </tab-container-item>
    </tab-container>
    <wu-tabbar v-model="selected">
      <wu-tabbartab :id='tabbar.id' v-for=" tabbar in tabbars" :key="tabbar.id">
        <Icon slot="icon" :type='tabbar.id' />{{tabbar.value}}
      </wu-tabbartab>
    </wu-tabbar>
    <div class="iconfont icon-top" v-show="showTop" @click="$refs.topicsContent.$el.scrollTop=0"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import TabBar from "@/components/tabbar/index.vue";
import TabBarTab from "@/components/tabbar-item/index.vue";
import Icon from "@/components/icon/index.vue";
import TabContainer from "@/components/tab-container/index.vue";
import TabContainerItem from "@/components/tab-container-item/index.vue";
import NavBar from "@/components/navbar/index.vue";
import Tabs from "@/components/tabs/index.vue";
import TabsItem from "@/components/tabs-item/index.vue";
import TopicsCard from "@/components/topics-card/index.vue";
import Edit from "../edit/index.vue";
import {
  CHANGE__TAB,
  REQUEST__TOPICS,
  SET__TOPICS__SCROLL
} from "@/store/topics/type";
import { Action, Getter, State } from "vuex-class";
import { topic, tabs } from "@/store/interface/topics";
type requestTopics = (data?: { tab?: string; page?: number }) => never;

@Component({
  components: {
    [TabBar.name]: TabBar,
    [TabBarTab.name]: TabBarTab,
    [Icon.name]: Icon,
    [TabContainer.name]: TabContainer,
    [TabContainerItem.name]: TabContainerItem,
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [TabsItem.name]: TabsItem,
    [TopicsCard.name]: TopicsCard,
    [Edit.name]: Edit
  },
  inject: ["path"]
})
export default class Home extends Vue {
  private selected: string = "home";
  private page: number = 1;
  private contentHeight: number = 0;
  private showTop: boolean = false;
  private currentScrollTop: number = 0;
  // private
  @Action(REQUEST__TOPICS) requestTopics!: requestTopics;
  @Action(CHANGE__TAB) change$Tab!: (tab: string) => never;
  @Action(SET__TOPICS__SCROLL) setTopicsScroll!: (scrollTop: number) => never;
  @State(state => state.topics.topics)
  topics!: Array<topic>;
  @State(state => state.topics.topicTabs)
  topicTabs!: Array<tabs>;
  @State(state => state.topics.tabbars)
  tabbars!: Array<tabs>;
  @State(state => state.topics.topicsScroll)
  scroll!: number;
  @State(state => state.topics.currentTab)
  currentTab!: string;
  hanlderLeftClick() {
    console.log("left is click");
  }
  hanlderRightClick() {
    console.log(`right is click`);
  }
  handlerScroll(e: Event) {
    //@ts-ignore
    let { clientHeight, scrollTop, scrollHeight } = e.srcElement;
    this.currentScrollTop = scrollTop;
    let isBottom = scrollHeight - scrollTop === clientHeight;
    scrollTop > 400 ? (this.showTop = true) : (this.showTop = false);
    isBottom &&
      this.topics.length &&
      ++this.page &&
      this.requestTopics({ tab: this.tab, page: this.page }); // 一定要判断有没有数据，否则切换TAB会触发到底部了。
  }
  get contentStyle() {
    // ts 可以用 get set 来写vue计算属性 也是缓存的
    let h = document.documentElement.clientHeight - this.contentHeight;
    return `height:${h}px`;
  }
  get tab() {
    return this.currentTab;
  }
  set tab(tab) {
    this.page = 1;
    this.change$Tab(tab);
    this.requestTopics({ tab, page: 1 });
  }
  mounted() {
    !this.topics.length && this.requestTopics();
    //@ts-ignore
    this.$refs.topicsContent.$el.scrollTop = this.scroll;
    this.init();
  }
  init() {
    this.contentHeight =
      this.getElementAttr("wu-tabbar", "clientHeight") +
      this.getElementAttr("wu-navbar", "clientHeight") +
      this.getElementAttr("wu-tabs", "clientHeight");

    window.addEventListener("resize", () => {
      const t = document.querySelector(".topics__item");
      let h = document.documentElement.clientHeight - this.contentHeight;
      t!.setAttribute("style", `height:${h}px`);
    });
  }
  getElementAttr(el: string, attr: string): number {
    //@ts-ignore
    return document.querySelector(`.${el}`)[attr];
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
  color: #aaa;
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
