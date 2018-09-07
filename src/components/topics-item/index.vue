<template>
  <router-link :to="path.details(topics.id)">
    <div class="wu-topics-item">
      <div class="wu-topics-item__container">
        <img :src="topics.author.avatar_url">
        <div class="wu-topics-item__container__body">
          <div class="wu-topics-item__container__body-title">{{topics.title}}</div>
          <div class="wu-topics-item__container__body-author">{{topics.author.loginname}}
            <span class="wu-topics-item__container__body-time">{{ago(topics.last_reply_at)}}</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { RecentInfo } from "@/store/interface/user";
import { publicMethods } from "@/mixins";
@Component({
  mixins: [publicMethods],
  inject: ["path"]
})
export default class TopicsItem extends Vue {
  @Prop()
  private topics!: RecentInfo;
}
</script>

<style lang='scss'>
.wu-topics-item {
  margin-top: 10px;
  align-items: center;
  color: #000;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  &__container {
    display: flex;
    img {
      width: 40px;
      height: 40px;
      border-radius: 4px;
    }
    &__body {
      line-height: 20px;
      flex: 1;
      text-align: left;
      margin-left: 8px;
      overflow: hidden;
      &-title {
        font-size: 14px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &-author {
        display: flex;
        font-size: 12px;
        color: #bbb;
      }
      &-time {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>
