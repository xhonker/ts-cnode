<template>
  <div :class='$style.topicsDetails' v-if='details.author'>
    <nav-bar :class='$style.topicsDetailsNavbar' @leftClick='$router.go(-1)'>
      <Icon slot='left' type='back'/>主题详情
    </nav-bar>
    <div :class='$style.topicsDetailsContainer'>
      <div :class='$style.topicsDetailsTitle'>{{details.title}}</div>
      <div :class='$style.topicsDetailsHeader'>
        <image-lazy :class='$style.topicsDetailsHeaderAvatar' :src='details.author.avatar_url'/>
        <span :class='$style.topicsDetailsHeaderNickname'>
          <router-link :to='path.user(details.author.loginname)'>{{details.author.loginname}}</router-link>
        </span>
        <span :class='$style.topicsDetailsHeaderText'>{{`发布于${ago(details.create_at)}`}}</span>
      </div>
      <div :class='$style.topicsDetailsBody'>
        <div :class='$style.topicsDetailsBodyLeft'>
          <span>阅读数：{{details.visit_count}}</span>
          <span>回复数：{{details.reply_count}}</span>
        </div>
        <span :class='collectCls' @click='handlerCollect'>{{details.is_collect?'取消收藏':'收藏'}}</span>
      </div>
      <div :class='$style.topicsDetailsContent' v-highlight v-html='details.content'></div>
      <div :class='$style.topicsDetailsReplies'>
        <div v-if='user.accessToken'>
          <textarea maxlength='150' placeholder='我来说一句' v-model='comment'/>
          <div :class='$style.topicsDetailsSubmit'>
            <span @click='handlerSubmit'>评论</span>
          </div>
        </div>
        <div :class='$style.topicsDetailsNotLogin' v-else>请登录后再来评论</div>
      </div>
      <comment :comments='replies' v-if='replies.length'/>
      <div :class='$style.topicsDetailsNotReplies' v-else>还没有评论，快来抢沙发</div>
    </div>
    <div @click='handlerScrollToTop' class='iconfont icon-top' v-show='showTop'></div>
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
  comment,
  ChangeCollect
} from "@/store/interface/topics";
import { publicMethods } from "@/mixins";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import Comment from "@/components/comment/index.vue";
import { UserState } from "@/store/interface/user";
import { collect, deCollect } from "@/api/user";
import { toast } from "@/components/toast/index.ts";
import { API_replies } from "@/api/topics";
import { getElementAttr, setElementAttr, docH } from "@/utils";

type getTopicDetails = (topic: string) => TopicDetails;

@Component({
  components: {
    NavBar,
    Icon,
    Comment
  },
  mixins: [publicMethods],
  inject: ["path"]
})
export default class Details extends Vue {
  private scroll: number = 0;
  private showTop: boolean = false;
  private comment: string = "";
  @Prop() private topic!: string;
  @State(state => state.topics.openTopics) openTopics!: Array<TopicDetails>;
  @State(state => state.user) user!: UserState;
  @Action(REQUEST__TOPIC__DETAILS) getTopicDetails!: getTopicDetails;
  @Action(SET__TOPIC__SCROLL) setTopicScroll!: (data: TopicScroll) => void;
  @Action(CHANGE__COLLECT) changeCollect!: (data: ChangeCollect) => void;
  async mounted() {
    !this.details.author && (await this.getTopicDetails(this.topic));
    this.details.scroll > 500 && (this.showTop = true);
    //@ts-ignore
    window.scrollTo(0, this.details.scroll);
    window.onscroll = this.handlerScroll;
  }
  beforeDestroy(): void {
    let { topic: id, scroll } = this;
    this.setTopicScroll({ id, scroll });
    window.onscroll = null;
  }
  handlerScrollToTop() {
    window.scrollTo(0, 0);
  }
  get details(): TopicDetails {
    return this.openTopics.filter(d => d.id === this.topic)[0] || {};
  }
  get replies(): Array<comment> {
    // 作者
    return this.details.replies.reduce(
      (acc: Array<comment>, curr) => (
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
      //@ts-ignore
      this.$style.topicsDetailsBodyCollect,
      {
        //@ts-ignore
        [this.$style.topicsDetailsBodyCancelCollect]: this.details.is_collect
      }
    ];
  }
  handlerScroll() {
    this.scroll = window.pageYOffset || document.body.scrollTop;
    this.showTop = this.scroll > 500;
  }
  handlerCollect() {
    this.user.accessToken
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
}
</script>

<style lang='scss' module>
@import "style/index";
.topicsDetails {
  font-size: 14px;
  :global(.prettyprint) {
    width: 100%;
    font-size: 12px;
    overflow: scroll;
  }
  :global(.icon-top) {
    position: fixed;
    bottom: 20px;
    right: 20px;
    color: $theme;
    font-size: 30px !important;
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
    outline: none;
  }
}
.topicsDetailsContainer {
  position: relative;
  top: 35px;
  background: #fff;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.topicsDetailsHeader {
  display: flex;
  align-items: center;
  margin: 10px;
}
.topicsDetailsHeaderAvatar {
  margin-right: 10px;
  width: 25px;
  height: 25px;
  border-radius: 3px;
}
.topicsDetailsHeaderNickname {
  flex: 1;
  text-align: left;
  font-size: 16px;
  a {
    color: #333;
  }
}
.topicsDetailsHeaderText {
  flex: 1;
  text-align: right;
  font-size: 12px;
  color: #ccc;
}
.topicsDetailsBody {
  display: flex;
  margin: 10px;
  color: #aaa;
  font-size: 10px;
  text-align: left;
}
.topicsDetailsBodyLeft {
  flex: 1;
  margin: auto;
  span:nth-child(2) {
    margin-left: 10px;
  }
}
.topicsDetailsBodyCollect {
  padding: 4px;
  border-radius: 3px;
  font-size: 10px;
  background: $theme;
  color: #fff;
}
.topicsDetailsBodyCancelCollect {
  color: #000;
  background: #e5e5e5;
}
.topicsDetailsContent {
  @include thinnerBorder(#eee, 0.5, top);
}
.topicsDetailsReplies {
  padding: 10px 0;
  font-size: 10px;
  @include thinnerBorder(#eee, 0.5, top);
}
.topicsDetailsSubmit {
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
.topicsDetailsNotReplies {
  font-size: 10px;
  color: #ddd;
}
.topicsDetailsNotLogin {
  font-size: 10px;
  color: #bbb;
}
.topicsDetailsTitle {
  padding: 5px 10px;
  text-align: left;
  font-size: 18px;
}
</style>
