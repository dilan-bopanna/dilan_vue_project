<template>
  <div class="row">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title></v-card-title>
        <v-card-text>
          {{ $t("please_contact_class_teacher") }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="error" text @click="dialog = false">{{ $t("cancel") }}</v-btn> -->
          <v-btn color="primary" text @click="dialog = false">{{ $t("ok") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <v-dialog v-model="dialog_sucess" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title></v-card-title>
        <v-card-text>
          {{ $t("please_contact_class_teacher") }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog_sucess = false">{{
            $t("ok")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
    <div class="col-sm-12 col-md-12 col-xl-12">
      
      <!--Error Message Start-->
      <!-- <Alerts
        :response_message="message"
        :success="is_success"
        :error="is_error"
        v-if="message != ''"
      ></Alerts> -->
      <!--Error Message End-->
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="!showtable">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("upcomingtest") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                            v-on:click="gototabAttend">
                            View All
                        </button>
                    </div> -->
        </div>
        <div class="scroll-area-xl">
          <!-- {{tests}} -->
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("subject") }}</th>
                  <th>{{ $t("test") }}</th>
                  <th>{{ $t("testdate") }}</th>
                  <th>{{ $t("duration") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>

              <tbody>
                <div
                  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                  v-if="!upcomingtests"
                >
                  {{ $t("no_details_found") }}
                </div>
                <tr v-for="(test, testindex) in upcomingtests" :key="testindex">
                  <td class="text-muted" style="width: 150px">
                    <div v-for="classes in test.allocation_ids" :key="classes.id">
                      <div v-for="subject in classes.classsubject" :key="subject.id">
                        <span
                          v-bind:style="{
                            'border-left': 4 + 'px solid' + subject.subject.color_code,
                          }"
                          ><span class="ml-1">
                            {{ subject.subject.subject_name }} ({{
                              subject.class.class_name
                            }}
                            {{ subject.section.shortname }})</span
                          ></span
                        >
                      </div>
                    </div>
                  </td>
                  <td>{{ test.title }}</td>
                  <td>{{ test.testdate }}</td>
                    <td>{{ test.duration }} {{$t('minutes')}}</td>
                  <!-- <td>
                              <button  type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition" v-on:click="gototabAttend"
                                 v-bind:class="(test.status == 'Draft') ? 'btn-warning' : 'btn-success'"
                                 >
                              {{test.status}}
                              </button>
                             
                          </td> -->
                  <td>
                    <!-- {{test.student_status}} -->
                    <!-- <button
                      v-if="
                        test.student_status != 'Submitted' &&
                        test.student_status != 'Evaluated'
                      "
                      class="btn mr-2 mb-2 btn-pill btn-focus btn-sm"
                      v-on:click="viewall('outstanding', test.id, 0)"
                    >
                      Attend
                    </button> -->
                    <button
                      v-if="
                        test.student_status != 'Submitted' &&
                        test.student_status != 'Evaluated'
                      "
                      class="btn mr-2 mb-2 btn-pill btn-focus btn-sm"
                      @click="
                        validate_function(
                          test.assignment_type,
                          test.schedule_date_time,
                          test.id,
                          test.due_date,
                          test.duration,
                          test.scheduled_time,
                          test.is_scheduled,
                          test.scheduleddatetime
                        )
                      "
                    >
                      {{ $t("take_test") }}
                    </button>
                    <span
                      v-if="
                        test.student_status == 'Submitted' ||
                        test.student_status == 'Evaluated'
                      "
                      >{{$t('submitted')}}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--Unplanned Classes table end-->

      <!--Outstanding Assignments full view-->
        <!-- <v-btn color="primary" class="ma-2" dark @click="attendpoup = true">Open Dialog 1</v-btn> -->
 <v-dialog v-if="showtable === 'outstanding'" v-model="attendpoup" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
        <v-card tile>
          <FlashMessage :position="'right bottom'"></FlashMessage>
          <v-toolbar flat dark color="primary">
            <v-btn icon dark @click="attendpoup = false">
              <!-- <v-icon>mdi-close</v-icon> -->
            </v-btn>
            <v-toolbar-title>{{$t('attend_test')}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
               <div
            class="btn-actions-pane-right text-capitalize actions-icon-btn text-center"
          >
            <span v-if="completed" class="text-danger">{{$t('timeout')}}</span>
            <circular-count-down-timer
              v-if="!completed"
              :initial-value="duration * 60"
              :stroke-width="5"
              :seconds-stroke-color="'#f00'"
              :minutes-stroke-color="'#0ff'"
              :hours-stroke-color="'#0f0'"
              :underneath-stroke-color="'lightgrey'"
              :seconds-fill-color="'#00ffff66'"
              :minutes-fill-color="'#00ff0066'"
              :hours-fill-color="'#ff000066'"
              :size="60"
              :padding="4"
              :hour-label="'hours'"
              :minute-label="'minutes'"
              :second-label="'seconds'"
              :show-second="true"
              :show-minute="true"
              :show-hour="true"
              :show-negatives="false"
              :notify-every="'minute'"
              @finish="finished(assignment_id)"
              @update="updated"
            ></circular-count-down-timer>
          </div>
            </v-toolbar-items>
          
          </v-toolbar>
          <v-card-text>
            <div class="card-hover-shadow-2x mb-3 card" >
       
      <div class="p-0 card-body" v-if="duration >= 0">
          <!-- {{assignment_id}} -->
          <AttendHomework @selected-tab="get_tab" :assignment_id="assignment_id"></AttendHomework>
        </div>
      </div>
          </v-card-text>

          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
     
      <!--Outstanding Assignments full view END-->
    </div>
    <!--Auto Submission alert pop up-->
    <v-dialog v-model="autosubmissionalert" persistent max-width="290">
      <v-card>
        <v-card-title class="headline text-success">{{$t('submitted')}}</v-card-title>
        <v-card-text>{{$t('testduration_completed_autosubmitted_test')}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn> -->
          <v-btn color="green darken-1" text @click="submitted()">{{$t('ok')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Auto Submission alert pop up-->
    <!--Instructions alert pop up-->

    <v-dialog v-model="instructionspop" persistent max-width="590">
      <v-card v-for="instruction in upcomingtests" :key="instruction.id">
        <div v-if="instruction.id == test_id">
          <v-card-title class="headline text-info">{{$t('instructions')}}</v-card-title>
          <v-card-text v-if="!instruction.instructions">{{$t('no_instructions')}}</v-card-text>
          <v-card-text>{{ instruction.instructions | striphtml }}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- {{instruction.duration}} -->
            <button
              class="btn mr-2 mb-2 btn-pill btn-secondary btn-sm"
              color="green darken-1"
              text
              @click="instructionspop = false"
            >
             {{$t('cancel')}}
            </button>
            <button
              class="btn mr-2 mb-2 btn-pill btn-info btn-sm"
              color="green darken-1"
              text
              @click="viewall('outstanding', instruction.id, instruction.duration,instruction.is_scheduled)"
            >
              {{$t('attend')}}
            </button>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    <!--Instructions alert pop up-->
  </div>
</template>
<script>
import Vue from "vue";
import CircularCountDownTimer from "vue-circular-count-down-timer";
Vue.use(CircularCountDownTimer);
import axios from "axios";
import FlashMessage from "@smartweb/vue-flash-message";
Vue.use(FlashMessage);
//import Alerts from "../validation_errors/alert/alerts";
//import VueElementLoading from "vue-element-loading";
import AttendHomework from "../test/attendHomework";
import VueElementLoading from "vue-element-loading";
export default {
  components: {
    AttendHomework,
    VueElementLoading,
    //Alerts,
  },
  props:['testdetail','homeworkdue','homeworkid'],
  data: () => ({
     attendpoup: false,
    showtable: "",
    message: "",
    search: "",
    loader: false,
    is_success: false,
    is_error: false,
    outstandingHomework: [],
    assignment_id: "",
    upcomingtests: [],
    instruction: "",
    completed: false,
    test_id: "",
    dialog: false,
    instructionspop: false,
    duration: 0,
    current_date_time:0,
    sheduled_time:0,
    autosubmissionalert: false,
    questionscount: [],
    student_attend_count: [],
    submitAssignment: [],
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    //alert(this.user.emp_id);
    this.student_id = this.user.emp_id;
    this.fetchTests();
    if(this.testdetail)
    {
      this.validate_function(this.testdetail['type'],this.testdetail['scheduleddate'],this.testdetail['id'],this.testdetail['duedate'],this.testdetail['duration'],this.testdetail['scheduledtime'],this.testdetail['is_scheduled'],this.testdetail['scheduleddatetime']);
    }
    // if(this.homeworkdue=='outstanding')
    // {
    //   this.viewall(this.homeworkdue,this.homeworkid,0);
    // }
  },
  methods: {
    submitted() {
      this.autosubmissionalert = false;
      this.attendpoup=false;
      this.showtable=false;
      this.fetchTests();
    },
    finished(assignment_id) {
      //  alert('Finished');
      // alert(assignment_id);
      this.is_success = "";
      this.is_error = "";
      this.message = "";
      this.assignment_id = assignment_id;
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "student_assignment_status", {
          assignment_id: this.assignment_id,
          student_id: this.student_id,
        })
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
              time: 1000,
              blockClass: "custom-block-class",
            });
            this.loader = false;
          } else {
            this.assignment_status = res.data.message;
            this.completed = false;
            this.loader = false;
            this.autosubmissionalert = true;
            //this.$router.push("/components/dashboard");
            this.$emit('selected-tab','tab1');
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    validate_function(
      type,
      schedule_date,
      assignment_id,
      due_date,
      duration,
      scheduled_time,
      is_scheduled,
      student_test_time,
    ) {
      if (type == "Test") {
        setInterval(this.getNow, 1000);
        var currentdate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
        var current_time = new Date().getTime();
        var d_date = Date.parse(due_date);
        var current_date = Date.parse(currentdate);
        var sheduled_time = Date.parse(student_test_time);
        this.sheduled_time = sheduled_time;
        var s_date = Date.parse(schedule_date);
        var d_time = duration * 60000;
        var end_time = sheduled_time + d_time;

        
        //var date = new Date();
        //var new_time = date.setMinutes(date.getMinutes() + duration);
        //var time = new Date().getTime();

        if (is_scheduled == 0) {
          if (d_date != "") {
            if (d_date >= current_date) {
              this.viewall("outstanding", assignment_id, 0);
              this.attendpoup=true;
            } else {
              this.dialog = true;
            }
          } else {
            this.dialog = true;
          }
        } else {
          if (schedule_date != "") {
            if (s_date == current_date) {
              if (current_time >= sheduled_time && current_time <= end_time) {
                this.attendpoup=true;
                this.viewall("outstanding", assignment_id, 0);
              } else {
                this.dialog = true;
              }
            } else {
              this.dialog = true;
            }
          } else {
            this.dialog = true;
          }
        }
      }
    },
    updated: (status) => {
      console.log(status); //{"value": 144, "seconds": 24, "minutes": 2, "hours": 0}
    },
    fetchTests() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "student_upcomingtests?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          //  console.log(response.data.upcoming_tests);
          this.upcomingtests = response.data.upcomingtests;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    viewall: function (table, id, duration,is_scheduled) {
      if (duration == 0) {
            this.instructionspop = true;
            this.test_id = id;
      } else {
        if(is_scheduled==1){
            var current_datetime =Date.parse(new Date());
            this.current_date_time = current_datetime;
            this.passed_time = this.current_date_time - this.sheduled_time;
            this.passed_time_in_min = this.passed_time / 60000;
            this.duration_passed = this.passed_time_in_min.toFixed(1);
            this.instructionspop = false;
            this.showtable = table;
            this.hidetable = false;
            this.assignment_id = id;
            this.duration = duration - this.duration_passed;
        }else{
            this.instructionspop = false;
            this.showtable = table;
            this.hidetable = false;
            this.assignment_id = id;
            this.duration = duration;
        }    
      }
    },
    gototabAttend: function () {
      this.$emit("gototab", "tab2");
    },
    gototabMarked: function () {
      this.$emit("gototab", "tab3");
    },
    get_tab:function(){
      this.$emit("gototabs", "tab1");
    },
  },
};
</script>
<style scoped>
#container {
  text-align: center !important;
}
.vertical-timeline-element-content .vertical-timeline-element-date {
  font-size: 10px !important;
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
.btn.btn-pill.btn-wide,
.btn.btn-pill {font-size: 12px !important;
}
.scroll-area-md.homeworkCal {
  height: 686px;
}
._vue-flash-msg-body_success,._vue-flash-msg-body,._vue-flash-msg-_right-bottom
   {
  z-index: 10000 !important;
}
</style>
