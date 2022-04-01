<template>
  <div class="row study">
    <div class="col-sm-12 col-md-5 col-xl-5">
      <!--Upcoming Classes Start-->
      <div class="card-hover-shadow-2x mb-3 card" v-if="showtable == ''">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i
              class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"
            ></i>
            {{ $t("coveredtopics") }}
          </div>
          <div
            class="btn-actions-pane-right text-capitalize actions-icon-btn text-right header-search-field"
            style="width: 200px; height: 72px"
          >
            <div class="input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="search"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="svg-inline--fa fa-search fa-w-16"
                  >
                    <path
                      fill="currentColor"
                      d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      class=""
                    ></path>
                  </svg>
                </div>
              </div>
              <input
                placeholder="Search.."
                v-model="searchCoveredTopics"
                type="text"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="scroll-area-xl homeworkCal">
          <VueElementLoading
            :active="loader"
            spinner="bar-fade-scale"
            color="var(--primary)"
          />
          <div
            class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"
            v-if="!filterCoveredTopics"
          >
            {{$t('no_details_found')}}
          </div>
          <div
            class="vertical-timeline vertical-timeline--animate vertical-timeline--one-column ml-2"
          >
            <!-- <div v-if="coveredTopics.length == 0">No Data Found</div> -->
            <div
              v-for="topicdata in filterCoveredTopics"
              :key="topicdata.id"
              class="vertical-timeline-element"
            >
              <div>
                <span class="vertical-timeline-element-icon bounce-in">
                  <i
                    class="badge badge-dot badge-dot-xl"
                    v-bind:style="
                      'background-color:' + topicdata.allocations.subject.color_code
                    "
                  ></i>
                </span>
                <div class="vertical-timeline-element-content bounce-in">
                  <h4 class="timeline-title"  v-bind:class="{'selectedrow': current ===  topicdata.id}">
                    {{ topicdata.allocations.subject.subject_name }}
                    <button
                      type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-timeline"
                      @click="
                        fetchSyllabusDetails(
                          topicdata.allocation_id,
                          topicdata.plan_date,
                          topicdata.plan_time,
                          topicdata.allocations.subject.subject_name,
                          topicdata.id
                        )
                      "
                      v-bind:class="'btn-info'"
                    >
                     {{$t(' view')}}
                    </button>
                  </h4>
                  <p
                    v-for="subTopics in topicdata.syllabus_plan_details"
                    :key="subTopics.id"
                  >
                    - {{ subTopics.topic.topic_name }}
                  </p>
                  <span class="vertical-timeline-element-date"
                    >{{ topicdata.plan_date|formatDate }}
                    <p>{{ topicdata.plan_time }}</p></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--Upcoming Classes END-->
    </div>
    <div class="col-sm-7">
      <div class="main-card mb-0">
        <b-col md="12" class="p-0">
          <!-- <h5 class="card-title">Scrollable Medium</h5> -->
          <b-card
            class="mb-3"
            no-body
            v-if="showplandetails == true"
          >
            <p class="chapter-style" >
              <!-- Topic: {{ topicdetail.topic.topic_name }} -->
              {{selectedSubjectName}}
            </p>
            <b-tabs class="card-header-tab-animation" card>
              <b-tab title="Agenda">
                <ul class="todo-list-wrapper list-group list-group-flush">
                  <li class="list-group-item">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left" >
                          <!-- <div v-for="(topicdata ,topicindex) in plannedsyllabus" :key="topicindex">
                          {{topicdata.topic.topic_name}}
                           </div> -->
                          <div class="widget-heading">
                            <i class="text-danger">{{$t('agenda')}}-</i>
                          </div>
                          <div class="widget-subheading">
                            <i class="text-focus" >
                              {{ syllabusplan.agenda | striphtml }}</i
                            >
                          </div>
                        </div>
                        <div class="widget-content-right"></div>
                      </div>
                    </div>
                  </li>
                </ul>
                <!-- <p>
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      ></quill-editor>
                    </p> -->
              </b-tab>
              <b-tab title="Notes">
                <!-- <small>Edit</small> class="scroll-area ml-3"-->
                <div  v-for="(plandetails,planindex) in plannedsyllabus" :key="planindex">
                  <ul class="todo-list-wrapper list-group list-group-flush" >
                     <h6>
                          <b v-if="plandetails.notes"> {{plandetails.topic.topic_name}}</b>
                          <a style="float: right;" v-if="plandetails.topic.slides.length" class="text-primary"  @click="showPreview(plandetails.topic.id)"> {{$t('view_slides')}}</a>
                    </h6>
                    

                
                  <!-- {{plandetails.topic.topic_name}} -->
                    <li class="list-group-item">
                      {{ plandetails.notes | striphtml }}
                    </li>
                  </ul>
                  <!-- <p>
                          <quill-editor
                            v-model="content"
                            ref="myQuillEditor"
                            :options="editorOption"
                          ></quill-editor>
                        </p> -->
                </div>
              </b-tab>
              <b-tab title="Question Bank">
                <!-- <p>Question Bank</p> -->
                <ul class="todo-list-wrapper list-group list-group-flush"  v-for="(plandetails, planindex) in plannedsyllabus" :key="planindex">
                    <h6 v-if="plandetails.topic.questions.length"> <b> {{plandetails.topic.topic_name}}</b> </h6>
                  <li class="list-group-item" v-if="plandetails.topic.questions.length">
                    <div class="todo-indicator bg-warning"></div>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                          <div class="widget-heading">
                            <div  v-for="(question, questionindex) in plandetails.topic.questions"
                              :key="questionindex">
                              <!--If Question Type is Multichoice-->
                              <div v-if="question.question_type == 'Multiple Choice'">
                                <h6>
                                  <strong
                                    >Q{{ questionindex + 1 }}.{{
                                      question.question | striphtml
                                    }}</strong
                                  >
                                </h6>
                                 <ol type="a">
                                <div class="ml-7" v-for="(options, option_index) in question.options" :key="option_index">
                                  <li><span v-if="options.is_correct_option=='Y'" class="text-success">{{ options.option_value }}</span>
                                  <span v-if="options.is_correct_option=='N'" >{{ options.option_value }}</span>
                                  </li>
                                </div>
                                </ol>
                              </div>
                              <!--If Question Type is Multichoice-->

                              <!--If Question Type is Paragraph-->
                              <div v-if="question.question_type == 'Paragraph'">
                                <p>
                                  <strong
                                    >Q{{ questionindex + 1 }}.{{
                                      question.question | striphtml
                                    }}</strong
                                  >
                                </p>
                                <!-- <v-textarea
                                  class="p-2"
                                  v-model="question.answer"
                                  auto-grow
                                  placeholder="Answer...."
                                  rows="4"
                                  row-height="30"
                                  shaped
                                  disabled
                                ></v-textarea> -->
                              </div>
                              <!--If Question Type is Paragraph-->
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </b-tab>
              <b-tab title="Videos">
                <!-- {{topicmedia}} -->
                <!-- <small>Edit</small> class="scroll-area ml-3"-->
                <div  v-for="(topicdetails,topicindex) in topicmedia" :key="topicindex">
                   <h6>
                          <b v-if="topicdetails.topic_media.length"> {{topicdetails.topic_name}}</b>
                    </h6>
                        <!-- <span v-if="!topicdetails.topic_media.length" class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4"> {{$t('no_details_found')}}</span> -->
                    <div v-for="(topicmediadata,mediaindex) in topicdetails.topic_media" :key="mediaindex">
                   
                  <ul class="todo-list-wrapper list-group list-group-flush" >
                    <li class="list-group-item">
                      <iframe  :src="topicmediadata.url" frameborder="0"></iframe>
                      <p><br></p>
                       
                    </li>
                  </ul>
                  </div>
                </div>
                <!-- <div>
                  <v-card-subtitle v-if="topicdatapresent!='Y'&& topicdataabsent=='N'" style="font-size:15px;font-weight:bold;">{{$t('no_details_found')}}</v-card-subtitle>
                </div> -->
              </b-tab>
              <!-- <b-tab title="View">
                <Preview :topic_id=118></Preview>
              </b-tab>  -->
        <v-dialog v-model="slideShow" width="980">                      
              <v-card>
                <div class="headline grey lighten-2 " style="display: flex;justify-content: space-between;" >
                    <v-card-title primary-title>Slideshow  </v-card-title>
                      <i class="lnr-cross-circle link mb-4 pt-2 pr-2" @click="slideShow = false"></i>
                </div>
                    <v-card-text>
                      <SlideshowPreview :topic_id= topicid></SlideshowPreview>
                    </v-card-text>
                    <v-divider></v-divider>
                    
              </v-card>
        </v-dialog> 
              <!-- <b-tab title="Activities">
                    <p>
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      ></quill-editor>
                    </p>
                  </b-tab>
                  <b-tab title="Recording">
                    <div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/video-icon.png" width="50" />
                        </div>
                        <div>video-recording-1.mp4</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/video-icon.png" width="50" />
                        </div>
                        <div>video-recording-2.mp4</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/video-icon.png" width="50" />
                        </div>
                        <div>video-recording-3.mp4</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/video-icon.png" width="50" />
                        </div>
                        <div>video-recording-4.mp4</div>
                      </div>
                    </div>
                    <vue-dropzone
                      ref="myVueDropzone"
                      id="dropzone"
                      :options="dropzoneOptions"
                    ></vue-dropzone>
                  </b-tab>
                  <b-tab title="Whiteboard">
                    <div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/image-icon.jpg" width="50" />
                        </div>
                        <div>img-whiteboard-1.jpeg</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/image-icon.jpg" width="50" />
                        </div>
                        <div>img-whiteboard-2.jpeg</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/image-icon.jpg" width="50" />
                        </div>
                        <div>img-whiteboard-4.jpeg</div>
                      </div>
                      <div class="media-files">
                        <div>
                          <img src="../../../../assets/images/image-icon.jpg" width="50" />
                        </div>
                        <div>img-whiteboard-4.jpeg</div>
                      </div>
                    </div>
                    <vue-dropzone
                      ref="myVueDropzone"
                      id="dropzone"
                      :options="dropzoneOptions"
                    ></vue-dropzone>
                  </b-tab> -->
            </b-tabs>
          </b-card>
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
//  import VuePerfectScrollbar from "vue-perfect-scrollbar";
import VueElementLoading from "vue-element-loading";
import axios from "axios";
import SlideshowPreview from "../contentpreview/preview";
//import AttendHomework from "../test/attendHomework"
//import Tabs from "vue-tabs-with-active-line";

const TABS = [
  {
    title: "Topic Covered",
    value: "tab1",
  },
  {
    title: "Agenda",
    value: "tab2",
  },
  {
    title: "Notes",
    value: "tab3",
  },
  {
    title: "Q's Bank",
    value: "tab4",
  },
  {
    title: "Activities",
    value: "tab5",
  },
  {
    title: "Recording",
    value: "tab6",
  },
  {
    title: "Whiteboard",
    value: "tab7",
  },
];
export default {
  components: {
    // VuePerfectScrollbar,
    VueElementLoading,
    SlideshowPreview
    //Tabs
    //AttendHomework
  },
  data: () => ({
    plannedsyllabus: [],
    loader: false,
    showtable: "",
    topicid:null,
    showplandetails:false,
    tabs: TABS,
    slideShow:false,
    currentTab: "tab1",
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
    searchCoveredTopics: "",
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

    coveredTopics: [],
    syllabusplan:[],
    topicmedia:[],
    selectedSubjectName:"",
    current:null,
    topicdatapresent:'',
    topicdataabsent:"N",
    items: ["English", "Science", "Maths"],
    items1: ["Jan", "Feb", "Mar"],
  }),

  mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
    this.student_id = this.user.emp_id;
    this.initialize();
  },
  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    viewall: function (table) {
      this.showtable = table;
    },
    gototabAttend: function () {
      this.$emit("gototab", "tab2");
    },
    gototabMarked: function () {
      this.$emit("gototab", "tab3");
    },
    setBadgeClass: function (val) {
      let bagdeClass;
      if (val == "SCIENCE") {
        bagdeClass = "badge-warning";
      } else if (val == "MATHS") {
        bagdeClass = "badge-primary";
      } else if (val == "ENGLISH") {
        bagdeClass = "badge-success";
      } else if (val == "SOCIAL") {
        bagdeClass = "badge-info";
      } else {
        bagdeClass = "badge-danger";
      }
      return bagdeClass;
    },
    initialize() {
      this.loader = true;
      //RECENT CLASSES
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "completed_classes?student_id=" +
            this.student_id+"&academic_year="+this.academic_year
        )
        .then((response) => {
          console.log(response.data.upcoming_classes);
          this.coveredTopics = response.data.completed_classes;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showPreview(topic_id){
      this.slideShow=true;
      this.topicid = topic_id;
    },
    fetchSyllabusDetails(allocationid, plandate, plantime,subjectname,id) {
      this.current = id;
      this.showplandetails = true;
      this.selectedSubjectName = subjectname+" - "+plandate+" "+plantime;
      this.loader = true;
      // this.syllabusloader=true;
      // this.showmessage=true;
      this.allocation_id = allocationid;
      this.plan_time = plantime;
      this.plan_date = plandate;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetchsyllabusplan", {
          params: {
            user_id: this.user.emp_id,
            allocation_id: allocationid,
            plan_date: plandate,
            plan_time: plantime,
            academic_year:this.academic_year
          },
        })
        .then((response) => {
          console.log(response.data);
          this.plannedsyllabus = response.data.syllabusplan.syllabus_plan_details;
          this.syllabusplan = response.data.syllabusplan;
          this.topicmedia = response.data.topic_medialist;
          let topic_object = this.topicmedia;
              topic_object.map((item)=>{
                  if(item.topic_media.length!=0)
                {
                    this.topicdatapresent='Y';
                    this.topicdataabsent='Y';
                }
                else
                {
                   this.topicdataabsent='N';
                   this.topicdatapresent='N';
                } 
                     
                  })
                
                    
          //this.topicslides = response.data.topic_slides;
          this.loader = false;
          this.syllabusloader = false;
          this.showmessage = false;
        });
    },
  },
  computed: {
  // filterCoveredTopics() {
  //   //alert('test');
  //   if(this.searchCoveredTopics){
  //     return this.coveredTopics.filter(topicdata => {
  //       return topicdata.allocations.subject.subject_name.toLowerCase().includes(this.searchCoveredTopics.toLowerCase())  
  //     })
  //   }
  //   else
  //     {
  //         return this.coveredTopics;
  //     }
  //   },

  filterCoveredTopics() {
    const search = this.searchCoveredTopics.toLowerCase().trim();
    if (!search) return this.coveredTopics;
      return this.coveredTopics.map(item => {
        return {
          ...item,
          syllabus_plan_details: item.syllabus_plan_details.filter(subtopics => {
            return subtopics.topic.topic_name.toLowerCase().includes(search);
          
        }),
      }
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

.btn.btn-pill.btn-wide,
.btn.btn-pill {
  font-size: 12px !important;
}

.scroll-area-md.homeworkCal {
  height: 350px;
}
.btn-timeline {
  position: absolute;
  right: 10px;
}
.v-text-field.v-text-field--solo .v-input__control {
  max-height: 30px !important;
}
.coveredTopic-details {
  min-height: 406px;
}
.header-select {
  font-size: 13px;
  height: 32px;
  width: 100px;
  margin-top: 19px;
  display: inline;
  margin-left: 2px;
}
.media-files {
  font-size: 12px;
  text-align: center;
  width: 150px;
  float: left;
  padding: 0 10px;
}

.chapter-style {
  font-size: 17px;
  padding: 9px 14px;
  margin: 12px 0px;
  color: #444054;
  background: #e7ecf8;
  font-weight: 500;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
}
.selectedrow {
  cursor:pointer;
  padding:0 0 3px 0;
  color:#3f6ad8;
}
</style>
