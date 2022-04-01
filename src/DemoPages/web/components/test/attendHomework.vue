<template>
  <div class="row m-2">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{
          $t("do_wish_to_submit")
        }}
        </v-card-title>
    <!-- <v-card-text v-if="questionscount == student_attend_count"></v-card-text> -->
    <v-card-text v-if="questionscount != student_attend_count">
          {{ $t("you_were_attended") }} {{ questionscount - student_attend_count }}
          {{ $t("question") }}
          {{ $t("confirmation_to_submit") }}
        </v-card-text>
        <!-- <v-card-text>
        
              <div class="col-sm-12 col-lg-12">
                <div class="card-hover-shadow-2x mb-3 card" style="height:200px">
                  <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
                      <i class="header-icon lnr-graduation-hat icon-gradient bg-ripe-malin"></i>
                      {{ $t("attended") }}
                    </div>
                  </div>
                  <div class="scroll-area-lg homeworkpopup">
                    <div class="chat-wrapper p-1">
                      <table class="table-bordered marks-table">
                        <tr>
                          <th class="text-center">{{ $t("question") }}</th>
                          <th class="text-center"></th>
                        </tr>
                      <tr>
                        <td v-for="(questionsattended,cindex) in questionsdata" :key="cindex">
                        <tr v-for="(attended, qindex) in questionsattended" :key="qindex">
                          <th class="text-center">Q{{ qindex+1  }}</th>
                          
                          <td>
                            <span
                              v-if="attended.question_attended_status == 'Y'"
                              class="text-success lnr-checkmark-circle"
                              style="font-weight: 600;"></span
                            >
                            <span v-if="attended.question_attended_status == null">-</span>
                          </td>
                        </tr>
                        </td>
                        </tr>
                        <caption class="text-center">
                          <b>{{$t('total_attended')}}:</b>
                          {{
                            student_attend_count
                          }}/{{
                            questionscount
                          }}
                        </caption>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
       
    </v-card-text> -->
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialog = false">{{ $t("cancel") }}</v-btn>
          <v-btn color="primary" text @click="submitAssignment">{{ $t("submit") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--Mark Assignments Table Start-->
    <div class="col-sm-12 col-lg-10">
      <!--Error Message Start-->
      <!-- <Alerts
        :response_message="message"
        :success="is_success"
        :error="is_error"
        v-if="message != ''"
      ></Alerts> -->
      <!-- <v-alert outlined :value="is_success" color="success" icon="lnr-checkmark-circle">
               {{ message }}
            </v-alert>
            <v-alert :value="is_error" color="error" icon="lnr-warning" outlined> {{ message }} </v-alert> -->
      <!--Error Message End-->
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div
            class="card-header-title font-size-sm text-capitalize font-weight-normal algn-equal"
          >
            <span
              ><i class="lnr-book icon-gradient bg-malibu-beach"></i
              ><b>{{ assignment.assignment_type }} - {{ assignment.title }} </b></span
            >
            <span v-if="assignment.scheduled_date_time"
              ><b>{{ $t("publisheddate") }}:</b>
              {{ assignment.scheduled_date_time | formatDateTime }}</span
            >
            <span
              ><b>{{ $t("duedate") }}:</b> {{ assignment.due_date | formatDate }}</span
            >
          </div>
        </div>


        <VueElementLoading
          :active="loader"
          spinner="bar-fade-scale"
          color="var(--primary)"
        />

          <v-carousel height="500" show-arrows-on-hover :autoplay="false">
            <template v-slot:prev="{ on, attrs }">
                <v-btn :disabled="validated == false"
                  color="primary"
                  v-bind="attrs"
                  fab
                  v-on="on"
                 small
                ><v-icon dark>
            mdi-arrow-left
          </v-icon></v-btn>
                  </template>
                  <template v-slot:next="{ on, attrs }">
                    <v-btn  :disabled="validated == false"
                      color="primary"
                      fab
                      v-bind="attrs"
                      v-on="on"
                      small
                    ><v-icon dark>
            mdi-arrow-right
          </v-icon></v-btn>
              </template>
            <v-carousel-item v-for="(question, questionindex) in questions" :key="questionindex">
                <v-sheet height="100%">
                <v-row class="fill-height mt-4" align="top" justify="center" style="color:#000 !important">
                <!--IF Question type is Multichoice-->
                          <div v-if="question.question_type == 'Multiple Choice'" class="question-container">
                            <h6 class="question">
                              <b>Q{{ questionindex + 1 }}. </b>{{ question.question | striphtml }}
                              <b style="float: right">{{ question.marks }} {{ $t("marks") }}</b>
                            </h6>
                            <div>
                              <div
                                v-for="(options, option_index) in question.options"
                                :key="option_index"
                              >
                                <v-checkbox
                               
                                  v-model="options.is_selected_option"
                                  :label="options.option_value"
                                  value="Y"
                                  color="success"
                                
                                  @click="submitAnswer(question,null)"
                                ></v-checkbox>
                              </div>
                            </div>
                            <!-- <div style="display: flex; justify-content: flex-end; align-items: flex-end">
                              <button
                                class="btn mr-2 mb-2 btn-pill btn-info btn-sm"
                                @click="submitAnswer(question)"
                              >
                                {{ $t("save") }}
                              </button>
                            </div> -->
                            <div class="row"  style="float: right;" v-if="question.marks">
                              <div class="selfeval">
                                <h6>{{ $t("expected_marks") }}</h6>
                                <input label="" class="expectedmarks pl-3 centered-input" :class="{'active': questionindex == activeIndex}" :rules="numberRules" v-model.trim="question.self_evaluated_marks"  @change="submitAnswer(question,null)" @blur="submitAnswer(question,null)" v-on:keyup="checkval(questionindex,question.marks,question.self_evaluated_marks)">
                              </div> 
                            </div> 
                          </div>
                          <!--IF Question type is Multichoice-->

                          <!--IF Question type is Paragraph-->
                          <div v-if="question.question_type == 'Paragraph'" class="question-container">
                            <!-- {{question.marks}} -->
                            <h6 class="question">
                              <b>Q{{ questionindex + 1 }}. </b>{{ question.question | striphtml }}
                              <b style="float: right">{{ question.marks }} {{ $t("marks") }}</b>
                            </h6>
                            <v-textarea
                              v-model="question.answer"
                            
                              placeholder="Answer...."
                              rows="4"
                              row-height="70"
                              @change="submitAnswer(question,null)"
                              @blur="submitAnswer(question,null)"
                              shaped
                            ></v-textarea>
                            <!-- <div style="display: flex; justify-content: flex-end; align-items: flex-end">
                              <button
                                class="btn mr-2 mb-2 btn-pill btn-info btn-sm"
                                @click="submitAnswer(question)"
                                //v-on:input="submitAnswer(question)"
                              >
                                {{ $t("save") }}
                              </button>
                            </div> -->
                            <div class="row" style="float: right;" v-if="question.marks">
                                <div class="selfeval">
                                  <h6>{{ $t("expected_marks") }}</h6>
                                  <input class="expectedmarks  pl-3 centered-input" :class="{'active': questionindex == activeIndex}" label=""  :rules="numberRules" v-model.trim="question.self_evaluated_marks"    @change="submitAnswer(question,null)" @blur="submitAnswer(question,null)" v-on:keyup="checkval(questionindex,question.marks,question.self_evaluated_marks)">
                                </div> 
                            </div> 
                          </div>
                          <!--IF Question type is Paragraph-->
                          <div v-if="question.question_type == 'Upload'" class="question-container">
                            <h6 class="question">
                              <b>Q{{ questionindex + 1 }}. </b>{{question.question|striphtml}}
                              <b style="float: right"><a :href="file_download_url+question.question_file" download style="margin-right: 10px;color:#49ccea !important"> {{$t('download')}}</a> {{ question.marks }} {{ $t("marks") }}</b>
                            </h6> 
                            <div style="display: flex;align-items: center;">
                          <div style="top: 42px;left: 122px;">
                            <uploadfile @file-url="fileurl" ></uploadfile>
                          </div>
                          {{question.answer_file}}
                          <div style="float: right;">
                            <button class="btn btn-primary btn-sm"  @click="submitAnswer(question,fileurldata)">{{$t('upload')}}</button>
                            </div>
                            </div>
                            <div class="row" style="float: right;margin-top:30px" v-if="question.marks">
                              <div class="selfeval" >
                                <h6>{{ $t("expected_marks") }}</h6>
                                <input label="" class="expectedmarks  pl-3 centered-input"  :class="{'active': questionindex == activeIndex}" :rules="numberRules" v-model.trim="question.self_evaluated_marks" @change="submitAnswer(question,null)" @blur="submitAnswer(question,null)"  v-on:keyup="checkval(questionindex,question.marks,question.self_evaluated_marks)">
                              </div> 
                            </div> 
                          </div>
                          <!-- {{questions}} -->
                               <!--IF Question type is Singlechoice-->
                          <div v-if="question.question_type == 'Single Choice'" class="question-container">
                            <h6 class="question">
                              <b>Q{{ questionindex + 1 }}. </b>{{ question.question | striphtml }}
                              <b style="float: right">{{ question.marks }} {{ $t("marks") }}</b>
                            </h6>
                            <div>
                              <div
                                v-for="(options, option_index) in question.options"
                                :key="option_index"
                              >
                                <!-- <v-checkbox
                                
                                  v-model="options.is_selected_option"
                                  :label="options.option_value"
                                  value="Y"
                                  color="success"
                                  background-color="#e3e3e3"
                                  @click="submitAnswer(question,null)"
                                ></v-checkbox>
                                  <input id="option"
                                      type="radio"
                                      v-model="options.is_selected_option"
                                      value="Y" name="options"   @click="submitAnswer(question,null,this)"
                                    /> -->
                                    <input id="option"
                                      type="radio" class="mr-2"
                                      :value="options.is_selected_option" :checked="options.is_selected_option=='Y'"
                                       :name="question.id" @click="onChangeOption(question.id,options.id, $event)"   
                                    />
                                    <label for="option">{{options.option_value}}</label><br>
                               <!-- <input type="radio" name="options" id="option" :value="correct" v-model="options.is_selected_option">
                                <label for="option">{{options.option_value}}</label>
                               
                                <span>Picked: {{ options.is_selected_option }}</span> -->
                              </div>
                            </div>
                            <!-- <div style="display: flex; justify-content: flex-end; align-items: flex-end">
                              <button
                                class="btn mr-2 mb-2 btn-pill btn-info btn-sm"
                                @click="submitAnswer(question)"
                              >
                                {{ $t("save") }}
                              </button>
                            </div> -->
                            <div class="row"  style="float: right;" v-if="question.marks">
                              <div class="selfeval">
                                <h6>{{ $t("expected_marks") }}</h6>
                                <input label="" class="expectedmarks pl-3 centered-input" :class="{'active': questionindex == activeIndex}" :rules="numberRules" v-model.trim="question.self_evaluated_marks"  @change="submitAnswer(question,null)" @blur="submitAnswer(question,null)" v-on:keyup="checkval(questionindex,question.marks,question.self_evaluated_marks)">
                              </div> 
                            </div> 
                          </div>
                          <!-- if question type single choice -->

                </v-row>
                </v-sheet>
            </v-carousel-item>
          </v-carousel>






    
        <!--Submit Assignment Button start-->
        <div style="display: flex; justify-content: center" class="mt-3" v-if="questions.length > 0">
          <button class="btn mr-2 mb-2 btn-pill btn-primary" @click="validationsubmit">
            {{ $t("submitassignment") }}
          </button>
        </div>
        <!--Submit Assignment Button end-->
      </div>
    </div>
    <!--Mark Assignments Table End-->
    <!--Comments Section-->
    <div class="col-sm-12 col-lg-2">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon lnr-graduation-hat icon-gradient bg-ripe-malin"></i>
            {{ $t("attended") }}
          </div>
        </div>
        <div class="scroll-area-lg attendHomework">
          <div class="chat-wrapper p-1">
            <table class="table-bordered marks-table">
              <tr>
                <th class="text-center">{{ $t("question") }}</th>
                <th class="text-center"></th>
              </tr>

              <tr v-for="(attended, qindex) in questions" :key="qindex">
                <th class="text-center">Q{{ qindex + 1 }}</th>
                <!-- <th class="text-center"> student_attend_count{{ questions.length }}</th> -->
                <td>
                  <span
                    v-if="attended.question_attended_status == 'Y'"
                    class="text-success lnr-checkmark-circle"
                    style="font-weight: 600;"></span
                  >
                  <span v-if="attended.question_attended_status == null">-</span>
                </td>
              </tr>
              <caption class="text-center">
                <b>{{$t('total_attended')}}:</b>
                {{
                  student_attend_count
                }}/{{
                  questionscount
                }}
              </caption>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!--Comments Section-->
  </div>
</template>
<script>
import Vue from "vue";
import VueElementLoading from "vue-element-loading";
import uploadfile from "../uploadfiles/upload_file";
import FlashMessage from "@smartweb/vue-flash-message";
Vue.use(FlashMessage);

import axios from "axios";
export default {
  components: {
  
    VueElementLoading,
    uploadfile,
   
  },
  props: ["assignment_id"],
  data: () => ({
    correct:"Y",
    file_download_url:process.env.VUE_APP_API_URL_STAFF_FILEPATH,
    staffapi_url:process.env.VUE_STAFF_BASE_URL,
    heading: "Analytics Dashboard",
    subheading:
      "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure",
    search: "",
    dialog: false,
    assignment_status: "",
    searchstudent: "",
    subject: "All Subjects",
    validated:true,
    activeIndex:"",
    colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
        picked:'',
    student_question: "",
    student_attend_count: 0,
    is_success: false,
    is_error: false,
    message: "",
    loader: false,
    slideShow: false,
    questions: [],
    student_answers: [],
    assignment: [],
    user: {},
    questionscount: 0,
    fileurldata:null,
    attachedfilename:'',
    itemsPerRow: 5,
    //showupload:false,
      numberRules:[
         // (v) => !!v || "Marks field is required",
        (v) =>  v >= 0 && v <= 999999999999 || "Please enter valid marks",
       ],
  }),
  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.student_id = this.user.emp_id;
    // alert(this.student_id);
    this.viewAssignment();
    // this.removeTheme();
    
  },
    //     computed: {
    //     questionsdata() {
    //         return lodash.chunk(Object.values(this.questions), this.itemsPerRow);
    //     }
    // },
  methods: {
    checkval(index,maxmarks,expmarks)
    {
        if(expmarks>maxmarks)
        {
          // alert(index)
              // this.activeIndex = index;
              this.validated=false;
              this.flashMessage.error({
              message: 'Cannot exceed maximum marks',
              time: 1000,
              blockClass: "custom-block-class",
            });
        }
        else{
          this.validated=true;
          this.activeIndex =null;
        } 
    },
    fileurl(filepath,filename){
     //== alert(filename);
      this.attachedfilename = filename;
      this.fileurldata = filepath.replace(/^.*[/]/, ''); 
    },
     onChangeOption (questionid,optionid) {
       let questionsdata= this.questions;
       questionsdata.map((question)=>{
        if(question.question_type =='Single Choice' && question.id==questionid){
          let data =[];
          data = question.options;
          data.map((res) =>{
            if (res.id === optionid) {
                    res['is_selected_option'] = 'Y';
                    this.submitAnswer(question,null);
                } else {
                    res['is_selected_option'] = 'N';
                }
              }) 
          }
          else{
            console.log(JSON.stringify(question.options) +'question else');
            //return 0;
          }
       
        // alert('questions array')
        //  let optionsdata=question.options;  
        //  console.log(optionsdata +'optionsdata');
        //   optionsdata.map((option)=>{
        //   alert(option.id)
        //   if (option.id === id) {
        //     Vue.set(option, 'value', $event.target.checked);
        //   } else {
        //     Vue.set(option, 'value', false)
        //   }
        // })
      })
    },
    submitAnswer(questions,fileurldata) {
      // alert(JSON.stringify(questions));
      // alert(document.querySelector('input[name=options]:checked').value = 'Y');
      this.student_answers = questions;
      this.student_answers.answer_file = fileurldata;
      // if(maxval)
      // {
      //   this.student_answers.self_evaluated_marks=null;
      // }
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "attendassignment", {
          student_id: this.student_id,
          assignments: this.student_answers
        })
        .then((res) => {
          //  if (Array.isArray(res.data.message)) {
          //   this.array_data = res.data.message.toString();
          // } else {
          //   this.array_data = res.data.message;
          // }
          //  if(res.data.status == 'E') {
          //     this.flashMessage.error({
          //         title: res.data.title, 
          //         message: this.array_data,
          //         time: 4000,
          //         blockClass: 'custom-block-class',
          //     });
          //     this.loader=false;
          //   }else {
          //   this.flashMessage.success({
          //     title: res.data.title,
          //     message: this.array_data,
          //     time: 1000,
          //     blockClass: "custom-block-class",
          //   });
          //     //console.log(res.data.assignments);
          
          // this.loader = false;
          // }
          this.student_question = res.data.studentquestion;
          //this.student_attend_count = res.data.total_question_count;
          this.viewAssignment();
          //console.log('studentquestion.........');
          console.log(res.data.studentquestion);
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    validationsubmit() {
      this.dialog = true;
    },
    
    submitAssignment() {
      
      this.dialog = false;
      //alert("welcome");
      this.is_success = "";
      this.is_error = "";
      this.message = "";
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "student_assignment_status", {
          assignment_id: this.assignment_id,
          student_id: this.student_id,
        })
        .then((res) => {
          if (Array.isArray(res.data.message)) {
            this.array_data = res.data.message.toString();
          } else {
            this.array_data = res.data.message;
          }
          if (res.data.status == "E") {
            this.flashMessage.error({
              title: res.data.title,
              message: this.array_data,
              time: 1000,
              blockClass: "custom-block-class",
            });
            this.loader = false;
          } else {
            this.flashMessage.success({
              title: res.data.title,
              message: this.array_data,
              time: 1000,
              blockClass: "custom-block-class",
            });
            this.assignment_status = res.data.message;
            this.loader = false;
           // this.$router.push("/components/myhomework");
            this.$emit('selected-tab','tab1');
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },

    viewAssignment() {
      
     
      this.message = "";
      this.loader = true;
      this.assign_id = this.assignment_id;
      //alert(this.assign_id);
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "student_edit_assignment", {
          assignment_id: this.assignment_id,
          student_id: this.student_id,
        })
        .then((res) => {
          this.assignment.userid = this.user.id;
          if (Array.isArray(res.data.message)) {
            this.array_data = res.data.message.toString();
          } else {
            this.array_data = res.data.message;
          }
          if (res.data.status == "E") {
              this.flashMessage.error({
              title: res.data.title,
              message: this.array_data,
              time: 1000,
              blockClass: "custom-block-class",
            });
            
            this.loader = false;
          } else {
            this.questions = res.data.assignments.questions;
            this.questionscount = res.data.assignments.questions_count;
            this.student_attend_count = res.data.assignments.questions_attended_count;
            this.assignment = res.data.assignments;
            console.log(res.data.assignments), (this.loader = false);
            this.loader = false;
            
          }
        })
        .catch((err) => {
          console.log("this error" + err);
        });

    },
    handleClick(newTab) {
      this.currentTab = newTab;
    }
  },
};
</script>
<style scoped>
.centered-input >>> input {
    text-align: center
  }
.expectedmarks
{
  width:80px;
 border:none;border-bottom: 1px solid grey;
}
.active >>> .v-text-field__slot input { 
 border-bottom: solid #000 3px!important;
}
input:focus{outline: none !important;border:none !important;border-bottom: 1px solid grey  !important;}
.selfeval{ position: relative;bottom: 0px;z-index: 99999;display:flex;justify-content: space-between;align-items: baseline;text-align:center;}
.question {
  background: rgb(3 3 3 / 55%);
  padding: 8px;
  color:#fff !important;
}
.v-window__prev{top:30px !important}
.theme--dark.v-sheet {
    background-color: #fff;
    border-color: #1E1E1E;
    color: #000;
}
.v-application .indigo {
    background-color: #fcfcfc !important;
    border-color: #757ca1 !important;
}
.np {
  padding: 0px;
}
.algn-equal {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 100%;
}
.show {
  display: block !important;
}
.search-with-title {
  margin: 9px auto 9px 10px;
}
.hide {
  display: none !important;
}
.p-30 {
  padding: 30px;
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
.marks-table {
  width: 100%;
}
.marks-table > tr > td {
  padding: 10px;
}
.v-application p {
  margin-bottom: 16px;
  border: 1px solid #d7d7d7;
  padding: 20px;
}
.scroll-area-lg.attendHomework {
  height: 500px;
}
.scroll-area-md.homeworkpopup {
 height: 500px;
}
._vue-flash-msg-body_success,._vue-flash-msg-body,._vue-flash-msg-_right-bottom
   /* ._vue-flash-msg-body__content*/ {
  z-index: 10000 !important;
}
.v-textarea--auto-grow textarea{overflow-y: auto;}
.question-container{margin:0px 60px;width:80%}
.v-textarea >>> .v-input__slot{height:300px;caret-color: #000 !important;}
.v-textarea >>> .v-input__slot:before{border-color: #000 !important;}
.v-text-field >>> .v-input__slot:before{border-color:  #000  !important;}
.v-text-field >>> .v-input__slot{caret-color: #000 !important;}
.v-textarea >>> textarea{color: rgb(9 9 9 / 70%) !important;height:300px}
.v-text-field >>> .v-text-field__slot >>> input{outline:border !important;color:#000 !important}
.v-text-field >>> .v-text-field__slot >>> input:focus {outline:border !important;color:#000 !important}
.v-text-field >>> .v-text-field__slot >>> input:active {outline:border !important;color:#000 !important}
.v-text-field >>> input{color: rgb(9 9 9 / 70%) !important;height:300px}
.v-checkbox >>> label{color:#000 !important}
.v-text-field >>>.v-label{color:#000 !important}
.v-text-field >>> .v-input__control >>> .v-input__slot:after{border-color:  #000 !important;}
.v-text-field > .v-input__control > .v-input__slot:after{border-color:  #000 !important;}
.theme--dark>>>.v-icon{color: #080101 !important;}
.theme--dark>>>.v-label{color: #080101 !important;}
.theme--dark>>>.v-text-field >>> .v-input__control >>> .v-input__slot:before{border-color:  #000 !important;}
.v-text-field >>> .v-input__control >>> .v-input__slot:after{border-color:#080101 !important;;}
.theme--dark >>> .v-input textarea{color:  #000 !important;}
.v-input input:focus, .v-input input:active, .v-input textarea:focus, .v-input textarea:active{outline:#000 !important}
</style>
