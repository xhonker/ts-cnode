<template>
  <div :class="$style.setting">
    规划中...
  </div>
</template>

<script lang='ts'>
import { Vue, Prop, Component } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {
  
}
</script>

<style lang='scss' module>
@import 'style/index';
.setting {
  margin-top: 40px;
  color:#eee;
  font-size: 18px;
  text-shadow: 0 0 3px $theme;
}
</style>