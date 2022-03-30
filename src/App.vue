<template>
  <v-app>
    <NavBar />
    <InvoiceInformation />
  </v-app>
</template>

<script>
import NavBar from "./components/Menu";
import InvoiceInformation from "./components/InvoiceInformation";
import "./components/css/style.css";

export default {
  name: "App",
  components: {
    NavBar,
    InvoiceInformation,
  },
  data: () => ({
  })
};
</script>
