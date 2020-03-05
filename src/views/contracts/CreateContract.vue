<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Crear Contrato 
            
            Steps(:model="items" :readonly="true")
            keep-alive
              transition(name="fade" mode="out-in")
                router-view(
                    :formData="formObject"
                    @prevPage="prevPage($event)"
                    @nextPage="nextPage($event)"
                    @complete="complete")
</template>
<script>
import Steps from "primevue/steps";
export default {
  components: { Steps },
  data() {
    return {
      items: [
        {
          label: "El Objetivo",
          to: "/contracts/create"
        },
        {
          label: "El Contrato",
          to: "/contracts/contract"
        },
        {
          label: "Productos",
          to: "/contracts/products"
        },
        {
          label: "Confirmacion",
          to: "/contracts/confirmation"
        }
      ],
      formObject: {}
    };
  },
  methods: {
    nextPage(event) {
      for (let field in event.formData) {
        this.formObject[field] = event.formData[field];
      }

      this.$router.push(this.items[event.pageIndex + 1].to);
    },
    prevPage(event) {
      this.$router.push(this.items[event.pageIndex - 1].to);
    },
    complete() {
      this.$toast.add({
        severity: "success",
        summary: "Order submitted",
        detail:
          "Finalizado el backend, podrá ver y editar el detalle de este contrato."
      });
    }
  }
};
</script>
<style scoped lang="scss">
@import "@/scss/steps.scss";
.p-steps-title {
  color: black;
}
</style>
