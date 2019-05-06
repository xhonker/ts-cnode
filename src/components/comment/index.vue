<template>
  <div :class='$style.comment'>
    <div :class='$style.commentHeader'>共有{{comments.length}}条留言</div>
    <comments :key='key' :comment='replie' v-for='(replie, key) in comments'>{{key+1}}</comments>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import comments from "./item.vue";
import { comment } from "@/store/interface/topics";
@Component({
  components: {
    comments
  }
})
export default class Comment extends Vue {
  @Prop() private comments!: Array<comment>;
}
</script>

<style lang='scss' module>
@import "style/index";
.comment {
  position: relative;
}
.commentHeader {
  border-left: 10px solid $theme;
  background: #eee;
  text-align: left;
  padding: 10px;
  margin-bottom: 20px;
}
</style>
