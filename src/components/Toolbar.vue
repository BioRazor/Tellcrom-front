<template lang="pug">
  Toolbar(:model="items")
    template(slot="left")
      
      Button(icon="pi pi-bars" @click="visibleLeft = true")
    
    template(slot="right")
      InputText(placeholder="Search" type="text")
      Button(
        label="Logout"
        icon="pi pi-power-off"
        :style="{ 'margin-left': '.25em' }"
      )
</template>
<script>
import Toolbar from "primevue/toolbar";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
export default {
  components: { Toolbar, InputText, Button }
};
</script>
