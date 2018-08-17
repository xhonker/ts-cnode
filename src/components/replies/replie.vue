<template>
  <card class="wu-topic-details__replie">
    <div slot="header" class="wu-topic-details__replie__header">
      <img :src="replie.author.avatar_url" class="wu-topic-details__replie-avatar">
      <span class="wu-topic-details__replie-nickname">
        <router-link :to="path.user(replie.author.loginname)">{{replie.author.loginname}}</router-link>
      </span>
      <span class="wu-topic-details__replie-author" v-if="replie.is_author">作者</span>
      <span class="wu-topic-details__replie-floor">
        <slot></slot>楼</span>
    </div>
    <div slot="body" v-html="replie.content" v-highlight></div>
    <div slot="footer" class="wu-topic-details__replie__footer">
      <span class="wu-topic-details__replie-time">{{ago(replie.create_at)}}</span>
      <span class="wu-topic-details__replie-uped" v-if="replie.ups.length">
        <icon type='like' />{{replie.ups.length}}
      </span>
    </div>
  </card>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import Card from "@/components/card/index.vue";
import Icon from "@/components/icon/index.vue";
import { replies } from "@/store/interface/topics";
import { translationTime } from "@/mixins";
@Component({
  components: {
    Card,
    Icon
  },
  mixins: [translationTime],
  inject: ["path"]
})
export default class Replie extends Vue {
  @Prop() private replie!: replies;
}
</script>

<style lang='scss'>
.wu-topic-details__replie {
  border-bottom: 11px solid #eee;
  &:nth-last-child(1) {
    border: none;
  }
  &__header {
    display: flex;
    align-items: center;
  }
  &__footer {
    display: flex;
  }
  &__header,
  &__footer {
    padding: 10px;
  }
  &-avatar {
    width: 20px;
    height: 20px;
    border-radius: 4px;
  }
  &-floor {
    flex: 1;
    font-size: 12px;
    color: #bbb;
    text-align: right;
  }
  &-nickname {
    margin-left: 10px;
    font-size: 14px;
    a {
      color: #333;
    }
  }
  &-time {
    flex: 1;
    font-size: 10px;
    color: #ccc;
    text-align: left;
  }
  &-uped {
    flex: 1;
    text-align: right;
    font-size: 12px;
    .iconfont {
      font-size: 14px;
      vertical-align: baseline;
    }
  }
  &-author {
    margin-left: 5px;
    font-size: 10px;
    padding: 2px 2px 1px 2px; // 移动端显示有点偏差
    border-radius: 4px;
    vertical-align: middle;
    text-align: center;
    background: #6ba44e;
    color: #fff;
  }
}
</style>
