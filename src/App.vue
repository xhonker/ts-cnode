<template>
  <div id='app'>
    <router-view/>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import { regEvent } from "@/utils/regEvent";

@Component
export default class App extends Vue {
  mounted() {
    regEvent();
  }
}
</script>

<style lang="scss">
#app {
  margin: auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
