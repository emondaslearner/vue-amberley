<template>
  <v-app>
    <NavBar />
    <v-row no-gutters>
      <v-col cols="12" md="8">
        <LeftSide />
      </v-col>
      <v-col cols="12" md="4">
      <RightSide />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import NavBar from "./components/Menu";
import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import "./components/css/style.css";

export default {
  name: "App",

  components: {
    NavBar,
    LeftSide,
    RightSide,
  },
};
</script>
