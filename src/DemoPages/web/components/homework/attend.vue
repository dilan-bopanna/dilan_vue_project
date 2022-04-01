<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-xl-12">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="!showtable">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("outstandinghomework") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                            v-on:click="gototabAttend">
                            View All
                        </button>
                    </div> -->
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table
                class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
              >
                <thead>
                  <tr>
                    <th>{{ $t("class(sec)") }}</th>
                    <th>{{ $t("topic") }}</th>
                    <th>{{ $t("duedate") }}</th>
                    <th>{{ $t("status") }}</th>
                    <th>{{ $t("action") }}</th>
                  </tr>
                </thead>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!--Unplanned Classes table end-->

      <!--Outstanding Assignments full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'outstanding'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <a v-on:click="viewall('')">
              <i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i>
            </a>
            {{ $t("attendhomework") }}
          </div>
        </div>
        <div class="p-0 card-body">
          <AttendHomework></AttendHomework>
        </div>
      </div>
      <!--Outstanding Assignments full view END-->
    </div>
  </div>
</template>

<!-- <script>
//  // import AttendHomework from "../test/attendHomework"
  
//   export default {
//     components: {
//       //AttendHomework
//     },
//     data: () => ({
//       heading: "Test/Exam",
//       subheading: "Manage Test/Exams Allotment,Conduction and Evaluation.",
//       icon: "pe-7s-rocket icon-gradient bg-malibu-beach",
//       subject:"All Subjects",
//       currentTab: "tab1"
      
//     }),
//     methods: { 
//      changetab(tab) {
//         this.currentTab = tab
//     },
//       handleClick(newTab) {
//         this.currentTab = newTab;
//       }
//     }
//   };
// </script>
// <style scoped>
// .top-selection {
//     position: absolute;
//     top: 100px;
//     right: 31px;
//     z-index: 20000;
// }
// .sub-button{
//     background: rgb(247 185 36);
//     color: #fff;
//     -webkit-transition: all 0.2s;
//     transition: all 0.2s;
//     padding: 8px 18px !important;
//     border-radius: 5px;
// }
// .pe-7s-notebook:hover, .btn-icon-vertical:hover {
//     color: grey !important;
//     -webkit-text-fill-color: grey;
// }.pe-7s-notebook, .btn-icon-vertical{
//     color: #ffffff !important;
//     -webkit-text-fill-color: #fff;
// }
// </style> -->

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import AttendHomework from "../test/attendHomework";
export default {
  components: {
    VuePerfectScrollbar,
    AttendHomework,
  },
  data: () => ({
    showtable: "",
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
    outstandingHomework: [],

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
  methods: {
    viewall: function (table) {
      this.showtable = table;
    },
    gototabAttend: function () {
      this.$emit("gototab", "tab2");
    },
    gototabMarked: function () {
      this.$emit("gototab", "tab3");
    },
    initialize() {
      this.outstandingHomework = [
        {
          class: "Science (3A)",
          assignment: "Molecules",
          dueDate: "07-11-2020",
          status: "Overdue",
          colorcode: "b-l-warning",
        },
        {
          class: "Science (3A)",
          assignment: "Chemical Reaction",
          dueDate: "09-11-2020",
          status: "Overdue",
          colorcode: "b-l-warning",
        },
        {
          class: "Maths (3A)",
          assignment: "Algebra",
          dueDate: "07-11-2020",
          status: "Get Done",
          colorcode: "b-l-primary",
        },
        {
          class: "Maths (3A)",
          assignment: "Geometry",
          dueDate: "09-11-2020",
          status: "Get Done",
          colorcode: "b-l-primary",
        },
      ];
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
  height: 686px;
}
</style>
