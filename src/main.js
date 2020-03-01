import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//PrimeVUE
import "primevue/resources/themes/luna-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
