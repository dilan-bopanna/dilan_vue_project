<template>
  <div>
    <div class="row mt-4">
     <!--Class one start-->
       <div v-if="!staffassignments.length"  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4">{{$t('no_class_alloted')}}</div>
      <div class="col-md-12 col-lg-4 col-xl-4" v-for="(staffassignment,i) in staffassignments" :key="i">
        <div class="card-shadow-primary profile-responsive card-border mb-3 card">
          <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner" :style="'background-color:'+staffassignment.color_code">
              <div class="menu-header-image"
                style="background-image: url('assets/images/dropdown-header/abstract1.jpg')">
              </div>
              <div class="menu-header-content syllabus-head-align">
                <div class="btn-pane-left" style="text-align: left;">
                  <h5 class="menu-header-title">{{staffassignment.subject_name}}({{staffassignment.subject_code}})</h5>
                  <h6 class="menu-header-subtitle">{{staffassignment.class_name}} | {{staffassignment.section}}</h6>
                </div>
                <div class="btn-pane-right">
                <h6 class="menu-header-subtitle syllabus-progress">{{staffassignment.syllabuscovered.title}}</h6>
                   <b-progress :value="staffassignment.syllabuscovered.percentage"  variant="secondary"  show-progress class="mb-3"></b-progress>                
                   </div>
               </div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
         <router-link to="attendance">   <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">                
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.attendanceshortage.title}}</div>
                    <!-- <div class="widget-subheading">{{staffassignment.attendanceshortage.desc}}</div> -->
                  </div>
                 <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-danger">
                      <span>{{staffassignment.attendanceshortage.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            </router-link> 
           <router-link  :to="{ name: 'assignment',params: { tab:'tab3' }}"> <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                 
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.assignmentmarking.title}}</div>
                    <!-- <div class="widget-subheading">{{staffassignment.assignmentmarking.desc}}</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-warning">
                      <span>{{staffassignment.assignmentmarking.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
          <router-link  to="assignment">  <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">               
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.assignmentdue.title}}</div>
                    <!-- <div class="widget-subheading">{{staffassignment.assignmentdue.desc}}</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-success">
                      <span>{{staffassignment.assignmentdue.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
           <router-link :to="{ name: 'assessments'}"> <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                 
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.testscheduled.title}}</div>
                    <!-- <div class="widget-subheading">{{staffassignment.testscheduled.desc}}</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-info">
                      <span>{{staffassignment.testscheduled.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
           <router-link :to="{ name: 'assessments',params: { tab:'tab3' }}"> <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                  
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.evaluatetest.title}}</div>
                    <!-- <div class="widget-subheading">{{staffassignment.evaluatetest.desc}}</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-alternate">
                      <span>{{staffassignment.evaluatetest.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
          <!-- <router-link :to="{ name: 'communication',params: { tab:'tab2' }}">  <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                 
                  <div class="widget-content-left">
                    <div class="widget-heading">{{staffassignment.replytochat.title}}</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-focus">
                      <span>{{staffassignment.replytochat.count}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link>  -->
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  
  components: { 
    
  },
  props:['staffassignments'],
  data: () => ({

    heading: "Profile Boxes",
    subheading:
      "These boxes are usually for dashboard elements centered around users and profiles.",
    icon: "pe-7s-science icon-gradient bg-happy-itmeo",
 bars: [
      { variant: "success", value: 75 },
      { variant: "science", value: "75%" },
      { variant: "warning", value: 75 },
      { variant: "danger", value: 75 },
      { variant: "primary", value: 75 },
      { variant: "secondary", value: 75 },
      { variant: "dark", value: 75 },
      { variant: "alternate", value: 75 },
      { variant: "focus", value: 75 }
    ],
     striped: true,
    value: 75,
    fill: { gradient: ["var(--primary)"] },
    fill1: { gradient: ["#2af598", "#009efd"] },
    fill2: { gradient: ["#fccb90", "#d57eeb"] },

    f1: { gradient: ["#3f6ad8"] },
    f2: { gradient: ["#3ac47d"] },
    f3: { gradient: ["#16aaff"] },
    f4: { gradient: ["#f7b924"] },
    f5: { gradient: ["#d92550"] },
    f6: { gradient: ["#444054"] }
  }),
  methods: {}
};
</script>
<style scoped>
.syllabus-head-align{display: flex;
    justify-content: space-between;
    align-items: flex-end;}
.link{cursor:pointer}
a{text-decoration: none; color: #4d4d4d;}
.widget-content .widget-content-left .widget-subheading{font-size: 12px !important;}
.card > .list-group:last-child .list-group-item:last-child{padding: 7px 22px;}
.syllabus-progress{font-size: 12px;
    margin-bottom: 2px;
   color: #ffffff;
    width: 158px;
    text-align: left;
    font-weight: 500;}
</style>
