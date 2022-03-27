<template>
    <v-col class="headerMain" style="background-color: #6066fa;height:auto">
          <v-row no-gutters class="d-flex mx-auto header">
            <v-col cols="12" sm="7" class="d-flex left">
            <li>
                <a href="#">
                    <i class="fa fa-clapperboard"></i> Dashboard
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-file-invoice"></i> Invoice
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-wallet"></i> Wallet
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-chart-simple"></i> Activity
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fa fa-phone"></i>
                    Help
                </a>
            </li>
            </v-col>
            <v-col cols="12" sm="5" class="d-flex justify-end align-center right">
                <i class="option fa fa-bell"></i>
                <i class="option fa fa-gear"></i>
                <i class="option user fa fa-circle-user"></i>
            </v-col>
        </v-row>
      </v-col>
</template>
<script>

export default {
    name:"NavBar",
}
</script>
