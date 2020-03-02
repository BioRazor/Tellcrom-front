<template lang="pug">
    .p-grid.p-justify-center.p-fluid
        .p-col-12.p-md-6.p-lg-4.p-justify-center
            img(alt="Vue logo" src="../assets/logo.png")
            .p-inputgroup.p-justify-center
                span.p-inputgroup-addon
                    i.pi.pi-user
                InputText(placeholder="Username" required)
            .p-inputgroup.p-justify-center
                span.p-inputgroup-addon
                    i.pi.pi-key
                InputText(type="password" placeholder="Password" required)
            Button(label="Login" icon="pi pi-sign-in")

        
</template>
<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
export default {
  components: { InputText, Button }
};
</script>
<style lang="scss" scoped>
img {
  margin-top: 30px;
  height: 200px;
}
.p-inputgroup {
  margin-top: 10px;
}
.p-button {
  margin-top: 10px;
}
</style>
