<template>
  <div>
    <div class="row">
      <!--Open & New Assignments-->
      <div class="col-md-12 col-lg-6 col-xl-6" id="openAssign">
        <div class="main-card mb-3 card" v-if="!expandStatus">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-highlight icon-gradient bg-malibu-beach mr-2"></i>Open & New Assignments</div>
            <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
              <button class="btn-shadow btn-wide btn btn-focus btn-sm">View All</button>
            </div>
          </div>
          <div class="table-responsive">
            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th class="text-center">Class(Sec)</th>
                  <th>Assignment</th>
                  <th class="text-center">Date</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center text-muted">
                    <div class="b-l-primary">Maths (3A)</div>
                  </td>
                  <td>Algebra</td>
                  <td>06Nov 2020</td>
                  <td>
                    <div class="badge badge-success">Published</div>
                  </td>
                  <td class="text-center" @click="getSubject('Maths (3A)', 'Algebra')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-warning">Science (3A)</div>
                  </td>
                  <td>Living Things</td>
                  <td>07 Nov 2020</td>
                  <td>
                    <div class="badge badge-success">Published</div>
                  </td>
                  <td class="text-center" @click="getSubject('Science (3A)', 'Living Things')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-warning">Science (3A)</div>
                  </td>
                  <td>Molecules</td>
                  <td>08 Nov 2020</td>
                  <td>
                    <div class="badge badge-success">Published</div>
                  </td>
                  <td class="text-center" @click="getSubject('Science (3A)', 'Molecules')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-primary">Maths (3A)</div>
                  </td>
                  <td>Geometry</td>
                  <td>09 Nov 2020</td>
                  <td>
                    <div class="badge badge-warning">Publish</div>
                  </td>
                  <td class="text-center" @click="getSubject('Maths (3A)', 'Geometry')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-primary">Maths (3A)</div>
                  </td>
                  <td>Arithmetic</td>
                  <td>09 Nov 2020</td>
                  <td>
                    <div class="badge badge-warning">Publish</div>
                  </td>
                  <td class="text-center" @click="getSubject('Maths (3A)', 'Arithmetic')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-warning">Science (3A)</div>
                  </td>
                  <td>Life Cycle Of Cells</td>
                  <td>09 Nov 2020</td>
                  <td>
                    <div class="badge badge-warning">Publish</div>
                  </td>
                  <td class="text-center" @click="getSubject('Science (3A)', 'Life Cycle Of Cells')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-primary">Maths (3A)</div>
                  </td>
                  <td>Parallel Lines</td>
                  <td>09 Nov 2020</td>
                  <td>
                    <div class="badge badge-warning">Publish</div>
                  </td>
                  <td class="text-center" @click="getSubject('Maths (3A)', 'Perpendicular and parallel')"><i class="pe-7s-pen"></i></td>
                </tr>
                <tr>
                  <td>
                    <div class="b-l-primary">Maths (3A)</div>
                  </td>
                  <td>Arithmetic</td>
                  <td>09 Nov 2020</td>
                  <td>
                    <div class="badge badge-warning">Publish</div>
                  </td>
                  <td class="text-center" @click="getSubject('Maths (3A)', 'Arithmetic')"><i class="pe-7s-pen"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!--Open & New Assignments End-->
      <!--Create / Edit Assignments-->
      <div class="col-md-12 col-lg-6 col-xl-6" id="expand">
        <i @click="minTable" class="pe-7s-back bk back-position" v-if="expandStatus"></i>
        <div class="main-card mb-3 card">
          <div class="card-header">
            <div class="title-align">
              <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-highlight icon-gradient bg-malibu-beach mr-2"></i>Create / Edit Assignments</div>
              <div>
                <button @click="clear" type="button" class="btn btn-sm mr-2 btn-primary">Create New</button>
              </div>
            </div>
          </div>
          <v-form v-model="valid" ref="form">
            <v-container @click="expandTable">
              <v-layout>
                <v-flex xs12 md12>
                  <v-text-field v-model="firstname" :rules="nameRules" label="Title" class="pr-8" required outlined @click="expandTable"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 md6>
                  <v-select :items="Classes" :rules="classRules" label="Class Name" class="pr-8" required outlined></v-select>
                </v-flex>
                <v-flex xs12 md6>
                  <v-select :items="items" label="Type of Assignment" class="pr-8" required outlined></v-select>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 md6 class="date">
                  <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="Date to be Published" readonly v-bind="attrs" v-on="on" outlined> </v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                <v-flex xs12 md6 class="date">
                  <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date1" label="Date to be Submitted" readonly v-bind="attrs" v-on="on" outlined> </v-text-field>
                    </template>
                    <v-date-picker v-model="date1" @input="menu3 = false"></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex xs12 md12 class="date">
                  <v-combobox v-model="select" :items="topics" label="Targeted topics" multiple chips outlined>
                    <template v-slot:selection="data">
                      <v-chip :key="JSON.stringify(data.item)" v-bind="data.attrs" :input-value="data.selected" :disabled="data.disabled" @click:close="data.parent.selectItem(data.item)">
                        <v-avatar class="accent white--text" left v-text="data.item.slice(0, 1).toUpperCase()"></v-avatar>
                        {{ data.item }}
                      </v-chip>
                    </template>
                  </v-combobox>
                </v-flex>
              </v-layout>
              <v-layout>
                <div id="editor" style="width: 100%">
                  <!--question creation component-->
                  <questioncreation ref="questioncreation"></questioncreation>
                  <!--question creation component End-->
                </div>
              </v-layout>
            </v-container>
          </v-form>
          <div class="card-footer footer-align">
            <div style="display: flex; align-items: center">
              <v-btn @click="clear" class="mr-2">Clear</v-btn>
              <v-btn :disabled="!valid" @click="submit" class="v-btn theme--light primary">Create Test </v-btn>
            </div>
            <div style="display: flex; align-items: baseline">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div class="nm" v-on="on">
                    <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info" v-on:click="addquestion">Add New Question</button>
                  </div>
                </template>
                <span>Add Question</span>
              </v-tooltip>
              <v-file-input hide-input truncate-length="15"></v-file-input>
            </div>
          </div>
        </div>
      </div>
      <!--Create / Edit Assignments End-->
      <!--question bank-->
      <div class="col-md-12 col-lg-4 col-xl-4" id="Questions" v-if="expandStatus">
        <div class="fixed">
          <div class="content">
            <!--assigned student-->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" v-b-toggle.accordion1 class="p-1" role="tab">
                <div class="card-header-title font-size-sm text-capitalize font-weight-normal pl-2">Students Assigned</div>
              </b-card-header>
              <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <multiselect v-model="value" tag-placeholder="Assign student" placeholder="Assign student" label="name" track-by="id" :options="options" :multiple="true" :taggable="true" @tag="addTag" style="width: 380px; height: 126px"></multiselect>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!--assigned student end-->
            <!--question bank end-->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" v-b-toggle.accordion2 class="p-1" role="tab">
                <div class="card-header-title font-size-sm text-capitalize font-weight-normal pl-2">Question Bank</div>
              </b-card-header>
              <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="app-inner-layout__sidebar">
                    <div class="app-inner-layout__sidebar-header">
                      <ul class="nav flex-column">
                        <li class="pt-4 pl-3 pr-3 pb-3 nav-item">
                          <div class="input-group">
                            <div class="input-group-prepend">
                              <div class="input-group-text">
                                <font-awesome-icon icon="search" />
                              </div>
                            </div>
                            <input placeholder="Search..." type="text" class="form-control" />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <ul class="nav flex-column">
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 1')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">What is the universe made of?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 2')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">How did life begin?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 3')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Are we alone in the universe?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 4')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">What makes us human?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 5')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">What is consciousness?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                      <li class="nav-item">
                        <button type="button" tabindex="0" class="dropdown-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left mr-3">
                                <div class="avatar-icon-wrapper">
                                  <i class="lnr-plus-circle header-icon" v-on:click="copyquestions('Question 6')"></i>
                                </div>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Why do we dream?</div>
                              </div>
                            </div>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!--question bank end-->
            <!--<b-card no-body class="mb-1">
              <b-card-header header-tag="header" v-b-toggle.accordion3 class="p-1" role="tab">
                <div class="card-header-title font-size-sm text-capitalize font-weight-normal pl-2">Instructions</div>
              </b-card-header>
              <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <p class="text-justify">
                    Note: Arrive at the examination venue at least 15 minutes before the start of the examination / 35 minutes before a digital examination. Law: The examination starts at the moment the book control begins, and you must therefore be present by 8.20 a.m. for regular written examinations and 8.10 a.m. at
                    digital examinations
                  </p>
                </b-card-body>
              </b-collapse>
            </b-card>-->
          </div>
        </div>
      </div>
      <!--question bank end-->
    </div>
  </div>
</template>
<script>
// import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import CKEditor from "@ckeditor/ckeditor5-vue";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import questioncreation from "../web/components/QuestionScreation";
import Multiselect from "vue-multiselect";
export default {
  components: {
    // VuePerfectScrollbar,
    // ckeditor: CKEditor.component,
    questioncreation,
    Multiselect,
  },
  data: () => ({
    value: [],
    options: [
      { name: "Andrea Procopio", id: "1" },
      { name: "Amal el Moussaif", id: "2" },
      { name: "Gabriele Volpi", id: "3" },
      { name: "Carola Schiavini", id: "4" },
      { name: "	Andrea Procopio", id: "5" },
    ],
    checkbox: true,
    radioGroup: 1,
    switch1: true,
    heading: "Create Assignment",
    subheading: "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-car icon-gradient bg-mean-fruit",
    valid: false,
    expandStatus: false,
    classname: "Maths (3A)",
    // editor2: ClassicEditor,
    editorData: "<p>Content of the editor.</p>",
    editorConfig: {
      // The configuration of the editor.
    },
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
    firstname: "Algebra",

    lastname: "",
    variant: "Add Questions",
    date: new Date().toISOString().substr(0, 10),
    date1: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    topics: ["Effects of Pollution", "The Changes in the Ocean", "Popularity of Sports in US", "Internet Influence on kids"],
    assign: ["Amal", "Gabriele", "Andrea", "Beatrice"],
    Classes: ["Maths (3A)", "Science (3A)", "Maths (2A)", "Science (23A)"],
    items: ["Homework", "Quiz"],
    nameRules: [(v) => !!v || "Name is required", (v) => v.length <= 30 || "Name must be less than 30 characters"],
    classRules: [(v) => !!v || "Please Select Class", (v) => v.length <= 30 || "please select at least one class"],
    email: "",
    emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+/.test(v) || "E-mail must be valid"],
  }),

  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000),
      };
      this.options.push(tag);
      this.value.push(tag);
    },
    addquestion: function () {
      console.log("hai");
      this.$refs.questioncreation.addquestion();
    },
    copyquestions: function (question) {
      this.$refs.questioncreation.copyquestions(question);
    },
    expandTable() {
      this.expandStatus = true;
      document.getElementById("expand").classList.remove("col-xl-6");
      document.getElementById("expand").classList.add("col-xl-8");
      document.getElementById("expand").classList.remove("col-lg-6");
      document.getElementById("expand").classList.add("col-lg-8");
      document.getElementById("openAssign").classList.remove("show");
      document.getElementById("Questions").classList.remove("hide");
      document.getElementById("openAssign").classList.add("hide");
      document.getElementById("Questions").classList.add("show");
    },
    minTable() {
      this.expandStatus = false;
      document.getElementById("expand").classList.remove("col-xl-8");
      document.getElementById("expand").classList.add("col-xl-6");
      document.getElementById("expand").classList.remove("col-lg-8");
      document.getElementById("expand").classList.add("col-lg-6");
      document.getElementById("openAssign").classList.remove("hide");
      document.getElementById("Questions").classList.remove("show");
      document.getElementById("openAssign").classList.add("show");
      document.getElementById("Questions").classList.add("hide");
    },

    getSubject(val, sub) {
      //alert(val);
      this.classname = val;
      this.firstname = sub;
    },
    submit() {
      if (this.$refs.form.validate()) {
        // Form is valid, process
      }
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    clear() {
      this.$refs.form.reset();
    },
  },
};
</script>
<style scoped>
tr {
  cursor: pointer;
}
.nm {
  margin: 0px;
}
.btns-algn-right {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
}
.date {
  padding: 4px 27px 0px 0px;
}
.title-align {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.font-icon-lg {
  font-size: 23px;
  font-weight: 900;
}
.mt-20 {
  margin-top: 20px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}
.v-input__slot {
  border-bottom: 2px solid #949494 !important;
  box-shadow: none !important;
  border-radius: 0px !important;
}
#editor {
  margin-bottom: 5px;
}
.show {
  display: block !important;
}
.hide {
  display: none !important;
}
.attach {
  transform: rotate(40deg);
  position: relative;
  top: -18px;
}
.back-position {
  position: absolute;
  top: -28px;
  z-index: 200;
  font-size: 25px;
  padding-left: 0px;
  padding-top: 10px;
}
.btn.btn-pill.btn-wide,
.btn.btn-pill {
  font-size: 12px !important;
}
.footer-align,
.header-align {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row-reverse;
}
.fixed {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
