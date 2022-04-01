<template>
<div>
<div>
<div style="display:flex;float:right" >
  <AllocationLov @selected-allocation="studentID" class="mb-2"></AllocationLov>
</div>
  <h4 class="ml-2 pt-5 "> <strong> {{ $t("attendance_report") }} </strong> </h4>  
</div>
    <div role="tablist">
      <div v-if="showmain==true">
                              <b-card no-body class="mb-1" style="width: 100%">
                                <b-card-header
                                  header-tag="header"
                                  v-b-toggle.accordion1
                                  class="p-1"
                                  role="tab"
                                >
                                  <div class="pl-2 pr-2 ">
                                    {{ $t("all_subjects_attendance")}} {{this.student_firstname}} {{this.student_lastname}}
                                  </div>
                                </b-card-header>
                                <div>
                                  <div class="table-responsive card">
                                   
                                    <table
                                      class="align-middle mb-0 table table-borderless table-striped table-hover"
                                    >
                                     <VueElementLoading
                                      :active="loader"
                                      spinner="bar-fade-scale"
                                      color="var(--primary)"
                                     />
                                      <thead>
                                        <tr class="text-center">
                                          <th>{{ $t("subject") }}</th>
                                          <th>{{ $t("classes_taken") }}</th>
                                          <th> {{$t("class_attended")}}
                                          <th>{{ $t("absences") }}</th>
                                          <th>{{ $t("late") }}</th>
                                          <th>{{ $t("percentage") }}</th>
                                          <th>{{ $t("action") }}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr
                                          v-for="(
                                            subjecttitle, subjectindex
                                          ) in subjectattendance"
                                          :key="subjectindex"
                                          class="text-center"
                                        >
                                          <td>
                                            {{ subjecttitle.subject_name }}({{ subjecttitle.subject_code }})
                                          </td>
                                          <td>
                                            {{
                                              subjecttitle.subjectdetails
                                                .class_taken
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              subjecttitle.subjectdetails
                                                .class_attended
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              subjecttitle.subjectdetails
                                                .absentcount
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              subjecttitle.subjectdetails
                                                .latecount
                                            }}
                                          </td>
                                           <td>
                                            {{
                                              subjecttitle.subjectdetails
                                                .attendance
                                            }}
                                          </td>
                                          <td v-if="subjecttitle.subjectdetails
                                                .absentcount!=0 || subjecttitle.subjectdetails
                                                .latecount!=0">
                                           <button
                                             type="button"
                                              class="btn view_btn btn-hover-shine btn-transition btn-primary"
                                              @click="AllocationFetch(subjecttitle.id)"
                                           >
                                              {{ $t("view") }}
                                           </button>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                
                                </div>
                              </b-card>
      </div>
      <div v-if="showdetails==true" >
        <b-card no-body class="mb-1" style="width: 100%">
                                <b-card-header
                                  header-tag="header"
                                  v-b-toggle.accordion1
                                  class="p-1 space_between"
                                  role="tab"
                                >
                                  <div class="pl-2 pr-2 ">
                                    {{ $t("all_subjects_attendance")}} {{this.student_firstname}} {{this.student_lastname}}
                                  </div>
                                   
                                   <button
                                    v-on="on"
                                    @click="back()"
                                    type="button"
                                    class="btn mr-2 p-1 btn-hover-shine btn-transition btn-focus"
                                   >
                                   {{ $t("back") }}
                                     </button>
                                  
                                </b-card-header>
                                <div>
                            
                                  <div class="table-responsive card">
                                    <table
                                      class="align-middle mb-0 table table-borderless table-striped table-hover"
                                    >
                                    <VueElementLoading
                                  :active="loader"
                                  spinner="bar-fade-scale"
                                  color="var(--primary)"
                                 />
                                      <thead>
                                        <tr class="text-center">
                                          <th>{{ $t("subject") }}</th>
                                          <th>{{ $t("classes_taken") }}</th>
                                          <th>{{ $t("class_attended") }}</th>
                                          <th>{{ $t("absences") }}</th>
                                          <th>{{ $t("late") }}</th>
                                          <th>{{ $t("percentage") }}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr  v-for="(
                                            item, attendaceindex
                                          ) in details_Subject"
                                          :key="attendaceindex" class="text-center">
                                          <td>
                                            {{item.subject_name}}
                                          </td>
                                          <td>
                                            {{
                                              item.subjectdetails.class_taken
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              item.subjectdetails.class_attended
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              item.subjectdetails.absentcount
                                            }}
                                          </td>
                                          <td>
                                            {{
                                              item.subjectdetails.latecount
                                            }}
                                          </td>
                                          <td>
                                            {{
                                             item.subjectdetails.attendance
                                            }}
                                          </td>
                                          
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                            
                              <b-tabs pills card class="mt-2">
                                <b-tab v-bind:title="$t('absent_report')" active >
                                  <VueElementLoading
                                  :active="loadng"
                                  spinner="bar-fade-scale"
                                  color="var(--primary)"
                                 />
                                <div class="col-lg-8 col-sm-5 col-md-5 ">  
                                <div class="table-responsive ">
                                  <h7 v-if="!absent_reasons.length>0"> <i> {{ $t("Kudos_absent") }} </i> </h7>
                                <table
                                 v-else class="align-middle mb-0 table-bordered table table-striped table-hover"
                                >
                                  <thead>
                                    <tr>
                                      <th class="text-center">{{ $t("date") }}</th>
          
                                      <th class="text-center">
                                        {{ $t("reason") }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(
                                        homework, homeworkindex
                                      ) in get_reasons.filter((item) => item.status=='A')"
                                      :key="homeworkindex"
                                    >
                                      <td class="text-center text-muted">
                                        {{ homework.attendance_date | formatDate }}
                                      </td>
                                      <td class="text-center">
                                          {{ homework.reason }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                                </div>
                                </b-tab>

                                <b-tab v-bind:title="$t('late_coming_report')" >
                                <div class="col-lg-8 col-sm-5 col-md-5 ">  
                                  <VueElementLoading
                                  :active="loadng"
                                  spinner="bar-fade-scale"
                                  color="var(--primary)"
                                 />
                                <div class="table-responsive ">
                                  <h7 v-if="!late_reasons.length>0"> <i> {{ $t("kudos_late") }} </i> </h7>
                                <table
                                 v-else class="align-middle mb-0 table table-bordered table-striped table-hover"
                                >
                                  <thead>
                                    <tr>
                                      <th class="text-center">{{ $t("date") }}</th>
          
                                      <th class="text-center">
                                        {{ $t("reason") }}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(
                                        homework, homeworkindex
                                      ) in get_reasons.filter((item) => item.status=='L')"
                                      :key="homeworkindex"
                                    >
                                      <td class="text-center text-muted">
                                        {{ homework.attendance_date | formatDate }}
                                      </td>
                                      <td class="text-center">
                                          {{ homework.reason }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                                </div>
                                </b-tab>
                                </b-tabs>
                                </div>
                              </b-card>
                            </div>
                            </div>
</div>
</template>

<script>
import axios from "axios";
 import AllocationLov from "../allocation_lov/allocationslov.vue"
 import VueElementLoading from "vue-element-loading";
import Vue from 'vue';
import Vuetify from 'vuetify';
import DatetimePicker from 'vuetify-datetime-picker';
Vue.use(DatetimePicker);

export default {
  components: {
        AllocationLov,
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
    addtype:"",
      selectedsub:"",
      showmain:true,
      drawerVisible: false,
       todocompleted:[],
        detailview:false,
        showCalendarForm:false,
        students:[],
        loadng:false,
       selected  : null,
       panel: [0,1,2,3],
      disabled: false,
      subjectattendance:[],
        syllabus:[],
        loader:false,
        studentLOVid:"",
         menu2: "",
        classsec:{},
        subjectID:"",
        attendancedata:[],
        sectionID:"",
        showdetails:false,
        allocation:"",
        subjectName:"",
        classID:"",
        student_firstname:"",
        student_lastname:"",
       classestaken: "",
       absences: "",
       late: "",
      cleardata: "No",
       totalpercentage: "",
       attendancecount: [],
        isDisabled:false,
        btnloading:false,
        dialog:false,
        todoList:[],
        details_Subject:[],
        absent_reasons:[],
        late_reasons:[],
        get_reasons:[],
          staff_data:[],
          subject_handled:[],
        student_data:[],
        reasons:[],
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
watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          // this.loader = true;
          this.taskid = this.$route.params.id;
        }
      },
    },
   
    },
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
   studentID(lovstudentid,lovclassid,lovsectionid,lovfistname,lovsecondname){
               this.studentlov_id=lovstudentid;
               this.classID=lovclassid;
               this.sectionID=lovsectionid;
               this.student_firstname = lovfistname;
               this.student_lastname = lovsecondname;
              this.studentgrade();
              this.details_Subject=[];
              this.get_reasons=[];
              this.late_reasons=[];
              this.absent_reasons=[];
              this.allocation="";
              this.showmain=true;
              this.showdetails=false;
              this.loader=true;
                
            //    this.$emit('selected-student',this.studentlov_id);
            },  
      
   studentgrade() {
     this.loader=true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentsubjects?student_id=" +
            this.studentlov_id
        )
        .then((response) => {
          //  console.log(response.data.upcoming_tests);
          this.subjectattendance = response.data.subjectdata;
          this.loader=false;
        })
        .catch((err) => {
          console.log(err);
          this.loader=false;
        });
    },
    AllocationFetch(id,) {
      this.details_Subject=[];
      this.get_reasons=[];
      this.absent_reasons=[],
      this.late_reasons=[],
      this.laoder=true;
      this.loadng=true;
      this.showdetails=true;
      this.showmain=false;
      this.subjectID=id;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "attendancedetails?student_id=" +
            this.studentlov_id
        )
        .then((response) => {
          this.subject = response.data.subjectdata;
          this.details_Subject = this.subject.filter((item) => item.id==this.subjectID);
          
           this.details_Subject.map((res)=>{ 
             let reasons = res.subjectdetails.reasons;
             reasons.map((item) =>{
               this.get_reasons.push(item);
               if(item.status=='A'){
                 this.absent_reasons=[];
                 this.absent_reasons.push(item);
                 this.loadng=false;
               }
               else{
                  this.late_reasons=[];
                  this.late_reasons.push(item);
                  this.loadng=false;
               }
             } )
              //  this.get_reasons.push(res.subjectdetails.reasons);
               
            });
          this.loader=false;
        })
        .catch((err) => {
          console.log(err);
          this.loader=false;
        });
    },
      attendanceDetails(id) {
      
      this.allocation_id=id;
      this.loader = true;
      this.loadng=true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "fetchstudentattendanceoverview?student_id=" +
            this.studentlov_id +
            "&allocation_id=" +this.allocation_id
            
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "E") {
            this.is_error = true;
            this.message = res.data.message;
            this.loader = false;
            this.loadng=false;
            setTimeout(() => (this.is_error = false), 5000);
          } else {
            this.is_success = true;
            this.message = res.data.message;
            this.attendancedata = res.data.topicdetails;
            this.classestaken = res.data.classestaken;
            this.absences = res.data.absences;
            this.late = res.data.late;
            this.totalpercentage = res.data.totalpercentage;
            this.attendancecount = res.data.student_data;
            //console.log(res.data);
            this.loader = false;
            this.loadng=false;
            setTimeout(() => (this.is_success = false), 5000);
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    back(){
      this.showmain=true;
       this.studentgrade();
      this.showdetails=false;
      this.attendancedata=[];
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
              

  }
};
</script>

<style scoped>

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}



h7 {
  color: #514b4b;
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
.space_between{
  justify-content: space-between;
}
</style>