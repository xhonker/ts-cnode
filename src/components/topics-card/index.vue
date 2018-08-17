<template>
  <Card class="topics__card">
    <div slot="header" class="topics__item__header">
      <img class="topics__item-avatar" :src="topics.author.avatar_url" />
      <div class="topics__item__header__container">
        <div class="topics__item__header__container-nickname">{{topics.author.loginname}}</div>
        <Icon type='hot' v-if="topics.top" />
        <Icon type='good' v-if="topics.good" />
        <div class="topics__item__header__container-text">{{topicsHeaderText}}</div>
      </div>
    </div>
    <div slot="body" class="topics__item__body">
      {{topics.title}}
    </div>
    <div slot="footer" class="topics__item__footer">
      <div>
        <Icon type='chakan' />{{topics.visit_count}} </div>
      <div>
        <Icon type='comment' />{{topics.reply_count}}</div>
      <div class="topics__item__footer-time">{{ ago(topics.last_reply_at)}}</div>
    </div>
  </Card>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { topic } from "@/store/interface/topics";
import { translationTime } from "../../mixins";
import Card from "../card/index.vue";
import Icon from "../icon/index.vue";

@Component({
  components: {
    Card,
    Icon
  },
  mixins: [translationTime]
})
export default class TopicsCard extends Vue {
  @Prop() private topics!: topic;

  get topicsHeaderText() {
    // @ts-ignore
    return `${this.ago(this.topics.create_at)}发布至${this.getTab(
      this.topics.tab
    )}`;
  }
}
</script>

<style lang='scss'>
.topics__card {
  margin-bottom: 10px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
}
.topics__item {
  background: rgb(238, 238, 238);
  .wu-card__body {
    border-bottom: 1px solid #eee;
  }
  &-avatar {
    width: 25px;
    height: 25px;
    border-radius: 4px;
    margin-right: 10px;
  }
  &__header {
    display: flex;
    margin: 10px;
    position: relative;
    &__container {
      text-align: left;
      &-nickname {
        font-size: 16px;
      }
      &-text {
        font-size: 12px;
        margin-top: 4px;
        color: #ccc;
      }
    }
  }
  &__body {
    margin-bottom: 10px;
    word-break: break-all;
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  &__footer {
    display: flex;
    font-size: 12px;
    > div {
      flex: 1;
      padding: 6px 0;
      &:nth-child(2n) {
        border-right: 1px solid #eee;
        border-left: 1px solid #eee;
      }
      > i {
        font-size: 16px;
        margin-right: 5px;
      }
    }
    &-time {
      margin: auto;
    }
  }
}
.icon {
  &-good,
  &-hot {
    font-size: 30px !important;
    position: absolute;
    right: 0;
    top: 0;
  }
  &-good {
    color: #ff4e50;
  }
  &-hot {
    color: #fbc327;
    margin-right: 25px;
  }
}
</style>
