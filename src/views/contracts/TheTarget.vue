<template lang="pug">
    .stepsdemo-content
        Card        
            template(slot="title")
                .p-grid.p-fluid.p-justify-between.wizard-header
                    .p-col-8.wizard-header-content
                        p.card-header-message(style="text-align:left") El Objetivo
                    .p-col-2.wizard-header-steps
                        p.card-header-message(style="text-align:left") Paso 1/4
            
            template(slot="content")                
                .p-grid.p-fluid.wizard-content-summary
                    .p-col-12
                        p(style="text-align:left") 
                            | A continuación ingrese los datos del cliente y del sitio.
                            | O proceda a buscarlos si son clientes ya existentes.
                
                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-4(style="padding-bottom: 0px; max-width: 235px;")
                        p(style="text-align:left") Cliente: {{newClient}}
                        
                        ToggleButton(
                            v-model="newClient"
                            onLabel="Nuevo"
                            offLabel="Existente"
                            onIcon="pi pi-check"
                            offIcon="pi pi-times"
                            style="margin-top:10px")
                
                //- This condition define if new client options or existing client is available
                .p-grid.p-fluid.wizard-content(id="Nuevo", v-if="newClient")
                    .p-col-12
                        .p-grid.p-fluid.wizard-content(id="Nuevo")
                            .p-col-12.p-md-3(style="max-width: 176px;")
                                p(style="text-align:left") Nuevo Cliente:
                        
                        .p-grid.p-fluid.wizard-content
                            //-Nombre del cliente
                            .p-col-12.p-md-6(style="max-width: 176px;")
                                InputText(
                                    id="nombre"
                                    v-model="$v.clientForm.nombre.$model"
                                    :class="{'p-error':$v.clientForm.nombre.$invalid && submitted}"
                                    type="text"
                                    placeholder="Nombre"
                                    )
                                ValidationMessage(
                                    v-show="$v.clientForm.nombre.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, no completamente numérico. 
                                    
                            //-RIF
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputMask(
                                    id="rif"
                                    v-model="$v.clientForm.rif.$model"
                                    :class="{'p-error':$v.clientForm.rif.$invalid && submitted}"
                                    type="text"
                                    placeholder="RIF"
                                    mask="a-99999999-9")
                                ValidationMessage(
                                    v-show="$v.clientForm.rif.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, no completamente numérico.
                            //- Email
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputText(
                                    id="email"
                                    v-model="$v.clientForm.email.$model"
                                    :class="{'p-error':$v.clientForm.email.$invalid && submitted}"
                                    type="email"
                                    placeholder="Email")
                                ValidationMessage(
                                    v-show="$v.clientForm.rif.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, ingrese email válido.
                            //- telefono
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputMask(
                                    id="phone"
                                    v-model="$v.clientForm.telefono.$model"
                                    :class="{'p-error':$v.clientForm.telefono.$invalid && submitted}"
                                    type="phone"
                                    placeholder="Teléfono"
                                    mask="(9999)-9999999")
                                ValidationMessage(
                                    v-show="$v.clientForm.rif.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, ingrese teléfono válido.
                
                //- Existing Client
                .p-grid.p-fluid.wizard-content(id="Existente", v-if="!newClient")
                    .p-col-12
                        .p-col-12.p-md-4(style="padding-bottom: 0px; max-width: 235px;")
                            p(style="text-align:left") Cliente Existente:
                        .p-col-12.p-md-4
                            AutoComplete(v-model="clientForm.name" field="name" :dropdown="true")
                
                //- Sitio
                .p-grid.p-fluid.wizard-content
                    .p-col-12.p-md-4(style="padding-bottom: 0px; max-width: 235px;")
                        p(style="text-align:left") Sitio: {{newSite}}
                        ToggleButton(
                            v-model="newSite"
                            onLabel="Nuevo"
                            offLabel="Existente"
                            onIcon="pi pi-check"
                            offIcon="pi pi-times"
                            style="margin-top:10px")
                //-Nuevo Sitio
                .p-grid.p-fluid.wizard-content(id="NuevoSitio" v-if="newSite")
                    .p-col-12
                        .p-grid.p-fluid.wizard-content(id="Nuevo")
                            .p-col-12.p-md-3(style="max-width: 176px;")
                                p(style="text-align:left") Nuevo Sitio:
                        .p-grid.p-fluid.wizard-content
                            //-Nombre
                            .p-col-12.p-md-6(style="max-width: 176px;")
                                InputText(
                                    id="nombreSitio"
                                    v-model="$v.siteForm.nombre.$model"
                                    :class="{'p-error':$v.siteForm.nombre.$invalid && submitted}"
                                    type="text"
                                    placeholder="Nombre"
                                    )
                                ValidationMessage(
                                    v-show="$v.siteForm.nombre.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, no completamente numérico.
                            //-Direccion
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputText(
                                    id="direccion"
                                    v-model="$v.siteForm.direccion.$model"
                                    :class="{'p-error':$v.siteForm.direccion.$invalid && submitted}"
                                    type="text"
                                    placeholder="Dirección"
                                    )
                                ValidationMessage(
                                    v-show="$v.siteForm.direccion.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido.
                            //-email
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputText(
                                    id="emailSitio"
                                    v-model="$v.siteForm.email.$model"
                                    :class="{'p-error':$v.siteForm.email.$invalid && submitted}"
                                    type="email"
                                    placeholder="Email"
                                    )
                                ValidationMessage(
                                    v-show="$v.siteForm.email.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, ingrese email válido.
                            .p-col-12.p-md-6(style="max-width: 176px;")                        
                                InputMask(
                                    id="phoneSitio"
                                    v-model="$v.siteForm.telefono.$model"
                                    :class="{'p-error':$v.siteForm.telefono.$invalid && submitted}"
                                    type="phone"
                                    placeholder="Teléfono"
                                    mask="(9999)-9999999"
                                    )
                                ValidationMessage(
                                    v-show="$v.siteForm.telefono.$invalid && submitted"
                                    style="font-size: 12px"
                                    ) Requerido, ingrese teléfono válido.
                            .p-col-12.p-md-6(style="max-width: 176px;") 
                
                //- Sitio existente
                .p-grid.p-fluid.wizard-content(id="Existente" v-if="!newSite")
                    .p-col-12
                        .p-col-12.p-md-4(style="padding-bottom: 0px; max-width: 235px;")
                            p(style="text-align:left") Sitio Existente:
                        .p-col-12.p-md-4
                            AutoComplete(v-model="siteForm" field="name" :dropdown="true")
            //- Pie de tarjeta
            template(slot="footer")
                .p-grid.p-fluid.p-justify-between.wizard-footer.demo-footer
                    .p-col-4.wizard-footer-back-button
                        Button(
                            label="Back"
                            :disabled="true"
                            class="disabled-button"
                            icon="pi pi-angle-left"
                            )
                    .p-col-4.wizard-footer-next-button
                        Button(
                            label="Next"
                            @click="nextPage(!$v.clientForm.$invalid && !$v.siteForm.$invalid)"
                            icon="pi pi-angle-right"
                            iconPos="right")
        p {{$v.siteForm.$invalid}} {{isNewClient}}
</template>
<script>
//PrimeVUE
import Card from "primevue/card";
import ValidationMessage from "primevue/validationmessage";
import ToggleButton from "primevue/togglebutton";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";

//Vuelidators
import {
  required,
  requiredIf,
  requiredUnless,
  email
} from "vuelidate/lib/validators";

export default {
  components: {
    Card,
    ValidationMessage,
    ToggleButton,
    InputText,
    InputMask,
    AutoComplete,
    Button,
    required,
    requiredIf,
    requiredUnless,
    email
  },

  data() {
    return {
      newClient: true,
      newSite: true,

      submitted: false, //for validation
      clientForm: {
        nombre: "",
        rif: "",
        email: "",
        telefono: ""
      },
      siteForm: {
        nombre: "",
        direccion: "",
        email: "",
        telefono: ""
      }
    };
  },

  computed: {
    isNewClient() {
      return this.newClient;
    },
    isNewSite() {
      return this.newSite;
    }
  },

  //validaciones
  validations: {
    clientForm: {
      nombre: {
        required: requiredIf(function() {
          return this.isNewClient;
        })
      },
      rif: {
        required: requiredIf(function() {
          return this.isNewClient;
        })
      },
      email: {
        required: requiredIf(function() {
          return this.isNewClient;
        }),
        email
      },
      telefono: {
        required: requiredIf(function() {
          return this.isNewClient;
        })
      }
    },
    siteForm: {
      nombre: {
        required: requiredIf(function() {
          return this.isNewSite;
        })
      },
      direccion: {
        required: requiredIf(function() {
          return this.isNewSite;
        })
      },
      email: {
        required: requiredIf(function() {
          return this.isNewSite;
        }),
        email
      },
      telefono: {
        required: requiredIf(function() {
          return this.isNewSite;
        })
      }
    }
  },
  validationGroup: ["clientForm", "siteForm"],

  methods: {
    nextPage(isFormValid) {
      this.submitted = true;

      if (!isFormValid) {
        return;
      }
      this.$emit("nextPage", {
        formData: { client: this.clientForm, site: this.siteForm },
        pageIndex: 0
      });
    }
  }
};
</script>
