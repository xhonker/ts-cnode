<template>
  <div class="wu-topic-details-comment">
    <div class="wu-topic-details-comment__header">共有{{replies.length}}条留言</div>
    <replie v-for="(replie, key) in replies" :key="key" :replie='replie'>{{key+1}}</replie>
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

<style lang='scss'>
.wu-topic-details-comment {
  &__header {
    border-left: 10px solid #108ee9;
    background: #eee;
    text-align: left;
    padding: 10px;
    margin-bottom: 20px;
  }
}
</style>
