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
              label="Approver name"
              hide-details="auto"
              :rules="rules"
              class="pa-0 ma-0"
              v-model="name"
            ></v-text-field>
            <v-text-field
              label="Approver email"
              :rules="rules"
              hide-details="auto"
              class="pa-0 ma-0 mt-3"
              v-model="email"
              type="email"
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
        {{grandTotal ? grandTotal.toFixed() : '0.00'}}
        <sub>(Vat incl.)</sub>
      </h1>
      <v-row className="d-flex pdf">
        <h3 class="mt-8 ml-5 mb-3">attach pdf in mail</h3>
        <v-col cols="12" sm="3">
          <v-checkbox
            v-model="checkbox"
          ></v-checkbox>
        </v-col>
      </v-row>
      <v-file-input
        v-if="checkbox"
        truncate-length="15"
        label="Select file"
        v-model="pdf"
      ></v-file-input>
    </v-col>
    <v-btn v-on:click="sendData"  class="mx-auto mt-5 d-block" style="width: 60%">
      Send Invoice
    </v-btn>
    <p style="color:red" class="mt-5 text-center">{{this.error != '' ? this.error : ''}}</p>
  </div>
</template>
<script>
export default {
  name: "RightSide",
  data: () => ({
    rules: [(value) => value != '' || "Required."],
    click:true,
    name:'',
    email:'',
    pdf:null,
    checkbox:false
  }),
  props:[
    'error',
    'grandTotal',
    'success',
    'afterSentData'
  ],
  methods:{
    sendData(){
      this.$emit('clickResponse', this.name,this.email,this.pdf);
    },
    afterSubmitData(){
      this.pdf = {}
      this.name = undefined
      this.email = undefined
    }
  }
};
</script>