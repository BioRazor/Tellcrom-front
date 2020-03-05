<template lang="pug">
.stepsdemo-content
        Card 
            //-Titulo tarjeta
            template(slot="title")
                .p-grid.p-fluid.p-justify-between.wizard-header
                    .p-col-8.wizard-header-content
                        p.card-header-message(style="text-align:left") Confirmación
                    .p-col-2.wizard-header-steps
                        p.card-header-message(style="text-align:left") Paso 4/4
            
            //-Contenido Tarjeta
            template(slot="content")
                .p-grid.p-fluid.wizard-content.wizard-confirmation
                        .p-col-12                
                            p(style="text-align:left;margin-top:10px")
                                | A continuación confirme los datos del contratato, si observa alguna irregularidad, o algún campo vacío,
                                | regrese a la sección correspondiente para corregir.
                .p-grid.p-fluid.wizard-content.wizard-confirmation
                    .p-col-12
                        label.wizard-input-label Para este contrato el cliente es: 
                        p(style="text-align:left;margin-top:10px") 
                            |{{formData.client.nombre ? formData.client.nombre : "-" }} 
                            | - {{formData.client.rif ? formData.client.rif : "-" }} 
                            | - {{formData.client.email ? formData.client.email : "-" }} 
                            | - {{formData.client.telefono ? formData.client.telefono : "-" }}
                .p-grid.p-fluid.wizard-content.wizard-confirmation
                    .p-col-12                        
                        label.wizard-input-label Sobre el Contrato:    
                        p(style="text-align:left;margin-top:10px")
                            | Las jornadas de mantenimiento tienen un valor de -{{formData.contract.valorJornada ? formData.contract.valorJornada : "-" }}$- 
                            | y serán llevadas a cabo en "{{formData.site.nombre ? formData.site.nombre : "-" }}", que esta ubicado en "{{formData.site.direccion ? formData.site.direccion : "-" }}",
                            | y se comunicarán por el numero "{{formData.site.telefono ? formData.site.telefono : "-" }}" y al correo "{{formData.site.email ? formData.site.email : "-" }}".
                .p-grid.p-fluid.wizard-content.wizard-confirmation
                    .p-col-12    
                        p(style="text-align:left;margin-top:10px")
                            | Y hará cobertura de:
                        ul(v-for="item in formData.products" style="text-align:left")
                            li {{item}}

            //- Pie de tarjeta
            template(slot="footer")
                .p-grid.p-fluid.p-justify-between.wizard-footer.demo-footer
                    .p-col-4.wizard-footer-back-button
                        Button(
                            label="Back"
                            :disabled="false"
                            @click="prevPage"
                            class="disabled-button"
                            icon="pi pi-angle-left")
                    .p-col-6.wizard-footer-complete-button
                        Button.p-button-success(
                            label="Complete"
                            @click="complete()"
                            icon="pi pi-angle-right" iconPos="right")
</template>
<script>
import Card from "primevue/card";
import Button from "primevue/button";
export default {
  components: { Card, Button },
  props: {
    formData: {
      type: Object
    }
  },
  methods: {
    complete() {
      this.$emit("complete");
    },
    prevPage() {
      this.$emit("prevPage", { pageIndex: 3 });
    }
  }
};
</script>
