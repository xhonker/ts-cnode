<template>
  <div :class='$style.login'>
    <template v-if='!user.localToken'>
      <nav-bar>
        登录
        <span slot='right'>
          <router-link :to='path.qrcode()'>
            <icon type='scan'/>
          </router-link>
        </span>
        <icon @click='$router.go(-2)' slot='left' type='left'/>
      </nav-bar>
      <div :class='$style.loginContainer'>
        <div :class='$style.loginInput'>
          <input placeholder='请输入accessToken' type='text' v-model='accessToken'>
        </div>
        <button :class='$style.loginBtn' @click='handlerLogin'>
          <span>登录</span>
        </button>
      </div>
    </template>
    <!-- <template v-else>
      <user :loginname='user.loginname' my='我' v-if='user.loginname'/>
    </template>-->
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
  @Action(USER__LOGIN) userLogin!: (data: string) => never;
  @State(state => state.user) user!: UserState;
  mounted() {
    let token = this.user.localToken;
    if (token) this.login(token);
  }
  handlerLogin() {
    this.login(this.accessToken);
    this.accessToken = '';
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
