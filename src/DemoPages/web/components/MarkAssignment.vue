<template>
  <div>
    <div class="row" v-if="!slideShow">
      <!--Mark Assignments Table Start-->
      <div class="col-sm-12 col-lg-7" id="Assigntbmarked">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"></i>Assignments to be Marked</div>
          </div>
          <div class="scroll-area-xl">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="table-responsive">
                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Class(Sec)</th>
                      <th>Assignment</th>
                      <th>Due Date</th>
                      <th>Pending</th>
                      <th>Type of Assignment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>07 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">12</div>
                      </td>
                      <td>Quiz</td>
                      <td>
                        <button type="button" @click="MarkAssignment('Science (3A)', '07 Nov 2020', 'Molecules')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Algebra</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>01 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">1</div>
                      </td>
                      <td>Homework</td>
                      <td><button type="button" @click="MarkAssignment('Maths (3A)', '01 Nov 2020', 'Algebra')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>01 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">5</div>
                      </td>
                      <td>Quiz</td>
                      <td><button type="button" @click="MarkAssignment('Science (3A)', '01 Nov 2020', 'Molecules')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Arithmatic</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>20 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">5</div>
                      </td>
                      <td>Homework</td>
                      <td><button type="button" @click="MarkAssignment('Maths (3A)', '20 Oct 2020', 'Arithmatic')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>17 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">8</div>
                      </td>
                      <td>Quiz</td>
                      <td><button type="button" @click="MarkAssignment('Science (3A)', '17 Oct 2020', 'Molecules')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Geometry</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>07 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">2</div>
                      </td>
                      <td>Homework</td>
                      <td><button type="button" @click="MarkAssignment('Maths (3A)', '07 Oct 2020', 'Geometry')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Geometry</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>06 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">2</div>
                      </td>
                      <td>Homework</td>
                      <td><button type="button" @click="MarkAssignment('Maths (3A)', '06 Nov 2020', 'Geometry')" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-success">Mark</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>

        <div class="card-hover-shadow-2x mb-3 card" id="Assignmarked">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-calendar-full icon-gradient bg-malibu-beach mr-2"></i>Completed Assignments</div>
          </div>
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="table-responsive">
                <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Class(Sec)</th>
                      <th>Assignment</th>
                      <th>Due Date</th>
                      <th>Pending</th>
                      <th>Type of Assignment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>10 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">12</div>
                      </td>
                      <td>Quiz</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Algebra</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>07 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">1</div>
                      </td>
                      <td>Homework</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>04 Nov 2020</td>
                      <td>
                        <div class="badge badge-warning">5</div>
                      </td>
                      <td>Quiz</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Arithmatic</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>22 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">5</div>
                      </td>
                      <td>Homework</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-warning">Science (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Molecules</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>14 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">8</div>
                      </td>
                      <td>Quiz</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                    <tr>
                      <td class="text-muted">
                        <div class="b-l-primary">Maths (3A)</div>
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left flex2">
                              <div class="widget-heading">Geometry</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>06 Oct 2020</td>
                      <td>
                        <div class="badge badge-warning">2</div>
                      </td>
                      <td>Homework</td>
                      <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <!--Mark Assignments Table End-->
      <!--Class Assignments Overall View-->
      <div class="col-sm-12 col-lg-5" id="AssigntDetails">
        <i @click="goToMark" class="lnr-arrow-left mr-2 bold" v-if="backbtn"></i>
        <div class="card mb-3">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal"><i class="header-icon lnr-book icon-gradient bg-malibu-beach mr-2"></i>{{ Cls }} - {{ title }}</div>
          </div>
          <!--info container-->
          <div class="card-header-tab card-header sub-bg">
            <div class="sub-info-container">
              <div>
                <p class="text-center">Assigned</p>
                <p class="text-center">19</p>
              </div>
              <div>
                <p class="text-center">Handed-in</p>
                <p class="text-center">02</p>
              </div>
              <div>
                <p class="text-center">Marked</p>
                <p class="text-center">00</p>
              </div>
              <div>
                <p class="text-center">Due Date</p>
                <p class="text-center">{{ duedate }}</p>
              </div>
            </div>
          </div>
          <!--info container-->

          <div class="search-with-title">
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
              <input placeholder="Search..." v-model="search" type="text" class="form-control" />
            </div>
          </div>

          <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="name" class="elevation-1">
            <template v-slot:item="props">
              <tr>
                <td>{{ props.item.name }}</td>
                <td>06 Nov 2020</td>
                <td>No</td>
                <td><button @click="ShowAssignDetails" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">View</button></td>
              </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize">Reset</v-btn>
            </template>
          </v-data-table>
        </div>
      </div>
      <!--Mark Assignments Table Start-->
    </div>
    <div class="row" v-if="slideShow">
      <div class="col-sm-12 col-lg-3" id="studentlist">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
              <i class="header-icon lnr-user icon-gradient bg-ripe-malin"></i>
              Student List
            </div>
          </div>
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="search-with-title">
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
                  <input placeholder="Search..." v-model="search" type="text" class="form-control" />
                </div>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item" v-bind:class="item.active" v-for="item in desserts" :search="searchstudent" :key="item.name" style="padding: 4px 20px">
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left mr-3">
                        <img width="38" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt />
                      </div>
                      <div class="widget-content-left">
                        <div class="widget-heading" style="font-size: 13px">{{ item.name }}</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <!--Assignments view Table Start-->
      <div class="col-sm-12 col-lg-6 hide" id="AssignFiles">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal algn-equal">
              <i @click="AssignFileback" class="lnr-arrow-left mr-2 bold link"></i>
              <span
                >Amal el Moussaif
                <i @click="evaluated" v-if="!eval" class="lnr-checkmark-circle bold text-danger"></i>
                <i @click="evaluated" v-if="eval" class="lnr-checkmark-circle bold text-success"></i
              ></span>
              <button class="btn btn-sm btn-primary">Next Student</button>
            </div>
          </div>
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="p-30">
                <!--Question 1-->
                <h6>1. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>1. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>2. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>3. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>4. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>5. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
                <!--Question 1-->
                <h6>6. Which of the following is a large blood vessel that carries blood away from the heart?</h6>
                <p>A. Vein<br />B. Artery<br />C. Capillary<br />D. Nerve<br /><b>Ans. B</b></p>
                <p>Explanation: The pulmonary artery carries blood from the right side of the heart to the lungs to pick up a fresh supply of oxygen.</p>
                <!--Question 1-->
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-6">
        <div class="card-hover-shadow-2x mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal algn-equal">
              <i @click="AssignFileback" class="lnr-arrow-left mr-2 bold link"></i>
              <span>Amal el Moussaif <i @click="evaluated" v-if="!eval" class="lnr-cross-circle bold text-danger"></i> <i @click="evaluated" v-if="eval" class="lnr-checkmark-circle bold text-success"></i></span>
              <button class="btn btn-sm btn-primary">Next Student</button>
            </div>
          </div>
          <div class="scroll-area-lg">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="p-30">
                <div class="p-1 slick-slider-sm mx-auto">
                  <slick ref="slick" :options="slickOptions2">
                    <!--Question 1-->
                    <div class="widget-chart widget-chart2 text-left p-0">
                      <h6><b>Q1. </b>Give an explanation for the formation of a rainbow? - <b>10 Marks</b></h6>
                      <p class="">
                        <b>Ans:</b> Rainbow is formed due to the dispersion of sunlight by raindrops suspended in air. Water drops act like tiny prisms. When sunlight enters into a spherical rain¬drop, it is refracted and dispersed. The different colours of light bent in different angles. When different colours of
                        light fall on the back inner surface of drop, they undergo total internal reflection. The water drop again refracts the different colours, while coming out of the drop. After leaving the drop different colours come out to form a rainbow. A rainbow is always it formed in the direction opposite to
                        the sun. so, to see a rainbow, the sun must bebehind us.
                      </p>
                    </div>
                    <!--Question 1-->
                    <!--Question 2-->
                    <div class="widget-chart widget-chart2 text-left p-0">
                      <h6><b>Q2. </b>How are we able to see distant and nearby objects clearly? Which part of eye helps in changing curvature of lens? Why no image is formed at blind spot? - <b>10 Marks</b></h6>
                      <p class="">
                        <b>Ans:</b> We can see distant and near objects clearly because of the property of accommodation of eye. Accommodation is the name given to the ability of the lens of the eye to change its focal length and produce focused images of both distant and near objects on the retina. Cilary muscle helps
                        in changing curvature of the lens. They are attached to the lens and contract or release to change the lens shape and curvature. No image is formed at blind spot because there are no photoreceptors, i.e., cones and rods to detect the light and send it to brain.
                      </p>
                    </div>
                    <!--Question 2-->
                    <!--Question 3-->
                    <div class="widget-chart widget-chart2 text-left p-0">
                      <h6><b>Q3. </b>Why magnification is taken negative for real images and positive for virtual images? - <b>10 Marks</b></h6>
                      <p>
                        <b>Ans:</b> If image is real, it will be inverted which means height of image will be taken as negative. Also, the height of object is always positive. Now as magnification = Height of image / Height of object.Therefore, in case of real image, Magnification = Height of image (-) / height of
                        object (+)=Negative. So, Magnification will be negative. Similarly, if image is virtual, it will be erect. Therefore, in case of virtual image, Magnification = Height of image (+) / height of object (+)= Positive<br />

                        So, Magnification will be positive.<br />
                      </p>
                    </div>
                    <!--Question 3-->
                  </slick>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
        </div>
      </div>
      <!--Assignments view Table End-->
      <!--Comments Section-->
      <div class="col-sm-12 col-lg-3" id="file">
        <div class="card-hover-shadow-2x mb-1 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
              <i class="header-icon lnr-pencil icon-gradient bg-ripe-malin"></i>
              Comments
            </div>
          </div>
          <div class="scroll-area-sm">
            <VuePerfectScrollbar class="scrollbar-container" v-once>
              <div class="chat-wrapper p-1">
                <div class="chat-box-wrapper">
                  <div>
                    <div class="avatar-icon-wrapper mr-1">
                      <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div>
                      <div class="avatar-icon avatar-icon-lg rounded">
                        <img src="@/assets/images/avatars/2.jpg" alt />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="chat-box">Amal you have to put in more efforts to understand the topic well. Work on the assignment given to you.</div>
                    <small class="opacity-6">
                      <font-awesome-icon icon="calendar-alt" class="mr-1" />
                      11:01 AM | Yesterday
                    </small>
                  </div>
                </div>
              </div>
            </VuePerfectScrollbar>
          </div>
          <div class="card-footer">
            <input placeholder="Staff Comments..." type="text" class="form-control-sm form-control" />
          </div>
        </div>
        <!--rating-->
        <div class="card pt-0"><rate :length="5" /></div>
        <!--rating end-->
      </div>
      <!--Comments Section-->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import rate from "vue-rate";
import "vue-rate/dist/vue-rate.css";
Vue.use(rate);
// import Slick from "vue-slick";
export default {
  components: {
    VuePerfectScrollbar,
    // rate,
    // Slick,
  },
  data: () => ({
    heading: "Analytics Dashboard",
    subheading: "This is an example dashboard created using build-in elements and components.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure",
    slickOptions2: {
      slidesToShow: 1,
      dots: true,
    },
    slideShow: false,
    backbtn: false,
    eval: false,
    search: "",
    headers: [
      {
        text: "Student Name",
        value: "name",
      },
      {
        text: "Handed-In",
        value: "calories",
      },
      {
        text: "Marked",
        value: "fat",
      },
      {
        text: "Action",
        value: "carbs",
      },
    ],

    desserts: [],
    Cls: "Science (3A)",
    title: "Molecules",
    duedate: "07 Nov 2020",
    fields: [
      {
        key: "last_name",
        sortable: true,
      },
      {
        key: "first_name",
        sortable: true,
      },
      {
        key: "age",
        label: "Person age",
        sortable: true,
        // Variant applies to the whole column, including the header and footer
      },
    ],
    items: [
      {
        isActive: true,
        age: 40,
        first_name: "Dickerson",
        last_name: "Macdonald",
      },
      { isActive: false, age: 21, first_name: "Larsen", last_name: "Shaw" },
      { isActive: false, age: 89, first_name: "Geneva", last_name: "Wilson" },
      { isActive: true, age: 38, first_name: "Jami", last_name: "Carney" },
    ],
  }),
  created() {
    this.initialize();
  },
  methods: {
    //marked obtained part
    MarkSheet(val) {
      // alert(val);
      this.subject = val;
    },
    //marked obtained part

    //marked obtained part
    viewMarkSheet() {
      //alert("mark obtained");
      this.slideShow = true;
    },
    //marked obtained part
    //marked obtained part
    viewMarkInitial() {
      //alert("mark obtained");
      this.slideShow = false;
    },
    AssignFileback() {
      //alert("mark obtained");
      this.slideShow = false;
    },
    evaluated() {
      this.eval = true;
    },
    MarkAssignment(Cls, duedate, title) {
      this.Cls = Cls;
      this.duedate = duedate;
      this.title = title;
    },
    goToMark() {
      //  alert("hai mark");
      document.getElementById("Assigntbmarked").classList.remove("hide");
      document.getElementById("Assigntbmarked").classList.add("show");
      document.getElementById("Assignmarked").classList.remove("hide");
      document.getElementById("Assignmarked").classList.add("show");

      document.getElementById("AssigntDetails").classList.add("col-lg-5");
      document.getElementById("AssigntDetails").classList.remove("col-lg-8");
      this.backbtn = false;
    },
    AssignmMarkExpand() {
      this.backbtn = true;
      //document.getElementById("Assigntbmarked").classList.remove("col-xl-6")
      document.getElementById("Assigntbmarked").classList.add("hide");
      document.getElementById("Assignmarked").classList.add("hide");
      document.getElementById("studentlist").classList.add("hide");
      document.getElementById("AssigntDetails").classList.remove("col-lg-5");
      document.getElementById("AssigntDetails").classList.add("col-lg-8");
      document.getElementById("file").classList.add("hide");
    },
    ShowAssignDetails() {
      this.slideShow = true;
    },
    initialize() {
      this.desserts = [
        {
          name: "01 - Amal el Moussaif",
        },
        {
          name: "02 - Andrea Joesp",
        },
        {
          name: "03 - Andrea Procopio",
        },
        {
          name: "04 - Beatrice Bruto",
        },
        {
          name: "05 - Carola Schiavini",
        },
        {
          name: "06 - Gabriele	Volpi",
        },

        {
          name: "07 - Andrea Joesp",
        },
        {
          name: "08 - Andrea Procopio",
        },
        {
          name: "09 - Beatrice Bruto",
        },
        {
          name: "10 - Carola Schiavini",
        },
        {
          name: "11 - Gabriele	Volpi",
        },
      ];
    },
  },
};
</script>
<style>
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
