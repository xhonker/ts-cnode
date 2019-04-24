<template>
  <div :class='$style.messageItem'>
    <div :class='$style.messageItemContainer'>
      <image-lazy :class='$style.messageItemContainerAvatar' :src='message.author.avatar_url'/>
      <div :class='$style.messageItemContainerContent'>
        <router-link :to='path.user(message.author.loginname)'>
          <span>{{message.author.loginname}}</span>
        </router-link>
        {{message.type === 'reply'?'回复了你的话题':'在话题'}}
        <router-link :to='path.details(message.topic.id)'>
          <span>{{message.topic.title}}</span>
        </router-link>
        {{message.type === 'at'?'中@了你':''}}
        <div :class='$style.messageItemContainerReply' v-highlight v-html='message.reply.content'></div>
        <div :class='$style.messageItemContainerTime'>{{ago(message.create_at)}}</div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { MessageInfo } from "@/store/interface/user";
import { publicMethods } from "@/mixins";

@Component({
  mixins: [publicMethods],
  inject: ["path"]
})
export default class MessageItem extends Vue {
  @Prop()
  private message!: MessageInfo;
}
</script>

<style lang='scss' module>
.messageItem {
  margin: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #f8f8f8;
  a {
    color: #4078c0;
  }
}
.messageItemContainer {
  display: flex;
  font-size: 12px;
  text-align: left;
}
.messageItemContainerContent {
  flex: 1;
  margin-left: 5px;
}
.messageItemContainerAvatar {
  width: 25px;
  height: 25px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #eee;
  img {
    width: 100%;
  }
}
.messageItemContainerReply {
  overflow: hidden;
  margin-top: 5px;
  background: #f8f8f8;
  border-radius: 4px;
}
.messageItemContainerTime {
  margin-top: 5px;
  text-align: left;
  font-size: 12px;
  color: #ddd;
}
</style>
