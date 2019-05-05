<template>
  <div :class='$style.aside'>
    <div
      :class='$style.asideBackground'
      :style='asideBackground'
      @click='$parent.showAside = false'
      @touchmove.prevent
    ></div>
    <aside :class='$style.asideContent' :style='asideBase' @touchmove.prevent>
      <div :class='[$style.asideItem]'>
        <span :class='$style.avatar'>
          <img :src='avatar'>
        </span>
        <div :class='$style.userinfo' v-if='isLogin'>
          <div :class='$style.userinfoTop'>
            <router-link :class='$style.userinfoNickname' :to='path.user(loginName)'>
              <span>{{userInfo.loginname}}</span>
            </router-link>
            <span :class='$style.userinfoScore'>积分{{userInfo.score}}</span>
          </div>
          <div :class='$style.userinfoCreateAT'>注册时间{{ago(userInfo.create_at)}}</div>
        </div>
        <router-link :to='path.login()' v-else>
          <span :class='$style.login'>登录</span>
        </router-link>
      </div>
      <router-link :class='$style.thinnerBorder' :to='path.publish()'>
        <div :class='[$style.asideItem,$style.itemTop10]'>
          <icon type='edit'/>
          <span :class='$style.asideItemText'>发布</span>
          <icon type='right'/>
        </div>
      </router-link>
      <router-link :to='path.message()'>
        <div :class='$style.asideItem'>
          <icon type='message'/>
          <span :class='$style.asideItemText'>消息</span>
          <icon type='right'/>
        </div>
      </router-link>
      <router-link :class='$style.thinnerBorder' :to='path.setting()'>
        <div :class='[$style.asideItem,$style.itemTop10]'>
          <icon type='setting'/>
          <span :class='$style.asideItemText'>设置</span>
          <icon type='right'/>
        </div>
      </router-link>
      <div :class='$style.thinnerBorder'>
        <div :class='$style.asideItem'>
          <icon type='moonfill'/>
          <span :class='$style.asideItemText'>夜间模式</span>
          <icon type='right'/>
        </div>
      </div>
      <div :class='$style.asideItem'>
        <icon type='about'/>
        <span :class='$style.asideItemText'>关于</span>
        <icon type='right'/>
      </div>
      <div
        :class='[$style.asideItem,$style.itemTop10,$style.loginOut]'
        @click='loginOut'
        v-if='isLogin'
      >退出登录</div>
    </aside>
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';
import { State, Action } from "vuex-class";
import Icon from "@/components/icon/index.vue";
import { UserInfo, LoginInfo } from '../../store/interface/user';
import { publicMethods } from '@/mixins';
import { USER__LOGOUT, USER__LOGIN } from '../../store/user/type';
@Component({
  components: {
    Icon
  },
  mixins: [publicMethods],
  inject: ['path']
})
export default class Aside extends Vue {
  @Prop({ default: false }) private show!: boolean;
  @State(state => state.user) user!: LoginInfo;
  @State(state => state.user.users) users!: Array<UserInfo>;
  @Action(USER__LOGOUT) loginOut!: never;
  @Action(USER__LOGIN) login!: (accessToken: string) => never;
  mounted() {
    if (this.isLogin) {
      this.login(this.user.accessToken);
    }
  }
  get asideBase() {
    return {
      transform: `translateX(${this.transformX}vw)`,
    }
  }
  get asideBackground(): Object {
    return {
      backgroundColor: `rgba(0,0,0,${this.background})`,
      transform: `translateX(${this.transformX}vw)`
    }
  }
  get isLogin(): boolean {
    return !!this.user.accessToken;
  }
  get loginName(): string {
    return this.user.loginname;
  }
  get avatar(): string {
    return this.user.avatar_url;
  }
  get userInfo(): UserInfo {
    return this.users.filter(v => v.loginname === this.loginName)[0] || {};
  }
  get transformX(): number {
    return this.show ? 0 : -100;
  }
  get background(): number {
    return this.show ? 0.4 : 0;
  }
}
</script>

<style lang='scss' module>
@import "style/index";
.aside {
  user-select: none;
}
.fixed {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: $fixed-zIndex + 1;
}
.asideContent {
  @extend .fixed;
  width: 70vw;
  background-color: #f8f8f8;
  transition: all 0.5s ease;
}

.asideBackground {
  @extend .fixed;
  background-color: rgba($color: #000000, $alpha: 0);
  transition: background-color 1.5s ease;
}
.asideItem {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  :global(.iconfont) {
    font-size: 16px;
    color: #a1a1a1;
  }
  :global(.icon-right) {
    flex: 1;
    text-align: right;
  }
}
.itemTop10 {
  margin-top: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  touch-action: none;
  pointer-events: none;
  img {
    width: 100%;
  }
}
.login {
  margin-left: 10px;
  font-size: 14px;
  color: #ababab;
}
.asideItemText {
  margin-left: 10px;
  font-size: 13px;
  color: #a1a1a1;
}
.userinfo {
  flex: 1;
  margin-left: 10px;
  text-align: left;
}
.userinfoNickname {
  flex: 1;
  width: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}
.userinfoScore {
  color: #ddd;
  font-size: 10px;
}
.userinfoCreateAT {
  margin-top: 5px;
  font-size: 10px;
  color: #ddd;
}
.userinfoTop {
  display: flex;
  align-items: center;
}
.thinnerBorder {
  display: block;
  @include thinnerBorder();
}
.loginOut {
  color: rgba($color: red, $alpha: 0.7);
  justify-content: center;
}
</style>