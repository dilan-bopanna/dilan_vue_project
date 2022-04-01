<template>
  <div>

    <FlashMessage :position="'right bottom'"></FlashMessage>
    <!-- <Alerts :response_message="message" :success="is_success" :error="is_error" v-if="message !=''"></Alerts> -->
    <!-- <v-alert
          outlined
          :value="is_success"
          color="success"
          icon="lnr-checkmark-circle">
          {{ message }}
          </v-alert>
        <v-alert :value="is_error" color="error" icon="lnr-warning" outlined>
          {{ message }}
        </v-alert> -->
    <!-- {{studentid}} -->

    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="title"
          label="Title"
          required
          outlined
        ></v-text-field>

        <v-textarea
          v-model="description"
          label="Enter your Observation here"
          outlined
        >
        </v-textarea>

        <v-btn
          :disabled="isDisabled"
          color="success"
          class="btn mr-2 mb-2 btn-hover-shine btn-transition btn-success"
          @click="saveObservation()"
        >
          {{ $t("submit") }}
          <b-spinner :disabled="btnloading" small v-if="btnloading"></b-spinner>
        </v-btn>
      </v-form>
    </v-card-text>
  </div>
</template>

<script>
import axios from "axios";
//import  Alerts from '../validation_errors/alert/alerts';
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from "vue";
Vue.use(FlashMessage);
export default {
  components: {
    // Alerts,
  },
  props: ["studentid", "clearform"],
    watch:{
    clearform(){
      //alert('val')
      if(this.clearform == "YES"){
        this.title="";
        this.description = "";
      }
  }
  },
  data: () => ({
    title: "",
    description: "",
    staff_id: "",
    user: {},
    is_success: false,
    is_error: false,
    message: "",
    isDisabled: false,
    btnloading: false,
    cleardata:"",
  }),

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user.emp_id);
  },
  methods: {
    saveObservation() {
      //alert(this.studentid);
      this.is_success = "";
      this.is_error = "";
      this.message = "";
      (this.isDisabled = true),
        (this.btnloading = true),
        axios
          .post(process.env.VUE_APP_API_URL_STAFF + "studentObservations", {
            title: this.title,
            description: this.description,
            staff_id: this.user.emp_id,
            student_id: this.studentid,
          })
          .then((res) => {
            if (Array.isArray(res.data.message)) {
              this.array_data = res.data.message.toString();
            } else {
              this.array_data = res.data.message;
            }
            if (res.data.status == "S") {
              (this.isDisabled = false), (this.btnloading = false);
              this.flashMessage.success({
                title: res.data.title,
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.$vuetify.goTo(0);
              this.title = "";
              this.description = "";
              this.$emit('closePoup', false);
            } else {
              (this.isDisabled = false), (this.btnloading = false);
              this.flashMessage.error({
                title: res.data.title,
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.$vuetify.goTo(0);
            }
          })
          .catch((err) => {
            console.log("this error" + err);
          });
    },
  },
};
</script>