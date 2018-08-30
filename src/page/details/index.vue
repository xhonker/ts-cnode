<template>
  <div class="wu-topics-details" v-if="details.author">
    <nav-bar @leftClick='$router.go(-1)' class="wu-topics-details__navbar">
      <Icon slot="left" type='left' />主题详情
    </nav-bar>
    <div class="wu-topics-details__container" @scroll="handlerScroll" ref="details">
      <div class="wu-topics-details__title">{{details.title}}</div>
      <div class="wu-topics-details__header">
        <img :src="details.author.avatar_url" class="wu-topics-details__header-avatar" alt="avatar">
        <span class="wu-topics-details__header-nickname">
          <router-link :to="path.user(details.author.loginname)">{{details.author.loginname}}</router-link>
        </span>
        <span class="wu-topics-details__header-text">{{`发布于${ago(details.create_at)}`}}</span>
      </div>
      <div class="wu-topics-details__body">
        <div class="wu-topics-details__body-left">
          <span>阅读数：{{details.visit_count}}</span>
          <span>回复数：{{details.reply_count}}</span>
        </div>

        <span :class="collectCls" @click="handlerCollect">{{details.is_collect?'取消收藏':'收藏'}}</span>
      </div>
      <div class="wu-topics-details__content" v-html="details.content" v-highlight></div>
      <div class="wu-topics-details__replies">
        <div v-if="user.accessToken|| user.localToken">
          <textarea v-model="comment" maxlength="150" placeholder="我来说一句" />
          <div class="wu-topics-details-submit">
            <span @click="handlerSubmit">评论</span>
          </div>
        </div>
        <div class="wu-topics-details__notLogin" v-else>
          请登录后再来评论
        </div>
      </div>
      <replies :replies='replies' v-if="replies.length"></replies>
      <div class="wu-topics-details__notReplies" v-else>
        还没有评论，快来抢沙发
      </div>
    </div>
    <div class="iconfont icon-top" v-show="showTop" @click="$refs.details.scrollTop=0"></div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import {
  REQUEST__TOPIC__DETAILS,
  SET__TOPIC__SCROLL,
  CHANGE__COLLECT
} from "@/store/topics/type";
import {
  TopicDetails,
  TopicScroll,
  RepliesInfo,
  ChangeCollect
} from "@/store/interface/topics";
import { translationTime } from "@/mixins";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import Replies from "@/components/replies/index.vue";
import { UserState } from "@/store/interface/user";
import { collect, deCollect } from "@/api/user";
import { toast } from "@/components/toast/index.ts";
import { API_replies } from "@/api/topics";
import { getElementAttr, setElementAttr, docH } from "@/utils";
const prefixCls = "wu-topics-details";

type getTopicDetails = (topic: string) => TopicDetails;

@Component({
  components: {
    NavBar,
    Icon,
    Replies
  },
  mixins: [translationTime],
  inject: ["path"]
})
export default class Details extends Vue {
  private scroll: number = 0;
  private showTop: boolean = false;
  private comment: string = "";
  @Prop()
  private topic!: string;

  @State(state => state.topics.openTopics)
  openTopics!: Array<TopicDetails>;
  @State(state => state.user)
  user!: UserState;
  @Action(REQUEST__TOPIC__DETAILS)
  getTopicDetails!: getTopicDetails;
  @Action(SET__TOPIC__SCROLL)
  setTopicScroll!: (data: TopicScroll) => void;
  @Action(CHANGE__COLLECT)
  changeCollect!: (data: ChangeCollect) => void;
  async mounted() {
    !this.details.author && (await this.getTopicDetails(this.topic));
    this.details.scroll > 200 && (this.showTop = true);

    let h = docH - getElementAttr(`.wu-navbar`, "clientHeight");
    setElementAttr(`.${prefixCls}__container`, "style", `height:${h}px`);
    //@ts-ignore
    this.$refs.details.scrollTop = this.details.scroll;
  }
  get details(): TopicDetails {
    return this.openTopics.filter(d => d.id === this.topic)[0] || {};
  }
  get replies(): Array<RepliesInfo> {
    // 作者
    return this.details.replies.reduce(
      (acc: Array<RepliesInfo>, curr) => (
        this.details.author.loginname === curr.author.loginname
          ? acc.push({ is_author: true, ...curr })
          : acc.push(curr),
        acc
      ),
      []
    );
  }
  get collectCls() {
    return [
      `${prefixCls}__body-collect`,
      {
        [`${prefixCls}__body-cancelCollect`]: this.details.is_collect
      }
    ];
  }
  handlerScroll(e: Event) {
    //@ts-ignore
    let { scrollTop } = e.srcElement;
    this.scroll = scrollTop;
    scrollTop > 200 ? (this.showTop = true) : (this.showTop = false);
  }
  handlerCollect() {
    this.user.localToken
      ? this.collect().then(res => {
          this.changeCollect({ topic: this.topic, result: res });
        })
      : toast.show("请登录");
  }
  collect() {
    let {
      user: { accessToken: accesstoken },
      details: { id: topic_id }
    } = this;
    let data = { accesstoken, topic_id };
    return this.details.is_collect ? deCollect(data) : collect(data);
  }
  handlerSubmit() {
    let { comment: content, topic: topic_id, getTopicDetails } = this;
    content
      ? API_replies({ content, topic_id }).then(async data => {
          data.success && toast.show("评论成功");
          this.comment = "";
          await getTopicDetails(topic_id);
          //@ts-ignore
          this.$refs.details.scrollTop = this.$refs.details.scrollHeight;
        })
      : toast.show("评论内容不能为空");
  }
  beforeDestroy(): void {
    let { topic: id, scroll } = this;
    this.setTopicScroll({ id, scroll });
  }
}
</script>

<style lang='scss'>
@import "../../../style/index";
.wu-topics-details {
  font-size: 14px;
  .icon-top {
    position: fixed;
    bottom: 20px;
  }
  &__container {
    overflow: scroll;
    position: relative;
    top: 35px;
    background: #fff;
  }
  &__navbar {
    position: fixed;
    top: 0;
  }
  &__header {
    display: flex;
    align-items: center;
    margin: 10px;
    &-avatar {
      margin-right: 10px;
      width: 25px;
      height: 25px;
      border-radius: 3px;
    }
    &-nickname {
      flex: 1;
      text-align: left;
      font-size: 16px;
      a {
        color: #333;
      }
    }
    &-text {
      flex: 1;
      text-align: right;
      font-size: 12px;
      color: #ccc;
    }
  }
  &__body {
    display: flex;
    margin: 10px;
    color: #aaa;
    font-size: 10px;
    text-align: left;
    &-left {
      flex: 1;
      margin: auto;
      span:nth-child(2) {
        margin-left: 10px;
      }
    }
    &-collect {
      padding: 4px;
      border-radius: 3px;
      font-size: 10px;
      background: $theme;
      color: #fff;
    }
    &-cancelCollect {
      color: #000;
      background: #e5e5e5;
    }
  }
  &__content {
    border-top: 1px solid #eee;
  }
  &__replies {
    padding: 10px 0;
    font-size: 10px;
    border-top: 1px solid #f8f8f8;
  }
  &-submit {
    margin: 15px auto;
    width: 80%;
    text-align: right;
    > span {
      padding: 4px;
      font-size: 10px;
      color: #fff;
      background: $theme;
      border-radius: 4px;
    }
  }
  textarea {
    display: block;
    margin: 0 auto;
    border: 1px solid #bfbec0;
    resize: none;
    border-radius: 4px;
    height: 18px;
    line-height: 18px;
    padding: 6px;
    font-size: 12px;
    width: 80%;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  &__notReplies {
    font-size: 10px;
    color: #ddd;
  }
  &__notLogin {
    font-size: 10px;
    color: #bbb;
  }
  &__title {
    padding: 5px 10px;
    text-align: left;
    // font-weight: bold;
    font-size: 18px;
  }
}
.markdown-text {
  margin: 10px;
  text-align: left;
  overflow: hidden;
  a {
    color: #4078c0;
    word-break: break-all;
  }
  p {
    word-break: break-all;
    white-space: pre-line;
    line-height: 20px;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
  }
  ul {
    -webkit-padding-start: 20px;
  }
  hr {
    height: 1px;
    background-color: #eee;
    border: 0;
  }
  h1 {
    font-size: 20px;
  }
  h2 {
    font-size: 16px;
  }
  h3 {
    font-size: 14px;
  }
  img {
    max-width: 100%;
  }
  table {
    word-break: break-all;
    border-collapse: collapse;
    tbody {
      display: table-row-group;
    }
    tr {
      background-color: #fff;
      th {
        width: 10%;
      }
      th,
      td {
        padding: 6px 13px;
        border: 1px solid #ddd;
      }
    }
    tr:nth-child(odd) {
      background-color: white;
    }
    tr:nth-child(even) {
      background-color: #f8f8f8;
    }
  }
}
.prettyprint {
  width: 100%;
  font-size: 12px;
  overflow: scroll;
}
</style>
