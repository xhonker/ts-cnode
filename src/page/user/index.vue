<template>
  <div :class='$style.user' v-if='userInfo.loginname'>
    <nav-bar @leftClick='$router.go(-1)' @rightClick='logout'>
      <icon slot='left' type='left' v-if='!my'></icon>
      <span :class='$style.userLogout' slot='right' v-if='my'>注销</span>
      {{ my ? my:'用户信息'}}
    </nav-bar>
    <div :class='$style.userContainer'>
      <div :class='$style.userContainerHeader'>
        <image-lazy :class='$style.userAvatar' :src='userInfo.avatar_url'/>
        <div :class='$style.userContainerHeaderInfo'>
          <div :class='$style.userContainerHeaderNickname'>{{userInfo.loginname}}</div>
          <div :class='$style.userContainerHeaderScore'>{{userInfo.score}}积分</div>
        </div>
        <span :class='$style.userContainerHeaderTime'>注册时间{{ago(userInfo.create_at)}}</span>
      </div>
      <tabs v-model='userTab'>
        <tabs-item id='replies'>参与的话题</tabs-item>
        <tabs-item id='topics'>发布的话题</tabs-item>
        <tabs-item id='collect'>收藏</tabs-item>
      </tabs>
      <tab-container @scroll='handerScroll' ref='content' v-model='userTab'>
        <tab-container-item :class='$style.userReplies' id='replies'>
          <topics-item :key='key' :topics='replie' v-for='(replie,key) in userInfo.recent_replies'></topics-item>
          <div :class='$style.userNoData' v-if='!userInfo.recent_replies.length'>
            <icon type='no-data'></icon>
          </div>
        </tab-container-item>
        <tab-container-item :class='$style.userTopics' id='topics'>
          <topics-item :key='key' :topics='topics' v-for='(topics,key) in userInfo.recent_topics'></topics-item>
          <div :class='$style.userNoData' v-if='!userInfo.recent_topics.length'>
            <icon type='no-data'></icon>
          </div>
        </tab-container-item>

        <tab-container-item id='collect' v-if='userTab === "collect"'>
          <div :class='$style.userNoData' v-if='!userInfo.collect.length'>
            <icon type='no-data'></icon>
          </div>
          <div :class='$style.userCollect' v-if='userInfo.collect.length'>
            <router-link
              :key='key'
              :to='path.details(topic.id)'
              v-for='(topic,key) in userInfo.collect'
            >
              <topics-card :topics='topic'/>
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
import { publicMethods } from "@/mixins";
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
  mixins: [publicMethods],
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
    let userEles = [".wu-navbar", `${this.getStyle('userContainerHeader')}`, ".wu-tabs"];
    let myELes = [
      `${this.getStyle('user')} .wu-navbar`,
      `${this.getStyle("userContainerHeader")}`,
      `${this.getStyle('user')} .wu-tabs`,
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
  getStyle(className: string) {
    //@ts-ignore
    return `.${this.$style[className]}`;
  }
}
</script>

<style lang='scss' module>
.user {
  position: relative;
}
.userReplies,
.userTopics {
  margin: 10px;
}
.userContainer {
}
.userContainerHeader {
  display: flex;
  align-items: center;
  padding: 10px;
}
.userAvatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
}
.userContainerHeaderNickname {
  font-size: 18px;
}
.userContainerHeaderTime {
  flex: 1;
  text-align: right;
  font-size: 10px;
  color: #bbb;
}
.userContainerHeaderInfo {
  margin-left: 10px;
  text-align: left;
}
.userContainerHeaderScore {
  margin-top: 5px;
  font-size: 12px;
  color: #ddd;
}
.userCollect {
  padding: 5px 7px;
  background: rgb(238, 238, 238);
}
.userNoData {
  margin-top: 20px;
  :global(.icon-no-data) {
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
