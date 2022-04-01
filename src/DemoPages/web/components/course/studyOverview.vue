<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <!--Upcoming Classes Start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i
              class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"
            ></i>
            {{ $t("recently_covered_topics") }} 
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
                  v-bind:placeholder="$t('search')"
                  v-model="searchRecentlyCoveredTopics"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
        </div>
        <div class="scroll-area-xl homeworkCal">
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div
            class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
            v-if="!filterRecentlyCoveredTopics"
          >
            {{$t('no_details_found')}}
          </div>
          <div
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <div
              v-for="topicdata in filterRecentlyCoveredTopics"
              :key="topicdata.id"
              class="vertical-timeline-element"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <i
                    class="badge badge-dot badge-dot-xl"
                    v-bind:style="
                      'background-color:' + topicdata.allocations.subject.color_code
                    "
                  ></i>
                </span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title">
                    {{ topicdata.allocations.subject.subject_name }}
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-timeline"
                      v-on:click="gototabAttend"
                      v-bind:class="
                        topicdata.teaching_mode == 'Offline'
                          ? 'btn-secondary'
                          : 'btn-success'
                      "
                    >
                      {{ topicdata.teaching_mode }}
                    </button>
                  </h4>
                  <p
                    v-for="subTopics in topicdata.syllabus_plan_details"
                    :key="subTopics.id"
                  >
                    - {{ subTopics.topic.topic_name }}
                  </p>
                  <span class="vertical-timeline-element-date"
                    >{{ topicdata.plan_date|formatDate }}
                    <p>{{ topicdata.plan_time }}</p></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Upcoming Classes END-->
    </div>

    <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6">
      <!--Upcoming Classes Start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i
              class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"
            ></i>
            {{ $t("recently_studied_topics") }}
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
                 v-bind:placeholder="$t('search')"
                  v-model="searchRecentlyStudiedTopics"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
        </div>
        <div class="scroll-area-xl homeworkCal">
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div
            class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
            v-if="!filterRecentlyStudiedTopics"
          >
            {{$t('no_details_found')}}
          </div>
          <div
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <div
              v-for="data in filterRecentlyStudiedTopics"
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
                    {{ data.subject }} - {{ data.topic }}
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-timeline"
                      v-on:click="gototabMarked"
                      v-bind:class="setStatusBtnClass(data.status)"
                    >
                      {{ data.status }}
                    </button>
                  </h4>
                  <p v-for="subTopics in data.subTopic" :key="subTopics.id">
                    - {{ subTopics }}
                  </p>
                  <span class="vertical-timeline-element-date">{{
                    data.timelineDate
                  }}</span>
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
//import VuePerfectScrollbar from "vue-perfect-scrollbar";
//import AttendHomework from "../test/attendHomework"
//import Tabs from "vue-tabs-with-active-line";

const TABS = [
  {
    title: "Topic Covered",
    value: "tab1",
  },
  {
    title: "Agenda",
    value: "tab2",
  },
  {
    title: "Notes",
    value: "tab3",
  },
  {
    title: "Q's Bank",
    value: "tab4",
  },
  {
    title: "Activities",
    value: "tab5",
  },
  {
    title: "Recording",
    value: "tab6",
  },
  {
    title: "Whiteboard",
    value: "tab7",
  },
];
import VueElementLoading from "vue-element-loading";
import axios from "axios";
export default {
  components: {
    VueElementLoading,
    //VuePerfectScrollbar,
    // Tabs
    //AttendHomework
  },
  data: () => ({
    loader: false,
    showtable: "",
    searchRecentlyCoveredTopics:"",
    searchRecentlyStudiedTopics:"",
    tabs: TABS,
    currentTab: "tab1",
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
    recentlyCoveredTopics: [],
    recentlyStudiedTopics: [
      {
        subject: "SCIENCE",
        topic: "CHEMICAL REACTION",
        subTopic: ["Topic 1", "Topic 2"],
        timelineDate: "20-11-2020",
        status: "View",
      },
      {
        subject: "MATHS",
        topic: "SHAPES",
        subTopic: ["Topic 1"],
        timelineDate: "22-11-2020",
        status: "View",
      },
      {
        subject: "SCIENCE",
        topic: "HUMAN BODY",
        subTopic: ["Topic 1", "Topic 2", "Topic 3", "Topic 4"],
        timelineDate: "24-11-2020",
        status: "View",
      },
      {
        subject: "MATHS",
        topic: "ALGEBRA",
        subTopic: ["Topic 1", "Topic 2", "Topic 3"],
        timelineDate: "21-11-2020",
        status: "View",
      },
    ],

    items: ["English", "Science", "Maths"],
    items1: ["Jan", "Feb", "Mar"],
  }),
  computed: {

  filterRecentlyCoveredTopics() {
    const search = this.searchRecentlyCoveredTopics.toLowerCase().trim();
    if (!search) return this.recentlyCoveredTopics;
      return this.recentlyCoveredTopics.map(item => {
        return {
          ...item,
          syllabus_plan_details: item.syllabus_plan_details.filter(subtopics => {
            return subtopics.topic.topic_name.toLowerCase().includes(search);
          
        }),
      }
    });
  },
    filterRecentlyStudiedTopics() {
        //alert('test');
        if(this.searchRecentlyStudiedTopics){
          return this.recentlyStudiedTopics.filter(topicdata => {
          return topicdata.subject.toLowerCase().includes(this.searchRecentlyStudiedTopics.toLowerCase())
          ||  topicdata.topic.toLowerCase().includes(this.searchRecentlyStudiedTopics.toLowerCase())
          })
        }
        else
          {
              return this.recentlyStudiedTopics;
          }
        },    
         
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.student_id = this.user.emp_id;
    this.initialize();
  },
  methods: {
    
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    viewall: function (table) {
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
      } else if (val == "SOCIAL") {
        bagdeClass = "badge-info";
      } else {
        bagdeClass = "badge-danger";
      }
      return bagdeClass;
    },
    setStatusBtnClass: function (val) {
      let btnClass;
      if (val == "Offline") {
        btnClass = "btn-warning";
      } else if (val == "View") {
        btnClass = "btn-info";
      } else {
        btnClass = "btn-primary";
      }
      return btnClass;
    },
    initialize() {
      //RECENT CLASSES
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "completed_classes?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          console.log(response.data.upcoming_classes);
          this.recentlyCoveredTopics = response.data.completed_classes;
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
  height: 350px;
}
.btn-timeline {
  position: absolute;
  right: 10px;
}
.v-text-field.v-text-field--solo .v-input__control {
  max-height: 30px !important;
}
.coveredTopic-details {
  min-height: 406px;
}
</style>
