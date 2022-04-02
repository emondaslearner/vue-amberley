<template>
  <v-app>
    <div class="loader">
      <v-progress-circular
        :size="100"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </div>
    <div class="alert alertSuccess">
      <v-alert dense text type="success" class="successAlert">
        Thanks, Invoice data have saved Successfully
      </v-alert>
    </div>
    <div class="alert alertError">
      <v-alert dense text type="error" class="successAlert">
        Please check you internet connection and try again
      </v-alert>
    </div>
    <router-view/>
  </v-app>
</template>

<script>
import "./components/css/style.css";
export default {
  name: "App",
  components: {
  },
  data: () => ({}),
};
</script>
