<template>
   <v-row class="fill-height">
      <!-- {{Timetable}} -->
      <!--Event Calendar Section End--> 
      <v-col class="col-sm-12" id="calendar">
                    <!--Error Message Start-->
    <v-alert outlined :value="is_success" color="success" icon="lnr-checkmark-circle">
          {{ message }}
      </v-alert>
    <v-alert :value="is_error" color="error" icon="lnr-warning" outlined> {{ message }} </v-alert>
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
            :first-interval=6
            @change="updateRange"
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
                  </v-toolbar>
                  <v-card-text>
                      <div><span>Start Date: {{selectedEvent.start|formatDate}}-{{selectedEvent.starttime}}</span> 
                     </div>
                     <div>
                      <span>End Date: {{selectedEvent.end|formatDate}}-{{selectedEvent.endtime}}</span>
                      </div>  
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
   </v-row>
</template>
<script>
import axios from "axios";
   export default {
   props:['Event_data'],
   data: () => ({
   showCalendarForm:false,
   valid: true,
   is_success:false,
   is_error:false,
   success_message:false,
   message:"",
   colors :[],
   //  enddate:new Date().toISOString().substr(0, 10),
   //  startdate: new Date().toISOString().substr(0, 10),
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    menu1: false,
    modal: false,
    focus: '',
    type: 'month',
    //event_title: '',
      nameRules: [
        v => !!v || 'Event Title is required',
        v => (v && v.length <= 30) || 'Event Name must be less than 30 characters',
      ],
    typeToLabel: {month: 'Month',week: 'Week',day: 'Day','4day': '4 Days',},
       selectedEvent: {},
       selectedElement: null,
       selectedOpen: false,
       Timetable: [],
      event:[],
      holidays:[],
      //colors: ['red','blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Test', 'Assignment', 'Holiday', 'Online Class'],
      user:{},

   }),
   mounted () {
   this.user = JSON.parse(localStorage.getItem('user'));
   this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
   this.$refs.calendar.checkChange();
   this.fetchtimetable();
   this.fetchholidays();
   },
    
     methods: {
         settype(calendartype){  
         this.Timetable=[];
         this.type=calendartype;
         this.fetchtimetable();
         this.fetchholidays();
      },

      fetchtimetable(){
      axios
        .get(process.env.VUE_APP_API_URL_STAFF  +'studenttimetable?student_id='+this.user.emp_id+'&plan_type='+this.type+'&plan_date='+this.focus+"&academic_year="+this.academic_year)
      .then(response =>  {

         let TimetableObject =  response.data.timetable;
      
         TimetableObject.map((items)=> {
         
            let TimetableArray = items.timetabledata;
    
            TimetableArray.map((res)=>{
             
               this.Timetable.push({name: res.subject_name+" - "+ res.section_name, start: items.date+' '+res.start_time, end: items.date+' '+res.end_time,starttime: res.start_time,endtime:res.end_time, color:res.color_code }); 
                
            })
           
         });

      })

   },
fetchholidays(){
      axios
      .get(process.env.VUE_APP_API_URL_STAFF  +'academic_holidays?student_id='+this.user.emp_id+'&plan_type='+this.type+'&plan_date='+this.focus+"&academic_year="+this.academic_year)
      .then(res =>  {
         this.holidays=[];
         let holidays =  res.data.holidays;
         holidays.map((holiday_data)=> {
            this.Timetable.push({id:holiday_data.id ,name: holiday_data.description,start:holiday_data.date,end: holiday_data.date,color:'#536848',starttime:'00:00:00',endtime:'23:59:59',description: holiday_data.description,reminder_mins: '',allocation_id:'',type:"holidays"}); 
         }); 
      })
   },

         
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
         this.fetchholidays();
        
       },
       prev () {
         this.$refs.calendar.prev()
         this.Timetable=[];
         this.fetchtimetable();
         this.fetchholidays();
       },
       next () {
         this.$refs.calendar.next()
         this.Timetable=[];
         this.fetchtimetable();
         this.fetchholidays();
       },
       showEvent ({ nativeEvent, event }) {
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
   
         nativeEvent.stopPropagation()
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