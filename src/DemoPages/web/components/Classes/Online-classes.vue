<template>
  <div>
    
    <div  v-if="role=='teacher'">
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

      <div class="page-title-actions">
        
        <v-btn style="color:white;" to="/teacher/create-class" type="button" class="text-primary btn-shadow d-inline-flex align-items-center btn btn-primary">
          <font-awesome-icon class="mr-2" icon="plus" />Create
        </v-btn>
      </div>
    </div>
  </div>

   <tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'"
      :tab-class="'tab-item'" :tab-active-class="'tab-item-active'"
      :line-class="'tab-item-line'"  @onClick="handleClick" />
      <div class="content">
        <div v-if="currentTab === 'tab1'">
          <div class="row">
            <div class="col-12">
              <div class="main-card mb-3 card">
                <div class="primary card-header text-white">All Classes</div>
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Class (Sec)</th>
                        <th>Subject</th>
                        <th>Link</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th rowspan="2">Action</th>
                        <th rowspan="2">Start Meeting</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                      <tr v-for="(item,index) in items" :key="index">
                        <td>{{item.class}}</td>
                        <td>{{item.subject}}</td>
                        <td>
                        <span class="btn btn-info text-white copy-btn ml-auto" @click.stop.prevent="copyTestingCode(item.id)">
                          Copy
                        </span>
                        <input type="hidden" :id="'item_link_'+item.id+''" :value="item.link">

                        </td>
                        <td>{{item.class_date}}</td>
                        <td>{{item.start_time}}</td>
                        <td>{{item.end_time}}</td>
                        <td>
                          <router-link :disabled="isDisable" :style="show ? filterStyle : null" class="btn mr-2 mb-2 btn-square btn-info text-white edit-btn" :to="{ name: 'edit-meeting', params: { id: item.id }}">Edit</router-link>
                          <button :disabled="isDisable" @click="deleteMeeting(item.id)" type="button" class="btn mr-2 mb-2 btn-square btn-danger">Delete</button>
                        </td>
                        <td>
                          <!-- <a v-if="MeetingDetails[item.id] == 1" target="_blank" v-bind:href="'/api/teacher/start-meeting/'+item.meeting_id+''" type="button" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success" @click="disableButton()">
                          Start
                          </a> -->
                          <!-- {{MeetingDetails}} -->
                           <!-- <router-link target="_blank" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success" :to="{ name: 'meeting-index', params: { meeting_id: item.meeting_id }}">Start</router-link>v-if="MeetingDetails[item.id] == 1" -->
                           <a  @click="startMeeting(item.meeting_id)" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success"  target="_blank">Start</a>
                          <!-- <v-btn v-bind:to="'/teacher/meeting/index/'+item.meeting_id+''" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success">
                              Start
                          </v-btn> -->
                        </td>
                      </tr>
                    </tbody>
                  </table>  
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
     <div class="content">
        <div v-if="currentTab === 'tab2'">
          <div class="row">
            <div class="col-12">
              <div class="main-card mb-3 card">
                <div class="card-header text-white" style="background:skyblue;">Completed Classes</div>
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Class (Sec)</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="completedClass in completedCls" :key="completedClass.id">
                        <td>{{completedClass.class}}</td>
                        <td>{{completedClass.subject}}</td>
                        <td>{{completedClass.class_date}}</td>
                        <td>{{completedClass.start_time}}</td>
                        <td>{{completedClass.end_time}}</td>
                    </tr>
                    </tbody>
                  </table>  
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
  <!-- <div>
     <CreateClass></CreateClass>
  </div> -->
    
  </div>
</template>

<script>
import Vue from 'vue';
import axios from "axios";
//import PageTitle from "../../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
import { library } from "@fortawesome/fontawesome-svg-core";
//import CreateOnlineClasses from "../../../Layout/Components/Classes/Online-classes.vue";
//import StudentOnlineClass from "../Student/Online-classes.vue";
//import CreateClass from "./Create-online-classes.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FlashMessage from '@smartweb/vue-flash-message';
//import Swal from 'sweetalert';
import VueResource from 'vue-resource';
import $ from 'jquery'
Vue.use(VueResource);

import {
  faTrashAlt,
  faAngleDown,
  faAngleUp,
  faDotCircle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

Vue.use(FlashMessage);



library.add(faTrashAlt, faAngleDown, faAngleUp, faDotCircle, faArrowLeft);
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
  // CreateClass,
    Tabs,
     "font-awesome-icon": FontAwesomeIcon,
  // Swal,
    
    // StudentOnlineClass,
    // VueElementLoading,
    // CreateOnlineClasses,
    //"font-awesome-icon": FontAwesomeIcon
  },
  data: () => ({
    heading: "Online Classes",
    subheading:"Schedule and conduct online classes.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",
    dialog: false,
    user:[],
    tabs: TABS,
    currentTab: "tab1",
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    showCreateClass:false,
    completedCls: [],

    MeetingDetails:{},

    //tables
    items: [],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: false,
    dark: false,
    fixed: false,
    footClone: false,
    isDisable:false,
    info: null,
    loading: true,
    errored: false,
    role: 'teacher',
    show:false,
    renderComponent: true,
    filterStyle: {
        pointerEvents: "none",
    },
  }),
  
  mounted () {
      //this.getCurrentUser();
     
      this.getMeetingDetails();
      this.getCompletedMeeting();
      this.allocation_id='';
  },

  created () {
     this.user = JSON.parse(localStorage.getItem('user'));
     this.fetchEventsList();
  },

  methods: {
     startMeeting(meetingid){
       alert(meetingid);
        
          axios.get(process.env.VUE_APP_API_URL_MEETING +'teacher/start-meeting/'+meetingid+'/'+this.user.id) 
        .then(response => {  
          this.items = response.data.data
          console.log(this.items);
          //alert("entered");
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
     },
    //timer for url 
    fetchEventsList () {
         //alert(this.user.id);
         axios.get(process.env.VUE_APP_API_URL_MEETING + 'teacher/request-before-start-meeting?user_id='+this.user.id).then(function(response){
          var arr = [];
          $.each(response.data, function(key, value) {
            arr[key] = value;
          });
          this.MeetingDetails = response.data;
          console.log(this.MeetingDetails);
        }).bind(this);
          this.getMeetingDetails();
          setTimeout(this.fetchEventsList, 5000);
      },

     handleClick(newTab) {
      this.currentTab = newTab;
      if (this.currentTab == 'tab2') {
        this.getCompletedMeeting();
      }
    },
    
    //get all meeting details
    getMeetingDetails(){
      console.log(this.user);
      //axios.get(process.env.VUE_APP_API_URL_BBB + "upcomingtest?staff_id="+this.user.emp_id+"&allocation_id="+this.allocation_id)
     // axios.get(process.env.VUE_APP_API_URL_STAFF +'teacher/get-meeting-details?user_id=2')
     axios.get(process.env.VUE_APP_API_URL_MEETING + 'teacher/get-meeting-details?user_id='+this.user.id) 
        .then(response => {  
          this.items = response.data.data
          console.log(this.items);
          //alert("entered");
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },

    //delete meeting
    deleteMeeting(id) {
   alert(id)
      //  $swal({
      //   title: "Are you sure?",
      //   text: "Are you sure that you want to delete this meeting?",
      //   icon: "warning",
      //   dangerMode: true,
      //   buttons: ["No!", "Yes!"],
      // })
      // .then(willDelete => {
        axios.post(process.env.VUE_APP_API_URL_MEETING +'teacher/delete-meeting-details/' + id).then(response => {
          console.log(response);
          this.getMeetingDetails();
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      // .finally(() => this.loading = false)
      //   if (willDelete) {
      //     this.getMeetingDetails();
      //   // / swal("Deleted!", "Meeting has been deleted!", "success");
      //   } else {
      //     return false;
      //   }
     
    },
    copyTestingCode (item_id) {
          let testingCodeToCopy = document.querySelector('#item_link_'+item_id);
          testingCodeToCopy.setAttribute('type', 'text')
          testingCodeToCopy.select()
          try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            alert('Meeting URL has been copied ' + msg);
          } catch (err) {
            alert('Oops, unable to copy');
          }

          /* unselect the range */
          testingCodeToCopy.setAttribute('type', 'hidden')
          window.getSelection().removeAllRanges()
        },
     disableButton(){
       this.isDisable = true;
       this.show = !this.show;
     }
    ,
    //  getCurrentUser() {
    //   axios.get('/api/teacher/get-current-user')
    //   .then(response => { 
    //     this.role = response.data.role;
    //   });
    //  },

     getCompletedMeeting() {
        //get the list of completed class
        axios.get(process.env.VUE_APP_API_URL_MEETING +'teacher/get-completed-meeting-details?user_id='+this.user.id)
        .then(response => {  
          this.completedCls = response.data.data;
          console.log(this.completedCls);
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        });
     }
  }
};
</script>
