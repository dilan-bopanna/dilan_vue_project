<template>
<div class="header-dots">
<!-- {{assignmentdetails}} -->
     <!--Bottom notifications-->
     <!-- <Toast>testing</Toast> -->
    <div style="position: fixed;bottom: 0px;right: 6px;">
        <div v-for="(assignment_notifications,notificationindex) in assignmentdetails" :key="notificationindex">
    <div class="notification-ui" v-if="assignment_notifications.seen==0" style="position:relative">
          <i class="lnr-cross-circle cancel-notification link" @click="cancelNotification(notificationindex)"></i>
        <div class="d-flex align-items-center justify-content-between">
          
            <!-- <span v-if="assignment_notifications.notify_for=='Draft' && assignment_notifications.assignment_type=='Test' && assignment_notifications.is_scheduled!=0">{{$t('scheduled_on')}} {{notify.scheduled_date|formatDate}} {{notify.scheduled_time}} </span> -->
           <p  class="link text-truncate">{{assignment_notifications.assignment_type}} "{{assignment_notifications.title}}" is Assigned to you</p>
           <!-- <span class="badge badge-danger">{{assignment_notifications.assignment_type}}</span> -->
          
           
        </div>
         <span class="badge badge-sm badge-danger link" @click="route(assignment_notifications.id,assignment_notifications.assignment_type,assignment_notifications.assignment_id,assignment_notifications.is_scheduled,assignment_notifications.notify_for,assignment_notifications.marked_status,assignment_notifications.due_date,assignment_notifications.scheduled_date,assignment_notifications.scheduled_time,assignment_notifications.duration,assignment_notifications.seen)">
               <span v-if="assignment_notifications.assignment_type=='Homework'">Complete</span>
               <span v-if="assignment_notifications.assignment_type=='Test'">Take Test</span>
           
           </span>
         </div> 
        </div>
        <!-- {{assignmentdetails}} -->
        <!-- <div class="notification-ui" v-for="(assignment_notifications,notificationindex) in assignmentdetails" :key="notificationindex" >
         <p v-if="assignment_notifications.seen==0"> {{assignment_notifications.title}}</p>
        </div>  -->
    </div>  
  <!--Bottom notifications-->
    <FlashMessage :position="'right bottom'"></FlashMessage>
    <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-xl" variant="link" no-caret right>
        <span slot="button-content">
            <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                <div class="icon-wrapper-bg bg-primary"></div>
                <i class="pe-7s-keypad text-primary"></i>
            </div>
        </span>
        <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner bg-plum-plate">
                <div class="menu-header-image dd-header-bg-1"></div>
                <div class="menu-header-content text-white">
                    <h5 class="menu-header-title">Quick Apps</h5>
                </div>
            </div>
        </div>
        <div class="grid-menu grid-menu-xl grid-menu-3col">
            <div class="no-gutters row">
                <div class="col-sm-6 col-xl-6">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-timer icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>Attend Test
                    </button>
                </div>
                <div class="col-sm-6 col-xl-6">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-note2 icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>Attend Assigment
                    </button>
                </div>
                <div class="col-sm-6 col-xl-6">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-keypad icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>Time Table
                    </button>
                </div>
                <!-- <div class="col-sm-6 col-xl-4">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-config icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>My Resources
                    </button>
                </div> -->
                <div class="col-sm-6 col-xl-6">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-hourglass icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>Activity
                    </button>
                </div>
                <!-- <div class="col-sm-6 col-xl-4">
                    <button class="btn-icon-vertical btn-square btn-transition btn btn-outline-link">
                        <i class="pe-7s-world icon-gradient bg-night-fade btn-icon-wrapper btn-icon-lg mb-3"></i>Reports
                    </button>
                </div> -->
            </div>
        </div>
        <!-- <ul class="nav flex-column">
            <li class="nav-item-divider nav-item"></li>
            <li class="nav-item-btn text-center nav-item">
                <button class="btn-shadow btn btn-primary btn-sm">Follow-ups</button>
            </li>
        </ul>-->
    </b-dropdown>
    <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-xl" variant="link" no-caret right>
        <span slot="button-content">
            <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                <div class="icon-wrapper-bg bg-danger"></div>
                <i class="lnr-bullhorn text-danger"></i>
                <span class="unread-count">{{notification_unseen_count}}</span>
                <!-- <div class="badge badge-dot badge-dot-sm badge-danger">Notifications</div> -->
            </div>
        </span>
        <div class="dropdown-menu-header mb-0">
            <div class="dropdown-menu-header-inner bg-deep-blue">
                <div class="menu-header-image opacity-1 dd-header-bg-2"></div>
                <div class="menu-header-content text-dark">
                    <h5 class="menu-header-title">Notifications</h5>
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
        <div class="nav-justified scroll-area">
            <!-- <b-card-body class="notification">
                <b-card-text>
                    <div class="notifications-card">
                        <div>
                            <span> {{messge_unseen_count}} New messages.</span>
                        </div>
                        <div>
                            <span class="badge badge-success ml-2">{{$t('chat')}}</span>
                        </div>
                    </div>
                </b-card-text>
            </b-card-body> -->
            <div v-for="(notify,notify_index) in assignmentdetails" :key="notify_index">
            <b-card-body class="notification" v-bind:class="{ 'notififation_unseen': notify.seen==0}"   @click="route(notify.id,notify.assignment_type,notify.assignment_id,notify.is_scheduled,notify.notify_for,notify.marked_status,notify.due_date,notify.scheduled_date,notify.scheduled_time,notify.duration,notify.seen)">
                <b-card-text>
                    <div class="notifications-card">
                       <div>
                           <div  class="header_title">{{notify.title}} </div>
                           <div>
                                <span v-if="notify.notify_for=='Draft' && notify.assignment_type!='Test'">{{$t('due_on')}} {{notify.due_date|formatDate}} </span>
                                <span v-if="notify.notify_for=='Draft' && notify.assignment_type=='Test' && notify.is_scheduled!=0">{{$t('scheduled_on')}} {{notify.scheduled_date|formatDate}} {{notify.scheduled_time}} </span>
                                <span v-if="notify.notify_for=='Draft' && notify.assignment_type=='Test' && notify.is_scheduled==0">{{$t('due_on')}} {{notify.due_date|formatDate}} </span>
                                <span v-if="notify.notify_for!='Draft'">{{$t('evaluate')}} </span>
                            </div>
                       </div>
                       <div>
                            <span v-if="notify.assignment_type=='Test'" class="badge badge-danger ml-2">{{notify.assignment_type}}</span>
                            <span v-if="notify.assignment_type!='Test'" class="badge badge-primary ml-2">{{notify.assignment_type}}</span>
                       </div>
                    </div>
                </b-card-text>
            </b-card-body>
            </div>
        </div>
    </b-dropdown>
      <!-- <div class="locale-changer">
      <select v-model="$i18n.locale" id="language" @change="handlechange()">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
      </select>
    </div> -->

    <b-dropdown toggle-class="pl-0 mr-2 " variant="link" no-caret right>
       <!--  <div class="icon-wrapper-bg bg-focus"></div>
          <select v-model="$i18n.locale" id="language" @change="handlechange()">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>       
      </select> -->
         <span slot="button-content">
            <div class="icon-wrapper icon-wrapper-alt rounded-circle">             
                <div class="icon-wrapper-bg bg-focus"></div>
                <div class="language-icon">                
                    <country-flag :country="selectedflag" class="opacity-8" />                    
                </div>
            </div>
        </span>    
        <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                <div class="menu-header-image opacity-05 dd-header-bg-4"></div>
                <div class="menu-header-content text-center text-white">
                    <h6  class="menu-header-subtitle mt-0"> {{$t('choose_language')}} </h6>
                </div>
            </div>
        </div>
        <h6 tabindex="-1" class="dropdown-header">{{$t('popular_languages')}}</h6>
        <div v-for="(language,language_index) in langs" :key="language_index">
        <button :v-model="$i18n.locale"  type="button" tabindex="0" class="dropdown-item" @click="handlechange(language.value,language.flag)" >
            <country-flag :country="language.flag" class="mr-3 opacity-8 flag-align" />
            <span>{{language.language}}</span>
        </button>
        </div>
    </b-dropdown>
    <span slot="button-content">
    <router-link :to="{ name: 'communication',params: { tab:'tab2' }}"> <div style="padding-top: 13px;" class="mr-2 icon-wrapper icon-wrapper-alt rounded-circle">
            <div class="icon-wrapper-bg bg-success"></div>
            <i class="lnr-bubble text-danger"></i>
           <span class="unread-count">{{messge_unseen_count}}</span>
            </div>
        </router-link>
    </span>

    <a href="#/components/calendarview" style="padding-top: 7px;">
    <span slot="button-content">
            <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                <div class="icon-wrapper-bg bg-success"></div>
                <i class="lnr-calendar-full text-success"></i>
            </div>
        </span></a>
</div>
</template>

<script>
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from 'vue';

Vue.use(FlashMessage);
import CountryFlag from "vue-country-flag";
import {
    library
} from "@fortawesome/fontawesome-svg-core";
import {
    faArrowUp,
    faCog
} from "@fortawesome/free-solid-svg-icons";

library.add(faArrowUp, faCog);

export default {
    components: {
        // VuePerfectScrollbar,
        CountryFlag
    },
    data () {
       
    return { 
           snack: true,
           snackColor: "#d92550",
         headercolor: null,
            sidebarcolor: null,
            homework_unmarked_count:0,
            assignmentdetails    :[],
            messge_unseen_count:0,
            notification_unseen_count:0,

            isConfigOpen: false,

            colors: [
                "bg-primary text-lighter",
                "bg-secondary text-lighter",
                "bg-success text-lighter",
                "bg-info text-lighter",
                "bg-warning text-darker",
                "bg-danger text-lighter",
                "bg-light text-darker",
                "bg-dark text-lighter",
                "bg-focus text-lighter",
                "bg-alternate text-lighter",

                "bg-vicious-stance text-lighter",
                "bg-midnight-bloom text-lighter",
                "bg-night-sky text-lighter",
                "bg-slick-carbon text-lighter",
                "bg-asteroid text-lighter",
                "bg-royal text-lighter",
                "bg-warm-flame text-darker",
                "bg-night-fade text-darker",
                "bg-sunny-morning text-darker",
                "bg-tempting-azure text-darker",
                "bg-amy-crisp text-darker",
                "bg-heavy-rain text-darker",
                "bg-mean-fruit text-darker",
                "bg-malibu-beach text-darker",
                "bg-deep-blue text-darker",
                "bg-ripe-malin text-lighter",
                "bg-arielle-smile text-lighter",
                "bg-plum-plate text-lighter",
                "bg-happy-fisher text-darker",
                "bg-happy-itmeo text-darker",
                "bg-mixed-hopes text-lighter",
                "bg-strong-bliss text-lighter",
                "bg-grow-early text-lighter",
                "bg-love-kiss text-lighter",
                "bg-premium-dark text-lighter",
                "bg-happy-green text-lighter"
            ],
        showChat:true,
        selectedlanguage:"",
        selectedflag:localStorage.getItem('selected_flag') || "GB",
        langs: [{id:1,language:"English (GB)",value:"en",flag:"GB"},
        {id:2,language:"Italian",value:"it",flag:"IT"},
         { id: 3, language: "Arabic", value: "ar", flag: "AR" },] 
       }       
 },
    created(){
        console.log("hi header");
        Vue.use(require('vue-pusher'), {
        api_key:process.env.VUE_APP_API_PUSHER_KEY,
        options: {
            cluster:process.env.VUE_APP_API_PUSHER_CLUSTER,
            authEndpoint: process.env.VUE_APP_API_URL_PUSHER,
            encrypted: true,
        }
        });
    },
    mounted(){
    //  this.$toast("My toast content", {
    //                     timeout: 9000
    //                 });
        this.user = JSON.parse(localStorage.getItem('user'));
        this.user_id= this.user.emp_id;
        this.user_emp_id= this.user.id;
        this.notification_details();
         
        this.unseen_message_count();
        this.notification_count();
       
        var channel = this.$pusher.subscribe('private-chatify');
        // chat event chat messages
        channel.bind('chatmessages',(data)=>{
            if(this.user_emp_id == data.data.to_id){
                this.unseen_message_count();
            }
        });

        channel.bind('message_seen_status',(data)=>{
            if(this.user_emp_id == data.data.to_id){
                this.unseen_message_count();
            }
        });

        channel.bind('assignments_data',(data)=>{
            
             
            if(data.data.user_id==this.user_id){
                this.assignmentdetails.unshift(data.data);
                   
                // this.flashMessage.warning({
                //     title:"New assignment scheduled",
                //      message: data.data.title,
                //      time: 4000,
                //      blockClass: 'custom-block-class',
                //   });
                this.notification_count();
            }
        });

        channel.bind('assignments_evaluated',(data)=>{
            if(data.data.user_id==this.user_id){
                this.assignmentdetails.unshift(data.data);
                this.notification_count();
            }
        });

        channel.bind('Update_Notification',(data)=>{
            if(data.data.user_id==this.user_id){
                this.array_index = this.assignmentdetails.findIndex(x => x.id ==data.data.id);
                Vue.set(this.assignmentdetails, this.array_index, data.data);
                this.notification_count();
            }
        });
        channel.bind('assignment_submission_notification',(data)=>{
            if(data.data.user_id==this.user_id){
                this.notification_details();
            }
        });
    },
  methods: {
      
      test(){
          alert("toast");
                this.$toast("My toast content", {
                    timeout: 2000
                });
      },
        
        reply(status){
            //alert(status);
          this.showChat=status;
        },
        handlechange(lang,flag)
        {
           this.selectedlanguage=lang;
           this.selectedflag=flag;
           localStorage.setItem('selected_flag',flag);
           localStorage.setItem('selected',lang);
           window.location.reload();
        },
        
        notification_details(){
            axios.get(process.env.VUE_APP_API_URL_STAFF +'notification_status?user_id='+this.user_id+'&emp_id='+this.user_emp_id).then(res => {
            this.assignmentdetails     = res.data.assignmentdetails;
           // console.log("hi data");
            this.assignmentdetails.forEach(function(assignmentdetails) {
                   console.log(assignmentdetails.title);
                //    this.test(assignmentdetails.title);
                });
            }).catch(err => {
                console.log("this error" + err)
            })                
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
        route(id,assignment_type,assignment_id,is_scheduled,notify_for,marked_status,due_date,scheduled_date,scheduled_time,duration,seen){
            if(marked_status==1 && seen==1){
                this.flashMessage.warning({
                     message: "Assignment Submited Already",
                     time: 4000,
                     blockClass: 'custom-block-class',
                  });
            }else{
                if(notify_for=="Draft" && assignment_type=="Homework"){
                    this.$emit("gototab", "tab2");
                    this.$router.push({ name: 'myhomework',params: { tab:'tab2',testtype:'outstanding',homework:assignment_id} })
                }
                if(notify_for=="Evaluated" && assignment_type=="Homework"){
                    this.$emit("gototab", "tab3");
                    this.$router.push({ name: 'myhomework',params: { tab:'tab3',testtype:'marked',homework:assignment_id} })
                }
                if(notify_for=="Evaluated" && assignment_type=="Test"){
                    this.$emit("gototab", "tab3");
                    this.$router.push({ name: 'assessments',params: { tab:'tab3',testtype:'marked',homework:assignment_id} })
                }
                if(notify_for=="Draft" && assignment_type=="Test" && is_scheduled==0){
                    this.$emit("gototab", "tab2");
                    this.$router.push({ name: 'assessments',params: { tab:'tab2',testtype:assignment_type,scheduleddate:"",id:assignment_id,duedate:due_date,duration:"",scheduledtime:"",is_scheduled:is_scheduled,scheduleddatetime:""} })
                }
                if(notify_for=="Draft" && assignment_type=="Test" && is_scheduled==1){
                    this.$emit("gototab", "tab2");
                    this.$router.push({ name: 'assessments',params: { tab:'tab2',testtype:assignment_type,scheduleddate:scheduled_date,id:assignment_id,duedate:due_date,duration:duration,scheduledtime:scheduled_time,is_scheduled:is_scheduled,scheduleddatetime:scheduled_date+' '+scheduled_time} })
                    console.log(scheduled_date+' '+scheduled_time)
                }
                this.update_notification_status(id);
            }
        },
        update_notification_status(id){
            axios.get(process.env.VUE_APP_API_URL_STAFF +'update_notification_status?user_id='+this.user_id+'&notification_id='+id).then(res => {
                this.notification_un     = res.data.notification_count;
                }).catch(err => {
                    console.log("this error" + err)
                })
        },
        cancelNotification(index){
             this.assignmentdetails.splice(index,1);
          //  cancelNotification.splice(indexOf(index),1);
            alert("Cancel notification")
        }

    }
};
</script>
<style scoped>
.link{cursor:pointer}
.unread-count{background: #3055c1;
color: #fff;
border-radius: 42px;
width: 16px;
height: 16px;
font-size: 10px;
line-height: 16px;
position: absolute;
top: 1px;
right: 0px;}
.notification{
  border: 2px solid #d9dcde;
  border-radius: 5px;
  padding: 1.00rem !important;
}
.notifications-card{    display: flex;
    justify-content: space-between;
    align-items: center;}
.header_title{
    font-weight: bold;
}
.notififation_unseen{
background-color: #cdd6ec !important;
}
.notification-ui{  
    background: #797979;
    width: 300px;
    border-left: 4px solid #3b3b3b;
    color: #fff;
    padding: 14px;
    border-radius: 4px;
    margin: 4px;}
    .notification-ui:hover{ background: #707070;}
    @keyframes notification-ui{
  25%  {transform: scale(0.9);}
  75%  {transform: scale(1.1);}
}
.cancel-notification{ position: absolute;top: -4px;right: -5px; background: #12121285;border-radius: 8px;}
</style>
