<template lang="pug">
    .p-grid.p-justify-center
        .p-col-12
            h1 Crear Contrato 
            
            Steps(:model="items" :readonly="true")
            keep-alive
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
          to: "/contracts/create/contract"
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
          "Dear, " +
          this.formObject.firstname +
          " " +
          this.formObject.lastname +
          " your order completed."
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/ .stepsdemo-content {
  h1 {
    font-weight: 400;
    display: inline-block;
    vertical-align: middle;
    font-size: 24px;
    margin-top: 1em;
  }
  i {
    vertical-align: middle;
    font-size: 2em;
    margin-top: 0.3em;
  }
  .p-card-body {
    padding: 0;
  }
  .p-card-content {
    padding: 1em;
  }
  .card-header-message {
    font-size: 14px;
    color: #ffffff;
  }
  .wizard-header {
    background-color: #057ad8;
    margin: 0;
    max-height: 48px;
  }
  .wizard-header-content {
    align-self: center;
    padding: 0px;
    font-weight: 600;
    margin-left: 1em;
  }
  .wizard-header-steps {
    align-self: center;
    text-align: center;
    max-width: 90px;
    padding: 0px;
    font-size: 14px;
    font-weight: normal;
  }
  .wizard-content {
    padding-left: 1em;
    margin-top: 0.1em;
    p {
      margin: 0;
    }
    &.wizard-confirmation {
      box-shadow: 0 25px 0 -23px #ededed;
      p {
        font-weight: 600;
      }
      label.wizard-input-label {
        opacity: 0.6;
        font-size: 14px;
      }
    }
  }
  .wizard-content-summary {
    margin-bottom: 0.1em;
    padding-left: 1em;
    p {
      margin: 0;
    }
  }
  .wizard-footer {
    margin-top: 2em;
    margin-left: 0;
    margin-right: 0;
    button {
      max-width: 75px;
    }
  }
  .wizard-footer-back-button {
    align-self: center;
    text-align: left;
    margin-left: 0.5em;
    span.pi {
      margin-top: -0.4em;
    }
  }
  .wizard-footer-next-button {
    align-self: center;
    text-align: right;
    margin-right: 0.5em;
    span.pi {
      margin-top: -0.4em;
    }
  }
  .wizard-footer-complete-button {
    align-self: center;
    text-align: right;
    margin-right: 0.5em;
    button {
      max-width: 108px;
    }
  }
  .wizard-input-label {
    font-size: 12px;
  }
  p.wizard-input-header {
    margin-bottom: 7px;
  }
  @media screen and (max-width: 768px) {
    .wizard-content {
      padding-right: 1em;
    }
    .wizard-header {
      max-height: 66px;
    }
  }
}
</style>
