<template>
  <div class="row">
    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Low Performers-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i>Low Performers</div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button class="btn-shadow btn-wide btn btn-focus btn-sm" v-on:click="sowtable('lowperformers')">View All</button>
          </div>
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
                <thead>
                  <tr>
                    <th>Class (Sec)</th>
                    <th>Test</th>
                    <th>Student</th>
                    <th>Average</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="dessert in desserts" :key="dessert.id">
                    <td class="text-muted" style="width: 129px">
                      <div v-bind:class="dessert.colorcode">{{ dessert.name }}</div>
                    </td>
                    <td>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left flex2">
                            <div>{{ dessert.test }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ dessert.student }}</td>
                    <td>
                      <div class="badge badge-warning">{{ dessert.average }}</div>
                    </td>
                    <td>
                      <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <b-dropdown toggle-class="btn-icon btn-icon-only" variant="link" no-caret>
                          <span slot="button-content">
                            <i class="pe-7s-menu btn-icon-wrapper"></i>
                          </span>
                          <ul class="nav flex-column">
                            <router-link small class="mr-1" style="padding-top: 15px" :to="{ name: 'assignment', params: { tab: 'tab2' } }">
                              <li class="nav-item">
                                <a class="nav-link">Send Assignment</a>
                              </li>
                            </router-link>
                            <li class="nav-item">
                              <a href="javascript:void(0);" class="nav-link" v-on:click="gototab">Schedule Test</a>
                            </li>
                            <li class="nav-item">
                              <a href="javascript:void(0);" class="nav-link">Send Study Material</a>
                            </li>
                          </ul>
                        </b-dropdown>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!--Low Performers END-->
      <!--Test To Be Marked-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-checkmark-circle icon-gradient bg-malibu-beach mr-2"></i>Test To Be Marked</div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button class="btn-shadow btn-wide btn btn-focus btn-sm" v-on:click="sowtable('testtobemarked')">View All</button>
          </div>
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
                <thead>
                  <tr>
                    <th>Class (Sec)</th>
                    <th>Test</th>
                    <th>Test Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="Item in marktest" :key="Item.id">
                    <td class="text-muted" style="width: 129px">
                      <div v-bind:class="Item.colorcode">{{ Item.name }}</div>
                    </td>
                    <td>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left flex2">
                            <div>{{ Item.test }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ Item.testdate }}</td>
                    <td>
                      <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">Mark</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!--Test To Be Marked END-->
    </div>
    <div class="col-sm-12 col-md-6 col-xl-6">
      <!--Upcoming Test-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"></i>{{$t('upcomingtest')}}</div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button class="btn-shadow btn-wide btn btn-focus btn-sm" v-on:click="sowtable('upcomingtest')">{{$t('viewall')}}</button>
          </div>
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
                <thead>
                  <tr>
                    <th>{{$t('class(sec)')}}</th>
                    <th>{{$t('test')}}</th>
                    <th>{{$t('testdate')}}</th>
                    <th>{{$t('action')}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="test in tests" :key="test.id">
                    <td class="text-muted" style="width: 129px">
                      <div v-bind:class="test.colorcode">{{ test.name }}</div>
                    </td>
                    <td>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left flex2">
                            <div>{{ test.test }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ test.testdate }}</td>
                    <td>
                      <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition" v-bind:class="test.action == 'Create' ? 'btn-success' : 'btn-warning'" v-on:click="gototab">
                        {{ test.action }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!--Upcoming Test END-->
      <!--Test / Exam Calendar Test-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="mb-3">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
              <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i>
              Test / Exam Calendar
            </div>
          </div>
          <div class="scroll-area-md pl-4">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="p-0 card-body">
                <div class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-warning"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">1st Test - SCIENCE (3A)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">12:00 PM</a>
                        </p>
                        <span class="vertical-timeline-element-date">20/11/2020</span>
                      </div>
                    </div>
                  </div>
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-info"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">2nd Test - MATHS (5B)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">09:00 AM</a>
                        </p>
                        <span class="vertical-timeline-element-date">22/11/2020</span>
                      </div>
                    </div>
                  </div>
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-warning"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">3rd Test - SCIENCE (4B)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">12:00 PM</a>
                        </p>
                        <span class="vertical-timeline-element-date">22/11/2020</span>
                      </div>
                    </div>
                  </div>
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-info"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">4th Test - MATHS (2C)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">10:00 AM</a>
                        </p>
                        <span class="vertical-timeline-element-date">22/11/2020</span>
                      </div>
                    </div>
                  </div>
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-warning"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">4th Test - SCIENCE (3A)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">12:00 PM</a>
                        </p>
                        <span class="vertical-timeline-element-date">20/11/2020</span>
                      </div>
                    </div>
                  </div>
                  <div class="vertical-timeline-element">
                    <div>
                      <span class="vertical-timeline-element-icon bounce-in">
                        <i class="badge badge-dot badge-dot-xl badge-info"></i>
                      </span>
                      <div class="vertical-timeline-element-content bounce-in">
                        <h4 class="timeline-title">4th Test - MATHS (5B)</h4>
                        <p>
                          timings
                          <a href="javascript:void(0);">09:00 AM</a>
                        </p>
                        <span class="vertical-timeline-element-date">22/11/2020</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <!--Test / Exam Calendar Test END-->
    </div>
    <div class="col-sm-12 col-md-12 col-xl-12">
      <!--Low Performers full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'lowperformers'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <a v-on:click="sowtable('')"><i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i></a>
            Low Performers
          </div>
          <div class="btn-actions-pane-right">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16">
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      class=""
                    ></path>
                  </svg>
                </div>
              </div>
              <input placeholder="Search..." v-model="search" type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div class="p-0 card-body">
          <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="student" class="elevation-1">
            <template v-slot:item="props">
              <tr></tr>
              <tr>
                <td class="text-muted">
                  <div v-bind:class="props.item.colorcode">{{ props.item.name }}</div>
                </td>
                <td>
                  {{ props.item.test }}
                </td>
                <td>{{ props.item.student }}</td>
                <td>
                  <div v-bind:class="props.item.badgecolor">{{ props.item.average }}</div>
                </td>
                <td>
                  <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                    <b-dropdown toggle-class="btn-icon btn-icon-only" variant="link" no-caret>
                      <span slot="button-content">
                        <i class="pe-7s-menu btn-icon-wrapper"></i>
                      </span>
                      <ul class="nav flex-column">
                        <router-link small class="mr-1" style="padding-top: 15px" :to="{ name: 'assignment', params: { tab: 'tab2' } }">
                          <li class="nav-item">
                            <a class="nav-link">Send Assignment</a>
                          </li>
                        </router-link>

                        <li class="nav-item">
                          <a href="javascript:void(0);" class="nav-link" v-on:click="gototab">Schedule Test</a>
                        </li>

                        <li class="nav-item">
                          <a href="javascript:void(0);" class="nav-link">Send Study Material</a>
                        </li>
                      </ul>
                    </b-dropdown>
                  </div>
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
      <!--Low Performers full view END-->
      <!--Upcoming Test full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'upcomingtest'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <a v-on:click="sowtable('')"><i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i></a>
            Upcoming Test
          </div>
          <div class="btn-actions-pane-right">
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16">
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      class=""
                    ></path>
                  </svg>
                </div>
              </div>
              <input placeholder="Search..." v-model="search" type="text" class="form-control" />
            </div>
          </div>
        </div>
        <div class="p-0 card-body">
          <v-data-table :headers="testheaders" :items="tests" :search="search" sort-by="date" class="elevation-1">
            <template v-slot:item="props">
              <tr></tr>
              <tr>
                <td class="text-muted">
                  <div v-bind:class="props.item.colorcode">{{ props.item.name }}</div>
                </td>
                <td>{{ props.item.test }}</td>
                <td>{{ props.item.testdate }}</td>
                <td>
                  <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition" v-bind:class="props.item.action == 'Create' ? 'btn-success' : 'btn-warning'" v-on:click="gototab">
                    {{ props.item.action }}
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
      <!--Upcoming full view Test-->
      <!--Upcoming Test full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable === 'testtobemarked'">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <a v-on:click="sowtable('')"><i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i></a>
            Test To Be Marked
          </div>
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
                <thead>
                  <tr>
                    <th>Class (Sec)</th>
                    <th>Test</th>
                    <th>Test Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="Item in marktest" :key="Item.id">
                    <td class="text-muted">
                      <div v-bind:class="Item.colorcode">{{ Item.name }}</div>
                    </td>
                    <td>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left flex2">
                            <div>{{ Item.test }}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{{ Item.testdate }}</td>
                    <td>
                      <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">Mark</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
      <!--Upcoming full view Test-->
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
export default {
  components: {
    VuePerfectScrollbar,
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
        text: "Class",
        value: "class",
      },
      {
        text: "Test",
        value: "test",
      },
      {
        text: "Student",
        value: "student",
      },
      {
        text: "Average",
        value: "average",
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
    desserts: [],
    tests: [
      {
        name: "Maths (5B)",
        test: "3rd test",
        testdate: "21-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Scheduled",
        colorcode: "b-l-primary",
      },
      {
        name: "Science (3A)",
        test: "1st test",
        testdate: "20-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Scheduled",
        colorcode: "b-l-warning",
      },
      {
        name: "Maths (5B)",
        test: "2nd test",
        testdate: "20-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Create",
        colorcode: "b-l-primary",
      },
      {
        name: "Science (3A)",
        test: "3rd  test",
        testdate: "21-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Create",
        colorcode: "b-l-warning",
      },
      {
        name: "Maths (5A)",
        test: "4th test",
        testdate: "22-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Create",
        colorcode: "b-l-primary",
      },
    ],
    marktest: [
      {
        name: "Science (3A)",
        test: "1st test",
        testdate: "20-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Create",
        colorcode: "b-l-warning",
      },
      {
        name: "Maths (5B)",
        test: "2nd test",
        testdate: "20-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Scheduled",
        colorcode: "b-l-primary",
      },
      {
        name: "Maths (5B)",
        test: "3rd test",
        testdate: "21-12-2020",
        assigned: 30,
        attended: 28,
        evaluated: 13,
        action: "Create",
        colorcode: "b-l-primary",
      },
    ],
    fields: [
      {
        key: "class",
        sortable: true,
      },
      {
        key: "first_name",
        sortable: true,
      },
      {
        key: "age",
        label: "Person age",
        sortable: true,
        // Variant applies to the whole column, including the header and footer
      },
    ],
    items: [
      {
        isActive: true,
        age: 40,
        first_name: "Dickerson",
        last_name: "Macdonald",
      },
      {
        isActive: false,
        age: 21,
        first_name: "Larsen",
        last_name: "Shaw",
      },
      {
        isActive: false,
        age: 89,
        first_name: "Geneva",
        last_name: "Wilson",
      },
      {
        isActive: true,
        age: 38,
        first_name: "Jami",
        last_name: "Carney",
      },
    ],
  }),
  created() {
    this.initialize();
  },
  methods: {
    sowtable: function (table) {
      this.showtable = table;
    },
    gototab: function () {
      console.log("hai");
      this.$emit("gototab", "tab2");
    },
    initialize() {
      this.desserts = [
        {
          name: "Science (3A)",
          student: "Andrea Procopio",
          badgecolor: "badge badge-warning",
          test: "1st test",
          average: "18/50",
          colorcode: "b-l-warning",
        },
        {
          name: "Maths (5B)",
          student: "Amal el Moussaif",
          badgecolor: "badge badge-warning",
          test: "1st test",
          average: "10/50",
          colorcode: "b-l-primary",
        },
        {
          name: "Science (3A)",
          student: "Gabriele Volpi",
          badgecolor: "badge badge-warning",
          test: "Midterm Exam",
          average: "25/50",
          colorcode: "b-l-warning",
        },
        {
          name: "Maths (5B)",
          student: "Carola Schiavini",
          badgecolor: "badge badge-warning",
          test: "2nd test",
          average: "15/50",
          colorcode: "b-l-primary",
        },
        {
          name: "Science (3A)",
          student: "Andrea Procopio",
          badgecolor: "badge badge-warning",
          test: "2st test",
          average: "41/50",
          colorcode: "b-l-warning",
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
</style>
