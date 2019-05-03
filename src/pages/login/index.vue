<template>
  <div :class='$style.login'>
    <nav-bar @leftClick='$router.go(-1)'>
      登录
      <router-link :to='path.qrcode()' slot='right'>
        <icon type='scan'/>
      </router-link>
      <icon slot='left' type='back'/>
    </nav-bar>
    <div :class='$style.loginContainer'>
      <div :class='$style.loginInput'>
        <input placeholder='请输入accessToken' type='text' v-model='accessToken'>
      </div>
      <button :class='$style.loginBtn' @click='handlerLogin'>
        <span>登录</span>
      </button>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import NavBar from "@/components/navbar/index.vue";
import Icon from "@/components/icon/index.vue";
import User from "../user/index.vue";
import { toast } from "@/components/toast";
import { Action, State } from "vuex-class";
import { USER__LOGIN } from "@/store/user/type";
import { UserState } from "@/store/interface/user";

@Component({
  components: {
    NavBar,
    User,
    Icon
  },
  inject: ['path']
})
export default class WuLogin extends Vue {
  private accessToken: string = '';
  @Action(USER__LOGIN) userLogin!: (accessToken: string) => never;
  @State(state => state.user) user!: UserState;
  mounted() {
    if (this.token) this.login(this.token);
  }
  handlerLogin() {
    this.login(this.accessToken);
    this.accessToken = '';
  }
  get token() {
    return this.user.accessToken
  }
  async login(token: string) {
    if (!token) return toast.show("请输入用户令牌");
    this.userLogin(token);
    this.$router.go(-1);
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.login {
  position: relative;
  height: 100vh;
  background: #fff;
  :global(.icon-scan) {
    color: #eee;
    font-size: 16px;
  }
}
.loginContainer {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
}
.loginBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  text-align: center;
  margin-top: 10px;
  width: 80%;
  height: 28px;
  font-size: 14px;
  color: #fff;
  border-radius: 2px;
  background: $theme;
  outline: none;
  border: none;
}
.loginInput {
  @include thinnerBorder(#eee);
  margin: auto;
  padding: 10px;
  overflow: hidden;
  input {
    width: 100%;
    font-size: 12px;
    outline: none;
    border: none;
    &::placeholder {
      color: #bbb;
    }
  }
}
</style>
