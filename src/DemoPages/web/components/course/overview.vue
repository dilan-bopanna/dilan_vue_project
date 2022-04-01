<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i>
            {{ $t("outstandinghomework") }}
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
        <div class="scroll-area-md">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("class(sec)") }}</th>
                  <th>{{ $t("title") }}</th>
                  <th>{{ $t("duedate") }}</th>
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
                  v-if="!outstandingHomework"
                >
                  {{ $t("no_details_found") }}
                </div>
                <tr v-for="data in outstandingHomework" :key="data.id">
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

                  <td>{{ data.due_date | formatDate }}</td>

                  <td>
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition"
                      v-on:click="gototabAttend('outstanding',data.id)"
                      v-bind:class="
                        data.assignmentstatus == 'Draft' ? 'btn-danger' : 'btn-warning'
                      "
                    >
                     <span v-if="data.due_date >= currentDate">{{ $t("complete_hw") }}</span>
                      <span v-if="data.due_date < currentDate">{{ $t("due") }}</span>
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

      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card mt-7" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("markedhomework") }}
          </div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button
              class="btn-shadow btn-wide btn btn-focus btn-sm"
              v-on:click="gototabMarked"
            >
              {{ $t("viewall") }}
            </button>
          </div>
        </div>
        <div class="scroll-area-md">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("class(sec)") }}</th>
                  <th>{{ $t("title") }}</th>
                  <th>{{ $t("duedate") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <VueElementLoading
                :active="loader"
                spinner="bar-fade-scale"
                color="var(--primary)"
              />
              <div
                class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                v-if="!markedassignmentList"
              >
                {{ $t("no_details_found") }}
              </div>
              <tbody>
                <tr v-for="data in markedassignmentList" :key="data.id">
                  <td class="text-muted" style="width: 180px">
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
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success"
                      v-on:click="gototabMarked('marked',data.id)"
                    >
                      {{$t('marked')}}
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
            >{{ $t("homeworkcalendar") }}
          </div>
        </div>
        <div class="scroll-area-md homeworkCal">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <VueElementLoading
              :active="loader"
              spinner="bar-fade-scale"
              color="var(--primary)"
            />
            <div
              class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
              v-if="!homeworkList"
            >
              {{ $t("no_details_found") }}
            </div>
            <div
              v-for="data in homeworkList"
              :key="data.id"
              class="vertical-timeline-element"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <!-- <div v-for="classes in data.allocation_ids" :key="classes.id"> -->
                    <!-- <div v-for="subject in classes.classsubject" :key="subject.id"> -->
                      <i
                        class="badge badge-dot badge-dot-xl"
                        v-bind:class="setBadgeClass(data.subject)"
                      ></i>
                    <!-- </div> -->
                  <!-- </div> -->
                </span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title">
                    <!-- <td class="text-muted" style="width:150px" > -->
                    {{ data.title }}
                    <!-- </td> -->
                    <!-- {{data.subject}} - {{data.title}} -->
                    <button v-if="data.assignmentstatus == 'Draft' && data.due_date>=todaydate" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-warning': data.assignmentstatus == 'Draft'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked() : gototabAttend('outstanding',data.id)"> {{ $t("complete_hw") }}
                    </button>
                     <button v-if="data.assignmentstatus == 'Submitted'" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-info': data.assignmentstatus == 'Submitted'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked() : gototabAttend('submitted',data.id)"> {{ $t("submitted") }} 
                    </button>
                     <button v-if="data.assignmentstatus == 'Evaluated'" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-success': data.assignmentstatus == 'Evaluated'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked('marked',data.id) : gototabAttend()"> {{ $t("marked") }}
                    </button>
                    <button v-if="data.assignmentstatus == 'Draft' && data.due_date<todaydate" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition  btn-timeline" v-bind:class="{'badge-danger': data.assignmentstatus == 'Draft'}"
                     v-on:click="data.assignmentstatus == 'Evaluated' ? gototabMarked() : gototabAttend('outstanding',data.id)"> {{ $t("due") }}
                    </button>
                  </h4>
                  <p>
                    {{ $t("assigned_on") }} -
                    <a href="javascript:void(0);">{{ data.created_at | formatDate }}</a>
                  </p>
                  <span class="vertical-timeline-element-date">{{
                    data.due_date  | formatDate
                  }}</span>
                </div>
              </div>
            </div>
          </div>
          <!-- </VuePerfectScrollbar> -->
        </div>
      </div>
      <!--Upcoming Classes END-->
    </div>
    <div class="col-sm-12 col-md-12 col-xl-12">
      <!--Unplanned Classes full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'lowperformers'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <a v-on:click="sowtable('')">
              <i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i
            ></a>
            Unplanned Classes
          </div>
          <div class="btn-actions-pane-right">
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
                placeholder="Search..."
                v-model="search"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="p-0 card-body">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            sort-by="student"
            class="elevation-1"
          >
            <template v-slot:item="props">
              <tr>
                <td>19-11-2020</td>
                <td class="text-muted">
                  <div v-bind:class="props.item.colorcode">{{ props.item.name }}</div>
                </td>

                <td>9.00am - 10.00am</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-success btn-transition"
                  >
                    Plan
                  </button>
                </td>
              </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
      <!--Unplanned Classes full view END-->

      <!--Upcoming Classes full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'upcomingtest'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <a v-on:click="sowtable('')">
              <i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i
            ></a>
            Unplanned Classes
          </div>
          <div class="btn-actions-pane-right">
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
                placeholder="Search..."
                v-model="search"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="p-0 card-body">
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            sort-by="student"
            class="elevation-1"
          >
            <template v-slot:item="props">
              <tr>
                <td>19-11-2020</td>
                <td class="text-muted">
                  <div v-bind:class="props.item.colorcode">{{ props.item.name }}</div>
                </td>

                <td>9.00am - 10.00am</td>
                <td>
                  <button
                    type="button"
                    class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition"
                    v-bind:class="
                      props.item.status == 'Plan' ? 'btn-success' : 'btn-info'
                    "
                    v-on:click="gototab"
                  >
                    {{ props.item.status }}
                  </button>
                </td>
              </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
      <!--Upcoming Classes view Test-->
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
    todaydate:'',
    outstandingHomework: [],
    markedassignmentList: [],
    homeworkList: [],
    currentDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
    items: [
      {
        name: "Science (3A)",
        date: "19-11-2020",
        time: "9.00am - 10.00am",
        colorcode: "b-l-warning",
        status: "Plan",
      },
      {
        name: "19-11-2020",
        date: "19-11-2020",
        time: "10.00am - 11.00am",
        colorcode: "b-l-primary",
        status: "View",
      },
      {
        name: "Science (3A)",
        date: "19-11-2020",
        time: "11.00am - 12.00pm",
        colorcode: "b-l-warning",
        status: "Plan",
      },
      {
        name: "Maths (5B)",
        date: "19-11-2020",
        time: "1.00pm - 2.00pm",
        colorcode: "b-l-primary",
        status: "View",
      },
      {
        name: "Science (3A)",
        date: "19-11-2020",
        time: "2.00pm - 3.00pm",
        colorcode: "b-l-warning",
        status: "Plan",
      },
    ],
  }),
  created() {
    this.initialize();
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    //alert(this.user.emp_id);
    this.student_id = this.user.emp_id;
    this.fetchAllHomework();
    this.fetchOutstandingHomework();
    this.fetchMarkedAssignmentsList();
    var currentDate =  new Date().toJSON().slice(0,10).replace(/-/g,'-');
    this.todaydate=currentDate;
    //alert(this.todaydate);
  },
  methods: {
    fetchAllHomework() {
      this.loader = true;
      // alert(this.student_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentassignments?student_id=" +
            this.student_id +
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
            //console.log(res.data);
            this.loader = false;
            setTimeout(() => (this.is_success = false), 5000);
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    fetchOutstandingHomework() {
      this.loader = true;
      // alert(this.student_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "student_outstandinghomework?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
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
            this.outstandingHomework = res.data.outstandinghomework;
            //console.log(res.data);
            this.loader = false;
            setTimeout(() => (this.is_success = false), 5000);
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    fetchMarkedAssignmentsList() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "markedassignments?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((res) => {
          this.markedassignmentList = res.data.marked_assignments;
          console.log(res.data.marked_assignments);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    sowtable: function (table) {
      this.showtable = table;
    },
    gototabAttend: function (type,homeworkid) {
      this.$emit("gototab", "tab2",type,homeworkid);
    },
    gototabMarked: function (type,homeworkid) {
      this.$emit("gototab", "tab3",type,homeworkid);
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
    initialize() {},
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
  height: 686px;
}

.btn-timeline {
  position: absolute;
  right: 10px;
}
</style>
