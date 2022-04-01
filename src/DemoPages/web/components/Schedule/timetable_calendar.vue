<template>
   <v-row class="fill-height">
      <!-- {{meetingdetails}} -->
  
      <!--Event Calendar Section End--> 
      <v-col class="col-sm-12" id="calendar">
                    <!--Error Message Start-->
    <FlashMessage :position="'right bottom'" ></FlashMessage>
    <!-- <v-alert outlined :value="is_success" color="success" icon="lnr-checkmark-circle">
          {{ message }}
      </v-alert>
    <v-alert :value="is_error" color="error" icon="lnr-warning" outlined> {{ message }} </v-alert> -->
    <!--Error Message End-->
         <v-sheet height="64">
            <v-toolbar flat>
               <v-btn outlined  class="mr-4" color="grey darken-2" @click="setToday">
                  {{$t('today')}}
               </v-btn>
               <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="prev"
                  >
                  <v-icon small>
                     mdi-chevron-left
                  </v-icon>
               </v-btn>
               <v-btn
                  fab
                  text
                  small
                  color="grey darken-2"
                  @click="next"
                  >
                  <v-icon small>
                     mdi-chevron-right
                  </v-icon>
               </v-btn>
               <v-toolbar-title v-if="$refs.calendar">
                  {{ $refs.calendar.title }}
               </v-toolbar-title>
               <v-spacer></v-spacer>
                
               <v-menu
                  bottom
                  right
                  >
                  <template v-slot:activator="{ on, attrs }">
                     <v-btn
                        outlined
                        color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                        >
                        <span>{{ typeToLabel[type] }}</span>
                        <v-icon right>
                           mdi-menu-down
                        </v-icon>
                     </v-btn>
                  </template>
                  
                  <v-list>
                     <v-list-item @click="settype('day')">
                        <v-list-item-title>{{$t('day')}}</v-list-item-title>
                     </v-list-item>
                     <v-list-item @click="settype('week')">
                        <v-list-item-title>{{$t('week')}}</v-list-item-title>
                     </v-list-item>
                     <v-list-item @click="settype('month')">
                        <v-list-item-title>{{$t('month')}}</v-list-item-title>
                     </v-list-item>
                     <!-- <v-list-item @click="type = '4day'">
                        <v-list-item-title>4 days</v-list-item-title>
                     </v-list-item> -->
                  </v-list>
                 
               </v-menu>
               <!-- <button class="btn-shadow btn-wide btn btn-primary ml-2" @click="showAddCalendar()">{{$t('add')}}</button> -->
            </v-toolbar>
            
         </v-sheet>
         <v-sheet height="600">
            <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="Timetable"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
            :first-interval=6
            ></v-calendar>          
            <v-menu
               v-model="selectedOpen"
               :close-on-content-click="false"
               :activator="selectedElement"
               offset-x
               >
               <v-card
                  color="grey lighten-4"
                  min-width="350px"
                  flat
                  right
                  >
                  <v-toolbar
                     :color="selectedEvent.color"
                     dark
                     >
                     <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                     <v-spacer></v-spacer>
                     <v-btn icon>
                        <v-icon v-if="selectedEvent.type == 'event'" @click="editEventTimetable(selectedEvent.id,selectedEvent.name,selectedEvent.start,selectedEvent.end,selectedEvent.color,selectedEvent.starttime,selectedEvent.endtime,selectedEvent.description,selectedEvent.reminder_mins,selectedEvent.allocation_id)">mdi-pencil</v-icon>
                     </v-btn>
                     <v-btn icon>
                        <v-icon v-if="selectedEvent.type == 'event'" @click="deleteEventTimetable(selectedEvent.id)">mdi-delete</v-icon>
                     </v-btn>
                     <!-- <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                     </v-btn>
                     <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                     </v-btn> -->
                  </v-toolbar>
                  <v-card-text>
                     <div><span>{{$t('start_date')}}: {{selectedEvent.start|formatDate}}-{{selectedEvent.starttime}}</span> 
                     </div>
                     <div>
                      <span>{{$t('end_date')}}: {{selectedEvent.end|formatDate}}-{{selectedEvent.endtime}}</span>
                      </div> 
                      <div>{{selectedEvent.description}}</div>
                  </v-card-text>
                  <v-card-actions>
                     <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                        >
                        {{$t('cancel')}}
                     </v-btn>
                  </v-card-actions>
               </v-card>
            </v-menu>
         </v-sheet>
      </v-col>
      <!--Event Calendar Section End-->
      <!--Create Event Form Start-->
      <v-col class="col-sm-4" id="calendar_form" v-if="showCalendarForm">
         <!-- {{events1}} -->
         <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header">
               <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                  <i class="header-icon lnr-calendar-full icon-gradient bg-amy-crisp"></i> 
                 {{$t('add_event')}}                
               </div>
            </div>
            <div class="scroll-area-xl">
               <v-form ref="form" v-model="valid" lazy-validation class="p-2">
                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                      <v-text-field type="hidden"  v-model="event.id" ></v-text-field>
                     <v-flex xs12 md12>
                        <v-text-field prepend-icon="lnr-pencil"  v-model="event.event_title" :rules="nameRules" :counter="40" v-bind:label="$t('event_title')"   required></v-text-field>
                     </v-flex>
                  </v-layout>
                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                     <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="event.event_start_date" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field v-model="startDateFormatted" v-bind:label="$t('start_date')" prepend-icon="lnr-calendar-full" @blur="starteventdate = parseDate(dateFormatted)"
                              readonly v-bind="attrs" v-on="on" :rules="nameRules">
                           </v-text-field>
                           <!-- <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                            :return-value.sync="event.event_start_time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-text-field v-model="event.event_start_time" prepend-icon="access_time" v-bind:label="$t('start_time')"  readonly v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                              </template>
                            <v-time-picker v-if="menu2"  
                              :allowed-hours="allowedHours"
                              :allowed-minutes="allowedMinutes" class="mt-4" format="24hr"
                              scrollable v-model="event.event_start_time" full-width @click:minute="$refs.menu2.save(event.event_start_time)"></v-time-picker>
                        </v-menu> -->
                         
                        </template>
                        <v-date-picker v-model="event.event_start_date" no-title scrollable :min="new Date().toISOString().substr(0, 10)"   @click:date="$refs.menu.save(event.event_start_date)">

                        </v-date-picker>
                     </v-menu>
                       <div style="padding-left: 60px;">
                            <label for="starttimepicker" >{{$t('start_time')}}: </label>
                            <vue-timepicker  id="starttimepicker"
                              v-model="event.event_start_time"  @click:minute="$refs.menu2.save(event.event_start_time)" manual-input hide-dropdown @focus="focusState = 'focused'" @blur="focusState = 'blurred'" @open="dropdownState = 'opened'" @close="dropdownState = 'closed'" close-on-complete hide-clear-button></vue-timepicker>
                          </div>
                  </v-layout>

                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                     <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="event.event_end_date" transition="scale-transition" offset-y min-width="290px">
                        <template v-slot:activator="{ on, attrs }">
                           <v-text-field v-model="endDateFormatted" v-bind:label="$t('end_date')" prepend-icon="lnr-calendar-full" @blur="endeventdate = parseDate(dateFormatted)"
                              readonly v-bind="attrs" v-on="on" :rules="nameRules">
                           </v-text-field>
                           <!-- <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false" :nudge-right="40"
                            :return-value.sync="event.event_end_time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                              <template v-slot:activator="{ on, attrs }">
                                 <v-text-field v-model="event.event_end_time" prepend-icon="access_time" v-bind:label="$t('end_time')"   readonly v-bind="attrs" v-on="on" :rules="nameRules"></v-text-field>
                              </template>
                            <v-time-picker v-if="menu3" :allowed-hours="allowedHours"
                              :allowed-minutes="allowedMinutes" class="mt-4" format="24hr"
                              scrollable v-model="event.event_end_time" full-width @click:minute="$refs.menu3.save(event.event_end_time)"></v-time-picker>
                        </v-menu> -->
                            <div style="padding-left: 60px;">
                            <label for="topicker" >{{$t('end_time')}}: </label>
                            <vue-timepicker  id="topicker"
                              v-model="event.event_end_time"  @click:minute="$refs.menu3.save(event.event_end_time)" manual-input hide-dropdown @focus="focusState = 'focused'" @blur="focusState = 'blurred'" @open="dropdownState = 'opened'" @close="dropdownState = 'closed'" close-on-complete hide-clear-button></vue-timepicker>
                          </div>
                        </template>
                        <v-date-picker v-model="event.event_end_date" no-title scrollable :min="event.event_start_date"  @click:date="$refs.menu1.save(event.event_end_date)">
                        </v-date-picker>
                     </v-menu>
                  </v-layout>

                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                     <v-flex xs6 md6>
                        <v-select prepend-icon="lnr-laptop-phone" v-model="event.allocation_id" :items="allocations"  v-bind:label="$t('class_section')" item-value="id" item-text="class_name" >
                         <template slot="selection"   slot-scope="data" >
                                {{ data.item.class_name }} - {{ data.item.shortname }}
                              </template>
                              <template slot="item" slot-scope="data">
                                {{ data.item.class_name }} - {{ data.item.shortname }}
                              </template>
                        </v-select>
                     </v-flex>
                     <!-- <v-flex xs6 md6>
                        <v-select prepend-icon="lnr-magic-wand" :rules="nameRules" v-model="event.event_color" :items="colors" v-bind:label="$t('event_color')"  >
                        </v-select>
                     </v-flex> -->
                     <v-flex xs6 md6>
                        <v-select  v-model="event.reminder_mins" :items="reminder_timeinterval" prepend-icon="access_time" v-bind:label="$t('reminder')" item-value="code" item-text="text" ></v-select>
                     </v-flex>
                  </v-layout>
                  <!-- <v-layout class="p-3 pr-3 pt-1 pb-1">
                     <v-flex xs6 md6>
                        <v-select  v-model="event.reminder_mins" :items="reminder_timeinterval" prepend-icon="access_time" v-bind:label="$t('reminder')" item-value="code" item-text="text" ></v-select>
                     </v-flex>
                  </v-layout> -->
                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                     <v-flex xs12 md12>
                        <v-textarea prepend-icon="lnr-pencil"   v-model="event.description" v-bind:label="$t('desc')" outlined ></v-textarea>
                     </v-flex>
                  </v-layout>
                  <v-layout class="p-3 pr-3 pt-1 pb-1">
                       <button class="btn-shadow btn-wide btn-pill btn btn-secondary"  @click="cancel()" style="float: left;">{{$t('cancel')}}</button>
                     <v-flex xs12 md12>
                        <button  class="btn-shadow btn-wide btn-pill btn btn-success" :disabled="!valid " @click="addEventTimetable()" style="float: right;">{{$t('save')}}
                           <b-spinner :disabled="btnloading" small v-if="btnloading"></b-spinner>
                        </button>
                     </v-flex>
                  </v-layout>
               </v-form>
            </div>
         </div>
      </v-col>
      <!--Create Event Form Start-->
   </v-row>
</template>
<script>
import axios from "axios";
import FlashMessage from '@smartweb/vue-flash-message';
import moment from 'moment';
   import Vue from 'vue';
   Vue.use(FlashMessage);
   import VueTimepicker from 'vue2-timepicker';
   import 'vue2-timepicker/dist/VueTimepicker.css';
   export default {
   props: ["selectedLOV" ],
   components: {
      VueTimepicker
   },
   data: vm => ({
   btnloading:false,
   showCalendarForm:false,
   valid: false,
   is_success:false,
   is_error:false,
   success_message:false,
   message:"",
   selecteddate:"",
   dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
  //colors :[],
   //  event_end_date:new Date().toISOString().substr(0, 10),
   //  event_start_date: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu1: false,
    menu2:false,
    menu3:false,
    modal: false,
    focus: '',
    type: 'month',
    //event_title: '',
      nameRules: [
        v => !!v || 'This field is required',
        v => (v && v.length <= 40) || 'Event Name must be less than 40 characters',
      ],
    typeToLabel: {month: 'Month',week: 'Week',day: 'Day','4day': '4 Days',},
       selectedEvent: {},
       selectedElement: null,
       selectedOpen: false,
       Timetable: [],
       allocations:[],
      //events:[], 
      //colors: ['red','blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Test', 'Assignment', 'Holiday', 'Online Class'],
      user:{},
      event:{
         id:0,
         event_title: "",
         event_color:"",
         event_end_date:new Date().toISOString().substr(0, 10),
         event_start_date: new Date().toISOString().substr(0, 10),
         event_start_time:"",
         event_end_time:"",
         reminder_mins:null,
         description:"",
         user_id:null,
         academic_year:"",
         allocation_id:null,
       
      },
        meetingdetails:[],
        holidays:[],
         colors: ['red','blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],

              reminder_timeinterval:[
                {
                    text:'5 mins',
                    code: 5
                },{
                    text:'15 mins',
                    code:10
                },{
                    text:'30 mins',
                    code:15
                },{
                    text:'1 hour',
                    code:60
                },{
                    text:'1 day',
                    code:1440
                }
            ],
   }),
   watch: {
   //    selectedLOV(){
   //       alert('time')
   //      this.Timetable=[];
   //      this.fetchtimetable();
   //      this.fetchholidays();
   // },
      selectedLOV: {
         immediate: true,
         handler() {
            this.Timetable=[];
            this.fetchtimetable();
            this.fetchholidays();
         },
      
      },
            starteventdate () {
               this.dateFormatted = this.formatDate(this.event.event_start_date)
            },
            endeventdate () {
               this.dateFormatted = this.formatDate(this.event.event_end_date)
            },
         },
   mounted () {
   this.user = JSON.parse(localStorage.getItem('user'));
   this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
   this.$refs.calendar.checkChange();
   // this.fetchevents();
   // this.fetchtimetable();
   // this.fetchAllocations();
   // this.fetchholidays();
   // this.getMeetingDetails();
  
   },
    computed: {
      startDateFormatted () {
         return this.formatDate(this.event.event_start_date)
      },
      endDateFormatted () {
         return this.formatDate(this.event.event_end_date)
      },
    },
    
     methods: {

      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}-${month}-${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
   //    intervalFormat(interval) {
   //      return interval.time
   //  },
      settype(calendartype){  
         this.Timetable=[];
         this.type=calendartype;
         this.fetchtimetable();
         this.fetchevents();
         this.fetchholidays();
         this.getMeetingDetails();
      },
      fetchtimetable(){
     axios
      .get(process.env.VUE_APP_API_URL_STAFF  +'student_timetable?student_id='+this.selectedLOV+'&plan_type='+this.type+'&plan_date='+this.focus+'&academic_year='+this.academic_year)
      .then(response =>  {

         let TimetableObject =  response.data.timetable;
      
         TimetableObject.map((items)=> {
         
            let TimetableArray = items.timetabledata;
    
            TimetableArray.map((res)=>{
                console.log( res)
               this.Timetable.push({name: res.subject_name +" - "+ res.section_name+"("+res.subject_code+")", start: items.date+' '+res.start_time, end: items.date+' '+res.end_time, color:res.color_code,starttime: res.start_time,endtime:res.end_time, type:"subject"});  
            })
           
         });

      })

   },

   fetchholidays(){
      axios
      .get(process.env.VUE_APP_API_URL_STAFF  +'academic_holidays?staff_id='+this.user.emp_id+'&plan_type='+this.type+'&plan_date='+this.focus+'&academic_year='+this.academic_year)
      .then(res =>  {
         this.holidays=[];
         let holidays =  res.data.holidays;
         holidays.map((holiday_data)=> {
            this.Timetable.push({id:holiday_data.id ,name: holiday_data.description,start:holiday_data.date,end: holiday_data.date,color:'rgba(255, 0, 0, 0.28)',starttime: '00:00:00',endtime: '23:59:59',description: holiday_data.description,reminder_mins: '',allocation_id:'',type:"holidays"}); 
         }); 
      })
   },
   
   fetchAllocations(){
         // alert(this.user.emp_id);
         this.staffid=this.user.emp_id;
         axios.get(process.env.VUE_APP_API_URL_STAFF +'staff_class_sections?staff_id='+this.user.emp_id,
         ).then(res => {
            //console.log(res.data.classoverview);
            this.allocations = res.data.class_sections;
            console.log(res.data.class_section);
         }).catch(err => {
            console.log("this error" + err)
         })
   },
   fetchevents(){
         axios
         .get(process.env.VUE_APP_API_URL_STAFF  +'fetch_events_tasks',{
            params: {
            role: 'Student',
            academic_year:this.academic_year,
            entity_id:this.selectedLOV,
          },
         }
         )
         .then(res =>  {
            let events =  res.data.eventdata; 
            events.map((eventdata)=> {
            if(eventdata.type=='Event'){
                  this.Timetable.push({id:eventdata.id ,name: eventdata.title ,start: eventdata.start_date+' '+eventdata.start_time,end: eventdata.end_date+' '+ eventdata.end_time,color: 'deep-purple',starttime: eventdata.start_time,endtime: eventdata.end_time,description: eventdata.description,reminder_mins: eventdata.reminder_mins,type:eventdata.type});
            }
           // }else{
            //       this.Timetable.push({id:eventdata.id ,name: eventdata.title ,start: eventdata.start_date+' '+'09:00',end: eventdata.start_date+' '+ '09:00',color: 'deep-purple',starttime: '09:00',endtime: '09:00',description: eventdata.description,reminder_mins: eventdata.reminder_mins,type:eventdata.type});
            // }
   
            }); 
         })

      },
       getMeetingDetails(){
      //   let headers = { 'Authorization': 'Bearer '+localStorage.getItem("authToken")+'', 'accept': 'application/json' } ;  
      //    this.$http.get(process.env.VUE_APP_API_URL_MEETING + 'teacher/get-meeting-details?user_id='+this.user.id,{headers}) 
      axios
      .get(process.env.VUE_APP_API_URL_MEETING + 'teacher/get-meeting-details?user_id='+this.user.id+'&academic_year='+this.academic_year) 
        .then(response => {  
          let meetingdetails = response.data.data
          console.log(meetingdetails)
         meetingdetails.map((meetingdata)=> {
            console.log( meetingdata)
             let classdata = meetingdata.classsectionname
             classdata.map((classsection)=> {
            this.Timetable.push({id:meetingdata.id ,name: meetingdata.subject+'('+classsection.class_name+' - '+classsection.section_name+')'+'-'+'Online class' ,start: meetingdata.class_date+' '+meetingdata.fromtime,end: meetingdata.class_date+' '+ meetingdata.totime,color:"blue",starttime:meetingdata.fromtime,endtime:meetingdata.totime,type:"meeting"}); 
             });
         }); 
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
    },
   
   // addEventTimetable(){
   //       this.btnloading=true;
   //       this.event.user_id=this.user.emp_id,
   //       this.event.academic_year = JSON.parse(localStorage.getItem('academic_year'));
   //       axios.post(process.env.VUE_APP_API_URL_STAFF +'events',this.event).then(res => { 
   //          this.btnloading=false;
   //          if(Array.isArray(res.data.message)) {
   //                this.array_data = res.data.message.toString();
   //          }else{
   //                this.array_data = res.data.message;
   //          }
   //          if(res.data.status == 'E') {
   //            this.flashMessage.error({
   //              title: res.data.title, 
   //              message: this.array_data,
   //              time: 4000,
   //              blockClass: 'custom-block-class',
   //            });
   //          }else {
   //            this.flashMessage.success({
   //              title: res.data.title, 
   //              message: this.array_data,
   //              time: 4000,
   //              blockClass: 'custom-block-class'
   //            });
   //             this.Timetable.push({'id': res.data.events.id,'name': res.data.events.event_title,'start': res.data.events.event_start_date,'end': res.data.events.event_end_date,'color': res.data.events.event_color,'starttime': res.data.events.event_start_time,'endtime': res.data.events.event_end_time,'description': res.data.events.description,'reminder_mins': res.data.events.reminder_mins,'allocation_id':res.data.events.allocation_id,'type':"event"})
   //             this.Timetable = []
   //             this.fetchevents(); 
   //             this.fetchtimetable();  
   //             this.fetchholidays();
   //              this.getMeetingDetails();
   //             this.event={},
   //             document.getElementById('calendar').classList.add('col-sm-12')
   //             document.getElementById('calendar').classList.remove('col-sm-8')
   //             this.showCalendarForm = false;
   //          }             
   //          }).catch(err => {
   //             console.log("this error" + err)
   //          })
            
   //    },
      editEventTimetable(eventid,name,start,end,color,starttime,endtime,description,reminder_mins,allocation_id){
       // alert(eventid);
        document.getElementById('calendar').classList.remove('col-sm-12')
         document.getElementById('calendar').classList.add('col-sm-8')
         this.showCalendarForm=true;
         this.selectedOpen = false;
         //this.event.push({id:eventid,event_title:name,event_start_date: start,event_end_date: end,colors: color})
         var edit_start_date = new Date(start);
         var start_date = edit_start_date.getFullYear()+ '-'
             + ('0' + (edit_start_date.getMonth()+1)).slice(-2) + '-'
             +('0' + edit_start_date.getDate()).slice(-2) ;

         var edit_end_date = new Date(end);
         var end_date =  edit_end_date.getFullYear()+ '-'
             + ('0' + (edit_end_date.getMonth()+1)).slice(-2) + '-'
             +('0' + edit_end_date.getDate()).slice(-2) ;
         this.event.id = eventid,
         this.event.event_title = name,
         this.event.event_start_date = start_date,
         this.event.event_end_date = end_date,
         this.event.event_color = color,
         this.event.event_start_time = starttime,
         this.event.event_end_time = endtime,
         this.event.description = description,
         this.event.reminder_mins = reminder_mins,
         this.event.allocation_id = allocation_id
         
      },

      deleteEventTimetable(eventid){
         if(confirm("Do you really want to delete this event?")){
            //this.delete_loader = true;         
             axios.delete(process.env.VUE_APP_API_URL_STAFF + "events/"+eventid
                    ).then(res => {
                  if(Array.isArray(res.data.message)) {
                        this.array_data = res.data.message.toString();
                  }else{
                        this.array_data = res.data.message;
                  }
                  if(res.data.status == 'E') {
                     this.flashMessage.error({
                        title: res.data.title, 
                        message: this.array_data,
                        time: 4000,
                        blockClass: 'custom-block-class',
                     });
                     }else {
                     this.flashMessage.success({
                        title: res.data.title, 
                        message: this.array_data,
                        time: 4000,
                        blockClass: 'custom-block-class'
                     });
                     //document.getElementById('calendar').classList.add('col-sm-12')
                     document.getElementById('calendar').classList.remove('col-sm-8')
                     this.showCalendarForm=false;
                     this.selectedOpen = false;
                     this.Timetable = []
                     this.fetchevents(); 
                     this.fetchtimetable();
                     this.fetchholidays();
                      this.getMeetingDetails();
                     }

            }).catch(err => {
               console.log("this error" + err)
            }) 
                    
         }  
      },

      showAddCalendar(){
         this.valid = false;
         document.getElementById('calendar').classList.remove('col-sm-12')
         document.getElementById('calendar').classList.add('col-sm-8')
         this.showCalendarForm=true;
         
         this.event={ 
            event_title:"",
            event_end_date:new Date().toISOString().substr(0, 10),
            event_start_date: new Date().toISOString().substr(0, 10),
            event_start_time:"",
            event_end_time:"",
           // colors: ['red','blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
            }
          
        },

      cancel(){
         document.getElementById('calendar').classList.add('col-sm-12')
         document.getElementById('calendar').classList.remove('col-sm-8')
         this.showCalendarForm = false;
      },
         // addEventTimetable(first,second,title,eventcolor){
         //   this.Timetable.push({'name': title,'start': first,'end': second,'color': eventcolor, 'timed': true,})
         // this.Timetable =  this.Timetable
         // this.$refs.form.reset();
         // },
         
       viewDay ({ date }) {
         this.focus = date
         this.type = 'day'
        },
       getEventColor (event) {
         return event.color
       },
       setToday () {
         var currentDate =  new Date().toJSON().slice(0,10).replace(/-/g,'/');
         this.focus = currentDate
          this.type = 'day'
         this.Timetable=[];
         this.fetchtimetable();
         this.fetchevents();
         this.getMeetingDetails();
         this.fetchholidays();
       },
       prev () {
         this.$refs.calendar.prev()
         this.Timetable=[];
         this.fetchtimetable();
         this.fetchevents();
         this.getMeetingDetails();
         this.fetchholidays();
       },
       next () {
         this.$refs.calendar.next()
         this.Timetable=[];
         this.fetchtimetable();
         this.fetchevents();
         this.getMeetingDetails();
         this.fetchholidays();
       },
      //  showEvent ({ nativeEvent, event }) {
          
      //    const open = () => {
            
      //      this.selectedEvent = event
      //      alert(this.selectedEvent.type);
      //      this.selectedElement = nativeEvent.target
      //      setTimeout(() => {
      //        this.selectedOpen = true
      //      }, 10)
      //    }
   
      //    if (this.selectedOpen) {
            
      //      this.selectedOpen = false
      //      setTimeout(open, 10)
      //    } else {
      //      open()
      //    }
      //   // this.$router.push({ name: 'onlineclasses' });
      //    nativeEvent.stopPropagation()
      //  },
      
       showEvent({ nativeEvent, event }){
          console.log(nativeEvent);
           this.selectedEvent = event
         // alert(this.selectedEvent.type);
           this.selecteddate= moment(String(this.selectedEvent.start)).format('DD-MM-YYYY');
         // alert(this.selecteddate);
          //console.log(event);
          //alert("ba guru");
          if(this.selectedEvent.type=='meeting'){
               this.$router.push({ name: 'onlineclasses' })
          }
          else if(this.selectedEvent.type=='Event'){
               const open = () => {
            
               this.selectedEvent = event
               this.selectedElement = nativeEvent.target
               setTimeout(() => {
                  this.selectedOpen = true
               }, 10)
               }
         
               if (this.selectedOpen) {
                  
               this.selectedOpen = false
               setTimeout(open, 10)
               } else {
               open()
               }
            // this.$router.push({ name: 'onlineclasses' });
               nativeEvent.stopPropagation()
               }
         //  else{
         //       this.$router.push({ name: 'courseplanning',params: { selectedtab:'tab2',date:this.selecteddate} })
         //  }
         
       },
       updateRange ({start, end}) {
         const events1 = []
   
         const min = new Date(`${start.date}T00:00:00`)
         const max = new Date(`${end.date}T23:59:59`)
         const days = (max.getTime() - min.getTime()) / 86400000
         const eventCount = this.rnd(days, days + 20)
   
         for (let i = 0; i < eventCount; i++) {
           const allDay = this.rnd(0, 3) === 0
           const firstTimestamp = this.rnd(min.getTime(), max.getTime())
           const first = new Date(firstTimestamp - (firstTimestamp % 900000))
           const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
           const second = new Date(first.getTime() + secondTimestamp)
   
           events1.push({
             name: this.names[this.rnd(0, this.names.length - 1)],
             start: first,
             end: second,
             color: this.colors[this.rnd(0, this.colors.length - 1)],
             timed: !allDay,
           })
         }
   
         this.events1 = events1
       },
       rnd (a, b) {
         return Math.floor((b - a + 1) * Math.random()) + a
       },
     },
   }
</script>