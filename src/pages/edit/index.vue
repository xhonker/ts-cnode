<template>
  <div :class='$style.edit'>
    <nav-bar @leftClick='$router.go(-1)' @rightClick='handlerSubmit'>
      <icon slot='left' type='back'/>新建主题
      <span slot='right'>发布</span>
    </nav-bar>
    <div :class='$style.editContainer'>
      <div :class='$style.editContainerTitle'>
        <icon type='title'/>
        <input placeholder='标题' type='text' v-model='title'>
      </div>
      <div :class='$style.editContainerContent'>
        <icon type='content'/>
        <textarea cols='30' placeholder='请输入内容' rows='5' v-model='content'></textarea>
      </div>
      <div :class='$style.editContainerTab'>
        <icon type='classify'/>
        <span :class='$style.editContainerTabTitle'>选择分类</span>
      </div>
      <Labels v-model='tab'>
        <label-item id='share' label='分享'></label-item>
        <label-item id='ask' label='问答'></label-item>
        <label-item id='job' label='招聘'></label-item>
        <label-item id='dev' label='开发'></label-item>
      </Labels>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import { State } from "vuex-class";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import Labels from "@/components/label/index.vue";
import LabelItem from "@/components/label-item/index.vue";
import { createTopic } from "@/api/topics";
import { TopicTab } from "@/store/interface/topics";
import { toast } from "@/components/toast";
@Component({
  components: {
    NavBar,
    Icon,
    Labels,
    LabelItem
  }
})
export default class WuEdit extends Vue {
  private tab: TopicTab = "dev";
  private title: string = "";
  private content: string = "";

  @State(state => state.user.accessToken) accesstoken!: string;

  async handlerSubmit() {
    let { title, tab, content, accesstoken } = this;
    let error = [];
    if (!accesstoken) return toast.show("请登录");
    if (!title) {
      error.push("请输入标题");
    }
    if (!content) {
      error.push("请输入内容");
    }
    if (error.length) {
      return toast.show(error.join());
    }
    let { success, topic_id } = await createTopic({ title, tab, content, accesstoken });
    if (success) {
      this.$router.push({ path: `/details/${topic_id}` })
    }
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.edit {
  height: 100vh;
  background: #fff;
  font-size: 12px;
  input {
    outline: none;
    padding: 2px 4px;
    border: 0;
  }
  textarea {
    outline: none;
  }
}
.editContainer {
  // margin: 10px 10px 0;
  :global(.iconfont) {
    color: #aaa !important;
  }
}
.editContainerTab {
  display: flex;
  line-height: 25px;
  padding: 0 10px;
}
.editContainerTabTitle {
  margin-left: 10px;
  color: #aaa;
  user-select: none;
}
.editContainerTitle {
  @extend .editItem;
  input {
    flex: 3;
    margin-left: 10px;
    width: 100%;
  }
}
.editContainerContent {
  @extend .editItem;
  textarea {
    margin-left: 10px;
    margin-bottom: 10px;
    border: 0;
    flex: 1;
    width: 100%;
    resize: none;
    padding: 4px;
  }
}
.editItem {
  display: flex;
  padding: 10px;
  @include thinnerBorder(#eee);
}
</style>
