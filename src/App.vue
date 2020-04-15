<template lang="pug">
  #app
    .p-grid
      pm-header(v-if="user")
      Toast
    transition(name="fade" mode="out-in")
      router-view
</template>
<script>
//PrimeVue
import Toast from "primevue/toast";
import "primeflex/primeflex.css";

//components
import PmHeader from "@/components/layout/Header.vue";

//vue
import { mapGetters } from "vuex";
export default {
  components: { PmHeader, Toast },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style scope lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
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
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
