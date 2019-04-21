<template>
  <router-link :to='path.details(topics.id)'>
    <div :class='$style.topicsItem'>
      <div :class='$style.topicsItemContainer'>
        <img :src='topics.author.avatar_url'>
        <div :class='$style.topicsItemContainerBody'>
          <div :class='$style.topicsItemContainerBodyTitle'>{{topics.title}}</div>
          <div :class='$style.topicsItemContainerBodyAuthor'>
            {{topics.author.loginname}}
            <span
              :class='$style.topicsItemContainerBodyTime'
            >{{ago(topics.last_reply_at)}}</span>
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

<style lang='scss' module>
.topicsItem {
  margin-top: 10px;
  align-items: center;
  color: #000;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.topicsItemContainer {
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 4px;
  }
}
.topicsItemContainerBody {
  line-height: 20px;
  flex: 1;
  text-align: left;
  margin-left: 8px;
  overflow: hidden;
}
.topicsItemContainerBodyTitle {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.topicsItemContainerBodyAuthor {
  display: flex;
  font-size: 12px;
  color: #bbb;
}
.topicsItemContainerBodyTime {
  flex: 1;
  text-align: right;
}
</style>
