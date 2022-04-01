<template>
    <v-row >
      <v-col class="col-sm-12" id="calendar"> 
     <div>
         <div class="scroll-area-lg card" >
         <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
            <VuePerfectScrollbar class="scrollbar-container">
              <div class="d-block font-weight-bold text-capitalize mt-1 grey--text text-left p-4" v-if="detailsfound==true">{{$t('no_details_found')}}</div>
               <!-- <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4" v-if="Task_content.length==0 && homeworkList.length==0 && detailsfound==false">{{$t('please_select_student')}}</div> -->
              <ul class="todo-list-wrapper list-group list-group-flush" v-for="(task_con,index) in Task_content" :key="index">
                <li class="listgroupitem list_select" v-bind:class="{'upon_select':current == task_con.id}"   v-if="task_con.type=='Event'">
                  <div class="todo-indicator bg-warning"></div>
                  <div class="widget-content p-0" @click="goTOevents(task_con.id,selectedStudent.student_id)">
                <div class="widget-content-wrapper"  >
                <div class="widget-content-left">
                 <div class="widget-heading">
                 <div class="mt-4">
               <div style="font-size: 16px;">
                 <div  style="font-size: 16px;">  
                     <div > {{selectedStudent.firstname}} {{selectedStudent.lastname}} | {{task_con.title}} </div>
                     <div class="widget-subheading">
                          <p>{{task_con.start_date|formatDate}}, {{task_con.start_time}} to {{task_con.end_date|formatDate}}, {{task_con.end_time}}</p>
                        </div>
                 </div>
               </div>
               </div>
                </div>
              </div>            
             </div>
                  </div>
                </li>
               
              </ul>
              <ul class="todo-list-wrapper list-group list-group-flush" v-for="(homewrk,index) in homeworkList" :key="index">
                <li class="listgroupitem list_select" v-bind:class="{'upon_select':current == homewrk.id}">
                  <div class="todo-indicator bg-danger"></div>
                  <div class="widget-content p-0">
                <div class="widget-content-wrapper"  >
                <div class="widget-content-left">
                 <div class="widget-heading">
                 <div class="mt-4">
               <div style="font-size: 16px;">
                 <div  style="font-size: 16px;">  
                     <div > {{selectedStudent.firstname}} {{selectedStudent.lastname}} | {{homewrk.title}} </div>
                     <div class="widget-subheading">
                          <p>{{$t("assigned_on")}} : {{homewrk.schedule_date_time|formatDate}} | {{$t("due_on")}} : {{homewrk.due_date|formatDate}}</p>
                        </div>
                 </div>
               </div>
               </div>
                </div>
              </div>   
              <div class="widget-content-right mr-6">
                <div v-if="homewrk.assignmentstatus=='Draft'" >
                        <div class="badge badge-pill badge-warning"> {{$t("due_for_submission")}} </div>
                </div>
                <div v-else class="badge badge-pill badge-success">{{homewrk.assignmentstatus}} </div>
              </div>         
             </div>
                  </div>
                </li>
               
              </ul>
            </VuePerfectScrollbar>
          </div>
     </div>
      </v-col>
    </v-row>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
export default {
  components: {
    VuePerfectScrollbar,
    //Tabs
    VueElementLoading,
  },
  props:["selectedStudent"],
  data: () => ({
   Task_content:[],
    search: "",
    loader: false,
    todoList: [],
    all_children_data:[],
    userdata:[],
    detailsfound:true,
    studentids:[],
    sudentdetails:"",
    student_id:"",
    stuID:"",
    homeworkList:[],
    currentDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.parent_id = this.user.emp_id;
    // this.fetchchildData();
    
    // this.fetch_task_todo();

    // this.getUserDetails();
  },

    watch: {
      selectedStudent(){
        this.Task_content=[];
        this.homeworkList=[];
        this.fetch_task_todo();
        this.fetchAllHomework();
   }
    },
 
  methods: {
    fetchchildData() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.parent_id,
          },
        })
        .then((res) => {
          this.all_children_data = res.data.all_children;
          // this.studentids=[];
           this.all_children_data.forEach((element) => {
          this.studentids.push(element.student_id);
          });
          this.fetchAllHomework();
          this.loader=false; 
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },

    fetch_task_todo() {
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetch_events_tasks",{
         params: {
             role: 'Student',
            academic_year:this.academic_year,
            entity_id:this.selectedStudent.student_id,
          },
        })
        .then((res) => {
          this.Task_content = res.data.eventdata;
          if(this.Task_content.type=='Task'){
            this.detailsfound = false;
          }

        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },

    goTOevents(taskid,STDid){
     
      this.stuID=STDid;
      this.taskID = taskid;
      this.$router.push({ 
       name: 'schedule',
       params: { tab:"tab3",StudentID:this.stuID,TaskID:this.taskID}
       });
      
    },

    fetchAllHomework() {
      this.loader = true;
      // alert(this.student_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentassignments?student_id=" +
            this.selectedStudent.student_id +
            "&assignment_type=Homework"+"&academic_year="+this.academic_year
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.status == "E") {
            this.is_error = true;
            this.message = res.data.message;
            this.loader = false;
            setTimeout(() => (this.is_error = false), 5000);
          } else {
            this.is_success = true;
            this.message = res.data.message;
            this.homeworkList = res.data.assignments;
            if(this.homeworkList){
              this.detailsfound = false;
            }
            //console.log(res.data);
            this.loader = false;
            setTimeout(() => (this.is_success = false), 5000);
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    getUserDetails(){
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "fetchuserdata?user_id=" +
            this.student_id
        )
        .then((res) => {
          console.log("userdata");
          console.log(res.data.userdata);
          this.userdata = res.data.userdata;
        });
    },
   
  },
  computed: {
    todoListData() {
      //alert('test');
      if (this.search) {
        return this.todoList.filter((tododata) => {
          return tododata.title.toLowerCase().includes(this.search.toLowerCase());
        });
      } else {
        return this.todoList;
      }
    },
  },
};
</script>
<style scoped>

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 400;
  color: rgb(177, 200, 242);
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
.upon_select{
    background: rgb(177, 200, 242)!important;
}
.list_select:hover{
    background: rgb(201, 212, 231);
    cursor: pointer;
}
.listgroupitem{
position: relative;
display: block;
padding-left: 25px!important;
margin-bottom: -1px;
background-color: #fff;
border: 1px solid rgba(0, 0, 0, 0.125);
}
.scroll-area-lg{
  height: 700px;
  overflow-x: hidden;
}
</style>

