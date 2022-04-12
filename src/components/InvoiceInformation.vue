<template>
  <v-row no-gutters>
    <v-col cols="12" md="8">
      <div class="ml-5 mt-5 mb-5 pt-5 pb-5 white leftSide">
        <v-row no-gutters>
          <v-col cols="12" md="6" sm="5" class="left">
            <img class="m-3 ml-10" src="./image/next15.png" alt="" />
          </v-col>
          <v-col
            cols="12"
            md="6"
            class="headRight justify-end align-end pr-5 mb-5 d-flex"
          >
          
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
                v-model="invoiceNo"
                type="number"
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
                v-model="purchaseNo"
                type="number"
              />
            </p>
            <p class="mt-5 d-flex">
              <span>Issued date:</span>
              <span class="ml-5">{{
                new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                  .toISOString()
                  .substr(0, 10)
              }}</span>
            </p>
            <p class="d-flex">
              <span class="mt-5">Due date:</span>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="auto"
                class="ml-5"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </p>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex ml-10 justify-end align-end">
            <v-col cols="12" md="7" class="pt-3 pb-3 right">
              
            </v-col>
          </v-col>
        </v-row>
        <div class="invoice mx-auto">
          <h6>Item Details</h6>
          <p color="red" class="text-center">{{ itemError && itemError }}</p>
          <p color="red" class="text-center">
            {{ itemEmptyError && itemEmptyError }}
          </p>
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
            <tr
              class="items"
            >
              <td>items</td>
              <td>{{totalUn ? totalUn.toFixed(2) : "0.00"}}</td>
              <td>
                <i class="moneySign fa fa-sterling-sign"></i
                >{{totalRate ? totalRate.toFixed(2) : "0.00"}}
              </td>
              <td>
                <i class="moneySign fa fa-sterling-sign"></i
                >{{ totalVat.toFixed(2) }}
              </td>
              <td>
                <i class="moneySign fa fa-sterling-sign"></i>
                {{ subTotal.toFixed(2) }}
              </td>
              <td>
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
                {{ this.itemTotal ? this.itemTotal.toFixed(2) : "0.00" }}
              </td>
              <td>
                <i v-on:click="addItem" class="plus"><span>+</span></i>
              </td>
            </tr>
            <br />
          </table>
          <v-text-field
            :rules="rules"
            label="Description"
            hide-details="auto"
            class="mt-0 pt-1 pb-1"
            style="background-color: #f3f1f1"
            v-model="description"
          ></v-text-field>
          <v-row class="d-flex mx-auto paymentMethod">
            <v-col cols="12" sm="6" class="left">
              
            </v-col>
            <v-col cols="12" sm="6" class="d-flex mt-5 justify-end right">
              <div>
                <p>
                  Sub Total:
                  <span>
                    <i class="moneySign fa fa-sterling-sign"></i>
                    {{ subTotal ? subTotal.toFixed(2) : "0.00" }}
                  </span>
                </p>
                <p>
                  Total Vat:
                  <span>
                    <i class="moneySign fa fa-sterling-sign"></i>
                    {{ totalVat ? totalVat.toFixed(2) : "0.00" }}
                  </span>
                </p>
                <p>
                  Total Amount:
                  <span>
                    <i class="moneySign fa fa-sterling-sign"></i>
                    {{ subTotal ? (subTotal + totalVat).toFixed(2) : "0.00" }}
                  </span>
                </p>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-col>
    <v-col cols="12" md="4">
      <RightSide  ref="childComponent" :success="this.success" :grandTotal="totalVat + subTotal" :error="valueEmptyError" @clickResponse="submitData" />
    </v-col>
  </v-row>
</template>
<script>
import RightSide from "./RightSide.vue";
export default {
  name: "InvoiceInformation",
  components: {
    RightSide,
  },
  data: () => ({
    rules: [
      (value) => value != '' || "Required.",
    ],
    clientName: [(value) => value != '' || "Required."],
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu: false,
    items: ["5%", "12.5%", "20%"],
    itemError: "",
    itemVal: [],
    itemTotal: 0,
    totalVat: 0,
    vatVal: 0,
    subTotal: 0,
    valueEmptyError: "",
    itemEmptyError: "",
    success : false,
    item:'',
    unit:'',
    rate:'',
    invoiceNo:'',
    purchaseNo:'',
    description:'',
    vat:'20%',
    totalUn:0,
    totalRate:0
  }),
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = "YEAR"));
    },
  },
  created(){
    const getStatus = sessionStorage.getItem("login");
    if(!getStatus){
      this.$router.push('/login')
    }
  },
  methods: {
    setTotalOfItem() {
      const unit = this.unit;
      const rate = this.rate;

      this.itemTotal = unit * rate;
      if (this.vat != undefined && this.itemTotal){
        const removeParsentSign = this.vat.slice(0, -1);
        const mainValue = parseFloat(removeParsentSign);
        const vatValue = (this.itemTotal / 100) * mainValue;
        if (vatValue) {
          this.vatVal = vatValue;
        }
      }else{
          this.vatVal = 0;
      }
      if (this.itemVal.length != 0) {
        //set subTotal
        let subTotalCount = 0;
        for (let i = 0; i < this.itemVal.length; i++) {
          subTotalCount = subTotalCount + this.itemVal[i].total;
        }
        this.subTotal = subTotalCount + this.itemTotal;

        //set totalVat
        let countVatTotal = 0;
        for (let i = 0; i < this.itemVal.length; i++) {
          countVatTotal = countVatTotal + this.itemVal[i].vat;
        }
        this.totalVat = countVatTotal + this.vatVal;

        //set Unit
        if(this.unit){
          let units = 0;
          for (let i = 0; i < this.itemVal.length; i++) {
            units = units + parseFloat(this.itemVal[i].unit);
          }
          this.totalUn = units + parseFloat(unit);
        }else{
          let units = 0;
          for (let i = 0; i < this.itemVal.length; i++) {
            units = units + parseFloat(this.itemVal[i].unit);
          }
          this.totalUn = units
        }

        //set rate
        if(this.rate){
          let rates = 0;
          for (let i = 0; i < this.itemVal.length; i++) {
            rates = rates + parseFloat(this.itemVal[i].rate);
          }
          this.totalRate = rates + parseFloat(rate);
        }else{
          let rates = 0;
          for (let i = 0; i < this.itemVal.length; i++) {
            rates = rates + parseFloat(this.itemVal[i].rate);
          }
          this.totalRate = rates
        }
      } else {
        this.subTotal = this.itemTotal;
        this.totalVat = this.vatVal;
        this.totalUn = parseFloat(unit)
        this.totalRate = parseFloat(rate)
      }
    },
    vatChanged() {
      const removeParsentSign = this.vat.slice(0, -1);
      const mainValue = parseFloat(removeParsentSign);
      const vatValue = (this.itemTotal / 100) * mainValue;
      this.vatVal = vatValue;

      if (this.itemVal.length != 0) {
        let countVatTotal = 0;
        for (let i = 0; i < this.itemVal.length; i++) {
          countVatTotal = countVatTotal + this.itemVal[i].vat;
        }
        this.totalVat = countVatTotal + this.vatVal;
      } else {
        this.totalVat = this.vatVal;
      }
    },
    addItem() {
      const itemName = this.item;
      const unit = this.unit;
      const rate = this.rate;
      if (itemName == '' || unit == '' || rate == '') {
        this.itemError = "fill all fields";
      } else {
        this.itemError = "";
        const getItemData = {
          itemName,
          unit,
          rate,
          vat: this.vatVal,
          total: this.itemTotal,
        };
        this.itemVal.push(getItemData);
        this.item = "";
        this.unit = "";
        this.rate = "";
        this.itemTotal = 0;
        this.vat = '20%'
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    submitData(name, email, pdf) {
      const invoiceNo = this.invoiceNo;
      const purchaseNo = this.purchaseNo;
      if (
        invoiceNo == '' ||
        purchaseNo == '' ||
        name == '' ||
        email == '' ||
        this.description == '' ||
        this.date == null
      ) {
        this.valueEmptyError = "Please fill all fields";
        this.itemEmptyError = "";
      } else if (this.itemVal.length == 0 && (this.unit == '' || this.rate == '')) {
        this.valueEmptyError = "";
        this.itemEmptyError = "You have not added any item";
      } else {
        this.valueEmptyError = "";
        this.itemEmptyError = "";
        document.querySelector('.loader').style.display = 'flex'
        const total = this.subTotal + this.totalVat;
        const issueDate = new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10);
        const getItems = {
          itemName:this.item,
          unit:this.unit,
          rate:this.rate,
          vat: this.vatVal,
          total: this.itemTotal
        }
        const items = [...this.itemVal,getItems]
        const formData = new FormData();
        formData.append('file',pdf);
        formData.append('invoiceNo',invoiceNo);
        formData.append('purchaseNo',purchaseNo);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('items',JSON.stringify(items));
        formData.append('total',total);
        formData.append('issueDate',issueDate);
        formData.append('dueDate',this.date);
        formData.append('description',this.description);

        fetch('https://invoice-vue-automation-server.netlify.app/.netlify/functions/api/doSomething',{
          method:"POST",
          body:formData
        })
        .then(res => res.json())
        .then( ()=> {
          this.invoiceNo = undefined
          this.purchaseNo = undefined
          this.customerName = undefined
          this.description = ''
          this.vat = '20%'
          this.item = ''
          this.unit = ''
          this.rate = ''
          this.itemTotal = 0
          this.itemVal = []
          this.total = 0
          this.subTotal = 0
          this.totalVat = 0
          this.$refs.childComponent.afterSubmitData();
          this.totalUn = 0
          this.totalRate = 0
          document.querySelector('.loader').style.display = 'none'
          document.querySelector('.alertSuccess').style.display = 'block'
          setTimeout(() => {
            document.querySelector('.alertSuccess').style.display = 'none'
          },3000)
        })
        .catch(() => {
          document.querySelector('.loader').style.display = 'none'
          document.querySelector('.alertError').style.display = 'block'
          setTimeout(() => {
            document.querySelector('.alertError').style.display = 'none'
          },3000)
        })
      }
    },
  },
};
</script>