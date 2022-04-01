<template>
  <div>
    <div class="row mt-4">
     <!--Class one start-->
      <div class="col-md-12 col-lg-4 col-xl-4" v-for="(studentgrade,i) in studentgrades" :key="i">
        <div class="card-shadow-primary profile-responsive card-border mb-3 card">
          <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner" :style="'background-color:'+studentgrade.color_code">
              <div class="menu-header-image"
                style="background-image: url('assets/images/dropdown-header/abstract1.jpg')">
              </div>
              <div class="menu-header-content syllabus-head-align">
                <div class="btn-pane-left" style="text-align: left;">
                  <h5 class="menu-header-title">{{studentgrade.subject_name}}</h5>
                  <h6 class="menu-header-subtitle">{{studentgrade.class_name}} | {{studentgrade.section}}</h6>
                </div>
                <div class="btn-pane-right">
                <h6 class="menu-header-subtitle syllabus-progress">syllabuscovered</h6>
                   <b-progress :value="studentgrade.subjectdetails.syllabuscovered"  variant="secondary"  show-progress class="mb-3"></b-progress>                
                   </div>
               </div>
            </div>
          </div>
          <ul class="list-group list-group-flush">
          <li class="list-group-item link" @click="goToAttendance('tab2')">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">                
                  <div class="widget-content-left">
                    <div class="widget-heading">Attendance</div>
                  </div>
                 <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-danger">
                      <span>{{studentgrade.subjectdetails.attendance}} </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
           <router-link to="/components/assessments"> <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                 
                  <div class="widget-content-left">
                    <div class="widget-heading">Test Average</div>
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-warning">
                      <span>{{studentgrade.subjectdetails.testaverage}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
          <router-link to="/components/myhomework">  <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">               
                  <div class="widget-content-left">
                    <div class="widget-heading">Homework Due</div>
                    <!-- <div class="widget-subheading">upcoming assignment</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-success">
                      <span>{{studentgrade.subjectdetails.homeworkdue}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
           <router-link to="/components/assessments"> <li class="list-group-item link">
              <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                 
                  <div class="widget-content-left">
                    <div class="widget-heading">Test Scheduled</div>
                    <!-- <div class="widget-subheading">upcoming test</div> -->
                  </div>
                  <div class="widget-content-right">
                    <div class="widget-numbers widget-numbers-sm text-info">
                      <span>{{studentgrade.subjectdetails.upcomingtestscount}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li></router-link> 
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
  props:['studentgrades'],
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
  methods: {
    goToAttendance(){
      this.$emit("gototabattendnce", "tab2");
    }
  }
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
