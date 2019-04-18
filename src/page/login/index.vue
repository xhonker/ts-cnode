<template>
  <div class='wu-login'>
    <template v-if='!user.localToken'>
      <nav-bar>登录</nav-bar>
      <div class='wu-login-container'>
        <input placeholder='请输入accessToken' type='text' v-model='accessToken'>
        <button @click='handlerLogin'>登录</button>
      </div>
    </template>
    <template v-else>
      <user :loginname='user.loginname' my='我' v-if='user.loginname'/>
    </template>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from "vue-property-decorator";
import NavBar from "@/components/navbar/index.vue";
import User from "../user/index.vue";
import { login } from "@/api/user";
import { toast } from "@/components/toast";
import { Action, State } from "vuex-class";
import { USER__LOGIN } from "@/store/user/type";
import { LoginInfo, UserState } from "@/store/interface/user";
@Component({
  components: {
    NavBar,
    User
  }
})
export default class WuLogin extends Vue {
  private accessToken: string = '';
  @Action(USER__LOGIN)
  userLogin!: (data: LoginInfo) => never;
  @State(state => state.user)
  user!: UserState;
  mounted() {
    let token = this.user.localToken;
    if (token) {
      this.login(token);
    }
  }
  handlerLogin() {
    this.login(this.accessToken);
  }
  async login(token: string) {
    if (!token) return toast.show("请输入用户令牌");
    let { success, ...data } = await login(token);
    if (!success) return;
    let userInfo = Object.assign({}, data,
      {
        accessToken: token,
        localToken: token
      })
    this.userLogin(userInfo);
  }
}
</script>

<style lang='scss'>
@import "../../../style/index";
.wu-login {
  position: relative;
  height: 100vh;
  background: #fff;
  &-container {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%);
    input {
      width: 90vw;
      font-size: 14px;
    }
    button {
      margin-top: 10px;
      padding: 4px 12px;
      border: 1px solid;
      font-size: 14px;
      background: $theme;
      color: #fff;
      border-radius: 4px;
      outline: none;
    }
  }
}
</style>
