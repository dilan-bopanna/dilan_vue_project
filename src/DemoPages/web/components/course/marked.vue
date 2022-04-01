<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-xl-12" v-if="!slideShow">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("markedhomework") }}
          </div>
           <ul class="list-group list-group-flush btn-actions-pane-right text-capitalize actions-icon-btn" style="list-style-type:none;">
                  <li class="pt-4 pl-3 pr-3 pb-3 nav-item">
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
                          <input v-bind:placeholder="$t('search')"  v-model="search"  type="text" class="form-control" />
                        </div>
                        </li>
                         </ul>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                            v-on:click="gototabAttend">
                            View All
                        </button>
                    </div> -->
        </div>
        <div class="scroll-area-xl">
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
                  <th>{{ $t("assignment") }}</th>
                  <th>{{ $t("duedate") }}</th>
                  <th>{{ $t("obtained_marks") }}</th>
                  <th>{{ $t("evaluated_date") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <!-- <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4" v-if="markedassignments.length==0">{{$t('no_details_found')}}</div> -->
              <!-- {{markedAssignments}} -->
              <tbody>
                <div
                  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                  v-if="!markedassignments"
                >
                  {{$t('no_details_found')}}
                </div>
                <tr
                  v-for="(assignment, assignment_index) in homeworkSearch"
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
                  <td>{{ assignment.testdate }}</td>
                  <td>{{ assignment.total_marks_obtained }}</td>
                  <td>{{ assignment.evaluated_date |formatDateTime}}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info"
                      @click="ShowAssignDetails(assignment.id)"
                    >
                      {{$t('view')}}
                    </button>
                    <!-- <span class="text-danger" v-if="assignment.student_status!='Submitted' && assignment.student_status!='Evaluated'">Correction Pending</span> -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--Unplanned Classes table end-->
    </div>

<div class="row">
    <!--Assignments view Table Start-->
    <div class="col-sm-12 col-lg-9 hide" id="AssignFiles" v-if="slideShow">
      <!-- {{assignment}} -->
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
                   <div v-if="question.question_type=='Multiple Choice'">
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                          <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-center expmarks"  v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}/{{question.marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span  v-if="question.answer!=null">{{$t('marks_obtained')}}:</span> <span class="text-center expmarks"  v-if="question.marks_obtained">{{question.marks_obtained}}/{{question.marks}}</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer!=null">-</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer==null">{{$t('not_attended')}}</span> </span></h6>
                           <div>
                              <div v-for="(options,option_index) in question.options" :key="option_index">
                                 <!-- {{options.is_correct_option}} -->
                                 <!-- <v-checkbox v-model="options.is_selected_option" :label="options.option_value" value="Y" color="success"></v-checkbox> -->
                                 <ul class="ml-4">
                                    <li v-bind:class="{'text-success': options.is_correct_option=='Y'}"> {{options.option_value}} <i class="pe-7s-check text-success" v-if="options.is_selected_option=='Y' && options.is_correct_option=='Y'"></i></li>
                                 </ul>
                              </div>
                           </div>
                           
                        </div>  
                        <!-- single choice -->
                         <div v-if="question.question_type=='Single Choice'">
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                          <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-center expmarks"  v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}/{{question.marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span v-if="question.answer!=null">{{$t('marks_obtained')}}:</span> <span class="text-center expmarks"  v-if="question.marks_obtained">{{question.marks_obtained}}/{{question.marks}}</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer!=null">-</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer==null">{{$t('not_attended')}}</span> </span></h6>
                           <div>
                              <div v-for="(options,option_index) in question.options" :key="option_index">
                                 <!-- {{options.is_correct_option}} -->
                                 <!-- <v-checkbox v-model="options.is_selected_option" :label="options.option_value" value="Y" color="success"></v-checkbox> -->
                                 <ul class="ml-4">
                                    <li v-bind:class="{'text-success': options.is_correct_option=='Y'}"> {{options.option_value}} <i class="pe-7s-check text-success" v-if="options.is_selected_option=='Y' && options.is_correct_option=='Y'"></i></li>
                                 </ul>
                              </div>
                           </div>
                           
                        </div>  
                        <!-- single choice end -->
                         <!--IF Question type is Paragraph-->               
                        <div v-if="question.question_type=='Paragraph'">
                           <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                            <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-center expmarks"  v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}/{{question.marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span v-if="question.answer!=null">{{$t('marks_obtained')}}:</span> <span v-if="question.marks_obtained" class="text-center expmarks">{{question.marks_obtained}}/{{question.marks}}</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer!=null">-</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer==null">{{$t('not_attended')}}</span> </span></h6>
                           <v-textarea class="text-black" v-model="question.answer"   auto-grow placeholder="Answer...." rows="2" row-height="20" shaped readonly></v-textarea>
                             
                        </div>
                        <!--IF Question type is Upload-->
                        <div v-if="question.question_type=='Upload'">
                           <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} 
                            <span style="float: right;"  class="pl-2"><span>{{$t('self_evaluated_marks')}}:</span> <span class="text-success"  v-if="question.self_evaluated_marks">{{question.self_evaluated_marks}}</span> <span class="text-danger" v-if="question.self_evaluated_marks==null">-</span></span>
                           <span style="float: right;"><span  v-if="question.answer!=null">{{$t('marks_obtained')}}:</span> <span v-if="question.marks_obtained" class="text-success">{{question.marks_obtained}}</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer!=null">-</span><span class="text-danger" v-if="question.marks_obtained==null  && question.answer==null">{{$t('not_attended')}}</span> </span></h6>
                           
                           <span class="p-2">Question:</span>
                           <a :href="instance_filepath_url+question.question_file" target="_blank" style="margin-right: 10px; "> <img src="@/assets/images/file-logo.png" style="width: 30px;height: 30px;margin: 0px auto;">{{question.question_file}}</a><br>

                           <span class="p-2">Answer:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                           <a :href="instance_filepath_url+question.answer_file" target="_blank" style="margin-right: 10px; padding:6px;"> <img src="@/assets/images/file-logo.png" style="width: 30px;height: 30px;margin: 0px auto;">{{question.answer_file}}</a>


                           <v-textarea class="text-black" v-model="question.answer"   auto-grow placeholder="Answer...." rows="2" row-height="20" shaped readonly></v-textarea>
                             
                        </div>        
              
          </div>
        </div>
      </div>
    </div>

    <!--Comments Section-->
    <div class="col-sm-12 col-lg-3" id="file" v-if="slideShow">
      <div class="row">
      <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header"  style="width: 292px;">
              <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
                <i class="header-icon lnr-graduation-hat icon-gradient bg-ripe-malin"></i>
               <span style="font-size:13px;"> {{$t('marks_obtained')}}</span>
              </div>
            </div>
            <div class="scroll-area-auto attendHomework">         
                <div class="chat-wrapper p-1">
                    <!-- {{questions}} -->
                  <table class="table-bordered marks-table" style="width:100%">
                    <tr>
                      <th class="text-center bg-primary text-white">{{$t('questions')}}</th>
                      <th class="text-center bg-primary text-white">{{$t('mark')}}</th>
                    </tr>
                    <tr v-for="(attended,qindex) in assignment.questions" :key="qindex">
                      <th class="text-center">Q{{qindex+1}}</th>
                      <td class="text-center" v-if="attended.attended=='No'">0</td>
                      <td class="text-center" v-else>{{attended.marks_obtained}}</td>
                    </tr>
                  <caption class="text-center"><b>{{$t('total_marks')}}:</b> {{ assignment.total_marks_obtained}}/{{ assignment.total_marks}}</caption>
                  </table>
                </div>
            </div>
          </div>
    </div>
     <!--Comments Section-->
    <!--Comments Section-->
    <!-- <div class="col-sm-12 col-lg-3" id="file" v-if="slideShow"> -->
      <div class="row">
      <div class="card-hover-shadow-2x mb-1 card">
        <div class="card-header-tab card-header" style="width: 292px;">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <i class="header-icon lnr-pencil icon-gradient bg-ripe-malin"></i>
            {{$t('comments')}}
          </div>
        </div>
        <div class="scroll-area-sm">
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
                <p class="chat-box chat-box-wrapper">{{ assignment.staff_comments }}</p>
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
        <div class="card-footer">
          <input
            placeholder="Reply..."
            type="text"
            class="form-control-sm form-control"
          />
        </div>
      </div>
    </div>
    </div>
     <!--Comments Section-->
  </div>
   
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import axios from "axios";
export default {
  components: {
    VueElementLoading,
  },
  props:['homeworkdue','homeworkid'],
  data: () => ({
    slideShow: false,
    instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
    showtable: "",
    search:'',

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
    markedassignments: [],
    questions: [],
    assignment: [],
    loader: false,
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.student_id = this.user.emp_id;
    this.fetchMarkedAssignments();
     if(this.homeworkdue=='marked')
    {
      this.ShowAssignDetails(this.homeworkid);
    }
  },
 computed: {
   homeworkSearch() {
     if(this.search){
      return this.markedassignments.filter(homework => {
        return homework.title.toLowerCase().includes(this.search.toLowerCase())
      })
     }
     else
     {
        return this.markedassignments;
     }
    },
    
},
  methods: {
    fetchMarkedAssignments() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "markedassignments?student_id=" +
            this.student_id +
            "&assignment_type=Homework"+"&academic_year="+this.academic_year
        )
        .then((res) => {
          this.markedassignments = res.data.marked_assignments;
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
          this.assignment = res.data.assignments;
          console.log(res.data.assignments), (this.loader = false);
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
