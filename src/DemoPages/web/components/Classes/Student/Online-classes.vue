<template>
  <div>
    <div class="app-page-title">
      <div class="page-title-wrapper">
        <!-- <div class="page-title-heading">
        <div class="page-title-icon">
          <i :class="icon" />
        </div>
        <div>
          {{heading}}
          <div class="page-title-subheading">{{subheading}}</div>
        </div>
      </div> -->
      </div>
    </div>
    <!-- {{items}} -->
    <tabs
      :tabs="tabs"
      :currentTab="currentTab"
      :wrapper-class="'body-tabs shadow-tabs'"
      :tab-class="'tab-item'"
      :tab-active-class="'tab-item-active'"
      :line-class="'tab-item-line'"
      @onClick="handleClick"
    />
    <div class="content">
      <div v-if="currentTab === 'tab1'">
        <!-- <div> -->
        <div class="row">
          <div class="col-12">
            <div class="main-card mb-3 card">
              <div class="card-header text-white bg-primary">{{$t('all_classes')}}</div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>{{$t('class(sec)')}}</th>
                      <th>{{$t('subject')}}</th>
                      <th>{{$t('meeting_name')}}</th>
                      <th>{{$t('date')}}</th>
                      <th>{{$t('start_time')}}</th>
                      <th>{{$t('end_time')}}</th>
                      <th rowspan="2">{{$t('meeting')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in items" :key="item.id" v-bind:class="{ 'active': item.class_date==$route.params.plan_date && item.time_to==$route.params.plan_time}">
                      <!-- {{items}} -->
                      <td>
                        <span v-for="(classsection,index) in item.classsectionname" :key="index">
                            <span>{{classsection.class_name}} - {{classsection.section_name}}, </span>
                          </span></td>
                         
                      <td>{{ item.subject }} {{ item.id }}</td>
                      <td>{{ item.meeting_name }}</td>
                      <td>{{ item.class_date }}</td>
                      <td>{{ item.time_to }}</td>
                      <td>{{ item.time_from }}</td>
                     
                      <td>
                       
                        <!-- v-if="MeetingDetails[item.id] == 1 && item.is_meeting_started == '0'" -->
                        <a v-if="item.is_meeting_started == '0'"
                          target="_blank"   type="button" @click="meetingAction()" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success">
                          {{$t('join')}}
                          </a>
                        <!-- v-if="MeetingDetails[item.id] == 1 && item.is_meeting_started == '1'" -->
        
                        <a v-if="item.is_meeting_started == '1'"
                          :href="instance_bbb_url+'/api/student/join-meeting/' + item.meeting_id + '/' + user.id"
                          target="_blank"
                          type="button"
                          class="ml-2 text-white btn-shadow d-inline-flex align-items-center btn btn-success"
                        >
                          {{$t('class_started')}}
                        </a>
                        <!-- <a v-if="MeetingDetails[item.id] == 1 && item.is_meeting_started == '1'" :href="'/api/teacher/start-meeting/'+item.meeting_id+''" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success" target="_blank">Start</a> -->
                        <!-- <button v-if="MeetingDetails[item.id] == 1" class="text-white btn-shadow d-inline-flex align-items-center btn btn-success" @click="meetingAction(item.meeting_id)">Join</button> -->
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
              <div class="card-header text-white bg-primary">{{$t('class_started')}}</div>
              <div class="card-body">
                <table class="table table-striped">
                  <thead>
                    <tr>
                     <!-- <th>{{$t('class(sec)')}}</th> -->
                      <th>{{$t('subject')}}</th>
                      <th>{{$t('meeting_name')}}</th>
                      <th>{{$t('date')}}</th>
                      <th>{{$t('start_time')}}</th>
                      <th>{{$t('end_time')}}</th>
                      <th rowspan="2">{{$t('meeting')}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="completedClass in completedCls" :key="completedClass.id">
                      <!-- <td>{{ completedClass.id }}</td> -->
                      <td>{{ completedClass.subject }}</td>
                      <td>{{ completedClass.meeting_name }}</td>
                      <td>{{ completedClass.class_date }}</td>
                      <td>{{ completedClass.start_time }}</td>
                      <td>{{ completedClass.end_time }}</td>
                      <td>{{$t('completed')}}</td>
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
</template>

<script>
import Vue from "vue";
import axios from "axios";

//import PageTitle from "../../../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
//import VueElementLoading from "vue-element-loading";
//import CreateOnlineClasses from "../../../../Layout/Components/Classes/Online-classes.vue";

import FlashMessage from "@smartweb/vue-flash-message";
import Swal from 'sweetalert';
import VueResource from "vue-resource";
import $ from "jquery";
Vue.use(VueResource);

Vue.use(FlashMessage);

// const TABS = [
//   {
//     title: "Overview",
//     value: "tab1",
//   },
//   {
//     title: "Completed",
//     value: "tab2",
//   },
// ];

export default {
  components: {
    //PageTitle,
    Tabs,
    // VueElementLoading,
    // CreateOnlineClasses,
  },
  computed: {
            tabs(){
            return [
                {
                title: this.$t('overview'),
                value: "tab1"
                },
                {
                title: this.$t('completed'),
                value: "tab2"   
                }
            ]
            }
            
        },
  data: () => ({
    instance_bbb_url: process.env.VUE_APP_BBB_BASE_URL,
    heading: "My Class List",
    subheading: "Here you can attend your online classes.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",

   // tabs: TABS,
    currentTab: "tab1",
    MeetingDetails: {},
    show1: false,
    show2: false,
    show3: false,
    show4: false,
    isButton: true,
    items: [],
    striped: false,
    bordered: false,
    outlined: false,
    small: false,
    hover: false,
    dark: false,
    fixed: false,
    footClone: false,

    info: null,
    loading: true,
    errored: false,
    completedCls:[],
  }),
watch:{

},
  mounted() {
    this.getMeetingDetails();
    this.getCompletedMeetingDetails();
  },

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.fetchEventsList();
  },

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    joinMeeting(meetingid) {
      //alert(meetingid);

      axios
        .get(
          process.env.VUE_APP_API_URL_MEETING +
            "student/join-meeting/" +
            meetingid +
            "/" +
            this.user.id
        )
        .then((response) => {
          // this.items = response
          //this.$router.push({ name: 'meeting-room', params: { url: response.data.url } })
          // this.$router.resolve({ name: 'meeting-room', params: {url: response.data.url}, target: '_blank'})
          localStorage.setItem("url", JSON.stringify(response.data.url));
          let routeData = this.$router.resolve({ name: "meeting-room" });
          window.open(routeData.href, "_blank");

          console.log(response.data.url);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
    meetingAction() {
      Swal({
          title: "Meeting not started yet",
          text: "Wait for the teacher to start the meeting",
          icon: "warning",
          dangerMode: true,
        });
    },

    //timer for url
    fetchEventsList() {
      axios
        .get(
          process.env.VUE_APP_API_URL_MEETING +
            "student/request-for-joining?user_id=" +
            this.user.id
        )
        .then(function (response) {
          var arr = [];
          $.each(response.data, function (key, value) {
            arr[key] = value;
          });

          this.MeetingDetails = response.data;
          this.$forceUpdate();
        })
         this.getMeetingDetails();
          setTimeout(this.fetchEventsList, 5000);
    },

    getCompletedMeetingDetails() {
      //get the list of completed class
    //  alert(this.user.emp_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_MEETING +
            "student/get-completed-meeting-details?user_id=" +
            this.user.emp_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
           console.log(response +"completed classes"); 
          this.completedCls = response.data.data;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },

    //get meeting details
    getMeetingDetails: function () {
      //alert(this.user.emp_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_MEETING +
            "student/get-meeting-details?user_id=" +
            this.user.id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          this.items = response.data;
          console.log(JSON.stringify(response) + "my data")
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        });
    },
  },
};
</script>
<style scoped>
.active{background-color: #bfedfb !important;}
</style>
