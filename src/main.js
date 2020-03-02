import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//PrimeVUE
import "primevue/resources/themes/luna-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
Vue.use(ToastService);
Vue.use(Toast);

//Vuelidate
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
