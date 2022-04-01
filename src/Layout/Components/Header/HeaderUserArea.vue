<template>
<div class="d-flex">
    <div class="header-btn-lg pr-0">
        <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left">
                    <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" no-caret right>
                        <span slot="button-content">
                            <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.png" alt />
                            </div>
                        </span>
                        <div class="dropdown-menu-header">
                            <div class="dropdown-menu-header-inner bg-info">
                                <div class="menu-header-image opacity-2 dd-header-bg-6"></div>
                                <div class="menu-header-content text-left">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.png" alt />
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">{{user.name}}</div>
                                               
                                                <div class="widget-subheading opacity-8">{{user.email}}</div>
                                            </div>
                                            <div class="widget-content-right mr-2">
                                                <button class="btn-pill btn-shadow btn-shine btn btn-focus" @click="logout">{{$t('logout')}}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                     
                        <ul class="nav flex-column">
                            <li class="nav-item-divider mb-0 nav-item"></li>
                        </ul>
                        <div class="grid-menu grid-menu-2col overflow-hidden">
                            <div class="no-gutters row">
                                <!-- <div class="col-sm-6">
                                    <router-link to="/components/communication"> <button class="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                                        <i class="pe-7s-mail-open-file icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"></i> {{$t('message_inbox')}}

                                    </button></router-link>
                                    <span style="background: #f8bf36;color: #fff;border-radius: 64px;padding: 3px 5px; position: absolute;top: 2px;right: 7px;width: 27px;">10</span>
                                </div> -->
                                <!-- <div class="col-sm-6">
                                  <router-link to="/components/communication">  <button class="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                                          <i class="pe-7s-chat icon-gradient bg-love-kiss btn-icon-wrapper mb-2"></i>
                                        <b>{{$t('chat')}}</b>
                                        <span style="background: rgb(217 37 80);color: rgb(255, 255, 255); border-radius: 64px;padding: 3px 5px;position: absolute;top: -9px;right: -8px;width: 27px;">30</span>

                                    </button></router-link>
                                </div> -->
                            </div>
                        </div>
                        <!-- <ul class="nav flex-column">
                            <li class="nav-item-divider nav-item"></li>
                            <li class="nav-item-btn text-center nav-item">
                                <button class="btn-wide btn btn-primary btn-sm">Open Messages</button>
                            </li>
                        </ul>-->
                    </b-dropdown>
                </div>
                <div class="widget-content-left ml-3 header-user-info">                 
                    <div class="widget-heading">{{user.name}}</div>
                    <div class="widget-heading">{{user.code}}</div>
                    <!-- <div class="widget-subheading">{{$t('teacher')}}</div> -->
                </div>

            </div>
        </div>
    </div>
    <div class="header-btn-lg">
        <button type="button" class="hamburger hamburger--elastic" v-bind:class="{ 'is-active': showDrawerSection }" v-on:click="showDrawerSection = !showDrawerSection">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </button>
    </div>

    <div class="app-drawer-wrapper" v-bind:class="{ 'drawer-open': showDrawerSection }">
        <div class="drawer-nav-btn">
            <button type="button" class="hamburger hamburger--elastic" v-bind:class="{ 'is-active': showDrawerSection }" v-on:click="showDrawerSection = !showDrawerSection">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>
        </div>
        <!-- <div class="drawer-content-wrapper">
                 <div style="position: fixed;">

                        <div v-for="(event_notifications,notificationindex) in eventdetails" :key="notificationindex">
                                <div class="notification-ui"  style="position:relative">
                                <i class="lnr-cross-circle cancel-notification link" @click="cancelNotification(event_notifications.id)"></i>
                                <div class="d-flex align-items-center justify-content-between">

                                    <p  class="link text-truncate">"{{event_notifications.title}}" on  {{event_notifications.scheduled_date|formatDate}} </p> 
                                
                                </div>

                                </div> 
                            </div>
                </div>
        </div> -->
                     <div class="drawer-content-wrapper" style="overflow-y:scroll;">
            <div class="dropdown-menu-header mb-0">
            <div class="dropdown-menu-header-inner bg-deep-blue">
                <div class="menu-header-image opacity-1 dd-header-bg-2"></div>
                <div class="menu-header-content text-dark">
                    <h5 class="menu-header-title">{{$t('notifications')}}</h5>
                    <!-- <h6 class="menu-header-subtitle">
                        You have
                        <b>
                            {{messge_unseen_count}} 
                            </b> 
                            unread messages
                    </h6> -->
                </div>
            </div>
        </div>
           <!-- <VuePerfectScrollbar class="scrollbar-container" v-once>  -->
            <div  >
           
            <div v-for="(notify,notify_index) in eventdetails" :key="notify_index" >
            <b-card-body class="notification"   @click="route(notify.id,notify.assignment_type,notify.assignment_id,notify.is_scheduled,notify.notify_for,notify.marked_status,notify.due_date,notify.scheduled_date,notify.scheduled_time,notify.duration,notify.seen)">
                <b-card-text>

                    <!-- <div class="notifications-card"> -->
                       <div> 
                           <div  v-bind:class="{'notification_unseen': notify.seen==0}" >{{notify.title}}" <span v-if=" notify.assignment_type=='Task'">{{$t('on')}}   {{notify.scheduled_date|formatDate}} </span>
                           <span v-if="notify.assignment_type=='Event' ">{{$t('on')}} {{notify.scheduled_date|formatDate}}    </span>
                           <div>
                                 <span style="float:right" v-if="notify.assignment_type=='Test'" class="badge badge-danger ml-2">{{notify.assignment_type}}</span>
                            <span style="float:right"  v-if="notify.assignment_type!='Test'" class="badge badge-primary ml-2">{{notify.assignment_type}}</span>
                            
                           </div>
                             
                           </div>
                           
                       </div>
                       <!-- <span style="float:right"  v-if="notify.seen==1" >seen</span> -->
                    <!-- </div> -->
                </b-card-text>
            </b-card-body>
          <hr>
            </div>
        <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)"/>    
       <div v-if="eventdetails.length"  v-observe-visibility="handleScrollBottom"></div>
  
        </div>
    </div>
    </div>
</div>
</template>

<script>
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)
import VueElementLoading from "vue-element-loading";
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
} from "@fortawesome/free-solid-svg-icons";
// import {
//     FontAwesomeIcon
// } from "@fortawesome/vue-fontawesome";
import { mapGetters, mapActions } from "vuex";
library.add(
    faAngleDown,
    faCalendarAlt,
    faTrashAlt,
    faCheck,
    faFileAlt,
    faCloudDownloadAlt,
    faFileExcel,
    faFilePdf,
    faFileArchive,
    faEllipsisH
);
import Vue from 'vue';
import axios from "axios";
export default {
    
    components: {
        // "font-awesome-icon": FontAwesomeIcon,
        // VuePerfectScrollbar
        VueElementLoading

    },
    data: () => ({
        fill1: {
            gradient: ["#00b09b", "#96c93d"]
        },
        fill2: {
            gradient: ["#ff0844", "#ffb199"]
        },
        fill3: {
            gradient: ["#f6d365", "#fda085"]
        },
        showDrawerSection: false,
        user:{},

          showChat:true,
        selectedlanguage:"",
        msg_count:0,
        homework_unmarked_count:0,
        assignmentdetails    :[],
        messge_unseen_count    :0,
        page:1,
        notification_unseen_count:0,
        //selectedflag:"GB",
         eventdetails:[],
      
    }),
        created(){
            console.log("hi header");
            // Vue.use(require('vue-pusher'), {
            //     api_key:process.env.VUE_APP_API_PUSHER_KEY,
            //     options: {
            //         cluster:process.env.VUE_APP_API_PUSHER_CLUSTER,
            //         authEndpoint: process.env.VUE_APP_API_URL_PUSHER,
            //         encrypted: true,
            //     }
            // });
        },
    computed: {
    ...mapGetters(["auth"])
  },

  mounted() {
    // this.user = JSON.parse(localStorage.getItem('user'));
    // this.user_id= this.user.emp_id;
    // this.user_emp_id= this.user.id;
    // this.notification_details();
    // this.notification_count();
    // this.unseen_message_count();

        //     var channel = this.$pusher.subscribe('private-chatify');
        //     // chat messages event
        //     channel.bind('chatmessages',(data)=>{
        //         if(this.user_emp_id == data.data.to_id){
        //             this.unseen_message_count();
        //         }
        //     });

        //     channel.bind('message_seen_status',(data)=>{
        //         if(this.user_emp_id == data.data.to_id){
        //             this.unseen_message_count();
        //         }
        //     });

        //     channel.bind('assignment_submission',(data)=>{
        //         if(data.data.user_id==this.user_id){
        //             this.notification_details();
        //             this.notification_count();
        //         }
        //     });

        //     channel.bind('assignments_evaluated',(data)=>{
        //         if(data.data.user_id==this.user_id){
        //             this.notification_details();
        //         }
        //     });

        //     channel.bind('Update_Notification',(data)=>{
        //     if(data.data.user_id==this.user_id){
        //         this.array_index = this.assignmentdetails.findIndex(x => x.id ==data.data.id);
        //         Vue.set(this.assignmentdetails, this.array_index, data.data);
        //         this.notification_count();
        //     }
        // });

        // channel.bind('events_data',(data)=>{
        //     //  alert('event_data')
        //     if (data.data.user_id == this.user.id) {
        //     this.eventdetails.unshift(data.data);
        //     this.notification_details();
                
        //     console.log(data);
        //     }
        //     });
  },

    methods: {
        ...mapActions("auth", ["sendLogoutRequest"]),
        logout() {
       // this.sendLogoutRequest();
        this.$router.push("/");
        },
    //   notification_details() {
    //     this.loading=true;
    //  // alert('call')
    //   axios
    //     .get(
    //       process.env.VUE_APP_API_URL_STAFF +
    //         "notification_status?user_id=" +
    //         this.user.id+"&page="+this.page  
    //     )
    //     .then((res) => {
    //       this.Eventdetails = res.data.assignmentdetails;
    //       // console.log("hi data");
    //       let events = this.Eventdetails.data;
    //       if(events){
    //       events.map((item)=>{
    //         this.eventdetails.push(item);
    //       });
    //         this.loading=false;
    //       }else{
    //         this.loading=false;
    //       }
    //       // this.eventdetails.push(this.Eventdetails.data);
    //       // this.eventdetails.forEach(function (eventdetails) {
    //       //   console.log(eventdetails.title);
    //       //   //    this.test(assignmentdetails.title);
    //       // });
    //     })
    //     .catch((err) => {
    //       console.log("this error" + err);
    //        this.loading=false;
    //     });
    // },

    handleScrollBottom(isVisible){
      
      // alert(this.page)
      if(!isVisible){
        return
      }
      this.page++;
      this.notification_details();
      
     console.log('ABC');
    },
        cancelNotification(id) {
        // this.eventdetails.splice(index, 1);
        //  cancelNotification.splice(indexOf(index),1);
        // if (confirm("Selected days will be marked as closed?")) {
        this.update_notification_status(id);
        // }
        },
        unseen_message_count(){
            axios.get(process.env.VUE_APP_API_URL_STAFF +'message_unseen_count?user_id='+this.user_emp_id+'&emp_id='+this.user_id).then(res => {
                this.messge_unseen_count     = res.data.msg_unseen_count;
                }).catch(err => {
                    console.log("this error" + err)
                })

        },
        
        notification_count(){
            axios.get(process.env.VUE_APP_API_URL_STAFF +'notification_count?user_id='+this.user_emp_id+'&emp_id='+this.user_id).then(res => {
                this.notification_unseen_count     = res.data.notification_count;
                }).catch(err => {
                    console.log("this error" + err)
                })

        },

            update_notification_status(id) {
      //alert(id)
      axios
        .get( 
          process.env.VUE_APP_API_URL_STAFF +
            "update_notification_status?user_id=" +
            this.user.id +
            "&notification_id=" +
            id
        )
        .then((res) => {
          this.notification_un = res.data.notification_count;
          this.notification_details();
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
        route(id,assignment_type,assignment_id){         

                 if(assignment_type=="Task" ){
                    // this.$emit("gototab", "tab2");
                    this.$router.push({ name: 'task',params: { tab:'tab1',task_id:assignment_id} })
                }
                 if(assignment_type=="Event" ){
                    // this.$emit("gototab", "tab3");
                    this.$router.push({ name: 'task',params: { tab:'tab2',event_id:assignment_id} })
                }

            this.update_notification_status(id);
          
             this.showDrawerSection= false;
        },
        // update_notification_status(id){
        //     axios.get(process.env.VUE_APP_API_URL_STAFF +'update_notification_status?user_id='+this.user_id+'&notification_id='+id).then(res => {
        //         this.notification_un     = res.data.notification_count;
        //         }).catch(err => {
        //             console.log("this error" + err)
        //         })
        // }
    }
    
};
</script>
<style>
.notification-ui {
  background: #797979;
  width: 300px;
  border-left: 4px solid #3b3b3b;
  color: #fff;
  padding: 14px;
  border-radius: 4px;
  margin: 4px;
}
.notification-ui:hover {
  background: #707070;
}
@keyframes notification-ui {
  25% {
    transform: scale(0.9);
  }
  75% {
    transform: scale(1.1);
  }
}
.cancel-notification {
  position: absolute;
  top: -4px;
  right: -5px;
  background: #12121285;
  border-radius: 8px;
}
.notification{
border:none !important;
}
.notification_unseen{
  font-weight: bold!important;;
}
</style>