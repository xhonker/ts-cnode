<template>
  <div>
    <div>
      <div>id test</div>
      <div>id test1</div>
      <div>id test2</div>
      <div>id test3</div>
    </div>
    <wu-tabbar v-model="selected">
      <wu-tabbartab id="test">
        <Icon slot='icon' type='home' /> 首页
      </wu-tabbartab>
      <wu-tabbartab id="test1">
        <Icon slot='icon' type='edit' /> 发布
      </wu-tabbartab>
      <wu-tabbartab id="test2">
        <Icon slot='icon' type='message' /> 消息
      </wu-tabbartab>
      <wu-tabbartab id="test3">
        <Icon slot='icon' type='user' /> 我的
      </wu-tabbartab>
    </wu-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import TabBar from "./tabbar/index.vue";
import TabBarTab from "./tabbar-item/index.vue";
import Icon from "./icon/index.vue";

@Component({
  components: {
    [TabBar.name]: TabBar,
    [TabBarTab.name]: TabBarTab,
    [Icon.name]: Icon
  }
})
export default class TestComponents extends Vue {
  private selected: string = "test";
}
</script>
