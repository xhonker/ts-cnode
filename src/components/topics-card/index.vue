<template>
  <Card :class='$style.topicsCard' bodyBorder>
    <div :class='$style.topicsItemHeader' slot='header'>
      <image-lazy :class='$style.topicsItemAvatar' :src='topics.author.avatar_url'/>
      <div :class='$style.topicsItemHeaderContainer'>
        <div :class='$style.topicsItemHeaderContainerNickname'>{{topics.author.loginname}}</div>
        <div :class='$style.topicsItemHeaderContainerText'>{{topicsHeaderText}}</div>
      </div>
      <Icon type='hot' v-if='topics.top'/>
      <Icon type='good' v-if='topics.good'/>
    </div>
    <div :class='$style.topicsItemBody' slot='body'>{{topics.title}}</div>
    <div :class='$style.topicsItemFooter' slot='footer'>
      <div :class='$style.itemFooterWatch'>
        <Icon type='chakan'/>
        {{topics.visit_count}}
      </div>
      <div :class='$style.itemFooterComment'>
        <Icon type='comment'/>
        {{topics.reply_count}}
      </div>
      <div :class='$style.topicsItemFooterTime'>{{ ago(topics.last_reply_at)}}</div>
    </div>
  </Card>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { TopicInfo } from "@/store/interface/topics";
import { publicMethods } from "../../mixins";
import Card from "../card/index.vue";
import Icon from "../icon/index.vue";

@Component({
  components: {
    Card,
    Icon
  },
  mixins: [publicMethods]
})
export default class TopicsCard extends Vue {
  @Prop()
  private topics!: TopicInfo;

  get topicsHeaderText() {
    // @ts-ignore
    return `${this.ago(this.topics.create_at)}发布至${this.getTab(
      this.topics.tab
    )}`;
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.topicsCard {
  margin-bottom: 10px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  :global(.icon-good),
  :global(.icon-hot) {
    // good before color: #ff4e50;
    // hot before color: #fbc327;
    font-size: 30px !important;
    color: $theme;
  }
}
.topicsItemAvatar {
  width: 25px;
  height: 25px;
  border-radius: 4px;
  margin-right: 10px;
  overflow: hidden;
}
.topicsItemHeader {
  display: flex;
  margin: 10px;
  position: relative;
}
.topicsItemHeaderContainer {
  flex: 1;
  text-align: left;
}
.topicsItemHeaderContainerNickname {
  font-size: 16px;
}
.topicsItemHeaderContainerText {
  font-size: 10px;
  margin-top: 4px;
  color: #ccc;
}
.topicsItemBody {
  margin-bottom: 10px;
  word-break: break-all;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 13px;
  line-height: 20px;
}
.topicsItemFooter {
  display: flex;
  font-size: 12px;
  > div {
    flex: 1;
    padding: 6px 0;
    &:nth-child(2n) {
      // 左右细边框
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 200%;
        width: 1px;
        transform: scale(0.5);
        transform-origin: 0 0;
        background-color: #eee;
      }
      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 200%;
        width: 1px;
        transform: scale(0.5);
        transform-origin: 0 0;
        background-color: #eee;
      }
    }
    > i {
      font-size: 16px;
      margin-right: 5px;
    }
  }
}
.topicsItemFooterTime {
  margin: auto;
}
</style>
