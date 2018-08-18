<template>
  <div class="wu-messageItem">
    <div class="wu-messageItem-container">
      <img :src="message.author.avatar_url" class="wu-messageItem-container-avatar">
      <div class="wu-messageItem-container-content">
        <router-link :to="path.user(message.author.loginname)">
          <span>{{message.author.loginname}}</span>
        </router-link> {{message.type === 'reply'?'回复了你的话题':'在话题'}}
        <router-link :to="path.details(message.topic.id)">
          <span>{{message.topic.title}}</span>
        </router-link> {{message.type === 'at'?'中@了你':''}}
        <div v-html="message.reply.content" class="wu-messageItem-container-reply" v-highlight></div>
        <div class="wu-messageItem-container-time">{{ago(message.create_at)}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { IMessage } from "@/store/interface/user";
import { translationTime } from "@/mixins";

@Component({
  mixins: [translationTime],
  inject: ["path"]
})
export default class MessageItem extends Vue {
  @Prop()
  private message!: IMessage;
}
</script>

<style lang='scss'>
.wu-messageItem {
  margin: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f8f8f8;
  &-container {
    display: flex;
    font-size: 12px;
    text-align: left;
    &-content {
      flex: 1;
      margin-left: 5px;
    }
    &-avatar {
      width: 25px;
      height: 25px;
      border-radius: 4px;
    }
    &-reply {
      overflow: hidden;
      margin-top: 5px;
      background: #f8f8f8;
      border-radius: 4px;
    }
    &-time {
      margin-top: 5px;
      text-align: left;
      font-size: 12px;
      color: #ddd;
    }
  }
  a {
    color: #4078c0;
  }
}
</style>
