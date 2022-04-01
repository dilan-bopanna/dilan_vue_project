<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("upcomingtest") }}
          </div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button
              class="btn-shadow btn-wide btn btn-focus btn-sm"
              v-on:click="gototabAttend"
            >
              {{ $t("viewall") }}
            </button>
          </div>
        </div>
        <div class="scroll-area-xl">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("class(sec)") }}</th>
                  <th>{{ $t("test") }}</th>
                  <th>{{ $t("testdate") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                <VueElementLoading
                  :active="loader"
                  spinner="bar-fade-scale"
                  color="var(--primary)"
                />
                <div
                  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                  v-if="!upcomingtests"
                >
                  {{ $t("no_details_found") }}
                </div>
                <tr v-for="data in upcomingtests" :key="data.id">
                  <td class="text-muted" style="width: 150px">
                    <div v-for="classes in data.allocation_ids" :key="classes.id">
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

                  <td>{{ data.title }}</td>

                  <td>{{ data.testdate }}</td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition"
                      v-on:click="gototabAttend( data.assignment_type,
                          data.schedule_date_time,
                          data.id,
                          data.due_date,
                          data.duration,
                          data.scheduled_time,
                          data.is_scheduled,
                          data.scheduleddatetime)"
                      v-bind:class="
                        data.status == 'Overdue' ? 'btn-danger' : 'btn-warning'
                      "
                    >
                     {{$t('take_test')}}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- </VuePerfectScrollbar> -->
        </div>
      </div>
      <!--Unplanned Classes table end-->
    </div>

    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Upcoming Classes Start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i
              class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"
            ></i
            >{{ $t("test_exam_calendar") }}
          </div>
        </div>
        <div class="scroll-area-xl homeworkCal">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <div
              class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
              v-if="!testlist"
            >
              {{ $t("no_details_found") }}
            </div>
            <div
              v-for="data in testlist"
              :key="data.id"
              class="vertical-timeline-element"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <i
                    class="badge badge-dot badge-dot-xl"
                    v-bind:class="setBadgeClass(data.subject)"
                  ></i>
                </span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title">
                    {{ data.title }}
                    <!-- {{todaydate}}{{data.scheduled_time}}due{{todaytime}} -->
                    <button v-if="data.assignmentstatus == 'Draft' && ((data.scheduleddatetime>=todaydatetime) || data.due_date>=todaydate)" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-warning': data.assignmentstatus == 'Draft'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked() : gototabAttend(data.assignment_type,
                          data.schedule_date_time,
                          data.id,
                          data.due_date,
                          data.duration,
                          data.scheduled_time,
                          data.is_scheduled,
                          data.scheduleddatetime)"> {{ $t("take_test") }}
                    </button>
                     <button v-if="data.assignmentstatus == 'Submitted'" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-info': data.assignmentstatus == 'Submitted'}"
                    > {{ $t("submitted") }} 
                    </button>
                     <button v-if="data.assignmentstatus == 'Evaluated'" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-success': data.assignmentstatus == 'Evaluated'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked(data.id) : gototabAttend()"> {{ $t("marked") }}
                    </button>
                    <button v-if="data.assignmentstatus == 'Draft' &&  ((data.scheduleddatetime<todaydatetime) || data.due_date<todaydate)" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-danger': data.assignmentstatus == 'Draft'}"
                    > {{ $t("not_attended") }}
                    </button>
                  </h4>
                  <p>
                     <!-- {{ $t("assigned_on") }}
                    <a href="javascript:void(0);">{{ data.created_at | formatDate }}</a> -->
                  </p>
                  <div style="white-space: initial;width: 66px;" class="vertical-timeline-element-date">{{ data.testdate }}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- </VuePerfectScrollbar> -->
        </div>
      </div>
      <!--Upcoming Classes END-->
    </div>
  </div>
</template>

<script>
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
import axios from "axios";
import VueElementLoading from "vue-element-loading";
 import moment from 'moment';
export default {
  components: {
    // VuePerfectScrollbar,
    VueElementLoading,
  },
  data: () => ({
    todaydate: new Date().toISOString().substr(0, 10),
    todaydatetime:'',
    showtable: "",
    loader: false,
    todaytime:'',
    fill: {
      color: "#3f6ad8",
    },
    fill2: {
      color: "#d92550",
    },
    fill3: {
      color: "#f7b924",
    },
    fill4: {
      color: "#3ac47d",
    },
    search: "",
    headers: [
      {
        text: "Date",
        value: "class",
      },
      {
        text: "Subject",
        value: "test",
      },
      {
        text: "Time",
        value: "student",
      },
      {
        text: "Action",
        value: "carbs",
      },
    ],
    testheaders: [
      {
        text: "Class",
        value: "class",
      },
      {
        text: "Test",
        value: "test",
      },
      {
        text: "Test Date",
        value: "date",
      },
      {
        text: "Action",
        value: "action",
      },
    ],
    upcomingtests: [],

    testlist: [
      // {
      //         subject: "SCIENCE",
      //         test: "1ST TEST",
      //         timelineDate: "20-11-2020",
      //         title:"Timings",
      //         time: "12:00 PM",
      //     },
    ],
  }),
  // created() {
  //     this.initialize();
  // },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    //alert(this.user.emp_id);
    this.student_id = this.user.emp_id;
    this.fetchupcomingtest();
    this.fetchtests();
    var currentDate =  new Date().toJSON().slice(0,10).replace(/-/g,'-');
    this.todaydate=moment(currentDate).format('YYYY-MM-DD');
    const current = new Date();
    var getmonth = current.getMonth();
    var getdate = current.getDate();
    if(getmonth<10)
      {
        getmonth=("0"+(getmonth+1)).slice(-2);
      }
      else
      {
        getmonth=getmonth+1;
      }
       if(getdate<10)
      {
        getdate=("0"+getdate).slice(-2);
      }
    // const date = getdate+'-'+(getmonth)+'-'+current.getFullYear();
    var gethour = current.getHours();
    var getminute = current.getMinutes();
    // var getsecond = current.getSeconds();
      if(gethour<10)
      {
        gethour=("0"+gethour).slice(-2);
      }
       if(getminute<10)
      {
        getminute=("0"+getminute).slice(-2);
      }
      //   if(getsecond<10)
      // {
      //   getsecond="0"+getsecond;
      // }
    const time = gethour+":"+getminute;
   
    this.todaytime=time;
    this.todaydatetime=this.todaydate +' '+ this.todaytime;
  },
  methods: {
    sowtable: function (table) {
      this.showtable = table;
    },
    gototabAttend: function (type,scheduleddate,id,duedate,duration,scheduledtime,is_scheduled,scheduleddatetime) {
      this.$emit("gototab", "tab2",type,scheduleddate,id,duedate,duration,scheduledtime,is_scheduled,scheduleddatetime);
    },
    gototabMarked: function (testid) {
      this.$emit("gototab", "tab3",'','',testid);
    },
    setBadgeClass: function (val) {
      let bagdeClass;
      if (val == "SCIENCE") {
        bagdeClass = "badge-warning";
      } else if (val == "MATHS") {
        bagdeClass = "badge-primary";
      } else if (val == "ENGLISH") {
        bagdeClass = "badge-success";
      } else if (val == "SOCIAL") {
        bagdeClass = "badge-info";
      } else {
        bagdeClass = "badge-danger";
      }
      return bagdeClass;
    },
    setStatusBtnClass: function (val) {
      let btnClass;
      if (val == "Get Done") {
        btnClass = "btn-warning";
      } else if (val == "Overdue") {
        btnClass = "btn-danger";
      } else if (val == "View") {
        btnClass = "btn-info";
      } else if (val == "Marked") {
        btnClass = "btn-success";
      } else {
        btnClass = "btn-primary";
      }
      return btnClass;
    },
    fetchupcomingtest() {
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
    fetchtests() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "student_tests?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          //  console.log(response.data.upcoming_tests);
          this.testlist = response.data.assignments;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
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
.btn.btn-pill {
  font-size: 12px !important;
}

.scroll-area-md.homeworkCal {
  height: 300px;
}

.btn-timeline {
  position: absolute;
  right: 10px;
}
</style>
