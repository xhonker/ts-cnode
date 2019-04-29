<template>
  <div :class='$style.message'>
    <nav-bar @leftClick='$router.go(-1)'>
      <icon slot='left' type='left'/>消息中心
    </nav-bar>
    <div :class='$style.messageContainer'>
      <template v-if='!user.localToken'>
        <span :class='$style.messageNotLogin'>请登录</span>
      </template>
      <template v-else>
        <div :class='$style.messageNoData' v-if='!user.message.length'>
          <icon type='no-data'></icon>
        </div>
        <message-item :key='key' :message='message' v-for='(message,key) in user.message'></message-item>
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
  @State(state => state.user) user!: UserState;
  @Action(GET__MY__MESSAGE) getMessage!: (accessToken: string) => void;
  mounted() {
    this.init();
  }
  init() {
    let token = this.user.localToken || this.user.accessToken;
    if (!token) return this.$router.push("login");
    !this.user.message.length && this.getMessage(token);
    this.user.message.length && markALlMessage();
  }
}
</script>

<style lang='scss' module>
.message {
  position: relative;
  min-height: 100vh;
  background: #fff;
}
.messageContainer {
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.messageNotLogin {
  position: absolute;
  top: 50%;
  transform: translate(-50%);
  color: #bbb;
}
.messageNoData {
  margin-top: 30px;
  :global(.icon-no-data) {
    font-size: 30px;
    color: #cbcbcc;
    &::after {
      content: "暂无消息";
      display: block;
      font-size: 14px;
    }
  }
}
</style>
