<template>
  <div>
     <div class="app-page-title">
      <div class="page-title-wrapper">
        <div class="page-title-heading">
          <div class="page-title-icon">
            <i :class="icon" />
          </div>
          <div>
            {{heading}}
            <div class="page-title-subheading">{{subheading}}</div>
          </div>
        </div>

        <div class="page-title-actions" >
          <v-btn to="/teacher/classes" type="button" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success">
            <font-awesome-icon class="mr-2 pe-7s-angle-left" icon="arrow-left" />Back
          </v-btn>
        </div>
      </div>
  </div>
  <div class="content">
      <VueElementLoading :active="isLoading" spinner="line-scale" color="var(--info)" />
      <div>
        <div class>
          <b-row>
            <b-col md="12">
                 <b-card title="Meeting Details" class="main-card mb-3">
                  <b-form id="signup-form" @submit.prevent="SaveFormData">

                    <b-form-group id="class" label="class" label-for="class">
                      <b-form-input id="class" type="text" v-model="form.name"
                        :state="!$v.form.name.$invalid" aria-describedby="input2LiveFeedback" placeholder="Enter class"/>
                       <b-form-invalid-feedback id="class" >
                         Class field is required.
                      </b-form-invalid-feedback>
                    </b-form-group>

            
                    <b-button type="button" variant="primary" v-on:click="reset">Reset</b-button>
                    <b-button type="submit" variant="success" :disabled="isDisable || $v.form.$invalid">Submit</b-button>
                  </b-form>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from 'vue';

import FlashMessage from '@smartweb/vue-flash-message';
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
//import datetime from 'vuejs-datetimepicker';
import VueElementLoading from "vue-element-loading";


import {
  faTrashAlt,
  faAngleDown,
  faAngleUp,
  faDotCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faAngleDown, faAngleUp, faDotCircle, faArrowLeft);

Vue.use(FlashMessage);

export default {
  components: {
    VueElementLoading,
   // datetime,
    //minLength,
    "font-awesome-icon": FontAwesomeIcon
  },
  data: () => ({
    heading: "Create Class",
    subheading:
      "Here you can create Classes for student.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",
    
    isDisable: false,
    isLoading:false,
    props: ['link'],
    //form fields
    form: {
      name: '',
    }
    
  }),

   //validation rules
 mixins: [validationMixin],
  validations: {
    form: {
      name: {
        required,
      },
    }
  },
  methods: {
      SaveFormData: function() {
      this.isDisable = true;
      this.isLoading = true;
        axios.post('/api/teacher/save-class', {
          name :this.form.name,
        },
      ).then( result => {

        // console.log(result.data); return false;
          if(result.data.status == 200) {
            this.flashMessage.success({
                  title: result.data.title, 
                  message: result.data.message,
                  time: 5000,
                  blockClass: 'custom-block-class'
              });
              this.$router.push({ name: 'class-index' });
            
          } else if(result.data.status == 404) {
            this.isLoading=false; 
            this.isDisable = false;
            this.flashMessage.success({
                  title: result.data.title, 
                  message: result.data.message,
                  time: 5000,
                  blockClass: 'custom-block-class'
              });
              this.$router.push({ name: 'class-index' });
          }
          else {
            this.flashMessage.success({
                  title: result.data.title, 
                  message: result.data.message
              });
          }
          
      })
    },

    reset: function() {
      this.form.class = '';

      return false;
    }
  }
};
</script>
