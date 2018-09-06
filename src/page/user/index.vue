<template>
  <div class="wu-user" v-if="userInfo.loginname">
    <nav-bar @leftClick="$router.go(-1)" @rightClick="logout">
      <icon slot="left" type='left' v-if="!my"></icon>
      <span slot="right" v-if="my" class="wu-user-logout">注销</span>
      {{ my ? my:'用户信息'}}
    </nav-bar>
    <div class="wu-user-container">
      <div class="wu-user-container__header">
        <img :src="userInfo.avatar_url" alt="">
        <div class="wu-user-container__header-info">
          <div class="wu-user-container__header-nickname">{{userInfo.loginname}}</div>
          <div class="wu-user-container__header-score">{{userInfo.score}}积分</div>
        </div>
        <span class="wu-user-container__header-time">注册时间{{ago(userInfo.create_at)}} </span>
      </div>
      <tabs v-model="userTab">
        <tabs-item id="replies">参与的话题</tabs-item>
        <tabs-item id="topics">发布的话题</tabs-item>
        <tabs-item id="collect">收藏</tabs-item>
      </tabs>
      <tab-container v-model="userTab" ref='content' @scroll="handerScroll">
        <tab-container-item id='replies' class="wu-user-replies">
          <topics-item v-for="(replie,key) in userInfo.recent_replies" :key="key" :topics='replie'></topics-item>
          <div v-if="!userInfo.recent_replies.length" class="user__no-data">
            <icon type='no-data'></icon>
          </div>

        </tab-container-item>
        <tab-container-item id='topics' class="wu-user-topics">
          <topics-item v-for="(topics,key) in userInfo.recent_topics" :key="key" :topics='topics'></topics-item>
          <div v-if="!userInfo.recent_topics.length" class="user__no-data">
            <icon type='no-data'></icon>
          </div>
        </tab-container-item>

        <tab-container-item id='collect' v-if="userTab === 'collect'">
          <div v-if="!userInfo.collect.length" class="user__no-data">
            <icon type='no-data'></icon>
          </div>
          <div class="wu-user__collect" v-if="userInfo.collect.length">
            <router-link :to='path.details(topic.id)' v-for="(topic,key) in userInfo.collect" :key="key">
              <topics-card :topics='topic' />
            </router-link>
          </div>
        </tab-container-item>
      </tab-container>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import { translationTime } from "@/mixins";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import Tabs from "@/components/tabs/index.vue";
import TabContainer from "@/components/tab-container/index.vue";
import TabContainerItem from "@/components/tab-container-item/index.vue";
import TabsItem from "@/components/tabs-item/index.vue";
import TopicsItem from "@/components/topics-item/index.vue";
import TopicsCard from "@/components/topics-card/index.vue";
import * as type from "@/store/user/type";
import { UserInfo, UserState } from "@/store/interface/user";
import { calcClientHeight, docH } from "@/utils";
type getUser = (loginname: string) => never;
type changeTab = (tab: string) => never;
type updateScroll = (scrollTop: number) => never;
@Component({
  components: {
    NavBar,
    Icon,
    Tabs,
    TabsItem,
    TabContainer,
    TabContainerItem,
    TopicsItem,
    TopicsCard
  },
  mixins: [translationTime],
  inject: ["path"]
})
export default class User extends Vue {
  private currentScrollTop: number = 0;
  @Prop()
  private loginname!: string;
  @Prop()
  private my!: string;
  @Action(type.GET__USER__INFO)
  getUserInfo!: getUser;
  @Action(type.CHANGE__USER__TAB)
  changeUserTab!: changeTab;
  @Action(type.UPDATE__USER__SCROLL)
  updateUserScroll!: updateScroll;
  @Action(type.USER__LOGOUT)
  logout!: () => never;
  @Action(type.GET__USER__COLLECT)
  getUserCollect!: (loginname: string) => void;
  @State(state => state.user.users)
  users!: Array<UserInfo>;
  @State(state => state.user)
  user!: UserState;
  async mounted() {
    !this.userInfo.loginname && (await this.getUserInfo(this.loginname));
    this.init();
    // @ts-ignore
    this.$refs.content.$el.scrollTop = this.user.scroll;
  }
  init() {
    //@ts-ignore
    this.$refs.content.$el.style.height = `${this.userContainerHeight()}px`;
  }
  userContainerHeight(): number {
    let userEles = [".wu-navbar", ".wu-user-container__header", ".wu-tabs"];
    let myELes = [
      ".wu-user .wu-navbar",
      ".wu-user-container__header",
      ".wu-user .wu-tabs",
      ".wu-tabbar"
    ];
    let calc = this.my ? calcClientHeight(myELes) : calcClientHeight(userEles);
    return docH - calc;
  }
  get userInfo() {
    return this.users.filter(d => d.loginname === this.loginname)[0] || {};
  }
  get userTab() {
    return this.user.tab;
  }
  set userTab(tab) {
    if (this.userTab === tab) return;
    tab === "collect" &&
      !this.userInfo.collect!.length &&
      this.getUserCollect(this.loginname);
    this.changeUserTab(tab);
  }
  handerScroll(el: Event) {
    //@ts-ignore
    let { clientHeight, scrollTop, scrollHeight } = el.srcElement;
    this.currentScrollTop = scrollTop;
  }
  destroyed() {
    this.updateUserScroll(this.currentScrollTop);
  }
}
</script>

<style lang='scss'>
.wu-user {
  &-replies,
  &-topics {
    margin: 10px;
  }
  &-container {
    &__header {
      display: flex;
      align-items: center;
      padding: 10px 10px 0;
      &-nickname {
        font-size: 18px;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 4px;
      }
      &-time {
        flex: 1;
        text-align: right;
        font-size: 10px;
        color: #bbb;
      }
      &-info {
        margin-left: 10px;
        text-align: left;
      }
      &-score {
        margin-top: 5px;
        font-size: 12px;
        color: #ddd;
      }
    }
  }
  &__collect {
    padding: 5px 7px;
    background: rgb(238, 238, 238);
  }
}
.user__no-data {
  margin-top: 20px;
  .icon-no-data {
    font-size: 30px;
    color: #cbcbcc;
    &::after {
      content: "暂无数据";
      display: block;
      font-size: 14px;
    }
  }
}
</style>
