<template>
    <div style="display: flex"> 
      <!-- {{attendancecount}} -->
         <div class="col-lg-4 col-md-4 col-sm-4" v-for="(
                              attendancevalue, attendanceindex
                            ) in attendancecount"
                            :key="attendanceindex">
        <div
                          class="card-shadow-primary profile-responsive card-border mb-3 card"
                        >
                          <div class="dropdown-menu-header">
                            <div
                              class="dropdown-menu-header-inner bg-focus p-2"
                            >
                            <!-- {{attendancevalue}} -->
                             <div class="menu-header-content btn-pane-right" style="display:block">
                                 <div style="width: 50%;margin: auto;text-align: center;" >

                                 <!-- <div
                                  class="avatar-icon-wrapper mr-2 avatar-icon-xl"
                                >
                                  <div class="avatar-icon">
                                    <img
                                      src="@/assets/images/avatars/3.jpg"
                                      alt="Avatar 5"
                                    />
                                  </div>
                                </div>
                                   -->
                                   <div class="avatar-icon-wrapper avatar-icon-lg" >
                                    <div class="avatar-icon rounded btn-hover-shine"> 
                                      <div v-if="attendancevalue.photo != null">
                                        
                                        <img
                                          :src="instance_filepath_url + attendancevalue.photo"
                                        />
                                      </div>
                                      <div v-else>
                                        
                                        <img
                                         src="@/assets/images/avatars/3.jpg"
                                      alt="Avatar 5"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  </div>
                                <div style="width: 50%;margin: auto;text-align: center;"> 
                                  <div>
                                  <h5 class="menu-header-title">
                                    {{ attendancevalue.firstname }}
                                    {{ attendancevalue.lastname }}
                                  </h5>
                                  <h6 class="menu-header-subtitle">
                                    {{ $t("register_number") }}:{{
                                      attendancevalue.code
                                    }}
                                  </h6>
                                  </div>
                                   <button
                                     type="button"
                                     class="btn mr-2 mt-4 view_btn btn-hover-shine btn-transition btn-primary"
                                     @click="staff_details(attendancevalue.id)"
                                >
                                 {{ $t("view_profile") }}
                                </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h5 class="text-center p-3 m-0">
                            {{ $t("overalldetails") }}
                          </h5>
                          <ul
                            class="list-group list-group-flush"
                            
                          >
                            <li class="list-group-item">
                              <div class="widget-content p-0">
                                <div class="widget-content-wrapper">
                                  <div class="widget-content-left mr-3">
                                    <div class="icon-wrapper m-0">
                                      <div class="progress-circle-wrapper">
                                        <vue-circle
                                          :progress="
                                            attendancevalue.attendance
                                              .percentage_value
                                          "
                                          :size="52"
                                          :reverse="false"
                                          line-cap="round"
                                          :fill="f1"
                                          empty-fill="rgba(0, 0, 0, .12)"
                                          :animation-start-value="0.0"
                                          :start-angle="0"
                                          insert-mode="append"
                                          :thickness="3"
                                          :show-percent="true"
                                        >
                                        </vue-circle>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="widget-content-left">
                                    <div class="widget-heading">
                                      {{ $t("attendance") }}
                                    </div>
                                  </div>
                                  <div class="widget-content-right">
                                    <div
                                      class="widget-numbers widget-numbers-sm text-primary"
                                    >
                                      <span
                                        >{{
                                          attendancevalue.attendance.percentage
                                        }}%</span
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li class="list-group-item">
                              <div class="widget-content p-0">
                                <div class="widget-content-wrapper">
                                  <div class="widget-content-left mr-3">
                                    <div class="icon-wrapper m-0">
                                      <div class="progress-circle-wrapper">
                                        <vue-circle
                                          :progress="
                                            attendancevalue.assignment
                                              .percentage_value
                                          "
                                          :size="52"
                                          :reverse="false"
                                          line-cap="round"
                                          :fill="f5"
                                          empty-fill="rgba(0, 0, 0, .12)"
                                          :animation-start-value="0.0"
                                          :start-angle="0"
                                          insert-mode="append"
                                          :thickness="3"
                                          :show-percent="true"
                                        >
                                        </vue-circle>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="widget-content-left">
                                    <div class="widget-heading">
                                      {{ $t("assignment") }}
                                    </div>
                                  </div>
                                  <div class="widget-content-right">
                                    <div
                                      class="widget-numbers widget-numbers-sm text-danger"
                                    >
                                      <span>{{
                                        attendancevalue.assignment.average
                                      }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li class="list-group-item">
                              <div class="widget-content p-0">
                                <div class="widget-content-wrapper">
                                  <div class="widget-content-left mr-3">
                                    <div class="icon-wrapper m-0">
                                      <div class="progress-circle-wrapper">
                                        <vue-circle
                                          :progress="
                                            attendancevalue.testavg
                                              .percentage_value
                                          "
                                          :size="52"
                                          :reverse="false"
                                          line-cap="round"
                                          :fill="f6"
                                          empty-fill="rgba(0, 0, 0, .12)"
                                          :animation-start-value="0.0"
                                          :start-angle="0"
                                          insert-mode="append"
                                          :thickness="3"
                                          :show-percent="true"
                                        >
                                        </vue-circle>
                                      </div>
                                    </div>
                                  </div>
                                  <div class="widget-content-left">
                                    <div class="widget-heading">
                                      {{ $t("test_score") }}
                                    </div>
                                  </div>
                                  <div class="widget-content-right">
                                    <div
                                      class="widget-numbers widget-numbers-sm text-success"
                                    >
                                      <span
                                        >{{
                                          attendancevalue.testavg.percentage
                                        }}%</span
                                      >
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>         
    </div>
    
</template>

<script>
import axios from "axios";
import VueCircle from "vue2-circle-progress";
// import VueElementLoading from "vue-element-loading";
export default {
     components: {
    // VueElementLoading,
    VueCircle,
    
  },
    data: () => ({
    testdata: [],
    userlastlogin: "",
    student_observation: [],
    homeworkdata: [],
    attendancedata: [],
    dialog: false,
    dark: false,
    initval: false,
    dataloading: true,
    startMenu: false,
    start: "2019-01-12",
    endMenu: false,
    end: "2019-01-27",
    nowMenu: false,
    student_details: false,
    now: null,
    loader: false,
    search: "",
    model: "tab-2",
    icon: "pe-7s-notebook icon-gradient bg-malibu-beach",
    sub: "All",
    val: "list",
    //tabs: TABS,
    currentTab: "tab1",
    staff_id: "",
    student_id: "",
    classestaken: "",
    absences: "",
    late: "",
    allocation_id:	221,
    children_details:[],
    totalpercentage: "",
    attendancecount: [],
    allstudentsdata:[],
    subjectattendance:[],
    studentID:[],
    elected: [], // Must be an array reference!
    staffassignments: [],
    user: {},
    submitted_count: null,
    evaluated_count: null,
    due_count: null,
      instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
    }),

mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem("academic_year"));
    this.student_id = this.user.emp_id;
    this.parent_id = this.user.emp_id;
     
      this.fetchChildrenDetails();
      
    // this.getStudentObservations();
  },

  methods:{

     fetchChildrenDetails() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.parent_id,
          },
        })
        .then((res) => {
          this.children_details = res.data.all_children;
          let allchildObject =  this.children_details;
      
          allchildObject.map((item)=> {
            this.studentID.push(item.student_id);
          });
         
          this.loader=false; 
           this.attendanceDetails();
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },

    staff_details(id) {
      this.studentid = id;  
      this.$router.push({
        name: "myclasses",
        params: { studentid: this.studentid },
      });
    },
  attendanceDetails() {
      // alert(this.allocation_id);
      // alert(this.student_id);
      //this.allocation_id=42;
      this.loader = true;
      console.log(this.studentID);
      
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "fetchstudentattendance?student_ids="+this.studentID)
        //     ,{
        //  params: {
        //     student_ids:this.studentID,
        //   },
        // })
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
            // this.attendancedata = res.data.topicdetails;
            // this.classestaken = res.data.classestaken;
            // this.absences = res.data.absences;
            // this.late = res.data.late;
            // this.totalpercentage = res.data.totalpercentage;
            this.attendancecount = res.data.student_data;
            //console.log(res.data);
            this.loader = false;
            setTimeout(() => (this.is_success = false), 5000);
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    studentgrade() {
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentsubjects?student_id=" +
            this.student_id
        )
        .then((response) => {
          //  console.log(response.data.upcoming_tests);
          this.subjectattendance = response.data.subjectdata;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
}
</script>