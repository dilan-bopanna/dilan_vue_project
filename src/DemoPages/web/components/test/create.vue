<template>
  <div class="row">
    <div class="col-sm-12 col-lg-5" v-if="expandStatus">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="lnr-calendar-full icon-gradient bg-malibu-beach mr-2"></i>Upcoming Tests</div>
          <!--<div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm">
                            View All
                        </button>
                    </div>-->
        </div>
        <div class="scroll-area-md">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="table-responsive">
              <table class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed">
                <thead>
                  <tr>
                    <th>Class (Sec)</th>
                    <th class="text-center">Test</th>
                    <th class="text-center">Test Date</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">
                      <div class="b-l-primary">Maths (3A)</div>
                    </td>
                    <td class="text-center">1st</td>
                    <td class="text-center">21-12-2020</td>
                    <td class="text-center"><button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-warning">Scheduled</button></td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <div class="b-l-warning">Science (3A)</div>
                    </td>
                    <td class="text-center">2nd</td>
                    <td class="text-center">21-12-2020</td>
                    <td class="text-center"><button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">Create</button></td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <div class="b-l-warning">Science (3A)</div>
                    </td>
                    <td class="text-center">Mid-term</td>
                    <td class="text-center">26-12-2020</td>
                    <td class="text-center"><button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">Create</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VuePerfectScrollbar>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-lg-7" id="expand">
      <div class="main-card mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="lnr-calendar-full icon-gradient bg-malibu-beach mr-2"></i>Create/Edit Tests</div>
          <!--  <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button @click="clear" type="button" class="btn mr-2 btn-primary btn-sm"> Create New
                        </button>
                        <i class="lnr-frame-expand" @click="expandTable" v-if="expandStatus"></i>
                    </div>-->
        </div>
        <v-form v-model="valid" ref="form" @click="expandTable">
          <v-container @click="expandTable">
            <v-layout class="options-align">
              <v-flex xs12 md10>
                <v-text-field v-model="firstname" label="Title" class="pr-8" required outlined @click="expandTable"></v-text-field>
              </v-flex>
              <v-flex xs12 md2>
                <toggle-button id="changed-font" v-model="scheduled" :width="100" :height="30" :speed="480" :color="{ checked: '#3ac47d', unchecked: '#bfcbd9' }" :labels="{ checked: 'Scheduled', unchecked: 'UnScheduled' }" />
              </v-flex>
            </v-layout>
            <v-layout class="options-align">
              <v-flex xs12 md4>
                <v-select :items="Classes" label="Select Class & Subject" class="pr-8" outlined> </v-select>
              </v-flex>
              <v-flex xs12 md4 class="date" v-if="!scheduled">
                <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" label="Test Date" readonly v-bind="attrs" v-on="on" outlined> </v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md4 class="date" v-if="scheduled">
                <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="date" label="Scheduled Date" readonly v-bind="attrs" v-on="on" outlined> </v-text-field>
                  </template>
                  <v-date-picker v-model="date" @input="menu3 = false"></v-date-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md4 class="date">
                <v-select :items="duration" label="Duration (mins)" outlined></v-select>
              </v-flex>
            </v-layout>
            <v-layout class="options-align">
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
            <hr />
            <div class="mb-3" id="addquestions" v-if="!expandStatus">
              <div class="card mb-3" v-for="(item, index) in questions" :key="item" :id="'questiontab' + index">
                <div class="card-header-tab card-header head-align">
                  <v-col class="col-sm-5">
                    <v-select v-model="item.questontype" :items="questionstype" label="Question Type" class="pb-0"></v-select>
                  </v-col>
                  <v-col class="col-sm-2">
                    <v-text-field v-model="item.marks" label="Marks" class="pr-8" required> </v-text-field>
                  </v-col>
                  <div class="btn-actions-pane-right text-capitalize actions-icon-btn header-align"></div>
                </div>
                <div class="card-body pb-2">
                  <v-row>
                    <v-col class="col-sm-12 pt-0 pb-0">
                      <quilleditor v-model="item.question" label="Questions" required outlined> </quilleditor>
                    </v-col>
                  </v-row>
                  <v-row>
                    <img :src="image" height="40" style="display: none" />
                  </v-row>
                  <v-row>
                    <v-col class="col-sm-12 pt-0 pb-0" id="answertype">
                      <!-- if question type True or False -->
                      <v-radio-group v-model="item.correctanswer[0]" id="addoptions" v-if="item.questontype == 'true or False'" class="mt-0">
                        <v-row>
                          <v-col class="col-sm-12 pt-0 pb-0 pr-16 text-right">
                            <small style="font-weight: bold">Correct Option</small>
                          </v-col>
                        </v-row>
                        <v-row class="options-align">
                          <v-col class="col-sm-9 pb-0 pt-0">
                            <v-text-field v-model="item.options.value" label="Options" class="pr-2" required outlined></v-text-field>
                          </v-col>
                          <v-col class="col-sm-1">
                            <i class="lnr-picture"></i>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-radio></v-radio>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <div class="nm" v-on="on">
                                  <button v-on:click="deleteoption(item.options.options, item.options.correctanswer, index)"><i class="pe-7s-close-circle header-icon" style="font-size: 23px"></i></button>
                                </div>
                              </template>
                              <span>Delete Option</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-radio-group>
                      <!-- if question type True or False -->
                      <!-- if question type Single Choice -->
                      <v-radio-group v-model="item.correctanswer[0]" id="addoptions" v-if="item.questontype == 'Single Choice'" class="mt-0">
                        <v-row>
                          <v-col class="col-sm-12 pt-0 pb-0 pr-16 text-right">
                            <small style="font-weight: bold">Correct Option</small>
                          </v-col>
                        </v-row>
                        <v-row v-for="(option, index) in item.options" :key="option" class="options-align">
                          <v-col class="col-sm-9 pb-0 pt-0">
                            <v-text-field v-model="option.value" label="Options" class="pr-2" required outlined></v-text-field>
                          </v-col>
                          <v-col class="col-sm-1">
                            <i class="lnr-picture"></i>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-radio></v-radio>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <div class="nm" v-on="on">
                                  <button v-on:click="deleteoption(item.options, item.correctanswer, index)"><i class="pe-7s-close-circle header-icon" style="font-size: 23px"></i></button>
                                </div>
                              </template>
                              <span>Delete Option</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </v-radio-group>
                      <!---multiple options part-->
                      <div id="addoptions" v-if="item.questontype == 'Multiple Choice'">
                        <v-row class="options-align pr-11">
                          <v-col class="col-sm-12 pt-0 pb-0 text-right">
                            <small style="font-weight: bold">Correct Option</small>
                          </v-col>
                        </v-row>
                        <v-row v-for="(option, index) in item.options" :key="option" class="options-align">
                          <v-col class="col-sm-9 pb-0 pt-0 mb-0">
                            <v-text-field v-model="option.value" label="Options" class="pr-2 mb-0" required outlined></v-text-field>
                          </v-col>
                          <v-col class="col-sm-1">
                            <i class="lnr-picture"></i>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-checkbox v-model="item.correctanswer[index]" :value="index + 1"> </v-checkbox>
                          </v-col>
                          <v-col class="col-sm-1">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <div class="nm" v-on="on">
                                  <i v-on:click="deleteoption(item.options, item.correctanswer, index)" class="pe-7s-close-circle header-icon" style="font-size: 23px"></i>
                                </div>
                              </template>
                              <span>Delete Option</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </div>
                      <!---multiple options part-->
                      <!---match options part-->
                      <div id="addoptions" v-if="item.questontype == 'Matching Text'">
                        <v-row class="options-align">
                          <v-col class="col-sm-5">
                            <b>Items</b>
                          </v-col>
                          <v-col class="col-sm-5">
                            <b>Answers</b>
                          </v-col>
                        </v-row>
                        <v-row v-for="(option, index) in item.options" :key="option" class="options-align">
                          <v-col class="col-sm-5">
                            <v-text-field v-model="option.value" label="Clue" class="pr-8" required outlined></v-text-field>
                          </v-col>
                          <v-col class="col-sm-5">
                            <v-text-field v-model="item.correctanswer[index]" label="Enter the matching answers" class="pr-8" required outlined> </v-text-field>
                          </v-col>
                          <v-col class="col-sm-2">
                            <v-tooltip bottom>
                              <template v-slot:activator="{ on }">
                                <div class="nm" v-on="on">
                                  <button v-on:click="deleteoption(item.options, item.correctanswer, index)"><i class="pe-7s-close-circle header-icon" style="font-size: 23px"></i></button>
                                </div>
                              </template>
                              <span>Delete Option</span>
                            </v-tooltip>
                          </v-col>
                        </v-row>
                      </div>
                      <!---match options part-->
                      <v-flex xs12 md12 class="date" v-if="item.questontype == 'Free Text'">
                        <!--<ckeditor :editor="editor2" v-model="item.freetext" :config="editorConfig"></ckeditor>-->
                      </v-flex>
                    </v-col>
                  </v-row>
                </div>

                <div class="card-footer footer-align" align-end>
                  <small style="position: absolute; bottom: 0; color: #a5a2a2; font-size: 10px">*Answer's will be randomized by default</small>
                  <div style="display: flex">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <div v-on="on">
                          <i v-on:click="dublicate(item)" class="pe-7s-copy-file footer-icon link"></i>
                        </div>
                      </template>
                      <span>Duplicate</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <div v-on="on">
                          <i v-on:click="deletequestion(item)" class="pe-7s-trash footer-icon link"></i>
                        </div>
                      </template>
                      <span>Delete</span>
                    </v-tooltip>
                  </div>
                  <div style="display: flex">
                    <v-switch v-model="item.isrequired" label="Mandatory" class="mr-3" style="font-size: 14px"></v-switch>
                    <v-switch v-model="item.israndomize" label="Randomize" style="font-size: 14px" v-if="item.questontype == 'Single Choice' || item.questontype == 'Multiple Choice' || item.questontype == 'Picture'"></v-switch>
                  </div>
                  <div v-if="item.questontype == 'Single Choice' || item.questontype == 'Multiple Choice' || item.questontype == 'Matching Text'">
                    <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info" v-on:click="addoption(item)">Add Options</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer-align">
              <div style="display: flex; align-items: center">
                <v-btn @click="clear" class="mr-2">Clear</v-btn>
                <v-btn :disabled="!valid" @click="submit" class="v-btn theme--light primary">Create Test </v-btn>
              </div>
              <div style="display: flex; align-items: baseline">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <div class="nm" v-on="on">
                      <button v-on:click="addquestion" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">Add New Question</button>
                    </div>
                  </template>
                  <span>Add Question</span>
                </v-tooltip>
                <v-file-input hide-input truncate-length="15"></v-file-input>
              </div>
            </div>
          </v-container>
        </v-form>
      </div>
    </div>
    <div class="col-md-12 col-lg-4 col-xl-4" id="Questions" v-if="!expandStatus">
      <div class="fixed">
        <div class="content">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" v-b-toggle.accordion1 class="p-1" role="tab">
              <div class="card-header-title font-size-sm text-capitalize font-weight-normal pl-2">Students Assigned</div>
            </b-card-header>
            <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <v-autocomplete v-model="friends" :disabled="isUpdating" :items="people" filled chips color="blue-grey lighten-2" label="Select Students" item-text="name" item-value="name" multiple>
                  <template v-slot:selection="data">
                    <v-chip v-bind="data.attrs" :input-value="data.selected" close @click="data.select" @click:close="removestudents(data.item)">
                      <v-avatar left>
                        <v-img :src="data.item.avatar"></v-img>
                      </v-avatar>
                      {{ data.item.name }}
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <template v-if="typeof data.item !== 'object'">
                      <v-list-item-content v-text="data.item"></v-list-item-content>
                    </template>
                    <template v-else>
                      <v-list-item-avatar>
                        <img :src="data.item.avatar" />
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title v-html="data.item.name"></v-list-item-title>
                        <v-list-item-subtitle v-html="data.item.group"></v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </template>
                </v-autocomplete>
                <p class="card-text">{{ text }}</p>
              </b-card-body>
            </b-collapse>
          </b-card>
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
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" v-b-toggle.accordion3 class="p-1" role="tab">
              <div class="card-header-title font-size-sm text-capitalize font-weight-normal pl-2">Instructions</div>
            </b-card-header>
            <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
              <b-card-body>
                <!-- <quilleditor v-model="instructions" label="Instructions" class="pr-8" required outlined>
                        </quilleditor>-->
                <p class="text-justify">
                  Note: Arrive at the examination venue at least 15 minutes before the start of the examination / 35 minutes before a digital examination. Law: The examination starts at the moment the book control begins, and you must therefore be present by 8.20 a.m. for regular written examinations and 8.10 a.m. at
                  digital examinations
                </p>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
    <!--<div class="col-sm-2 col-slg-1" v-if="!expandStatus">
            <div class="card-hover-shadow-2x mb-1 card" style="position:fixed;height:auto;width: auto;">
                <div class="font-icon-wrapper nm" v-on:click="addquestion"><i class="lnr-plus-circle header-icon"></i>
                </div>
                <div class="font-icon-wrapper nm"><i class="lnr-picture header-icon"></i></div>
                <div class="font-icon-wrapper nm"><i class="lnr-film-play header-icon"></i></div>
            </div>
        </div>-->
  </div>
</template>
<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
// import UploadService from "../services/UploadFilesService";
//import test from '../../../web/components/test/questions.vue';
import { ToggleButton } from "vue-js-toggle-button";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  components: {
    VuePerfectScrollbar,
    quilleditor: quillEditor,
    ToggleButton,
  },
  data: () => ({
    fruits: [
      "Apples",
      "Apricots",
      "Avocado",
      "Bananas",
      "Blueberries",
      "Blackberries",
      "Boysenberries",
      "Bread fruit",
      "Cantaloupes (cantalope)",
      "Cherries",
      "Cranberries",
      "Cucumbers",
      "Currants",
      "Dates",
      "Eggplant",
      "Figs",
      "Grapes",
      "Grapefruit",
      "Guava",
      "Honeydew melons",
      "Huckleberries",
      "Kiwis",
      "Kumquat",
      "Lemons",
      "Limes",
      "Mangos",
      "Mulberries",
      "Muskmelon",
      "Nectarines",
      "Olives",
      "Oranges",
      "Papaya",
      "Peaches",
      "Pears",
      "Persimmon",
      "Pineapple",
      "Plums",
      "Pomegranate",
      "Raspberries",
      "Rose Apple",
      "Starfruit",
      "Strawberries",
      "Tangerines",
      "Tomatoes",
      "Watermelons",
      "Zucchini",
    ],
    selectedFruits: [],
    autoUpdate: true,
    friends: ["Sandra Adams", "Britta Holt"],
    isUpdating: false,
    name: "Midnight Crew",
    people: [
      {
        header: "3A",
      },
      {
        name: "Sandra Adams",
        group: "Group 1",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      },
      {
        name: "Ali Connors",
        group: "Group 1",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      },
      {
        name: "Trevor Hansen",
        group: "Group 1",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      },
      {
        name: "Tucker Smith",
        group: "Group 1",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      },
      {
        divider: true,
      },
      {
        header: "2A",
      },
      {
        name: "Britta Holt",
        group: "Group 2",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      },
      {
        name: "Jane Smith ",
        group: "Group 2",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
      },
      {
        name: "John Smith",
        group: "Group 2",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      },
      {
        name: "Sandra Williams",
        group: "Group 2",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      },
    ],
    title: "The summer breeze",
    questions: [],
    // questions: [{
    //     question: '',
    //     questontype: 'Single Choice',
    //     options: [{
    //         value: ''
    //     }],
    //     freetext: '',
    //     correctanswer: [],
    //     isrequired: false,
    //     israndomize: false,
    //     marks: '',
    // }],
    image: "",
    checkbox: true,
    radioGroup: 1,
    templateString: "",
    expandStatus: true,
    valid: false,
    heading: "Online Classes",
    subheading: "Schedule and conduct online classes.",
    icon: "pe-7s-global icon-gradient bg-malibu-beach",
    // editor2: ClassicEditor,
    variant: "Question Type",
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
    date: new Date().toISOString().substr(0, 10),
    menu2: false,
    select: "",
    value: "",
    firstname: "",
    time: "",
    topics: ["Effects of Pollution", "The Changes in the Ocean", "Popularity of Sports in US", "Internet Influence on kids"],
    assign: ["All ", "Amal", "Gabriele", "Andrea", "Beatrice"],
    Classes: ["Maths (3A)", "Science (3A)", "Maths (2A)", "Science (2A)"],
    scheduled: false,
    duration: ["30", "60", "120"],
    questionstype: ["Single Choice", "Multiple Choice", "True or False", "Matching Text", "Paragraph"],
  }),
  computed: {
    likesAllFruit() {
      return this.selectedFruits.length === this.fruits.length;
    },
    likesSomeFruit() {
      return this.selectedFruits.length > 0 && !this.likesAllFruit;
    },
    icon() {
      if (this.likesAllFruit) return "mdi-close-box";
      if (this.likesSomeFruit) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  methods: {
    dublicate: function (item) {
      this.questions.push(item);
      console.log(item);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedFruits = [];
        } else {
          this.selectedFruits = this.fruits.slice();
        }
      });
    },
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    removestudents(item) {
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    },
    deletequestion(index) {
      var deletequestion = confirm("Do you wish to delete this question?");
      if (deletequestion) {
        this.questions.splice(index, 1);
        console.log(index);
      }
    },
    copyquestions: function (question) {
      console.log("hai");
      this.questions.push({
        question: question,
        questontype: "Single Choice",
        options: [
          {
            value: "One",
          },
          {
            value: "Two",
          },
          {
            value: "Three",
          },
        ],
        freetext: "",
        correctanswer: [0],
        isrequired: false,
        israndomize: false,
        marks: "",
      });
    },
    addquestion: function () {
      console.log("hai");
      this.questions.push({
        question: "",
        questontype: "Single Choice",
        options: [
          {
            value: "",
          },
        ],
        freetext: "",
        correctanswer: [""],
        isrequired: false,
        israndomize: false,
        marks: "",
      });
    },
    addoption: function (item) {
      if (item.options.length <= 5) {
        item.options.push({
          value: "",
        });
      } else {
        alert("more than 6 options not allowed");
      }
    },
    deleteoption: function (options, answer, index) {
      // item = item.filter(item => item !== data_page);
      answer.splice(index, 1);
      options.splice(index, 1);
      console.log(options);
    },
    expandTable() {
      this.expandStatus = false;
      document.getElementById("expand").classList.remove("col-xl-7");
      document.getElementById("expand").classList.add("col-xl-8");
      document.getElementById("expand").classList.remove("col-lg-7");
      document.getElementById("expand").classList.add("col-lg-8");
    },
    onReady: function (instance) {
      const that = this;
      instance.update(that.endVal + 100);
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
.btn.btn-pill.btn-wide,
.btn.btn-pill {
  font-size: 12px !important;
}

.layout {
  display: flex;
  align-items: baseline;
}

.date {
  padding: 4px 27px 0px 0px;
}

.nm {
  margin: 0px;
}

.title-align {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.btns-algn-right {
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: baseline;
}

.mt-20 {
  margin-top: 20px;
}

.nm {
  margin: 0px !important;
}

.footer-align,
.header-align {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-direction: row-reverse;
}

.head-align {
  display: flex;
  align-items: baseline;
  height: 70px;
}

.options-align {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: -24px;
}

.footer-icon {
  font-size: 23px;
  background: #dbdbdb;
  border-radius: 20px;
  padding: 6px;
  font-weight: 500;
  margin-right: 7px;
}

.v-text-field fieldset,
.v-text-field .v-input__control {
  height: 60px !important;
}
.fixed {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.content {
  height: 100%;
  width: 392px;
  overflow: auto;
}
</style>
