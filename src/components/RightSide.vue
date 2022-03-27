<template>
  <div class="ml-lg-3 mt-5 mx-auto rightSide">
    <v-col cols="12" sm="11" class="white clientDetails">
      <h4 class="d-none">Client Details</h4>
      <div class="d-flex">
        <v-col cols="12" sm="9" class="clientLeft d-flex">
          <div>
            <i class="user mt-4 fa fa-circle-user"></i>
          </div>
          <div class="ml-5">
            <v-text-field
              label="Client name"
              hide-details="auto"
              class="pa-0 ma-0"
            ></v-text-field>
            <v-text-field
              label="Client email"
              hide-details="auto"
              class="pa-0 ma-0 mt-3"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12" sm="3" class="ml-5 d-flex justify-end">
          <i class="setting fa fa-ellipsis"></i>
        </v-col>
      </div>
      <h5>NEXT FIFTEEN COMMUNICATIONS LIMITED</h5>
      <p>Bermondsey Street, London, United Kingdom, SE13XF</p>
    </v-col>
    <v-col cols="12" sm="11" class="amountDue mt-5 white">
      <div class="d-flex">
        <v-col cols="12" sm="8">
          <h5>Amount Due(GBP)</h5>
        </v-col>
        <v-col cols="12" sm="4" class="d-flex justify-end">
          <i class="setting fa fa-ellipsis"></i>
        </v-col>
      </div>
      <h1>
        <i class="rightMoneySign fa fa-sterling-sign"></i>
        0.00
        <sub>(Vat incl.)</sub>
      </h1>
    </v-col>
    <v-btn class="mx-auto mt-5 d-block" style="width:60%"> Send Invoice </v-btn>
  </div>
</template>
<script>
export default {
  name: "RightSide",
};
</script>