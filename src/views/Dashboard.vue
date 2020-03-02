<template lang="pug">
  .p-grid.p-justify-center.p-fluid
    .p-col-12
      img(alt="Tellcrom logo" src="../assets/logo.png")
    .p-col-12.p-md-6.p-lg-3(v-for="item in items" :key="item.id")
      Card
        template(slot="title")
          p {{item.id}}
        template(slot="content")
          p {{item.data}}
    .p.col-12.p-md-6.p-lg-6(v-for="chart in charts" :key="chart.id")
      Card
        template(slot="title")
          p {{chart.id}}
        template(slot="content")
          Chart(type="line" :data="chart.data")
</template>

<script>
import "primeflex/primeflex.css";
import Chart from "primevue/chart";
import Card from "primevue/card";

export default {
  name: "Dashboard",
  components: { Card, Chart },
  data() {
    return {
      items: [
        { id: "Clientes", data: "24" },
        { id: "Proyectos Activos", data: "4" },
        { id: "Contratos Activos", data: "5" },
        { id: "Horas Serv. Laboradas", data: "200" },
        { id: "Proyectos Terminados", data: "30" },
        { id: "Contratos Finalizados", data: "10" },
        { id: "Total Proyectos", data: "20.000 $" },
        { id: "Total Contratos", data: "1.000 $" }
      ],
      charts: [
        {
          id: "Trabajos Activos",
          data: {
            labels: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio"
            ],
            datasets: [
              {
                label: "Proyectos",
                data: [5, 8, 12, 8, 5, 3, 7],
                fill: false,
                backgroundColor: "#2f4860",
                borderColor: "#2f4860"
              },
              {
                label: "Contratos",
                data: [7, 8, 10, 12, 10, 7, 12],
                fill: false,
                backgroundColor: "#00bb7e",
                borderColor: "#00bb7e"
              }
            ]
          }
        },
        {
          id: "Ganancias $",
          data: {
            labels: [
              "Enero",
              "Febrero",
              "Marzo",
              "Abril",
              "Mayo",
              "Junio",
              "Julio"
            ],
            datasets: [
              {
                label: "Proyectos",
                data: [5000, 8000, 12000, 8000, 5000, 3000, 7000],
                fill: false,
                backgroundColor: "#2f4860",
                borderColor: "#2f4860"
              },
              {
                label: "Contratos",
                data: [700, 800, 1000, 1200, 1000, 700, 1200],
                fill: false,
                backgroundColor: "#00bb7e",
                borderColor: "#00bb7e"
              }
            ]
          }
        }
      ]
    };
  },
  methods: {
    goToProjects() {
      this.$router.push({ name: "Projects" });
    }
  }
};
</script>
<style lang="scss">
img {
  margin-top: 10px;
  height: 100px;
}
</style>
