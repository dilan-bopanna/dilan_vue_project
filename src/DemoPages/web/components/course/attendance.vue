<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("report") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                            v-on:click="gototabAttend">
                            View All
                        </button>
                    </div> -->
        </div>
        <div class="scroll-area-xl">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("subject") }}</th>
                  <th>{{ $t("percentage") }}</th>
                  <th>{{ $t("classestaken") }}</th>
                  <th>{{ $t("classesattended") }}</th>
                  <th>{{ $t("late") }}</th>
                  <th>{{ $t("absent") }}</th>
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
                  v-if="!subjectdata"
                >
                  {{ $t("no_details_found") }}
                </div>
                <tr v-for="data in subjectdata" :key="data.id">
                  <td class="text-muted" style="width: 150px">
                    <div
                      v-bind:style="{ 'border-left': 4 + 'px solid' + data.color_code }"
                    >
                      <span class="ml-1">
                        {{ data.subject_name }}({{ data.class_name }} {{ data.section }})
                      </span>
                    </div>
                  </td>

                  <td>{{ data.subjectdetails.attendance }}</td>

                  <td>{{ data.subjectdetails.class_taken }}</td>

                  <td>{{ data.subjectdetails.class_attended }}</td>

                  <td>{{ data.subjectdetails.latecount }}</td>

                  <td>{{ data.subjectdetails.absentcount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- </VuePerfectScrollbar> -->
        </div>
      </div>
      <!--Unplanned Classes table end-->
    </div>

    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <!--Upcoming Classes Start-->
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i
              class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"
            ></i>
            {{ $t("lateabsent") }}
          </div>
          <div
            class="btn-actions-pane-right text-capitalize actions-icon-btn text-right header-search-field"
            style="width: 300px; height: 72px"
          >
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="svg-inline--fa fa-search fa-w-16"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      class=""
                    ></path>
                  </svg>
                </div>
              </div>
              <input
                placeholder="Search.."
                v-model="search"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="scroll-area-xl todo-panel">
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div
            class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
            v-if="!lateAbsent"
          >
            {{ $t("no_details_found") }}
          </div>
          <div
            v-for="data in absents"
            :key="data.id"
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <div class="vertical-timeline-element">
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <i
                    class="badge badge-dot badge-dot-xl"
                    v-bind:class="setBadgeClass(data.subject_name)"
                  ></i>
                </span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title">
                    {{ data.subject_name }} - <span style="font-size: small;color: #6c757d;" v-if="data.status == 'L'"
                      >{{ $t("lateby") }} {{ data.late_by_mins }} {{ $t("mins") }}
                    </span>
                    <router-link to="/components/myhomework">
                      <button
                        type="button"
                        class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-timeline"
                        v-bind:class="setStatusBtnClass(data.status)"
                      >
                        <span v-if="data.status == 'L'">{{ $t("late") }}</span>
                        <span v-if="data.status == 'A'">{{ $t("absent") }}</span>
                      </button>
                    </router-link>
                  </h4>
                  <p v-for="(topicdetails ,index) in data.syllabus_plan_details" :key="index"> 
                      - {{topicdetails.topic.topic_name}}
                      </p>
                  <!-- <p>
                    {{ data.start_time }}
                    <span style="font-size: small;" v-if="data.status == 'L'"
                      >{{ $t("lateby") }} {{ data.late_by_mins }} {{ $t("mins") }}
                    </span>
                  </p> -->
                  <span class="vertical-timeline-element-date">{{
                    data.attendance_date | formatDate
                  }}  <div>{{ data.start_time }}</div></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Upcoming Classes END-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueElementLoading from "vue-element-loading";
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    // VuePerfectScrollbar,
    VueElementLoading,
  },
  data: () => ({
    showtable: "",
    loader: false,
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
    subjectdata: [],

    lateAbsent: [],
  }),
  // created() {
  //     this.initialize();
  // },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.student_id = this.user.emp_id;
    this.initialize();
  },
  methods: {
    sowtable: function (table) {
      this.showtable = table;
    },
    gototabAttend: function () {
      this.$emit("gototab", "tab2");
    },
    gototabMarked: function () {
      this.$emit("gototab", "tab3");
    },
    setBadgeClass: function (val) {
      let bagdeClass;
      if (val == "SCIENCE") {
        bagdeClass = "badge-warning";
      } else if (val == "MATHS") {
        bagdeClass = "badge-primary";
      } else if (val == "ENGLISH") {
        bagdeClass = "badge-success";
      } else if (val == "ART") {
        bagdeClass = "badge-danger";
      } else {
        bagdeClass = "badge-info";
      }
      return bagdeClass;
    },
    setColorClass: function (val) {
      let bagdeClass;
      if (val == "SCIENCE") {
        bagdeClass = "b-l-warning";
      } else if (val == "MATHS") {
        bagdeClass = "b-l-primary";
      } else if (val == "ENGLISH") {
        bagdeClass = "b-l-success";
      } else if (val == "ART") {
        bagdeClass = "b-l-danger";
      } else {
        bagdeClass = "b-l-info";
      }
      return bagdeClass;
    },
    setStatusBtnClass: function (val) {
      let btnClass;
      if (val == "L") {
        btnClass = "btn-warning";
      } else {
        btnClass = "btn-danger";
      }
      return btnClass;
    },
    initialize() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentsubjects?student_id=" +
            this.student_id
        )
        .then((res) => {
          this.subjectdata = res.data.subjectdata;
          console.log(res.data.subjectdata);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });

      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "late_absent_classlist?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((res) => {
          this.lateAbsent = res.data.lateabsent;
          console.log(res.data.lateabsent);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
  },
  computed: {
    filteredList() {
      return this.lateAbsent.filter((list) => {
        return (
          list.subject.toUpperCase().includes(this.search.toUpperCase()) ||
          list.topic.toUpperCase().includes(this.search.toUpperCase()) ||
          list.time.toUpperCase().includes(this.search.toUpperCase()) ||
          list.status.toUpperCase().includes(this.search.toUpperCase()) ||
          list.timelineDate.toUpperCase().includes(this.search.toUpperCase())
        );
      });
    },

    absents(){
      if(this.search){

        return this.lateAbsent.filter(classes => {

          return classes.subject_name.toLowerCase().includes(this.search.toLowerCase());
          
        })
      }
       else
      {
        return this.lateAbsent;
      }

    }
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
.b-l-info {
  border-left: 4px solid#16aaff;
  text-align: left;
  padding: 4px;
}

.b-l-danger {
  border-left: 4px solid #d92550;
  text-align: left;
  padding: 4px;
}

.b-l-success {
  border-left: 4px solid #3ac47d;
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
th,
td {
  text-align: center;
}
</style>
