<template>
  <div class="col-sm-12 np">
    <!--Unit Tab start-->

    <div class="top-selection">
      <b-dropdown
        toggle-class="p-0 mr-2"
        menu-class="dropdown-menu-xl"
        variant="link"
        no-caret
        left
      >
        <button slot="button-content" class="sub-button bg-primary">
          {{ sub }} &nbsp;&nbsp;&nbsp;<i
            style="padding-left: 5px"
            class="pe-7s-angle-down-circle"
          ></i>
        </button>
        <div class="move-right">
          <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner bg-secondary">
              <div class="menu-header-image"></div>
              <div class="menu-header-content text-white">
                <h5 class="menu-header-title">Choose you subject below</h5>
              </div>
            </div>
          </div>
          <div class="grid-menu grid-menu-xl grid-menu-3col">
            <div class="no-gutters row">
              <div
                class="col-sm-6 col-xl-4 bg-warning subjects"
                @click="Subject('Science (4th - Sec B)')"
              >
                <button
                  class="btn-icon-vertical btn-square btn-transition btn btn-outline-link"
                >
                  <i
                    class="pe-7s-notebook icon-gradient btn-icon-wrapper btn-icon-lg mb-3"
                  ></i
                  >Science <br />(4th - Sec B)
                </button>
              </div>
              <div
                class="col-sm-6 col-xl-4 bg-primary subjects"
                @click="Subject('Maths (5th - Sec A)')"
              >
                <button
                  class="btn-icon-vertical btn-square btn-transition btn btn-outline-link"
                >
                  <i
                    class="pe-7s-notebook icon-gradient btn-icon-wrapper btn-icon-lg mb-3"
                  ></i
                  >Maths<br />(5th - Sec A)
                </button>
              </div>
              <div
                class="col-sm-6 col-xl-4 bg-warning subjects"
                @click="Subject('Science (1st - Section B)')"
              >
                <button
                  class="btn-icon-vertical btn-square btn-transition btn btn-outline-link"
                >
                  <i
                    class="pe-7s-notebook icon-gradient btn-icon-wrapper btn-icon-lg mb-3"
                  ></i
                  >Science <br />(1st - Section B)
                </button>
              </div>
            </div>
          </div>
        </div>
      </b-dropdown>
    </div>
    <div>
      <b-row>
        <!--Day1 Classes start-->
        <b-col md="4">
          <div class="col-md-12 np" v-for="items in Syllabus" :key="items.part_name">
            <div class="mb-3 card">
              <div class="card-header-tab card-header bg-focus text-white">
                <div
                  class="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  <i class="header-icon lnr-book icon-gradient bg-happy-itmeo"></i>
                  {{ items.part_name }}
                </div>
                <div class="btn-actions-pane-right">
                  <div role="group" class="btn-group-sm btn-group">
                    <button
                      class="btn-shadow btn btn-focus active"
                      @click="AddTopic(items.part_name)"
                    >
                      Add Topic
                    </button>
                  </div>
                </div>
              </div>
              <div class="scroll-area-sm pl-2 pr-1">
                <VuePerfectScrollbar class="scrollbar-container" v-once>
                  <div
                    class="p-0 card-body"
                    v-for="chapter in items.Chapter"
                    :key="chapter"
                  >
                    <h2 class="chapter-style">
                      {{ chapter.chapter_name }}
                    </h2>
                    <ul
                      class="rm-list-borders rm-list-borders-scroll list-group list-group-flush"
                      v-for="topicslist in chapter.topics"
                      :key="topicslist.topic_id"
                    >
                      <li class="list-group-item">
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left">
                              <a @click="getTopic(topicslist.topic_name)"
                                ><div class="widget-heading link"></div>
                                <i class="pe-7s-angle-right"></i>
                                {{ topicslist.topic_name }}</a
                              >
                            </div>
                            <div class="widget-content-right"></div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </VuePerfectScrollbar>
              </div>
            </div>
          </div>
        </b-col>
        <!--Day1 Classes End-->
        <!--Day1 Classes start-->
        <b-col md="8">
          <div class="col-md-12 np" v-if="AddTopicrow">
            <div class="mb-3">
              <div class="card-header-tab card-header">
                <div
                  class="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  <i class="header-icon lnr-book icon-gradient bg-happy-itmeo"></i>
                  Syllabus for - {{ sub }}
                </div>

                <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                  <button
                    class="btn-shadow btn-wide btn btn-focus btn-sm"
                    @click="showAddPart"
                  >
                    Add Part
                  </button>
                  <!-- <button
                    class="btn-shadow btn-wide btn btn-focus btn-sm"
                    @click="AddChapterbtn"
                  >
                    Add Chapter
                  </button> -->
                </div>
              </div>
              <div class="p-0 card-body">
                <b-card class="mb-3 p-3" no-body>
                  <!--Add Part start-->
                  <v-row align="center" v-if="showPart">
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="6">
                      <v-text-field v-model="partname" label="Part Name"></v-text-field>
                    </v-col>
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="6">
                      <button class="btn btn-primary" @click="addPart(partname)">
                        Add Part
                      </button>
                    </v-col>
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="12">
                      <button class="btn btn-primary" @click="AddChapterbtn">
                        Add Chapter
                      </button>
                    </v-col>
                  </v-row>
                  <!--Add Part start-->
                  <!--Add Chapter start-->
                  <v-row align="center" v-if="showChapter">
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="6">
                      <v-text-field
                        v-model="chaptername"
                        label="Chapter Name"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="6">
                      <v-select
                        :items="items1"
                        v-model="Unit"
                        label="Select Part"
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="12">
                      <button class="btn btn-primary" @click="addChapter(chaptername)">
                        Add
                      </button>
                      <a @click="AddTopic">Add Topic</a>
                    </v-col>
                  </v-row>
                  <!--Add Chapter start-->
                  <!--Add Topic start-->
                  <v-row align="center" v-if="showTopic">
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="3">
                      <v-text-field v-model="topicname" label="Topic Name"></v-text-field>
                    </v-col>
                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="3">
                      <v-select
                        :items="items"
                        v-model="chapter"
                        label="Select Chapter"
                      ></v-select>
                    </v-col>

                    <v-col class="d-flex pt-0 pb-0" cols="12" sm="2">
                      <button class="btn btn-primary" @click="addTopic(topicname)">
                        Add
                      </button>
                    </v-col>
                  </v-row>
                  <!--Add Topic start-->
                </b-card>
              </div>
            </div>
          </div>
          <div class="col-md-12 np" v-if="showeditor">
            <div class="mb-3">
              <div class="card-header-tab card-header">
                <div
                  class="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  <i class="header-icon lnr-book icon-gradient bg-happy-itmeo"></i>
                  Create Notes For - {{ topicname }}
                </div>
              </div>
              <div class="p-0 card-body">
                <b-card class="mb-3" no-body>
                  <b-tabs card>
                    <b-tab title="Agenda" active>
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <button class="btn btn-primary mt-2">Submit</button>
                    </b-tab>
                    <b-tab title="Notes">
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <button class="btn btn-primary mt-2">Submit</button>
                    </b-tab>
                    <b-tab title="Class Content">
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <button class="btn btn-primary mt-2">Submit</button>
                    </b-tab>
                    <b-tab title="Question Bank">
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      >
                      </quill-editor>
                      <button class="btn btn-primary mt-2">Submit</button>
                    </b-tab>
                  </b-tabs>
                </b-card>
              </div>
            </div>
          </div>
        </b-col>
        <!--Day1 Classes End-->
      </b-row>
    </div>
    <!--Unit Tab End-->
    <v-dialog v-model="dialog" max-width="490">
      <v-card>
        <v-card-title class="headline text-success">Success</v-card-title>
        <v-card-text> Your topics has been added successfuly </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
//  import draggable from 'vuedraggable';
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    VuePerfectScrollbar,
    //     draggable,
    quillEditor,
  },
  data: () => ({
    heading: "Accordions",
    subheading: "Accordions represent collapsable component with extended functionality.",
    icon: "pe-7s-diamond icon-gradient bg-warm-flame",
    text: `
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry
        richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor
        brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
        tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore
        wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher
        vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic
        synth nesciunt you probably haven't heard of them accusamus labore VHS.
      `,
    editorData: "<p>Content of the editor.</p>",
    editorConfig: {
      // The configuration of the editor.
    },
    topicname: "",
    content:
      "" +
      "<h1>This is a heading</h1><br><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>\n" +
      "\n" +
      "<p>Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.</p>\n" +
      "\n" +
      "<p>In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.</p>\n" +
      "\n" +
      "<p>Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iac</p>",
    editorOption: {
      // some quill options
    },
    showChapter: false,
    showPart: false,
    showTopic: false,
    AddTopicrow: true,
    showeditor: false,
    Unit: [],
    sub: "Science - Section 1",
    date: new Date().toISOString().substr(0, 10),
    taboption: "Day",
    list: [
      {
        id: 1,
        name: "Topic 1",
        sport: "basket",
      },
      {
        id: 2,
        name: "Topic 2",
        sport: "foot",
      },
      {
        id: 3,
        name: "Topic 3",
        sport: "volley",
      },
      {
        id: 4,
        name: "Topic 4",
        sport: "rugby",
      },
    ],

    Syllabus: [
      {
        part_id: "1",
        part_name: "Part 1",
        Chapter: [
          {
            chapter_id: "1",
            chapter_name: "Chapter 1",
            topics: [
              {
                topic_id: "1",
                topic_name: "Balancing Of Chemical Reactions",
              },
              {
                topic_id: "2",
                topic_name: "Types Of Chemical Reactions",
              },
            ],
          },
          {
            chapter_id: "2",
            chapter_name: "Chapter 2",
            topics: [
              {
                topic_id: "3",
                topic_name: "Corrosion And Rancidity",
              },
            ],
          },
        ],
      },
      {
        part_id: "2",
        part_name: "Part 2",
        Chapter: [
          {
            chapter_id: "3",
            chapter_name: "Chapter 3",
            topics: [
              {
                topic_id: "4",
                topic_name: "Balancing Of Chemical Reactions",
              },
            ],
          },
        ],
      },
      {
        part_id: "3",
        part_name: "Part 3",
        Chapter: [
          {
            chapter_id: "4",
            chapter_name: "Chapter 4",
            topics: [
              {
                topic_id: "5",
                topic_name: "Introduction To Chemical Reactions",
              },
            ],
          },
        ],
      },
    ],
    dragging: false,
    dialog: false,
  }),
  methods: {
    AddTopic() {
      this.showChapter = false;
      this.showPart = false;
      this.showTopic = true;
      this.showeditor = false;
      this.AddTopicrow = true;
    },
    AddChapterbtn() {
      this.showChapter = true;
      this.showPart = false;
      this.showTopic = false;
    },
    showAddPart() {
      this.showPart = true;
      this.showChapter = false;

      this.showTopic = false;
    },
    addChapter(val) {
      //  console.log(val);
      this.items.push(val);
      // console.log(this.items1);
      this.dialog = true;
    },
    addPart(val) {
      //  console.log(val);
      this.Syllabus.push(val);
      // console.log(this.items1);
      this.dialog = true;
    },
    addtop() {
      // alert('add topic');
      this.showchapter = false;
      this.showeditor = true;
      this.AddTopicrow = false;
    },

    // addTopics(chaptername,chapter,topic){
    //   dialog = true;
    //   var item = {}
    //                item ["chaptername"] = chaptername;
    //                item ["parent"] = chapter;
    //                item ["topic"] = topic;
    //   this.Topics.push(item);
    //   console.log(this.Topics);

    // }
    // ,
    getTopic(topic) {
      this.AddTopicrow = false;
      this.topicname = topic;
      this.showeditor = true;
    },
    Subject(val) {
      this.sub = val;
    },
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
  },
};
</script>
<style scoped>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
@import "~quill/dist/quill.bubble.css";

.accordian-sub-title {
  font-size: 12px;
  text-align: center;
  color: #7a7a7a;
}

.weeek-carousel {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  align-items: center;
  font-weight: 600;
}

.align-equal {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.link {
  cursor: pointer;
}
.np {
  padding: 0px;
}
.top-selection {
  position: relative;
  top: 0px;
  right: 0px;
  z-index: 20000;
}
.sub-button {
  background: rgb(247 185 36);
  color: #fff;
  transition: all 0.2s;
  padding: 8px 18px !important;
  border-radius: 5px;
}
.pe-7s-notebook,
.btn-icon-vertical {
  color: #ffffff !important;
  -webkit-text-fill-color: #fff;
}
.pe-7s-notebook:hover,
.subjects:hover {
  color: #000 !important;
  -webkit-text-fill-color: #000;
}
.sub-button {
  background: rgb(247 185 36);
  color: #fff;
  transition: all 0.2s;
  padding: 8px 18px !important;
  border-radius: 5px;
}
.chapter-style {
  font-size: 17px;
  padding: 9px 14px;
  margin: 12px 0px;
  color: #444054;
  background: #d8d8d8;
  font-weight: 500;
}
ul,
li {
  padding: 2px;
  font-weight: 400;
}
</style>
