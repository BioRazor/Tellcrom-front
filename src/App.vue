<template lang="pug">
  #app
    .p-grid
      pm-header
    router-view
</template>
<script>
import PmHeader from "@/components/layout/Header.vue";
import "primeflex/primeflex.css";
export default {
  components: { PmHeader },
  data() {
    return {};
  }
};
</script>
<style scope lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.p-panelmenu {
  width: auto;
  margin-top: 10px;
}
.p-panelmenu-header {
  text-align: left;
}
.p-menuitem {
  text-align: left;
}
</style>
