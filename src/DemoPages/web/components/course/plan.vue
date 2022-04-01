<template>
  <div class="col-sm-12 np">
    <div class="align-equal">
      <!--month,day,week tabs-->
      <div class="col-sm-4">
        <div role="group" class="mb-3 btn-group-lg btn-group">
          <button
            class="btn-shadow btn btn-focus btn-pill pr-3"
            v-bind:class="{ active: taboption == 'Day' }"
            @click="showTables('Day')"
          >
            Day
          </button>
          <button class="btn-shadow btn btn-focus" v-bind:class="{ active: taboption == 'Week' }"  @click="showTables('Week')">
            Week
          </button>
          <button class="btn-shadow btn btn-focus btn-pill pl-3" v-bind:class="{ active: taboption == 'Month' }">
            Month
          </button>
        </div>
      </div>
      <!--month,day,week tabs-->

      <!--Week carousel-->
      <div class="col-sm-5 weeek-carousel">
        <i
          class="lnr-arrow-left-circle link icon-gradient bg-arielle-smile"
          v-on:click="preview()"
        >
        </i>
        <!--Calendar date from Filters-->
        <div class="pl-3 pr-3">
          Week of November {{ date }}
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <i
                class="lnr-calendar-full icon-gradient bg-mixed-hopes pl-2"
                v-on="on"
              ></i>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
        <!--Calendar date from Filters-->
        <i
          class="lnr-arrow-right-circle link icon-gradient bg-arielle-smile"
          v-on:click="back()"
        ></i>
      </div>
      <!--Week carousel-->

      <!--Pdf Download-->
      <div class="col-sm-3 text-right">
        <button type="button" class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus">
          <i class="btn-icon-wrapper pe-7s-cloud-download"></i> PDF
        </button>
      </div>
      <!--Pdf Download-->
    </div>
    <!--Day Tab start-->
    <div v-if="taboption == 'Day'">
      <b-row>
        <!--Day1 Classes start-->
        <b-col md="3">
          <template>
            <div role="tablist">
              <p class="card pt-3 pb-3 pl-2 pr-2"><b>Day A | Monday (Nov 16)</b></p>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion1
                  class="p-1 bg-warning text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Science - Section 1 <br /><small>9.30am - 10.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>CHAPTER 1 - MY BODY</b>
                  </p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Topic -
                              <a @click="viewtopic('Science - Section 1')"
                                ><span class="grey--text caption">(+2 others)</span></a
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div
                              class="widget-heading"
                              @click="viewAgenda('Science - Section 1')"
                            >
                              Agenda- <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Notes-
                              <small @click="viewNotes('Science - Section 1')"
                                >View | Download</small
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Assignment- <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Question Bank - <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Activities - <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion2
                  class="p-1 bg-primary text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Maths - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Introduction to Fractions</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Topic -
                              <a @click="viewtopic('Maths - Section 1')"
                                ><span class="grey--text caption">(+2 others)</span></a
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div
                              class="widget-heading"
                              @click="viewAgenda('Maths - Section 1')"
                            >
                              Agenda- <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Notes-
                              <small @click="viewNotes('Maths - Section 1')"
                                >View | Download</small
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Assignment- <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Question Bank - <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Activities - <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion3
                  class="p-1 bg-danger text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Physics - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Work & Energy</b>
                  </p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Topic -
                              <a @click="viewtopic('Physics - Section 1')"
                                ><span class="grey--text caption">(+2 others)</span></a
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div
                              class="widget-heading"
                              @click="viewAgenda('Physics - Section 1')"
                            >
                              Agenda- <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Notes-
                              <small @click="viewNotes('Physics - Section 1')"
                                >View | Download</small
                              >
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Assignment- <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Question Bank - <small>View | Download</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">
                              Activities - <small>View</small>
                            </div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
            </div>
          </template>
        </b-col>
        <!--Day1 Classes End-->

        <!--Day1 Classes start-->

        <!--List of Topics start-->
        <b-col md="9" v-if="topicslist">
          <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header">
              <div
                class="card-header-title font-size-lg text-capitalize font-weight-normal"
              >
                <i class="header-icon lnr-database icon-gradient bg-malibu-beach"></i>List
                of topics - {{ sub }}
              </div>
              <div
                class="btn-actions-pane-right text-capitalize actions-icon-btn"
                style="display: flex; align-items: center"
              >
                <!--Search part paste here-->

                <v-select
                  v-model="value"
                  :items="topics"
                  label="Select your topics"
                  multiple
                >
                  <template v-slot:selection="{ item, index }">
                    <v-chip v-if="index === 0">
                      <span class="text-ellipssis">{{ item }}</span>
                    </v-chip>
                    <span v-if="index === 1" class="grey--text caption"
                      >(+{{ value.length - 1 }} others)</span
                    >
                  </template>
                </v-select>
                <button class="btn btn-primary ml-3" @click="addTopicstolist()">
                  Add
                </button>
              </div>
            </div>
            <div class="scroll-area-md">
              <VuePerfectScrollbar class="scrollbar-container" v-once>
                <ul
                  class="todo-list-wrapper list-group list-group-flush"
                  v-for="items in list"
                  :key="items"
                >
                  <li class="list-group-item">
                    <div
                      class="todo-indicator"
                      v-bind:class="{
                        'badge-success': sub === 'Physics - Section 1',
                        'badge-danger': sub === 'Maths - Section 1',
                        'badge-warning': sub === 'Science - Section 1',
                      }"
                    ></div>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-2">
                          <div class="custom-checkbox custom-control">
                            <input
                              type="checkbox"
                              id="exampleCustomCheckbox12"
                              class="custom-control-input"
                            />
                            <label
                              class="custom-control-label"
                              for="exampleCustomCheckbox12"
                              >&nbsp;</label
                            >
                          </div>
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading">
                            {{ items.name }}
                            <div class="badge badge-success ml-2">
                              Covered on : {{ items.classdate }}
                            </div>
                          </div>
                        </div>
                        <div class="widget-content-right widget-content-actions">
                          <button class="border-0 btn-transition btn btn-outline-danger">
                            <i class="pe-7s-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </VuePerfectScrollbar>
            </div>
          </div>
        </b-col>
        <!--List of Topics End-->
        <!--Agenda start-->
        <b-col md="9" v-if="agenda">
          <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header">
              <div
                class="card-header-title font-size-lg text-capitalize font-weight-normal"
              >
                <i class="header-icon lnr-database icon-gradient bg-malibu-beach"></i
                >Agenda - {{ sub }}
              </div>
              <div
                class="btn-actions-pane-right text-capitalize actions-icon-btn"
                style="display: flex"
              >
                <!--Search part paste here-->

                <button class="btn btn-primary ml-3">Add</button>
              </div>
            </div>
            <div class="scroll-area-md">
              <VuePerfectScrollbar class="scrollbar-container" v-once>
                <h3
                  style="margin: 10px 30px 0px 30px"
                  class="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  CHAPTER 1 - MY BODY
                </h3>
                <p style="margin: 10px 30px 30px 30px">
                  <strong>Agenda:</strong>The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding of the draft
                  Agenda which is submitted for approval. This paper is not presented for
                  endorsement.The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding of the draft
                  Agenda which is submitted for approval. This paper is not presented for
                  endorsement.The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding of the draft
                  Agenda which is submitted for approval. This paper is not presented for
                  endorsement.The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding of the draft
                  Agenda which is submitted for approval. This paper is not presented for
                  endorsement.The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding of the draft
                  Agenda which is submitted for approval. This paper is not presented for
                  endorsement.The present document, prepared by the Conference
                  Secretariat, is aimed at facilitating the understanding
                </p>
              </VuePerfectScrollbar>
            </div>
          </div>
        </b-col>
        <!--List of Topics End-->

        <!--Notes start-->
        <b-col md="9" v-if="notes">
          <div class="card-hover-shadow-2x mb-3 card">
            <div class="card-header-tab card-header">
              <div
                class="card-header-title font-size-lg text-capitalize font-weight-normal"
              >
                <i class="header-icon pe-7s-note icon-gradient bg-malibu-beach"></i>Notes
                - {{ sub }}
              </div>
              <div
                class="btn-actions-pane-right text-capitalize actions-icon-btn"
                style="display: flex"
              >
                <!--Search part paste here-->
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
                    placeholder="Search topics..."
                    v-model="search"
                    type="text"
                    class="form-control"
                  />
                </div>
                <button class="btn btn-primary ml-3">Add</button>
              </div>
            </div>
            <div class="scroll-area-md">
              <VuePerfectScrollbar class="scrollbar-container" v-once>
                <h3
                  style="margin: 10px 30px 0px 30px"
                  class="card-header-title font-size-lg text-capitalize font-weight-normal"
                >
                  CHAPTER 1 - MY BODY
                </h3>
                <p style="margin: 10px 30px 30px 30px">1) List of Human Body Parts</p>
                <p style="margin: 10px 30px 30px 30px">
                  <strong>Ans:</strong>Human body parts comprise a head, neck and four
                  limbs that are connected to a torso. Giving the body its shape is the
                  skeleton, which is composed of cartilage and bone. Human body internal
                  parts such as the lungs, heart, and brain, are enclosed within the
                  skeletal system and are housed within the different internal body
                  cavities. The spinal cord connects the brain with the rest of the body.
                </p>
                 <p style="margin: 10px 30px 30px 30px">3) Human Body Parts and their Functions</p>
                
                <p style="margin: 10px 30px 30px 30px">
                  <strong>Ans:</strong>Human body parts comprise a head, neck and four
                  limbs that are connected to a torso. Giving the body its shape is the
                  skeleton, which is composed of cartilage and bone. Human body internal
                  parts such as the lungs, heart, and brain, are enclosed within the
                  skeletal system and are housed within the different internal body
                  cavities. The spinal cord connects the brain with the rest of the body.
                </p>
              </VuePerfectScrollbar>
            </div>
          </div>
        </b-col>
        <!--Notes End-->

        <!--Day1 Classes End-->
      </b-row>
    </div>
    <!--Day Tab End-->

    <!--Monthly Tab start-->
    <div v-if="taboption == 'Week'">
      <b-row>
        <!--Day1 Classes start-->
        <b-col md="3">
          <template>
            <div role="tablist">
              <p class="card pt-3 pb-3 pl-2 pr-2"><b>Day A | Monday (Nov 16)</b></p>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion1
                  class="p-1 bg-warning text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Science - Section 1 <br /><small>9.30am - 10.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion1" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>CHAPTER 1 - MY BODY</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion2
                  class="p-1 bg-primary text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Maths - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Introduction to Fractions</b>
                  </p>
                  <div class="scroll-area-sm">
                    <VuePerfectScrollbar class="scrollbar-container" v-once>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-note2 text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Topic</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-keypad text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Agenda</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-note2 text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Notes</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-pen text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Assignment</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Question Bank</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-smile text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Activities</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </VuePerfectScrollbar>
                  </div>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion3
                  class="p-1 bg-danger text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Physics - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion3" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Work & Energy</b>
                  </p>
                  <div class="scroll-area-sm">
                    <VuePerfectScrollbar class="scrollbar-container" v-once>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-note2 text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Topic</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-keypad text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Agenda</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-note2 text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Notes</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-pen text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Assignment</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Question Bank</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li class="list-group-item">
                          <div class="widget-content p-0">
                            <div class="widget-content-wrapper">
                              <div class="widget-content-left center-elem mr-2">
                                <i class="pe-7s-smile text-muted fsize-1"></i>
                              </div>
                              <div class="widget-content-left">
                                <div class="widget-heading">Activities</div>
                              </div>
                              <div class="widget-content-right widget-content-actions">
                                <i class="lnr-plus-circle"></i>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </VuePerfectScrollbar>
                  </div>
                </b-collapse>
              </b-card>
            </div>
          </template>
        </b-col>
        <!--Day1 Classes End-->
        <!--Day1 Classes start-->
        <b-col md="3">
          <template>
            <div role="tablist">
              <p class="card pt-3 pb-3 pl-2 pr-2"><b>Day B | Tuesday (Nov 17)</b></p>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion4
                  class="p-1 bg-warning text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Science - Section 1 <br /><small>9.30am - 10.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion4" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - My Body</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion5
                  class="p-1 bg-primary text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Maths - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion5" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Introduction to Fractions</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion6
                  class="p-1 bg-danger text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Physics - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion6" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Work & Energy</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
            </div>
          </template>
        </b-col>
        <!--Day1 Classes End-->
        <!--Day1 Classes start-->
        <b-col md="3">
          <template>
            <div role="tablist">
              <p class="card pt-3 pb-3 pl-2 pr-2"><b>Day C | Wednesday (Nov 17)</b></p>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion7
                  class="p-1 bg-warning text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Science - Section 1 <br /><small>9.30am - 10.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion7" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - My Body</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion8
                  class="p-1 bg-primary text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Maths - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion8" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Introduction to Fractions</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion9
                  class="p-1 bg-danger text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Physics - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion9" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Work & Energy</b>
                  </p>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
            </div>
          </template>
        </b-col>
        <!--Day1 Classes End-->
        <!--Day1 Classes start-->
        <b-col md="3">
          <template>
            <div role="tablist">
              <p class="card pt-3 pb-3 pl-2 pr-2"><b>Day A | Thursday (Nov 19)</b></p>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion10
                  class="p-1 bg-warning text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Science - Section 1 <br /><small>9.30am - 10.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion10" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - My Body</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion11
                  class="p-1 bg-primary text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Maths - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion11" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Introduction to Fractions</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
              <b-card no-body class="mb-1">
                <b-card-header
                  header-tag="header"
                  v-b-toggle.accordion12
                  class="p-1 bg-danger text-white"
                  role="tab"
                >
                  <div class="pl-2 pr-2 d-block">
                    Physics - Section 1 <br /><small>11.30am - 12.30am</small>
                  </div>
                </b-card-header>
                <b-collapse id="accordion12" accordion="my-accordion" role="tabpanel">
                  <p class="mb-0 pt-2 pb-2 accordian-sub-title">
                    <b>Chapter1 - Work & Energy</b>
                  </p>

                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Topic</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-keypad text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Agenda</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-note2 text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Notes</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-pen text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Assignment</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-bookmarks text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Question Bank</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="list-group-item">
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left center-elem mr-2">
                            <i class="pe-7s-smile text-muted fsize-1"></i>
                          </div>
                          <div class="widget-content-left">
                            <div class="widget-heading">Activities</div>
                          </div>
                          <div class="widget-content-right widget-content-actions">
                            <i class="lnr-plus-circle"></i>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </b-collapse>
              </b-card>
            </div>
          </template>
        </b-col>
        <!--Day1 Classes End-->
      </b-row>
    </div>
    <!--Monthly Tab End-->
   
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
//import draggable from "vuedraggable";
//import CreateTest from "../test/newtest";
//import {quillEditor} from "vue-quill-editor";
export default {
  components: {
    VuePerfectScrollbar,
    //draggable,
  //  CreateTest,
    //   quillEditor
  },
  data: () => ({
    topicslist: false,
    agenda: false,
    notes: false,
    sub: "Science - Section 2",
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
    subject: ["Maths (5B)", "Science (3A)", "Science (5A)", "Maths (2A)", "Science (2A)"],
    date: new Date().toISOString().substr(0, 10),
    taboption: "Day",
    chapter: "Science (3A)",
    list: [
      {
        classdate: "20-11-2020",
        name: "Introduction to Chemical Reactions",
        time: "9.30am:10.30am",
        day: "Mon",
      },
      {
        classdate: "20-11-2020",
        name: "Balancing of Chemical Reactions",
        time: "9.30am:10.30am",
      },
      {
        classdate: "20-11-2020",
        name: "Types of Chemical Reactions",
        time: "9.30am:10.30am",
      },
      {
        classdate: "20-11-2020",
        name: "Corrosion and Rancidity",
        time: "9.30am:10.30am",
      },
    ],
    topics: [
      {
        Suject_id:"1",
        chapter_id:"Chapter2",

        subject_name:"Science (3A)",
        topic_list:["Introduction to Chemical Reactions",
          "Balancing of Chemical Reactions",
          "Types of Chemical Reactions",
          "Corrosion and Rancidity"],
      },
      {
        Suject_id:"2",
        subject_name:"Science (3A)",
        topic_list:["Introduction to Chemical Reactions",
          "Balancing of Chemical Reactions",
          "Types of Chemical Reactions",
          "Corrosion and Rancidity"],
      },
      {
        Suject_id:"3",
        subject_name:"Science (3A)",
        topic_list:["Introduction to Chemical Reactions",
          "Balancing of Chemical Reactions",
          "Types of Chemical Reactions",
          "Corrosion and Rancidity"],
      }
     
    ],
    
    dragging: false,
  }),
  methods: {
    viewtopic(val) {
      this.sub = val;
      this.topicslist = true;
      this.agenda = false;
      this.notes = false;
    },
    viewAgenda(val) {
      this.sub = val;
      this.topicslist = false;
      this.agenda = true;
      this.notes = false;
    },
    viewNotes(val) {
      this.sub = val;
      this.topicslist = false;
      this.agenda = false;
      this.notes = true;
    },
    showTables(val) {
      this.taboption = val;
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
  /* font-size: 20px; */
  align-items: center;
  font-weight: 600;
}

.align-equal {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.np {
  padding: 0px;
}
.text-ellipssis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
  font-size: 12px;
}
</style>
