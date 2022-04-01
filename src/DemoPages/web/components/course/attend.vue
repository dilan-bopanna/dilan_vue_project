<template>
  <div class="row">
    <!-- {{assignments}} -->
    <div class="col-sm-12 col-md-12 col-xl-12">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="hidetable && !slideShow || !showtable">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("outstanding_unmarked_homework") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                  <button class="btn-shadow btn-wide  btn btn-focus btn-sm"
                      v-on:click="gototabAttend">
                      View All
                  </button>
                  </div> -->
        </div>

        <VueElementLoading
          :active="loader"
          spinner="bar-fade-scale"
          color="var(--primary)"
        />
      

        <div class="scroll-area-xl">
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <thead>
                <tr>
                  <th>{{ $t("class(sec)") }}</th>
                  <th>{{ $t("title") }}</th>
                  <th>{{ $t("duedate") }}</th>
                  <th>{{ $t("submitted_date") }}</th>
                  <th>{{ $t("status") }}</th>
                  <th>{{ $t("action") }}</th>
                </tr>
              </thead>
              <tbody>
                  <div
                    class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
                    v-if="!outstandingHomework"
                  >
                    {{ $t("no_details_found") }}
                  </div>
                <tr
                  v-for="(assignmentslist, assignmentindex) in outstandingHomework"
                  :key="assignmentindex"
                >
                  <td class="text-muted" style="width: 150px">
                    <div
                      v-for="classes in assignmentslist.allocation_ids"
                      :key="classes.id"
                    >
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
                  <td>{{ assignmentslist.title }}</td>
                  <td>{{ assignmentslist.due_date | formatDate }}</td>
                   <td>{{ assignmentslist.submitted_date }}</td>
                  <td>
                    <button
                      type="button" v-if="assignmentslist.studentstatus == 'Draft'"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition"
                      v-on:click="gototabAttend" v-bind:class="assignmentslist.studentstatus == 'Draft' ? 'btn-warning' : 'btn-success'"> {{ $t("due") }} </button>
                    <button type="button" v-if="assignmentslist.studentstatus == 'Submitted'"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition"
                      v-on:click="gototabAttend"
                      v-bind:class="assignmentslist.studentstatus == 'Draft' ? 'btn-warning' : 'btn-success'">
                     {{ $t("submitted") }}
                    </button>
                  </td>
                  <td>
                    <button v-if="assignmentslist.studentstatus == 'Draft'"
                      class="btn mr-2 mb-2 btn-pill btn-focus btn-sm"
                      v-on:click="viewall('outstanding', assignmentslist.id,0)"
                    >
                      <span v-if="assignmentslist.due_date >= currentDate">{{ $t("complete_hw") }}</span>
                      <span v-if="assignmentslist.due_date < currentDate">{{ $t("due") }}</span>
                    </button>
                     <button  v-if="assignmentslist.studentstatus == 'Submitted'"
                      class="btn mr-2 mb-2 btn-pill btn-focus btn-sm"
                      v-on:click="ShowAssignDetails(assignmentslist.id)"
                    >
                      {{ $t("view") }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--Unplanned Classes table end-->
      <!--Outstanding Assignments full view-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="!hidetable &&!slideShow && showtable">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
             <a v-on:click="viewall('')">
              <i class="header-icon lnr-arrow-left icon-gradient bg-happy-itmeo"></i>
              </a>
            {{ $t("attendhomework") }}
          </div>
        </div>
        <div class="p-0 card-body">
          <AttendHomework @selected-tab="get_tab" :assignment_id="assignment_id"></AttendHomework>
        </div>
      </div>
      <!--Outstanding Assignments full view END-->
         <!--Assignments view Table Start-->
    <div class="col-sm-12 col-lg-12 col-md-12 hide" id="AssignFiles" v-if="!hidetable && slideShow">
      <!-- {{assignment}} -->
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            <i @click="goback()" class="lnr-arrow-left mr-6 bold link"></i>
           {{ assignment.assignment_type }} - {{ assignment.title }}
          </div>
        </div>

            <div class="scroll-area-xl">
                <div class="p-30" v-for="(question,question_index) in assignment.questions" :key="question_index">
                   <div v-if="question.question_type=='Multiple Choice' || question.question_type=='Single Choice'">
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}}</h6>
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
                         <!--IF Question type is Paragraph-->               
                        <div v-if="question.question_type=='Paragraph'">
                           <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                           <h6 class="question"><b>Q{{question_index+1}}. </b>{{question.question|striphtml}} </h6>
                           <v-textarea class="text-black" v-model="question.answer"   auto-grow placeholder="Answer...." rows="2" row-height="20" shaped readonly></v-textarea>
                             
                        </div>
                        <!--IF Question type is Paragraph-->           
              
          </div>
        </div>
      </div>
    </div>
        <!--Instructions alert pop up-->

    <v-dialog v-model="instructionspop" persistent max-width="590">
      <v-card v-for="(instruction,instructionindex) in outstandingHomework" :key="instructionindex">
        <div v-if="instruction.id == homework_id">
          <v-card-title class="headline text-info">Instructions</v-card-title>
          <v-card-text v-if="!instruction.instructions">{{$t('no_instructions')}}</v-card-text>
          <v-card-text>{{ instruction.instructions|striphtml }}</v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <!-- {{instruction.duration}} -->
            <button
              class="btn mr-2 mb-2 btn-pill btn-secondary btn-sm"
              color="green darken-1"
              text
              @click="instructionspop = false"
            >
              Cancel
            </button>
            <button
              class="btn mr-2 mb-2 btn-pill btn-info btn-sm"
              color="green darken-1"
              text
              @click="viewall('outstanding', instruction.id, instruction.duration)"
            >
              Attend
            </button>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VueElementLoading from "vue-element-loading";
import AttendHomework from "../test/attendHomework";
export default {
  components: {
    VueElementLoading,
    AttendHomework,
  },
  props:['homeworkdue','homeworkid'],
  data: () => ({ 
    homework_id:"",
    instructionspop: false,
    assignment: [],
    slideShow: false,
    hidetable: true,
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
    loader: false,
    assignment_id: "",
    outstandingHomework: [],
    assignments: [],
    assign_id:'',
    currentDate : new Date().toJSON().slice(0,10).replace(/-/g,'-'),
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    //alert(this.user.emp_id);
    this.student_id = this.user.emp_id;
    this.fetchOutstandingHomework();
    if(this.homeworkdue=='outstanding')
    {
      this.viewall(this.homeworkdue,this.homeworkid,0);
    }
    if(this.homeworkdue=='submitted')
    {
      this.ShowAssignDetails(this.homeworkid);
    }
  },
  methods: {
     viewall: function (table, id, duration) {
      //alert('instruction');
      if (duration == 0) {
        this.instructionspop = true;
        this.homework_id = id;
        //alert(this.instructionspop);
       
      } else {
       // alert('else');
        this.instructionspop = false;
        this.showtable = table;
        this.hidetable = false;
        this.assignment_id = id;
        this.duration = duration;
        
      }
    },
     
    // viewall: function (table, id) {
    //   // alert(id);
    //   this.slideShow=false;
    //   this.showtable = table;
    //   this.hidetable = false;
    //   this.assignment_id = id;
    // },
    goback(){
       this.slideShow = false;
      this.hidetable = true;
    },
     ShowAssignDetails(assignmentid) {
      
      this.slideShow = true;
      this.hidetable = false;
      this.showtable = true;
      this.loader = true;
      this.assign_id = assignmentid;
       console.log(this.assign_id);
       console.log(this.student_id);
    //  this.studentname = this.user.name;
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
    fetchOutstandingHomework() {
      this.loader = true;
      //alert(this.student_id);
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "studentoutstandingunmarkedhomework?student_id=" +
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
     get_tab:function(){
      this.$emit("gototabs", "tab1");
    },
    gototabAttend: function () {
      this.$emit("gototab", "tab2");
    },
    gototabMarked: function () {
      this.$emit("gototab", "tab3");
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
.p-30 {
  padding: 30px;
}
</style>
