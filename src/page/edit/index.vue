<template>
  <div class="wu-edit">
    <nav-bar @rightClick='handlerSubmit'>新建主题
      <span slot="right">发布</span>
    </nav-bar>
    <div class="wu-edit-container">
      <div class="wu-edit-container__title">
        <icon type='title' /> <input v-model="title" type="text" placeholder="标题">
      </div>
      <div class="wu-edit-container__content">
        <icon type='content' />
        <textarea v-model="content" cols="30" rows="5" placeholder="请输入内容"></textarea>
      </div>
      <div class="wu-edit-container__tab">
        <icon type='classify' />
        <span class="wu-edit-container__tab-title">选择分类</span>
      </div>
      <Labels v-model="tab">
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

  @State(state => state.user.accessToken)
  accesstoken!: string;

  handlerSubmit() {
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
      toast.show(error.join());
    }
    title &&
      content &&
      accesstoken &&
      createTopic({ title, tab, content, accesstoken }).then(
        d => d.success && this.$router.push({ path: `/details/${d.topic_id}` })
      );
  }
}
</script>

<style lang='scss'>
.wu-edit {
  height: 100vh;
  background: #fff;
  font-size: 12px;
  &-container {
    margin: 10px 10px 0;
    &__tab {
      display: flex;
      line-height: 25px;
      &-title {
        margin-left: 10px;
        color: #aaa;
        user-select: none;
      }
    }
    &__title {
      display: flex;
      margin-top: 10px;
      border-bottom: 1px solid #f8f8f8;
      padding: 5px 0;
      input {
        flex: 3;
        margin-left: 10px;
        width: 100%;
      }
    }
    &__content {
      display: flex;
      margin-top: 10px;
      border-bottom: 1px solid #f8f8f8;
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
  }
  .iconfont {
    color: #aaa !important;
  }
}
input {
  outline: none;
  padding: 2px 4px;
  border: 0;
}
textarea {
  outline: none;
}
</style>
