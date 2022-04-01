<template>
  <div class="row">
    <!-- <div class="col-sm-12 col-md-2 col-xl-2">
      <div class="card-shadow-primary card-border mb-3 card">
        <ul class="list-group list-group-flush">
          <li class="p-0 list-group-item">
            <div class="row">
              <div class="center-elem col-md-12">
                <div class="center-elem p-200">
                   <vue-circle
                    :progress="overallpercentage.toFixed(0)"
                    :size="100"
                    :reverse="false"
                    line-cap="round"
                    :fill="fill"
                    empty-fill="rgba(0, 0, 0, .1)"
                    :animation-start-value="0.0"
                    :start-angle="0"
                    insert-mode="append"
                    :thickness="4"
                    :show-percent="true"
                  >
                  </vue-circle>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex align-items-center">
                <div class="w-100">
                  <div class="widget-chart">
                    <div class="widget-chart-content">
                      <div class="widget-numbers mt-0 text-danger">
                        {{ overallpercentage.toFixed(0) }}
                        <small>%</small>
                        <small class="opacity-5 pl-2">
                          <font-awesome-icon icon="angle-up" />
                        </small>
                      </div>
                      <div class="widget-subheading">{{$t('over_all_performance')}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div> -->
    <div class="col-sm-12 col-md-12 col-xl-12">
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("home_report") }}
          </div>
        </div>
        <div class="scroll-area-md">
          <div class="table-responsive">
            <v-data-table
              :search="search"
              :loading="myloadingvariable"
              loading-text="Loading... Please wait"
              :headers="testheaders"
              :items="childdetails"
              :single-expand="singleExpand"
              :expanded.sync="expanded"
              item-key="id"
              show-expand
              class="elevation-1"
              @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
            >
              <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                  <v-data-table
                    id="childrecords"
                    :items="childdetails"
                    :headers="childheaders"
                    class="elevation-1 stud-tab m-5"
                    :hide-default-footer="true"
                  >
                    <template v-slot:item="props" class="mb-5">
                      <tr
                        v-for="(test_list, test_list_index) in props.item.testdata"
                        :key="test_list_index"
                      >
                        <td v-if="test_list.subject_id == item.id">
                          {{ test_list.title }}
                        </td>
                        <td v-if="test_list.subject_id == item.id">
                          {{ test_list.due_date|formatDate }}
                        </td>
                        <td v-if="test_list.subject_id == item.id">
                          {{ test_list.submitted_date|formatDate }}
                        </td>
                        <td v-if="test_list.subject_id == item.id">
                          {{ test_list.evaluated_date|formatDate }}
                        </td>
                        <td v-if="test_list.subject_id == item.id">
                              <span class="text-danger" v-if="test_list.student_status=='Draft'">{{$t('absent')}}</span>
                              <span class="text-info" v-if="test_list.student_status=='Submitted'">{{$t('submitted')}}</span>
                              <span class="text-success" v-if="test_list.student_status=='Evaluated'">{{$t('evaluated')}}</span>                  
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </td>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import VueCircle from "vue2-circle-progress";
export default {
  components: {
    //VueCircle,
  },
  data: () => ({
    singleExpand: true,
    showtable: "",
    myloadingvariable: false,
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
    expanded: [],
    testheaders: [
      {
        text: "Subjects",
        value: "subject_name",
      },
      {
        text: "Allocated",
        value: "allocated_homework",
      },
      {
        text: "Submited",
        value: "submitted_homework",
      },
      {
        text: "Due",
        value: "due_homework",
      }
    ],
    childheaders: [
      { text: "Home Work Name" },
       { text: "Home Work Due Date" },
        { text: "Home Work Evaluated Date" },
       { text: "Home Work Submited Date" },
      { text: "Status" },
    ],
    childdetails: [],
    items: [],
    overallpercentage: [],
  }),
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
    initialize() {
      this.myloadingvariable = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studenthomeworkreport?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          console.log(response.data.studenttests);
          this.childdetails = response.data.studenttests;
          this.overallpercentage = response.data.percentage;
          this.myloadingvariable = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    filteredList() {
      return this.outstandingHomework.filter((list) => {
        return (
          list.class.toUpperCase().includes(this.search.toUpperCase()) ||
          list.dueDate.toUpperCase().includes(this.search.toUpperCase()) ||
          list.assignment.toUpperCase().includes(this.search.toUpperCase())
        );
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
.header-select {
  font-size: 13px;
  height: 32px;
  width: 100px;
  margin-top: 19px;
  display: inline;
  margin-left: 2px;
}

.date-marks div {
  padding: 3px;
}

th,
td {
  text-align: left;
}

.radial-bar-chart {
  left: -38px;
  position: relative;
}
.stud-details {
  display: flex;
  width: 50%;
  justify-content: space-around;
  border: 1px solid #e2e5ef;
  padding: 6px;
  margin: 0px auto;
}
</style>
