<template>
  <v-row class="fill-height">
     <!-- {{entity_id}}<br> -->
  <v-col class="col-sm-12" id="calendar">
    <div class="card-hover-shadow-2x mb-3 card">
     <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
              {{ $t("event") }} 
            </div>
          </div>
      <div class="scroll-area-lg" >
            <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
            <VuePerfectScrollbar class="scrollbar-container" >
              <div v-for="(event_Content,index) in events_contents" :key="index">
              <div v-if="event_Content.type=='Event'">
                <div class="vertical-time-simple vertical-without-time vertical-timeline bg-hover  vertical-timeline--animate  vertical-timeline--one-column" v-bind:class="{'upon-selected': current === event_Content.id}" >
                  <div class="vertical-timeline-element"  >
                    <div @click="showAddCalendar(event_Content.id)"    >
                      <span class="vertical-timeline-element-icon dot-danger bounce-in"></span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">{{event_Content.title}}</h4>
                        <span class="text-success">{{event_Content.start_date|formatDate}}|{{$t("assigned_to")}}:{{event_Content.event_todo_details[0].role}}</span>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
              </div>
            </VuePerfectScrollbar>
          </div>

  
    </div>
      </v-col>
      <!--Event Calendar Section End-->
      <!--Create Event Form Start-->
      <v-col class="col-sm-4" id="calendar_form" v-if="showCalendarForm">
        
      <v-card >
        <VueElementLoading :active="loading" spinner="bar-fade-scale" color="var(--primary)"/>
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-bolder">
             {{event_Details.title}}
          </div>

         <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <h4 @click="cancel()" class="link mr-2 mt-2">
              <i class="lnr-arrow-left"></i>
            </h4>
          </div>
        </div>
      <div class="p-0 card-body" >
       <div class="row"  >
         <div class="col-md-12">
           <v-layout class="mt-4">
              <v-flex xs12 md12 class="mr-1 ml-4 mb-2">
                 <h7 > {{$t("start_date_time")}} : {{event_Details.start_date|formatDate}} | {{event_Details.start_time}} </h7>
                </v-flex>
                <!-- <v-flex xs12 md5 class="mr-2 ml-1">
                  <h7 >{{event_Details.start_date || formatDate}} | {{event_Details.start_time}} </h7>
                </v-flex> -->
           </v-layout>
           <v-layout>
              <v-flex xs12 md12 class="mr-1 ml-4">
                 <h7> {{$t("end_date_time")}}  : {{event_Details.end_date|formatDate}} | {{event_Details.end_time}} </h7>
                </v-flex>
           </v-layout>
           
           <v-layout>
                <v-flex xs12 md12 class="mt-4">
                  <div>
                 <p class="ml-2 mr-2"> {{event_Details.description}}</p>
                  </div>
                </v-flex>
           </v-layout>
         </div>     
       </div>
      </div>
    
         </v-card>
      
      </v-col>
      <!--Create Event Form Start-->
   </v-row>
</template>
<script>
import axios from "axios";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import "vue2-timepicker/dist/VueTimepicker.css";
import FlashMessage from "@smartweb/vue-flash-message";
import VueElementLoading from "vue-element-loading";
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(FlashMessage);

export default {
  props: ["selectedLOV","eventID","student_ID" ],
    components: {
    VuePerfectScrollbar,
    VueElementLoading
    },
  vuetify: new Vuetify(),
  data:(vm) => ({
    
      taskss: [
      {
        done: false,
        text:'foo',
      },
    
    ],
     group:"Y",
       publishtogroup:"",
       drawerVisible: false,
       class_search:"",
       student_search:"",
       selected: "2",
       staff_search:"",
       todocompleted:[],
       detailview:false,
       students:[],
       stafflist:[],
       event_Details:[],
       events_contents:[],
       disabled: false,
       showCalendarForm:false,
       timingoptions: true,
       loader:false,
       loading:false,
         menu2: "",
          menu3: "",
        isDisabled:false,
        btnloading:false,
        dialog:false,
        current:null,
        student_data:[],
        valid: true,
        academic_data:[],
        task:"",
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        taskdetail:[],
        //  tasks:{
        //     id:0,
        //     reminder_mins:0,
        //     task_title:'',
        //     description:'',
        //     due_date:'',
        // },
        reminder_timeinterval:[
            {
                text:'5 mins',
                code: 5
            },{
                text:'15 mins',
                code:15
            },{
                text:'30 mins',
                code:30
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
  //  event_id: {
  //   immediate: true,
  //   handler() {
  //     this.edittask(this.event_id);
  //   },
 
  // },
  selectedLOV(){
 //   alert("fetch event function")
        this.fetchtEvents();
   },
   eventID:{
    immediate: true,
    handler() {
   // if(this.eventID>0){
     // alert("fetch event eventID"+this.eventID)
      this.selectedLOV = this.student_ID;
      this.fetchtEvents();
      //this.showAddCalendar(this.eventID)
   // }
        

    },
     
   }
},
  mounted(){
          // this.fetchtEvents(this.studentEvents);
          if(this.addtype=="event"){
          // this.showAddCalendar();
        }
        if(this.eventID){
          this.showAddCalendar(this.eventID);
        }
        // this.fetchlookup();
        // this. academicyears();
  },

   computed: {
       fieldRules() {
      return [(v) => !!v || this.$t("field_required")];
    },
    completedTasks () {
      return this.todoList.filter(todoList => todoList.done).length
    },
    progress () {
      return this.completedTasks / this.todoList.length * 100
    },
    remainingTasks () {
      return this.todoList.length - this.completedTasks
    },
        classSearch() {
        if(this.class_search){
            return this.allClasses.filter(classdata => {
            return classdata.class_name.toLowerCase().includes(this.class_search.toLowerCase())
            })
        }
        else
        {
            return this.allClasses;
        }
    },

    startdateFormatted() {
      return this.formatDate(this.task_data.start_date);
    },
       enddateFormatted() {
      return this.formatDate(this.task_data.end_date);
    },
  },

  methods:{
     formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
                 // Add tasks  
        expandclose(TodoStatus){
          this.todoexpand=TodoStatus;
             
        },
              
  fetchtEvents() {
  // alert("the routing function"+this.selectedLOV)
    this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetch_events_tasks",{
         params: {
            role: 'Student',
            academic_year:this.academic_year,
            entity_id:this.selectedLOV,
          },
        })
        .then((res) => {
          this.events_contents = res.data.eventdata;
          this.loader=false; 
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },
     
   showAddCalendar(id){ 
        this.loading=true;
        this.current = id;
        axios
              .get(
                process.env.VUE_APP_API_URL_STAFF +  "event_todo/"+id)
              .then((res) => {
                this.event_Details = res.data.events_todo;
                console.log(res.data);
                this.loading=false;
                
              })
              .catch((err) => {
                console.log("this error" + err);
                this.loading=false; 
              });
         document.getElementById('calendar').classList.remove('col-sm-12')
         document.getElementById('calendar').classList.add('col-sm-8')
         this.showCalendarForm=true;
         
        },

   cancel(){
         this.current=null;
         document.getElementById('calendar').classList.remove('col-sm-8')   
         document.getElementById('calendar').classList.add('col-sm-12')
         this.showCalendarForm = false;
      },
     
  }
};
</script>

<style scoped>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}


h5 {
  font-weight: 400;
  
}

h1 {
  color: teal;
}

a {
  color: tomato;
}

.toggle {
  width: 120px;
  background: white;
  color: tomato;
  border: 0;
  padding: 5px;
  cursor: pointer;
}

.close {
  background: white;
  border: 0;
  cursor: pointer;
}
.dot-danger{
  background-color: crimson!important;;
}

.right-drawer {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  overflow: hidden;
  height: 100vh;
  padding-left: 0;
  border-left: 1px solid whitesmoke;
  background: white;
  z-index: 200;
  transition: all 0.2s;
}

.drawer-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0; 
  height: 100vh;
  background: #000;
  opacity: 0.3;
  z-index: 199;
  transition: opacity 0.2s;
}
.task-cont{
    display: flex;
}
.side-form{
  width: 100%;
  display: flex;
}
.col-area{
  margin: -4px;
}
.timingoptions {
  display: flex;
  justify-content: center;
  align-items: center;
}
.border-select{
  border: #5bd7ae;
  border-style: solid;
  border-width: 2px;
}
.border-select:hover{
  border: #5bd7ae;
  border-style: solid;
  border-width: 2px;
}
.inner_border{
border: 2px rgb(255, 255, 255) solid;
padding: 5px;
text-align: center;
}
p{
padding: 12px;
margin-top: -8px;
}

.badge{
font-weight: bold;
text-transform: uppercase;
padding: 10px 44px;
min-width: 19px;
font-size: medium;
}
.badge_start{
  font-weight: bold;
text-transform: uppercase;
padding: 10px 35px;
min-width: 19px;
font-size: medium;
display: inline-block;
line-height: 1;
text-align: center;
white-space: nowrap;
vertical-align: baseline;
border-radius: 0.25rem;
}
.bg-hover:hover{
  background-color: rgb(201, 212, 231);
  cursor: pointer;
}
.upon-selected{
  background: rgb(177, 200, 242)!important;
}
.scroll-area-lg{
  height: 550px;
  overflow-x: hidden;
}
</style>