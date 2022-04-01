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
          <v-btn to="/student/my-classes" type="button" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success">
            <font-awesome-icon class="mr-2 pe-7s-angle-left" icon="arrow-left" />Back
          </v-btn>
        </div>
        </div>
    </div>
    <div class="main-card card">
      <VueElementLoading :active="isLoading" spinner="line-scale" color="var(--info)" />
      <div class="card-body" style="height:620px;">
        <h5 class="card-title">Meeting Windows</h5> 
          <form>
            <div class="form-row">
              <div class="col-12">
                <!-- {{link}} -->
                <iframe v-if="isNotDisplay" width="100%" frameBorder="0" height="520px"></iframe>
                <iframe v-if="isDisplay" allow="camera *; microphone *;" allowfullscreen v-bind:src="''+link+''" width="100%" frameBorder="0" height="520px"></iframe>
              </div>
            </div>
          </form>
      </div>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
window.axios = require('axios');

import PageTitle from "../../../Layout/Components/PageTitle.vue";
import TeacherMeeting from '../../../Layout/Components/Meeting/Index.vue'

import Tabs from "vue-tabs-with-active-line";
import VueElementLoading from "vue-element-loading";
import CreateOnlineClasses from "../../../Layout/Components/Classes/Online-classes.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FlashMessage from '@smartweb/vue-flash-message';
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faTrashAlt,
  faAngleDown,
  faAngleUp,
  faDotCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faAngleDown, faAngleUp, faDotCircle, faArrowLeft);

Vue.use(FlashMessage);

const TABS = [
  {
    title: "Overview",
    value: "tab1"
  },
  {
    title: "Completed",
    value: "tab2"
  }
];

export default {
  components: {    
    PageTitle,
    Tabs,
    TeacherMeeting,
    VueElementLoading,
    CreateOnlineClasses,
    "font-awesome-icon": FontAwesomeIcon
  },
  data: () => ({
    heading: "Meeting",
    subheading:
      "Here you can join meeting.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",
    link:'',
    isLoading:false,
    isDisplay:false,
    isNotDisplay:true,
  }),

  created() {
    this.link = this.$route.params.meeting_id;
  },
  
  mounted () {
      axios.get('/api/student/join-meeting/'+this.link)
      .then(response => {  
        this.link = response.data;
        if(this.link) {
          this.isDisplay = true;
          this.isNotDisplay = false;
          this.isLoading = false;
        }
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  }
};
</script>
