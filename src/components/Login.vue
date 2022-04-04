<template>
  <div class="login">
    <h1>Verify your <span class="login-text">Email</span></h1>
    <div>
      <img class="login-image" src="./image/login-image.jpg" alt="login" />
    </div>
    <form v-if="!existsOTP" v-on:submit="(e) => createOTP(e)">
      <input
        type="email"
        class="input-box"
        id="email"
        placeholder="Enter Your email"
        name="email"
        v-model="inputValue.email"
        v-on:change="handlerInputChange"
      />
      <input type="submit" class="submit-btn" />
    </form>
    <form
      v-if="success && this.inputValue.email"
      v-on:submit="(e) => verifyOTP(e)"
    >
      <input
        type="text"
        class="input-box"
        id="otp"
        name="otp"
        placeholder="Enter your OTP"
        v-model="inputValue.otp"
        v-on:change="handlerInputChange"
      />
      <input type="submit" class="submit-btn" />
    </form>
    <p style="color: green" v-if="this.successMessage != ''">
      {{ this.successMessage }}
    </p>
    <p style="color: red" v-if="this.error != ''">{{ this.error }}</p>

    <div style="top: 90%" class="alert otpSuccessFullySended">
      <v-alert dense text type="success" class="successAlert">
        Sent otp Successfully
      </v-alert>
    </div>
    <div style="top: 90%" class="alert logged">
      <v-alert dense text type="success" class="successAlert">
        Successfully logged in
      </v-alert>
    </div>
  </div>
</template>
<script>
export default {
  name: "LoginDetails",
  data: () => ({
    success: false,
    message: "",
    existsOTP: false,
    inputValue: {
      email: "",
      otp: "",
    },
    error: "",
  }),
  methods: {
    handlerInputChange(e) {
      const { name, value } = e.target;
      this.inputValue = {
        ...this.inputValue,
        [name]: value,
      };
    },
    createOTP(e) {
      if (this.inputValue.email != "") {
        this.error = "";
        document.querySelector(".otpSuccessFullySended").style.display =
          "block";
        setTimeout(() => {
          document.querySelector(".otpSuccessFullySended").style.display =
            "none";
        }, 2000);
        fetch(
          `https://invoice-vue-automation-server.netlify.app/.netlify/functions/api/createOtp/${this.inputValue.email}`,
          {
            method: "GET",
            mode: "cors",
            credentials: "same-origin",
          }
        )
          .then((res) => res.json())
          .then((data) => {
            this.existsOTP = data.success;
            this.success = data.success;
            this.message = data.message;
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.error = "Please enter an email";
      }
      e.preventDefault();
    },
    verifyOTP(e) {
      if (this.inputValue.otp != "") {
        this.error = "";
        fetch(
          `https://invoice-vue-automation-server.netlify.app/.netlify/functions/api/validateOTP/${this.inputValue.otp}/${this.inputValue.email}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success == true) {
              document.querySelector(".logged").style.display = "block";
              setTimeout(() => {
                document.querySelector(".logged").style.display = "none";
              }, 3000);
              this.existsOTP = data.success;
              this.success = data.success;
              sessionStorage.setItem("login", "success");
              this.$router.push("/");
            } else {
              this.error = "OTP  didn't Matched";
            }
          });
      } else {
        this.error = "Please enter otp";
      }
      e.preventDefault();
    },
  },
};
</script>