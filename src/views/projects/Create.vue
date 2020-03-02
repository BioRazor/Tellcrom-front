<template lang="pug">
.p-grid.p-justify-center
    .p-col-12.p-md-8.p-lg-8
        .card(style="margin-top:30px")
            .container
                h1 Nuevo Proyecto
                

</template>
<script>
export default {
  name: "ProjectCreate"
};
</script>
<style lang="scss" scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

/* Add some padding inside the card container */
.container {
  padding: 2px 16px;
}
</style>
