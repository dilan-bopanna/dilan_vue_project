<template>
<div>

<div style="display:flex;justify-content:space-between" >
  <h4 class="ml-4 mt-4"> <strong> {{ $t("curriculum") }} </strong> </h4> 
  <AllocationLov @selected-allocation="studentID" ></AllocationLov>
  </div>
   <v-row >
    <v-col class="col-sm-12" id="calendar"> 
    <div style="text-align: left">
    <v-card
      class="mr-auto"
      width="100%"
    >
    <v-toolbar
      color="white"   
    >
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-toolbar-title>{{ $t("course_summary") }}</v-toolbar-title>

      <v-spacer></v-spacer>
     
    <v-select
        style="max-width:200px"
        item-value="id"
        item-text="subject_name"
        dense
        @change="fetchSyllabus(selectedsub)"
        v-model="selectedsub"
        class="mt-6"
        outlined
        :items="staffsubjects"
        v-bind:label="$t('select_subject')"
        
      >
        <template slot="selection" slot-scope="data">
          <span>{{ data.item.subject_name}} - ({{data.item.subject_code}})</span>
        </template>
        <template slot="item" slot-scope="data">
          <span>{{ data.item.subject_name }} - ({{data.item.subject_code}})</span>
        </template>
      </v-select>
      <!-- <v-btn icon>
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn> -->
    </v-toolbar>
     <div class="d-block font-weight-bold text-capitalize mt-1 text-center text_design  p-4" v-if="syllabus.length==0">{{$t('please_select_class')}}</div>
 <v-expansion-panels class="scroll-area-lg" v-model="panel" :disabled="disabled"  multiple focusable>
    <v-expansion-panel
      v-for="(items,i) in syllabus"
      :key="i"
    >
      <v-expansion-panel-header > <h5> <strong> {{items.part_name }}</strong></h5></v-expansion-panel-header>
      <v-expansion-panel-content>
      <v-list>
      <div>
      
        <template>
          <v-list-item v-for="(chapter,j) in items.chapters" :key="j" style="display:block"  >
             
              <v-list-item-title > 
                  <h6> <strong> {{j+1}}. {{chapter.chapter_name}} </strong> </h6> 
              </v-list-item-title>
    
              <ul v-for="(topicslist,topicindex) in chapter.topics" :key="topicindex" style="list-style-type: none" class="ml-4">
                      <li>{{topicindex+1}}. {{topicslist.topic_name}} </li>     
              </ul>
          </v-list-item>
        </template>
      </div>
    </v-list>

     </v-expansion-panel-content>
    </v-expansion-panel>
 
  </v-expansion-panels>

  </v-card>
    </div>
      </v-col>
     
   </v-row>
</div>
</template>

<script>
import axios from "axios";
 import AllocationLov from "../allocation_lov/allocationslov.vue"
import Vue from 'vue';
import Vuetify from 'vuetify';
import DatetimePicker from 'vuetify-datetime-picker';
Vue.use(DatetimePicker);

export default {
  components: {
        AllocationLov
  },
  vuetify: new Vuetify(),
  data:(vm) => ({
      taskss: [
      {
        done: false,
        text:'foo',
      },
    
    ],
    addtype:"",
      selectedsub:"",
   
      drawerVisible: false,
       todocompleted:[],
        detailview:false,
        showCalendarForm:false,
        students:[],
       selected  : null,
       panel: [0,1,2,3],
      disabled: false,
        syllabus:[],
        loader:false,
        studentLOVid:"",
         menu2: "",
        classsec:{},
        chapters_details:[],
        sectionID:"",
        classID:"",
        staffsubjects:[],
        isDisabled:false,
        btnloading:false,
        dialog:false,
        todoList:[],
         class_data:[],
          staff_data:[],
        student_data:[],
        valid: true,
        academic_data:[],
        task:"",
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
        taskdetail:[],
     
        reminder_timeinterval:[
            {
                text:'1 day',
                code:1440
            },{
                text:'2 day',
                code:2880
            },{
                text:'3 day',
                code:4320
            }
        ],
  }),
  mounted(){
  this.user = JSON.parse(localStorage.getItem('user'));
        this.staff_id = this.user.emp_id;
        this.user_id = this.user.emp_id;
        // this.fetchSyllabus();
        // this.class_section();
        // this.fetchAssignedClasses();
  },

   computed: {
     fieldRules() {
      return [(v) => !!v || this.$t("field_required")];
    },
    
  },

  methods:{
   studentID(lovstudentid,lovclassid,lovsectionid){
               this.studentlov_id=lovstudentid;
               this.classID=lovclassid;
               this.sectionID=lovsectionid;
               this.staffsubjects=[];
                this.syllabus = [];
                this.fetchAssignedClasses()
            },  

    // class_section(){
    //         axios.get(process.env.VUE_APP_API_URL_STAFF +'class_section?user_id='+this.user_id).then(res => {
    //         this.classsec = res.data.student_class_sec;
    //         }).catch(err => {
    //         console.log("this error" + err)
    //         })                
    //     },

     fetchAssignedClasses() {  
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + 'allsubjects?class_id='+ this.classID
        )
        .then((res) => {
          console.log(res.data.subjects);
          this.staffsubjects=[];
          this.staffsubjects = res.data.subjects;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },

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
              
 fetchSyllabus(subjectid) {
      this.loader = true;
      this.subject_id = subjectid;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "parts?subject_id=" +
            this.subject_id
        )
        .then((res) => {
          if (Array.isArray(res.data.message)) {
            this.array_data = res.data.message.toString();
          } else {
            this.array_data = res.data.message;
          }
          if (res.data.status == "E") {
            this.flashMessage.error({
              title: res.data.title,
              message: this.array_data,
              time: 4000,
              blockClass: "custom-block-class",
            });
            this.loader = false;
            this.syllabus = [];
          } else {
            this.syllabus = [];
            this.syllabus = res.data.parts;
            //  this.chapters_details= res.data.parts.chapters;
            let syllabus_details = res.data.parts;
    
            syllabus_details.map((res)=>{
                console.log( res);
            //    let details= res.chapters;
               this.chapters_details.push(res.chapters);
            });
            this.loader = false;
          }
        });
    },
          cancel(){
             this.$refs.form.reset();
         document.getElementById('calendar').classList.add('col-sm-12')
         document.getElementById('calendar').classList.remove('col-sm-8')
         this.showCalendarForm = false;
           this.task_data.id=0;
      },

  }
};
</script>

<style scoped>

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
.heading_empty{
  text-align: center;
}
.scroll-area-lg{
  height: 450px;
  overflow-x: hidden;
}
.text_design{
  font-size: 21px;  
  color: rgb(114, 109, 109);
}
</style>