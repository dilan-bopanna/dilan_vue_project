<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-xl-12" v-if="!slideShow">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("testcompleted") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                            v-on:click="gototabAttend">
                            View All
                        </button>
                    </div> -->
        </div>
        <div class="scroll-area-xl">
          <!-- {{markedAssignments}} -->
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />

          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("class(sec)") }}</th>
                  <th>{{ $t("title") }}</th>
                  <th>{{ $t("obtained_marks") }}</th>
                  <th>{{ $t("duedate") }}</th>
                   <th>{{ $t("status") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <!-- {{markedAssignments}} -->
              <tbody>
                <div
                  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                  v-if="!markedAssignments"
                >
                  {{$t('no_details_found')}}
                </div>
                <tr
                  v-for="(assignment, assignment_index) in markedAssignments"
                  :key="assignment_index"
                >
                  <td class="text-muted" style="width: 180px">
                    <div v-for="classes in assignment.allocation_ids" :key="classes.id">
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
                  <td>{{ assignment.title }}</td>
                  <td>{{ assignment.total_marks_obtained }}</td>
                  <td>{{ assignment.testdate }}</td>
                  <td><span v-if="assignment.assignment_status=='Evaluated'">{{$t('marked')}}</span>
                    <span v-if="assignment.assignment_status=='Submitted'">{{$t('submitted')}}</span>
                    <span v-if="assignment.assignment_status=='Draft'">{{$t('not_attended')}}</span>
                    </td>
                  <td>
                    <button
                      
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info"
                      @click="ShowAssignDetails(assignment.id)" v-if="assignment.assignment_status=='Evaluated'"
                    >
                      {{$t('view')}}
                    </button>
                    <!-- <span class="text-danger" v-if="assignment.assignment_status=='Draft'">{{$t('not_attended')}}</span>
                    <span class="text-success" v-if="assignment.assignment_status=='Submitted'">{{$t  ('submitted')}}</span> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--Unplanned Classes table end-->
    </div>
<!-- {{assignment}} -->
    <!--Assignments view Table Start-->
    <div class="col-sm-12 col-lg-9 hide" id="AssignFiles" v-if="slideShow">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <i @click="AssignFileback" class="lnr-arrow-left mr-6 bold link"></i>
            {{ assignment.assignment_type }} - {{ assignment.title }}
          </div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            {{$t('total_marks_obtained')}}:
            <span class="text-success">{{ assignment.total_marks_obtained }}</span
            >/<span class="text-success">{{ assignment.total_marks }}</span>
          </div>
        </div>

            <div class="scroll-area-xl">
                <div class="p-30" v-for="(question,question_index) in assignment.questions" :key="question_index">
                   <div v-if="question.question_type=='Multiple Choice' || question.question_type=='Single Choice'">
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                           <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-center expmarks"   v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}/{{question.marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span v-if="question.question_attended_status=='Y'">{{$t('marks_obtained')}}:</span> <span class="text-center expmarks"  v-if="question.question_attended_status=='Y'">{{question.marks_obtained}}/{{question.marks}}</span> <span class="text-danger" v-if="question.question_attended_status==null">{{$t('not_attended')}}</span></span></h6>
                           <div>
                              <div v-for="(options,option_index) in question.options" :key="option_index">
                                 <!-- {{options.is_correct_option}} -->
                                 <!-- <v-checkbox v-model="options.is_selected_option" :label="options.option_value" value="Y" color="success"></v-checkbox> -->
                                 <ul class="ml-4">
                                    <li v-bind:class="{'text-success': options.is_correct_option=='Y','text-danger': options.is_correct_option=='N' && options.is_selected_option=='Y'}"> {{options.option_value}} <i class="pe-7s-check text-success" v-if="options.is_selected_option=='Y' && options.is_correct_option=='Y'"></i>
                                    <i class="lnr-cross-circle" v-if="options.is_selected_option=='Y' && options.is_correct_option=='N'"></i></li>
                                 </ul>
                              </div>
                           </div>
                           
                        </div>  
                         <!--IF Question type is Paragraph-->               
                        <div v-if="question.question_type=='Paragraph'">
                           <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                          <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-center expmarks"   v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}/{{question.marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span v-if="question.question_attended_status=='Y'">{{$t('marks_obtained')}}:</span> <span class="text-center expmarks"  v-if="question.question_attended_status=='Y'">{{question.marks_obtained}}/{{question.marks}}</span><span class="text-danger" v-if="question.question_attended_status==null">{{$t('not_attended')}}</span> </span></h6>
                           <v-textarea v-model="question.answer"   auto-grow placeholder="Answer...." rows="4" row-height="30" shaped disabled></v-textarea>
                             
                        </div>
                          <!--IF Question type is Paragraph-->              
                    </div>
                  </div>
                </div>
              </div>

    <!--Comments Section-->
    <div class="col-sm-12 col-lg-3" id="file" v-if="slideShow">
      <div class="card-hover-shadow-2x mb-1 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <i class="header-icon lnr-pencil icon-gradient bg-ripe-malin"></i>
            {{$t('comments')}}
          </div>
        </div>
        <div class="scroll-area-md">
          <div class="chat-wrapper p-1">
            <div class="chat-box-wrapper" v-if="assignment.staff_comments != null">
              <div>
                <div class="avatar-icon-wrapper mr-1">
                  <div
                    class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"
                  ></div>
                  <div class="avatar-icon avatar-icon-lg rounded">
                    <img src="@/assets/images/avatars/2.jpg" alt />
                  </div>
                </div>
              </div>
              <div>
                <div class="chat-box">{{ assignment.staff_comments }}</div>
                <!-- <small class="opacity-6">
                        
                        11:01 AM | Yesterday
                        </small> -->
              </div>
            </div>
            <p class="opacity-6" v-if="assignment.staff_comments == null">
             {{$t('no_comments')}}
            </p>
          </div>
        </div>

        <!-- <div class="card-footer">
                <input placeholder="Reply..." type="text" class="form-control-sm form-control" />
            </div> -->
      </div>
    </div>
    <!--Comments Section-->
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import axios from "axios";
export default {
  components: {
    VueElementLoading,
  },
  props:['homeworkdue','homeworkid','testdetail'],
  data: () => ({
    slideShow: false,
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
    markedAssignments: [],
    questions: [],
    assignment: [],
    loader: false,
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    //console.log(this.user)
    this.fetchMarkedAssignments();
    //alert(this.user.emp_id);
    // console.log(this.user.name);
     if(this.homeworkdue=='marked')
    {
      this.ShowAssignDetails(this.homeworkid);
    }
    if(this.testdetail['id'])
    {
      this.ShowAssignDetails(this.testdetail['id']);
    }
  },

  methods: {
    fetchMarkedAssignments() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "markedassignments?student_id=" +
            this.user.emp_id +
            "&assignment_type=Test"+"&academic_year="+this.academic_year
        )
        .then((res) => {
          this.markedAssignments = res.data.marked_assignments;
          console.log(res.data.marked_assignments);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    ShowAssignDetails(assignmentid) {
      this.slideShow = true;
      this.loader = true;
      this.assign_id = assignmentid;
      this.studentname = this.user.name;

      this.student_id = this.user.emp_id;
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "student_edit_assignment", {
          assignment_id: this.assign_id,
          student_id: this.student_id,
        })
        .then((res) => {
          //console.log(res.data.assignments);
          this.assignment = res.data.assignments;
          //this.student_answers=res.data.assignments.questions;
          // this.assignment= res.data.assignments.questions;
          console.log(res.data.assignments), (this.loader = false);
          // console.log(this.res.data.assignments);
          //  this.assignment.userid= this.user.id;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    AssignFileback() {
      this.slideShow = false;
    },
  },
};
</script>
<style scoped>
 .expmarks
   {
      background: #4a5fd2;
      margin: 20px auto;
      padding: 5px 10px;
      color: #fff;
   }
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
.search-with-title {
  margin: 9px auto 9px 10px;
}
.sub-font {
  font-size: 20px !important;
}
.sub-info-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
}
.sub-info-container > div > p {
  margin: 0px;
  font-size: 13px;
}
.sub-info-container > div {
  width: 90px;
}
.sub-bg {
  background: #6c757d;
  color: #fff;
}
.link {
  cursor: pointer;
}
.algn-equal {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.bold {
  font-weight: 900;
}
.p-30 {
  padding: 30px;
}
</style>
