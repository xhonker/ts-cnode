<template>
  <div :class='$style.login'>
    <template v-if='!user.localToken'>
      <nav-bar>登录</nav-bar>
      <div :class='$style.loginContainer'>
        <div :class='$style.loginInput'>
          <input placeholder='请输入accessToken' type='text' v-model='accessToken'>
        </div>
        <button :class='$style.loginBtn' @click='handlerLogin'>登录</button>
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
    this.accessToken = '';
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

<style lang='scss' module>
@import "style/index";
.login {
  position: relative;
  height: 100vh;
  background: #fff;
}
.loginContainer {
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
}
.loginBtn {
  margin-top: 10px;
  padding: 2px 12px;
  line-height: normal;
  font-size: 14px;
  color: #fff;
  border-radius: 4px;
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
