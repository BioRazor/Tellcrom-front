<template lang="pug">
    .stepsdemo-content
        Card        
            template(slot="title")
                .p-grid.p-fluid.p-justify-between.wizard-header
                    .p-col-8.wizard-header-content
                        p.card-header-message El Objetivo
                    .p-col-2.wizard-header-steps
                        p.card-header-message Paso 1/4
            template(slot="content")
                .p-grid.p-fluid.wizard-content-summary
                    .p-col-12
                        p Ingrese los datos del Cliente y el Sitio
            
</template>
<script>
import Card from "primevue/card";
export default {
  components: { Card }
};
</script>
