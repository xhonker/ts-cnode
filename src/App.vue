<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { regEvent } from "@/utils/regEvent";

export default {
  mounted() {
    regEvent();
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
