<template>
  <div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'"
      :tab-class="'tab-item'" :tab-active-class="'tab-item-active'"
      :line-class="'tab-item-line'" @onClick="handleClick" />
    <div class="content">
      <div v-if="currentTab === 'tab1'">
      <div id="assign-overview">
      <div class="row" >
          <div class="col-lg-6">
        <!--OUTSTANDING ASSIGNMENTS-->
            <div class="main-card mb-3 card">
          <div class="card-header">
            Outstandingg Assignments
         
          </div>
        
          <div class="scroll-area-sm">
                <VuePerfectScrollbar class="scrollbar-container" v-once>
               <div class="table-responsive">
            <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
             <thead>
                <tr>
                  <th >Class (Sec)</th>
                  <th >Assignment</th>
                  <th >Due Date</th>
                  <th >Pending</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-muted" style="width: 129px;">
                  <div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >07 Nov 2020</td>
                  <td >
                    <div class="badge badge-warning">5 students</div>
                  </td>
                  <td> <button  @click="showOutsandingAssignments('overview')" type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">
                  Alert
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Chemical Re...</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >09 Nov 2020</td>
                  <td >
                    <div class="badge badge-danger">12 students</div>
                  </td>
                   <td> <button  @click="showOutsandingAssignments('overview')" type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">
                  Alert
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-primary">Maths (5B)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Algebra</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >05 Nov 2020</td>
                  <td >
                    <div class="badge badge-primary">3 students</div>
                  </td>
                    <td> <button  @click="showOutsandingAssignments('overview')" type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">
                  Alert
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-primary">Maths (5B)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >07 Nov 2020</td>
                  <td >
                    <div class="badge badge-warning">5 students</div>
                  </td>
                    <td> <button  @click="showOutsandingAssignments('overview')" type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">
                  Alert
                </button></td>
                 
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-primary">Maths (5B)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >07 Nov 2020</td>
                  <td >
                    <div class="badge badge-warning">5 students</div>
                  </td>
                 <td> <button  @click="showOutsandingAssignments('overview')" type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger">
                  Alert
                </button></td>
                </tr>
               
              </tbody>
            </table>
          </div>
                </VuePerfectScrollbar>
              </div>

        </div>
        <!--OUTSTANDING ASSIGNMENTS-->
        <!--New ASSIGNMENTS-->
            <div class="main-card mb-3 card">
          <div class="card-header">
            NEW ASSIGNMENTS
         
          </div>
          <table class="align-middle mb-0 table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th >Class (Sec)</th>
                  <th>Assignment Name</th>
                  <th >Due In</th>
                 <th >Action</th>
                </tr>
              </thead>
             
            </table>
          <div class="scroll-area-sm">
                <VuePerfectScrollbar class="scrollbar-container" v-once>
               <div class="table-responsive">
            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
             
              <tbody>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                 <td ><div class="badge badge-warning">2 Days</div></td>
                   <td class="text-center"> <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-warning">
                  Scheduled
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Chemical Reactions</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td><div class="badge badge-warning">2 weeks</div></td>
  <td class="text-center"> <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-primary">
                  Create
                </button></td>
                 
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-primary">Maths (5B)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Algebra</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td ><div class="badge badge-primary">3 Days</div></td>
                    <td class="text-center"> <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">
                  Send
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td ><div class="badge badge-warning">2 Days</div></td>
                   <td class="text-center"> <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">
                  Send
                </button></td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                    
                  </td>
                  <td ><div class="badge badge-warning">2 Days</div></td>
                    <td class="text-center"> <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-primary">
                  Create
                </button></td>
                </tr>
               
              </tbody>
            </table>
          </div>
                </VuePerfectScrollbar>
              </div>

        </div>
        <!--New ASSIGNMENTS-->   
       <!--Mark ASSIGNMENTS-->   
              <div class="main-card mb-3 card">
          <div class="card-header">
            Mark ASSIGNMENTS
           <!-- <div class="btn-actions-pane-right">
              <div role="group" class="btn-group-sm btn-group">
                <button class="active btn btn-focus">Last Week</button>
                <button class="btn btn-focus">All Month</button>
              </div>
            </div>-->
          </div>
         
          <div class="scroll-area-sm">
                <VuePerfectScrollbar class="scrollbar-container" v-once>
               <div class="table-responsive">
            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th >Class (Sec)</th>
                  <th>Assignment</th>
                  <th >Handed In</th>
                  <th >Marked</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Molecules</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >30</td>
                  <td >
                    <div class="badge badge-warning">12</div>
                  </td>
                 <td>
                 <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success"> Mark </button>
                 </td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-warning">Science (3A)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Chemical Reactions</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >30</td>
                  <td >
                    <div class="badge badge-warning">12</div>
                  </td>
                  <td> <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success"> Mark </button>
</td>
                </tr>
                <tr>
                  <td class=" text-muted"><div class="b-l-primary">Maths (5B)</div></td>
                  <td>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">                    
                        <div class="widget-content-left flex2">
                          <div class="widget-heading">Algebra</div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td >30</td>
                  <td >
                    <div class="badge badge-primary">12</div>
                  </td>
                 <td >                 <button type="button" class="btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success"> Mark </button>
</td>
                </tr>
              
               
              </tbody>
            </table>
          </div>
                </VuePerfectScrollbar>
              </div>

          
          <div class="d-block  card-footer">
            
          </div>
             </div>
<!--Mark ASSIGNMENTS-->   
          </div>
    <!--ASSIGNEMNT CALENDAR-->   
          <div class="col-lg-6">
          
            <div class="main-card mb-3 card">
             <div class="card-header">Assignemnt Calendar
             
             </div>
             <cal3></cal3>
            </div>
          
          </div>
    <!--ASSIGNEMNT CALENDAR-->  
        </div>
      </div>
        
<div class="row"  id="outstand-assign-details"  style="display:none">

          <div class="col-lg-12">
           <datatable22></datatable22>
          </div>
         
        </div>
      </div>
      <div v-if="currentTab === 'tab2'">
       
        <createAssignment></createAssignment>
        
      </div>
       <div v-if="currentTab === 'tab3'">
        <div class="main-card mb-3 card">
                <div class="card-body">
                    <h5 class="card-title">Work in progress</h5>
                </div>
        </div>       
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faCheck } from "@fortawesome/free-solid-svg-icons";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import cal3 from "../Vuetify/Components/calendars/AssignmentCalendar";
import datatable22 from "../Vuetify/Components/data-tables/AssignmentOverviewTable";
import createAssignment from "../pages/CreateAssignment";
library.add(faTrashAlt, faCheck);

const TABS = [
  {
    title: "Overview",
    value: "tab1"
  },
  {
    title: "Create",
    value: "tab2"
  },
  {
    title: "Mark",
    value: "tab3"
  }
];

export default {
  components: {
    PageTitle,
    datatable22,
    createAssignment,
    cal3,
       VuePerfectScrollbar,
    Tabs
  },
  data: () => ({
    heading: "Assignment",
    subheading:
      "Manage Homeworks/Assignment related activities.",
    icon: "pe-7s-paperclip icon-gradient bg-sunny-morning",

    tabs: TABS,
    currentTab: "tab1",

    fill: { color: "#d92550" },

    startVal: 0,
    endVal: 423,
    decimals: 0,
    duration: 2.5,
    options: {
      useEasing: true,
      useGrouping: true,
      separator: ",",
      decimal: ".",
      prefix: "",
      suffix: ""
    }
  }),

  methods: {
   showOutsandingAssignments(val){
  if (val == "overview") {
                
                document.getElementById("assign-overview").classList.remove("show");
                document.getElementById("outstand-assign-details").classList.remove("hide");
                document.getElementById("assign-overview").classList.add("hide");
                document.getElementById("outstand-assign-details").classList.add("show");

            } else {
                document.getElementById("assign-overview").classList.remove("hide");
                document.getElementById("outstand-assign-details").classList.remove("show");
                
                document.getElementById("assign-overview").classList.add("show");
                document.getElementById("outstand-assign-details").classList.add("hide");
            }
  
},
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    onReady: function(instance) {
      const that = this;
      instance.update(that.endVal + 100);
    }
  }
};
</script>
<style>
.outstand-assign-details{display: none;}
.b-center{margin: 0px auto;}
.show {
    display: block !important;
}

.hide {
    display: none !important;
}

.b-l-warning{border-left: 4px solid #f7b924;text-align: left;padding: 4px;}
.b-l-primary{border-left: 4px solid #3f6ad8;text-align: left;padding: 4px;}
.todo-indicator{width: 3px;height: 25px;}
.btn.btn-pill.btn-wide, .btn.btn-pill{font-size:12px !important}
</style>
