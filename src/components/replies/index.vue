<template>
  <div :class='$style.topicDetailsComment'>
    <div :class='$style.topicDetailsCommentHeader'>共有{{replies.length}}条留言</div>
    <replie :key='key' :replie='replie' v-for='(replie, key) in replies'>{{key+1}}</replie>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import Replie from "./replie.vue";
import { RepliesInfo } from "@/store/interface/topics";
@Component({
  components: {
    Replie
  }
})
export default class Replies extends Vue {
  @Prop()
  private replies!: Array<RepliesInfo>;
}
</script>

<style lang='scss' module>
@import "style/index";
.topicDetailsComment {
  position: relative;
}
.topicDetailsCommentHeader {
  border-left: 10px solid $theme;
  background: #eee;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
