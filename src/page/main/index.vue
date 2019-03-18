<template>
  <div class="container">
    <tab-container v-model="tabbar" class="container__main">
      <tab-container-item id="home" style="height:inherit;">
        <home/>
      </tab-container-item>
      <tab-container-item id="edit" style="height:inherit;">
        <edit/>
      </tab-container-item>
      <tab-container-item id="user" style="height:inherit;">
        <login v-if="tabbar === 'user'"/>
      </tab-container-item>
      <tab-container-item id="message" style="height:inherit;">
        <message v-if="tabbar === 'message'"/>
      </tab-container-item>
    </tab-container>
    <tab-bar v-model="tabbar" class="container__menu">
      <tab-bar-tab :id="tabbar.id" v-for=" tabbar in tabbars" :key="tabbar.id">
        <Icon slot="icon" :type="tabbar.id"/>
        {{tabbar.value}}
      </tab-bar-tab>
    </tab-bar>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import TabBar from "@/components/tabbar/index.vue";
import TabBarTab from "@/components/tabbar-item/index.vue";
import Icon from "@/components/icon/index.vue";
import TabContainer from "@/components/tab-container/index.vue";
import TabContainerItem from "@/components/tab-container-item/index.vue";
import Home from "@/page/home/index.vue";
import Edit from "../edit/index.vue";
import Login from "../login/index.vue";
import Message from "../message/index.vue";
import * as type from "@/store/topics/type";
import { Action, Getter, State } from "vuex-class";
import { TabsInfo } from "@/store/interface/topics";
import { markALlMessage } from "@/api/user";
import { calcClientHeight, docH } from "@/utils";
import { regEvent } from "@/utils/regEvent";
import tabbars from "./config";
type requestTopics = (data?: { tab?: string; page?: number }) => never;

@Component({
  components: {
    TabBar,
    TabBarTab,
    Icon,
    TabContainer,
    TabContainerItem,
    Edit,
    Login,
    Message,
    Home
  },
  inject: ["path"]
})
export default class Main extends Vue {
  private tabbars: Array<TabsInfo> = tabbars;
  @Action(type.CHANGE__TABBAR)
  changeTabBar!: (tab: string) => void;
  @State(state => state.topics.tabbar)
  _tabbar!: string;
  get tabbar() {
    return this._tabbar;
  }
  set tabbar(tab: string) {
    if (this.tabbar === tab) return;
    this.changeTabBar(tab);
  }
}
</script>

<style lang='scss'>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  &__menu {
    flex: 0 0 auto;
  }
  &__main {
    flex: 1;
  }
}
</style>
