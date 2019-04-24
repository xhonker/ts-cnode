<template>
  <card :class='$style.topicDetailsReplie'>
    <div :class='$style.topicDetailsReplieHeader' slot='header'>
      <image-lazy :class='$style.topicDetailsReplieAvatar' :src='replie.author.avatar_url'/>
      <span :class='$style.topicDetailsReplieNickname'>
        <router-link :to='path.user(replie.author.loginname)'>{{replie.author.loginname}}</router-link>
      </span>
      <span :class='$style.topicDetailsReplieAuthor' v-if='replie.is_author'>作者</span>
      <span :class='$style.topicDetailsReplieFloor'>
        <slot></slot>楼
      </span>
    </div>
    <div slot='body' v-highlight v-html='replie.content'></div>
    <div :class='$style.topicDetailsReplieFooter' slot='footer'>
      <span :class='$style.topicDetailsReplieTime'>{{ago(replie.create_at)}}</span>
      <span :class='$style.topicDetailsReplieUped' v-if='replie.ups.length'>
        <icon type='like'/>
        {{replie.ups.length}}
      </span>
    </div>
  </card>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import Card from "@/components/card/index.vue";
import Icon from "@/components/icon/index.vue";
import { RepliesInfo } from "@/store/interface/topics";
import { publicMethods } from "@/mixins";
@Component({
  components: {
    Card,
    Icon
  },
  mixins: [publicMethods],
  inject: ["path"]
})
export default class Replie extends Vue {
  @Prop()
  private replie!: RepliesInfo;
}
</script>

<style lang='scss' module>
.topicDetailsReplie {
  border-bottom: 11px solid #eee;
  &:nth-last-child(1) {
    border: none;
  }
}
.topicDetailsReplieHeader {
  display: flex;
  align-items: center;
}
.topicDetailsReplieFooter {
  display: flex;
}
.topicDetailsReplieHeader,
.topicDetailsReplieFooter {
  padding: 10px;
}
.topicDetailsReplieAvatar {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  overflow: hidden;
}
.topicDetailsReplieFloor {
  flex: 1;
  font-size: 12px;
  color: #bbb;
  text-align: right;
}
.topicDetailsReplieNickname {
  margin-left: 10px;
  font-size: 14px;
  a {
    color: #333;
  }
}
.topicDetailsReplieTime {
  flex: 1;
  font-size: 10px;
  color: #ccc;
  text-align: left;
}
.topicDetailsReplieUped {
  flex: 1;
  text-align: right;
  font-size: 12px;
  :global(.iconfont) {
    font-size: 14px;
    vertical-align: baseline;
  }
}
.topicDetailsReplieAuthor {
  margin-left: 5px;
  font-size: 10px;
  padding: 2px 2px 1px 2px; // 移动端显示有点偏差
  border-radius: 4px;
  vertical-align: middle;
  text-align: center;
  background: #6ba44e;
  color: #fff;
}
</style>
