<template>
    <div>

        <div style="display: flex;justify-content: space-between;between;
align-items: center;">
        <tabs  :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'" :tab-class="'tab-item'"
            :tab-active-class="'tab-item-active'" :line-class="'tab-item-line'" @onClick="handleClick"  />
        <div>
        <v-select
            v-model="studentid"
            @change="get_selected_student(studentid)"
            item-value="student_id"
            dense
            solo
            item-text="class_name"
            :items="parent_details"
            v-bind:label="$t('select_children')"
            
             >
                <template slot="selection" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                  </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                </template>
        </v-select>
            </div>
        </div>
    
            
            <div v-if="currentTab === 'tab1'">
             <TimeTable :selectedLOV="selectedstudentid" ></TimeTable>
            </div>
            <div v-if="currentTab === 'tab2'">
             <ExamTimetable :selectedLOV="selectedstudentid" ></ExamTimetable>
            </div>
            <!--Seating Part Start-->
            <div v-if="currentTab === 'tab3'">                  
             <Events :selectedLOV="selectedstudentid"  :eventID="taskID" :student_ID="studentid"></Events>
            </div>
            
            <!-- <AllocationLov @selected-allocation="studentID" :selectedStudent="student_selected_id" ></AllocationLov> -->
        </div>
</template>
<script>
    // import axios from "axios";
    import Tabs from "vue-tabs-with-active-line";
    import TimeTable from "../Schedule/timetable_calendar.vue"
    import Events from "../Schedule/events_main.vue"
    import ExamTimetable from "../Schedule/ExamTimetable.vue"
    import axios from "axios";
    // import AllocationLov from "../allocation_lov/allocationslov.vue"
    // import Reports from "../web/components/attendance/ViewReports";
    // import OnlineAttandence from "../web/components/attendance/onlineattendance";
    export default {
        components: {
            Tabs,
            TimeTable,
            Events,
            ExamTimetable
            // AllocationLov
           // quillEditor,
           // PageTitle
        },
    
        data: () => ({
            attendance:'',
            subject:'',
            allocationtitle:"ALL",
            heading: "Attendance",
            subheading: "Manage attendance and activities.",
            icon: "pe-7s-date icon-gradient bg-malibu-beach",
            selectedubject: "All Class",
           // tabs: TABS,
            currentTab: "tab1",
            studentview: false,
            studentlov_id:"",
             selected_student:"",
            calssID:"",
            sectionID:"",
            dialog: false,
            mail: false,
            routeid:"",
            selectedstudentid:"",
            taskID:"",
            studentid:"",
            parent_details:[],
            allocation_id:'',
            showccinput: false,
            showbccinput: false,
            hodor: true,
            attendanceReports:true,
            search: "",     
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? "New Item" : "Edit Item";
            },
            tabs(){
        return [
            {
               title: this.$t('timetable'),
               value: "tab1"
            },
            {
                title: this.$t('exam_schedule'),
                value: "tab2"
            },
            {
                title:this.$t('events'),
                value: "tab3"
            },
           
          ]
        }
        },
        mounted(){  
        this.user = JSON.parse(localStorage.getItem('user'));
        this.parent_id = this.user.emp_id;
        this.fetchData();
        },
        watch: {
            "$route.params.tab": {
                immediate: true,
                handler() {
                    if (this.$route.params.tab) {
                      this.currentTab = this.$route.params.tab;
                    }
                },
            },
            "$route.params.StudentID": {
                immediate: true,
                handler() {
                   
                    if (this.$route.params.StudentID) {
                      //  alert(this.$route.params.StudentID)
                      this.studentid = this.$route.params.StudentID;
                      this.selectedstudentid = this.$route.params.StudentID;
                      this.routeid = this.studentid;
                    //   this.selectedstudentid = this.routeid;
                      this.get_selected_student(this.selectedstudentid);
                    }
                    
                },
            },
            "$route.params.TaskID": {
                immediate: true,
                handler() {

                    if (this.$route.params.TaskID) {
                        // alert(this.$route.params.TaskID)
                      this.taskID = this.$route.params.TaskID;
                    }
                },
            },
            dialog(val) {
                val || this.close();
                
            }
            
        },
       
        methods: {
    // getselectedstudent(selectedbj){
    //    
    //     console.log(selectedbj);
    //     this.selectedstudent=selectedbj;
    //     // this.$emit('selected-student',selectedobj.student_id,selectedobj.firstname,selectedobj.lastname);
    // }, 
        fetchData() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.parent_id,
          },
        })
        .then((res) => {
          this.parent_details = res.data.all_children;
            this.studentid = res.data.all_children[0].student_id;
            this.get_selected_student(this.studentid);
           
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },
        get_selected_student(studentid){
      // alert(studentid+"inside getselected")
        this.selectedstudentid=studentid;
        this.selectedstudentid=this.studentid;
        
        },      
              
        handleClick(newTab) {
                this.currentTab = newTab;
                // this.studentlov_id="";
            },
        }
    };    
</script>
<style scoped>
    .student-main-list {
        padding: 10px 0px;
    }

    .search-with-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .name {
        font-weight: 700;
    }

    .days {
        color: #d92550;
        font-size: 12px;
        font-weight: 500;
    }

    .student-det {
        padding-left: 15px;
        display: flex;
        flex-direction: column;
    }

    .student-main {
        display: flex;
        align-items: center;
    }

    .np {
        padding: 0px;
    }

    .p-20 {
        padding: 20px;
    }

    td:first-child {
        font-weight: 600;
    }

    .sq {
        padding: 0px 4px;
        margin: 5px;
    }

    .attendance-code {
        display: flex;
        justify-content: flex-end;
        margin: 0px 0px 20px 0px;
    }
   .top-selection {
        position: absolute;
     top: 74px;
    right: 47px;
        z-index: 20000;
    }
    .link{cursor:pointer}
    .sub-button {
        background: rgb(247 185 36);
        color: #fff;
        transition: all 0.2s;
        padding: 8px 18px !important;
        border-radius: 5px;
    }

    

    .show {
        display: block !important;
    }

    .hide {
        display: none !important;
    }

    .p-alert {
        font-size: 12px;
    }

  
    .bk {
        font-size: 25px;
        padding-left: 14px;
    }

    .b-l-warning {
        border-left: 4px solid #f7b924;
        text-align: left;
        padding: 4px;
    }

    .b-l-primary {
        border-left: 4px solid #3f6ad8;
        text-align: left;
        padding: 4px;
    }

    .ql-editor {
        min-height: 150px;
    }

    .btn.btn-pill.btn-wide,
    .btn.btn-pill {
        font-size: 12px !important
    }

    ._vue-flash-msg-body_success,._vue-flash-msg-body,._vue-flash-msg-_right-bottom
   /* ._vue-flash-msg-body__content*/
   { 
      z-index:10000  !important;
   }
  .tab-item-line{
 bottom: 20px!important;
}
</style>