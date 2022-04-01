<template>
  <div>
  {{form}}
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
          <v-btn  to="/components/onlineclasses" type="button" class="text-primary btn-shadow d-inline-flex align-items-center btn btn-primary">
            <font-awesome-icon class="mr-2 pe-7s-angle-left" icon="arrow-left" />Back
          </v-btn>
        </div>
      </div>
  </div>
  <div class="content" style="position: relative;">
      <VueElementLoading :active="isLoading" spinner="line-scale" color="var(--info)" />
      <div>
        <div class>
          <b-row>
            <b-col md="12">
                 <b-card title="Meeting Details" class="main-card mb-3">
                  <b-form id="signup-form" @submit.prevent="SaveFormData">
                    <b-form-group id="subject" label="Subject" label-for="subject">
                      <b-form-input id="subject" type="text" v-model="form.subject"
                        :state="!$v.form.subject.$invalid" aria-describedby="input1LiveFeedback" placeholder="Enter Subject"/>
                       <b-form-invalid-feedback id="subject" >
                         Subject field is required.
                      </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="class" label="Class" label-for="class">
                        <select   multiple="true" id="selected_class" v-model="selectedClass" class="mb-2 form-control">
                          <option v-for="(item, index) in form.class" v-bind:key="index" :value="''+item.id+''">{{item.class_name}} {{item.section_name}}</option>
                        </select>
                    </b-form-group>

                    <b-form-group id="meeting_name" label="Meeting Name" label-for="meeting_name">
                      <b-form-input id="meeting_name" type="text" v-model="form.meeting_name"
                        placeholder="Enter MeetingName"/>
                       <span class="text-muted">
                         This is optional parameter.
                      </span>
                    </b-form-group>

                    <b-form-group id="welcome" label="Welcome Message" label-for="welcome">
                      <b-form-input id="welcome" type="text" v-model="form.welcome"
                        placeholder="Enter Welcome Message"/>
                       <span class="text-muted">
                         This is optional parameter.
                      </span>
                    </b-form-group>

                    <!-- <b-form-group id="max_participants" label="Max Participant" label-for="max_participants">
                      <b-form-input id="max_participants" type="number" v-model="form.max_participants"
                        placeholder="Enter Max Participant"/>
                       <span class="text-muted">
                         This is optional parameter. 
                      </span>
                    </b-form-group> -->

                    <!-- <b-form-group id="duration" label="Duration(In Minutes)" label-for="duration">
                      <b-form-input style="width:150px;" id="duration" type="number" v-model="form.duration"
                        placeholder="Enter Duration"/>
                       <span class="text-muted">
                         This is optional parameter.
                      </span>
                    </b-form-group> -->

                    <b-form-group id="moderator_only_message" label="Moderator Message" label-for="moderator_only_message">
                      <b-form-input id="moderator_only_message" type="text" v-model="form.moderator_only_message"
                        placeholder="Enter Moderation Message"/>
                       <span class="text-muted">
                         This is optional parameter.
                      </span>
                    </b-form-group>

                    <div class="row">
                      <div class="col-sm-4">
                        <b-form-group  id="auto_start_recording" label="Auto Start Recording" label-for="auto_start_recording">
                          <select type="select" id="auto_start_recording" v-model="form.auto_start_recording" class="custom-select" style="width:100px;">
                                <option value="0">No</option> 
                                <option value="1">Yes</option> 
                          </select>
                        </b-form-group>
                       </div>

                       <div class="col-sm-4">
                        <b-form-group id="allow_start_stop_recording"  label="Allow Start Stop Recording" label-for="allow_start_stop_recording">
                          <select style="width:100px;" type="select" id="allow_start_stop_recording" v-model="form.allow_start_stop_recording" class="custom-select">
                                <option selected value="1">Yes</option> 
                                <option value="0">No</option> 
                          </select>
                        </b-form-group>
                       </div>

                       <div class="col-sm-4">
                        <b-form-group style="width:100px;" id="mute_on_start" label="Mute On Start" label-for="mute_on_start">
                          <select type="select" id="mute_on_start" v-model="form.mute_on_start" class="custom-select">
                                <option value="0">No</option> 
                                <option value="1">Yes</option> 
                          </select>
                        </b-form-group>
                       </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-4">
                        <b-form-group style="width:150px;" id="class_date" label="Date" label-for="class_date">
                            <flat-pickr :config="config" value="" id="class_date"  v-model="form.class_date"
                            placeholder="Select Date"></flat-pickr>
                          <b-form-invalid-feedback id="class_date">
                            Date field is required.
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </div>

                      <div class="col-sm-4">
                        <b-form-group style="width:150px;"  id="time_to" label="Start Time" label-for="time_to">
                            <flat-pickr 
                            :config="{noCalendar:true, enableTime:true, wrap: true, dateFormat:'H:i', time_24hr:false}" v-model="form.time_to" value=""></flat-pickr>
                          <b-form-invalid-feedback id="time_to" >
                            Time To field is required.
                          </b-form-invalid-feedback>
                        </b-form-group>
                      </div>
                    
                    <div class="col-sm-4">
                      <b-form-group style="width:150px;"  id="time_from" label="End Time" label-for="time_from">
                          <flat-pickr  :config="{noCalendar:true, enableTime:true, wrap: true, dateFormat:'H:i', time_24hr:false}" v-model="form.time_from" value=""></flat-pickr>
                        <b-form-invalid-feedback id="time_from" >
                          Time From field is required.
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </div>
                    </div>
                    
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
//import { required, minLength } from "vuelidate/lib/validators";
import { required } from "vuelidate/lib/validators";
import VueElementLoading from "vue-element-loading";
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import "flatpickr/dist/themes/material_green.css";


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
    "font-awesome-icon": FontAwesomeIcon,
    flatPickr
  },
  data: () => ({
    heading: "Create Meeting",
    subheading:
      "Here you can create meeting for the students.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",

    config: {
      wrap: true, // set wrap to true only when using 'input-group'
      altFormat: 'M j, Y',
      altInput: false,
      dateFormat: 'Y-m-d',
      minDate:new Date(),   
    },   

    selectedClass: [],
    isDisable: false,
    isLoading:false,
    props: ['link'],
    isSelected:true, 
    //form fields
    form: {
      meeting_id: '',
      class: [
        ],
      subject: '',
      class_date: '',
      time_to: '',
      time_from: '',
      meeting_name: '',
      welcome: '',
      duration: '',
      auto_start_recording: '',
      allow_start_stop_recording : '',
      webcams_only_for_moderator: '',
      mute_on_start: '',
    }
    
  }),

   //validation rules
 mixins: [validationMixin],
  validations: {
    form: {
      class: {
        required,
      },
      // class_date: {
      //   required,
      // },
      // time_to: {
      //   required
      // },
      subject: {
        required
      }, 
      // time_from: {
      //   required
      // }
    }
  },

  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));
    //console.log(this.user);
    this.getClassDetails();
    this.form.allow_start_stop_recording = 1;
    this.form.auto_start_recording = 0;
    this.form.mute_on_start = 0;
  },

  methods: {
      SaveFormData: function() {
        this.isDisable = true;
        this.isLoading = true;
        //var meeting_id = this.form.meeting_id;
        //var meeting_id = 2;
        axios.post(process.env.VUE_APP_API_URL_MEETING +'teacher/store-meeting-details', {
        //meeting_details:this.form
          user_id : this.user.id,
          meeting_id :this.form.meeting_id,
          class :this.selectedClass,
          class_date: this.form.class_date,
          time_to :this.form.time_to,
          subject :this.form.subject,
          time_from :this.form.time_from,
          meeting_name :this.form.meeting_name,
          welcome: this.form.welcome,
          duration: this.form.duration,
          moderator_only_message: this.form.moderator_only_message,
          auto_start_recording: this.form.auto_start_recording, 
          allow_start_stop_recording : this.form.allow_start_stop_recording,
          mute_on_start: this.form.mute_on_start,
        },
      ).then( result => {

          if(result.data.status == 200) {
            this.flashMessage.success({
                  title: result.data.title, 
                  message: result.data.message,
                  time: 5000,
                  blockClass: 'custom-block-class'
              });
              this.$router.push({ name: 'onlineclasses' }).catch((e) => {
                console.log(e);
              });
            
          } else if(result.data.status == 404) {
            this.isLoading=false; 
            this.isDisable = false;
            this.flashMessage.success({
                  title: result.data.title, 
                  message: result.data.message,
                  time: 5000,
                  blockClass: 'custom-block-class'
              });

            this.isDisable = false;
            this.isLoading = false;
            return false;
            //this.$router.push({ name: 'online-classes' });
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
      this.form.meeting_id = '';
      this.selectedClass = [];
      this.form.welcome = '';
      this.form.meeting_name = '';
      this.form.moderator_only_message = '';
      this.form.class_date = '';
      this.form.time_to = '';
      this.form.subject = '';
      this.form.time_from = '';
      return false;
    },

     //get all classes
     getClassDetails(){
        axios.get(process.env.VUE_APP_API_URL_MEETING +'teacher/get-classes?staff_id='+this.user.emp_id)
          .then(response => {  
            this.form.class = response.data
            console.log(this.form.class);
          })
          .catch(error => {
            console.log(error)
          })
      },
  }
};
</script>
