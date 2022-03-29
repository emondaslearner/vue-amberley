<template>
  <div class="ml-5 mt-5 mb-5 pt-5 pb-5 white leftSide">
    <v-row no-gutters>
      <v-col cols="12" md="6" sm="5" class="left">
        <img class="m-3" src="./image/Amberley-Logo-blue.png" alt="" />
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="headRight justify-end align-end pr-5 mb-5 d-flex"
      >
        <div>
          <h5>AMBERLEY INNOVATIONS LIMITED</h5>
          <p>Amberley, First Avenue,</p>
          <p>Amersham,Buckinghamshire, United,</p>
          <p>Kingdom, HP79BL,</p>
        </div>
      </v-col>
    </v-row>
    <v-row no-gutters class="mx-auto invoiceInformation">
      <v-col cols="12" sm="5" class="ml-5 left">
        <p class="d-flex mt-5">
          <span class="mt-2">Invoice number:</span>
          <v-text-field
            label="Enter invoice number"
            :rules="rules"
            hide-details="auto"
            color="success  text--lighten-1"
            class="chris pt-0 mt-0 ml-5"
          />
        </p>
        <p class="d-flex mt-2">
          <span class="mt-2">Purchase order no:</span>
          <v-text-field
            md="5"
            label="Enter purchase order no"
            :rules="rules"
            hide-details="auto"
            color="success  text--lighten-1"
            class="chris pt-0 mt-0 ml-5"
          />
        </p>
        <p class="mt-5 d-flex">
          <span>Issued date:</span>
          <span class="ml-5">25/08/2022</span>
        </p>
        <p class="d-flex">
          <span class="mt-5">Due date:</span>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="ml-5"
                v-model="date"
                label="Due date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              :active-picker.sync="activePicker"
              :min="
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              "
              max="2050-01-01"
              @change="save"
            ></v-date-picker>
          </v-menu>
        </p>
      </v-col>
      <v-col cols="12" sm="6" class="d-flex ml-10 justify-end align-end">
        <v-col cols="12" md="7" class="pt-3 pb-3 right">
          <p>Billed to</p>
          <v-text-field
            label="Enter customer name"
            :rules="clientName"
            hide-details="auto"
            color="success  text--lighten-1"
            class="chris"
          />
          <p>NEXT FIFTEEN COMMUNICATION GROUP PLC</p>
          <p>Bermondsey Street, London, United Kingdom</p>
        </v-col>
      </v-col>
    </v-row>
    <div class="invoice mx-auto">
      <h6>Item Details</h6>
      <p color="red" class="text-center">{{ itemError && itemError }}</p>
      <table>
        <tr>
          <td>Item name</td>
          <td>Unit/Days/Hours</td>
          <td>Rate</td>
          <td>Vat</td>
          <td>Line Total</td>
          <td></td>
        </tr>
        <br />
        <tr class="items">
          <td>item</td>
          <td>20</td>
          <td><i class="moneySign fa fa-sterling-sign"></i>20.00</td>
          <td><i class="moneySign fa fa-sterling-sign"></i>10.00</td>
          <td>
            <i class="moneySign fa fa-sterling-sign"></i>
            0.00
          </td>
          <td>
            <i class="close fa fa-times"></i>
          </td>
        </tr>
        <br />
        <tr class="addItem">
          <td>
            <v-text-field
              label="Item name"
              hide-details="auto"
              class="mt-0 pt-1 pb-1 pl-2"
              v-model="item"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              label="unit"
              hide-details="auto"
              class="mt-0 pt-1 pb-1 pl-2"
              v-model="unit"
              type="number"
              @input="setTotalOfItem"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              label="rate"
              hide-details="auto"
              class="mt-0 pt-1 pb-1 pl-2"
              v-model="rate"
              type="number"
              @input="setTotalOfItem"
            ></v-text-field>
          </td>
          <td>
            <v-select
              style="width: 80%"
              class="m-0 p-0 select"
              :items="items"
              label="Vat"
              v-model="vat"
              @change="vatChanged"
            ></v-select>
          </td>
          <td>
            <i class="moneySign fa fa-sterling-sign"></i>
            {{this.itemTotal ? this.itemTotal : '0.00'}}
          </td>
          <td>
            <i v-on:click="addItem" class="plus"><span>+</span></i>
          </td>
        </tr>
        <br />
      </table>
      <v-text-field
        label="Description"
        hide-details="auto"
        class="mt-0 pt-1 pb-1"
        style="background-color:#f3f1f1"
      ></v-text-field>
      <v-row class="d-flex mx-auto paymentMethod">
        <v-col cols="12" sm="6" class="left">
          <h6>Payment Details</h6>
          <p>Account name: <span>Amberley Innovations</span></p>
          <p>Account no: <span>6795 0463 3712 </span></p>
          <p>Routing no.: <span>021000021</span></p>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex mt-5 justify-end right">
          <div>
            <p>
              Sub Total:
              <span>
                <i class="moneySign fa fa-sterling-sign"></i>
                0.00
              </span>
            </p>
            <p>
              Total Vat:
              <span>
                <i class="moneySign fa fa-sterling-sign"></i>
                0.00
              </span>
            </p>
            <p>
              Total Amount:
              <span>
                <i class="moneySign fa fa-sterling-sign"></i>
                0.00
              </span>
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "LeftSide",
  data: () => ({
    rules: [
      (value) => !!value || "Required.",
      (value) => {
        const number = parseInt(value)
        if(!number){
          return 'You can enter only number'
        }
      },
    ],
    clientName: [
      (value) => !!value || "Required."
    ],
    activePicker: null,
    date: null,
    menu: false,
    items: ["5%", "12.5%", "20%"],
    itemError:'',
    itemVal:[],
    itemTotal:0,
    totalVat:0,
    vatVal:0
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  methods: {
    setTotalOfItem(){
      const unit = this.unit;
      const rate = this.rate;

      this.itemTotal = unit * rate;
      if(this.vat != undefined){
        const removeParsentSign = this.vat.slice(0, -1)
        const mainValue = parseFloat(removeParsentSign)
        const vatValue = (this.itemTotal / 100) * mainValue
        if(vatValue){
          this.vatVal = vatValue
        }
      }
    },
    vatChanged(){
      const removeParsentSign = this.vat.slice(0, -1)
      const mainValue = parseFloat(removeParsentSign)
      const vatValue = (this.itemTotal / 100) * mainValue
      this.vatVal = vatValue
    },
    addItem(){
      const itemName = this.item;
      const unit = this.unit;
      const rate = this.rate;
      if(itemName == undefined || unit == undefined || rate == undefined){
        this.itemError = 'fill all fields';
      }else{
        const getItemData = {itemName,unit,rate,vat:this.vatVal,total:this.itemTotal}
        this.itemVal.push(getItemData)
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
  },
};
</script>