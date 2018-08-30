<template>
  <div class="wu-message">
    <nav-bar>消息中心</nav-bar>
    <div class="wu-message-container">
      <template v-if="!user.localToken">
        <span class="wu-message-notLogin">请登录</span>
      </template>
      <template v-else>
        <div class="wu-message__no-data" v-if="!user.message.length">
          <icon type='no-data'></icon>
        </div>
        <message-item :message='message' v-for="(message,key) in user.message" :key="key"></message-item>
      </template>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component, Watch } from "vue-property-decorator";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import MessageItem from "./message-item.vue";
import { State, Action } from "vuex-class";
import { message, markALlMessage } from "@/api/user";
import { GET__MY__MESSAGE } from "@/store/user/type";
import { UserState } from "@/store/interface/user";
import {
  setElementAttr,
  calcClientHeight,
  docH,
  getLocalStorage
} from "@/utils";

@Component({
  components: {
    NavBar,
    Icon,
    MessageItem
  }
})
export default class WuMessage extends Vue {
  @State(state => state.user)
  user!: UserState;
  @Action(GET__MY__MESSAGE)
  getMessage!: (accessToken: string) => void;
  mounted() {
    this.init();
  }
  init() {
    let h = docH - calcClientHeight([".wu-message .wu-navbar", ".wu-tabbar"]);
    setElementAttr(".wu-message-container", "style", `height:${h}px`);

    let token = this.user.localToken || this.user.accessToken;
    token && !this.user.message.length && this.getMessage(token);
    token && this.user.message.length && markALlMessage();
  }
}
</script>

<style lang='scss'>
.wu-message {
  position: relative;
  min-height: 100vh;
  background: #fff;
  &-container {
    overflow: scroll;
  }
  &-notLogin {
    position: absolute;
    top: 50%;
    transform: translate(-50%);
  }
  &__no-data {
    margin-top: 30px;
    .icon-no-data {
      font-size: 30px;
      color: #cbcbcc;
      &::after {
        content: "暂无消息";
        display: block;
        font-size: 14px;
      }
    }
  }
}
</style>
