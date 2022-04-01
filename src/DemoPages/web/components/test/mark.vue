<template>

  <div class="row">
   
    <div class="col-sm-12 col-lg-8" v-if="!slideShow">
      <div class="col-sm-12 col-lg-12 np">
        <div class="mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
              <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i>
              Test to be marked
            </div>
          </div>
          <div class="p-0 card-body">
            <v-data-table :headers="marktestheaders" :items="TestToBeMarked" sort-by="name"
              class="elevation-1">
              <template v-slot:item="props">
                <tr>
                  <td>
                    <div v-bind:class="props.item.colorcode">{{props.item.name}}</div>
                  </td>
                  <td>{{props.item.test}}</td>
                  <td>{{props.item.testdate}}</td>
                  <td>{{props.item.assigned}}</td>
                  <td>{{props.item.attended}}</td>
                  <td>{{props.item.evaluated}}</td>
                  <td><button @click="MarkSheet(props.item.name)" type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger"> Mark </button>
                  </td>
                </tr>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-12 np">
        <div class="mb-3 card">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
              <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i>
              Test marked
            </div>
          </div>
          <div class="p-0 card-body">
            <v-data-table :headers="marktestheaders" :items="TestToBeMarked" :search="search" sort-by="name"
              class="elevation-1">
              <template v-slot:item="props">
                <tr>
                  <td>
                    <div v-bind:class="props.item.colorcode">{{props.item.name}}</div>
                  </td>
                  <td>{{props.item.test}}</td>
                  <td>{{props.item.testdate}}</td>
                  <td>{{props.item.assigned}}</td>
                  <td>{{props.item.attended}}</td>
                  <td>{{props.item.evaluated}}</td>
                  <td> <button type="button"
                      class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info"> View </button></td>

                </tr>
              </template>

              <template v-slot:no-data>
                <v-btn color="primary" @click="initialize">Reset</v-btn>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 col-lg-4" v-if="!slideShow"  id="vieWide">
      <!--Class Assignments Overall View-->
      <div class="col-sm-12 col-lg-12 np">
        <i @click="goToMark" class="lnr-arrow-left mr-2 bold" v-if="backbtn"></i>
        <div class="card mb-3">
          <div class="card-header-tab card-header">
            <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
              <i class="lnr-book icon-gradient bg-malibu-beach mr-2"></i>{{subject}}
            </div>
            <!--<div class="btn-actions-pane-right actions-icon-btn">
              <i class="lnr-frame-expand link"></i>
            </div>-->
          </div>
          <div class="search-with-title">
            <div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg></div></div>
                    <input placeholder="Search..." v-model="search" type="text" class="form-control"></div>
          </div>
          <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="name" class="elevation-1">
            <template v-slot:item="props">
              <tr>
                <td>{{props.item.name}}</td>
                <td>25/50</td>
                <td><button @click="viewMarkSheet" type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-info">
                    View </button></td>
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

    <!--Mark Assignments Table Start-->
     <div class="col-sm-12 col-lg-3" v-if="slideShow">
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
           <div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg></div></div>
                    <input placeholder="Search..." v-model="search" type="text" class="form-control"></div>
          </div>
           <ul class="list-group list-group-flush">
                  <li class="list-group-item" v-bind:class="item.active" v-for="item in desserts" :search="searchstudent" :key="item.name" style="padding: 4px 20px;">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                          <img width="38" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt />
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading" style="font-size: 13px;">{{item.name}}</div>                        
                        </div>                       
                      </div>
                    </div>
                  </li>
                 
                 
                </ul>
          </VuePerfectScrollbar>

        </div>
        
      </div>
    </div>
     <div class="col-sm-12 col-lg-6" v-if="slideShow">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal algn-equal">
            <i @click="viewMarkwide" class="lnr-arrow-left mr-2 bold link"></i>
            <span>Amal el Moussaif - Science (5B)</span>

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
                    <p class=""><b>Ans:</b> Rainbow is formed due to the dispersion of sunlight by raindrops suspended
                      in air. Water drops act like tiny prisms. When sunlight enters into a spherical rain¬drop, it is
                      refracted and dispersed. The different colours of light bent in different angles. When different
                      colours of light fall on the back inner surface of drop, they undergo total internal reflection.
                      The water drop again refracts the different colours, while coming out of the drop. After leaving
                      the drop different colours come out to form a rainbow.

                      A rainbow is always it formed in the direction opposite to the sun. so, to see a rainbow, the sun
                      must bebehind us.
                    </p>
                  </div>
                  <!--Question 1-->
                  <!--Question 2-->
                  <div class="widget-chart widget-chart2 text-left p-0">
                    <h6><b>Q2. </b>How are we able to see distant and nearby objects clearly? Which part of eye
                      helps in changing curvature of lens? Why no image is formed at blind spot? - <b>10 Marks</b></h6>
                    <p class=""><b>Ans:</b> We can see distant and near objects clearly because of the property of
                      accommodation of eye. Accommodation is the name given to the ability of the lens of the eye to
                      change its focal length and produce focused images of both distant and near objects on the retina.

                      Cilary muscle helps in changing curvature of the lens. They are attached to the lens and contract
                      or release to change the lens shape and curvature.

                      No image is formed at blind spot because there are no photoreceptors, i.e., cones and rods to
                      detect the light and send it to brain.
                    </p>
                  </div>
                  <!--Question 2-->
                  <!--Question 3-->
                  <div class="widget-chart widget-chart2 text-left p-0">
                    <h6><b>Q3. </b>Why magnification is taken negative for real images and positive for virtual images? - <b>10 Marks</b></h6>
                    <p><b>Ans:</b> If image is real, it will be inverted which means height of image will
                      be taken as negative. Also, the height of object is always positive.

                      Now as magnification = Height of image / Height of object.Therefore, in case of real image,

                      Magnification = Height of image (-) / height of object (+)=Negative.

                      So, Magnification will be negative.

                      Similarly, if image is virtual, it will be erect.

                      Therefore, in case of virtual image,

                      Magnification = Height of image (+) / height of object (+)= Positive<br>

                      So, Magnification will be positive.<br>

                     
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
 
   
    <!--Mark Assignments Table End-->
    <!--Comments Section-->
    <div class="col-sm-12 col-lg-3" v-if="slideShow">
      <div class="card-hover-shadow-2x mb-3 card">
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon lnr-graduation-hat icon-gradient bg-ripe-malin"></i>
            Marks Obtained
          </div>
        </div>
        <div class="scroll-area-lg">
          <VuePerfectScrollbar class="scrollbar-container" v-once>
            <div class="chat-wrapper p-1">
              <table class="table-bordered marks-table">
                <tr>
                  <th class="text-center">Question</th>
                  <th class="text-center">Scored</th>
                  <th class="text-center">Max Marks</th>
                </tr>
                <tr>
                  <th class="text-center">1</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">2</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">3</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">4</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">5</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">6</th>
                  <td class="text-center">-</td>
                  <td class="text-center">10</td>
                </tr>
                <tr>
                  <th class="text-center">Total Marks</th>
                  <th class="text-center">00</th>
                  <th class="text-center">60</th>
                </tr>
                
               
                <caption class="text-center"><b>Total Marks Obtained: </b> 0/50</caption>

              </table>
              <div class="card-footer">
                      <v-textarea solo name="input-7-4" label="private Comments" value="Amal you have to put in more efforts to understand the topic well. Work on the assignment given to you."></v-textarea>

              
              </div>
            </div>
          </VuePerfectScrollbar>

        </div>
        <div style="display: flex;justify-content: flex-end;margin-top: 30px;">
          <button type="button" class="btn btn-sm mr-2 mb-2 btn-secondary">Cancel</button>
          <button type="button" class="btn btn-sm mr-2 mb-2 btn-primary">Save</button>
        </div>
      </div>
    </div>
    <!--Comments Section-->

  </div>

</template>

<script>
  import VuePerfectScrollbar from "vue-perfect-scrollbar";
  import Slick from "vue-slick";
  export default {
    components: {
      Slick,
      VuePerfectScrollbar
    },
    data: () => ({
      heading: "Analytics Dashboard",
      subheading: "This is an example dashboard created using build-in elements and components.",
      icon: "pe-7s-plane icon-gradient bg-tempting-azure",
      search: "",
      searchstudent:"",
      subject:"All Subjects",
      slickOptions2: {
        slidesToShow: 1,
        dots: true
      },
slideShow:false,
      desserts: [],
      headers: [{
          text: "Student Name",
          value: "name"
        },
        {
          text: "Marks Obtained",
          value: "calories"
        },
        {
          text: "Action",
          value: "carbs"
        }
      ],
      marktestheaders: [{
          text: "Class",
          value: "class"
        },
        {
          text: "Test",
          value: "test"
        },
        {
          text: "Test Date",
          value: "testdate"
        },
        {
          text: "Assigned",
          value: "assigned"
        },
        {
          text: "Attended",
          value: "attend"
        },
        {
          text: "Evaluated",
          value: "eval"
        },
        {
          text: "Action",
          value: "action"
        }
      ],
      TestToBeMarked: [],
    }),
    created() {
      this.initialize();
    },
    methods: {
 //marked obtained part
      MarkSheet(val) {
       // alert(val);
       this.subject=val;
      },
      //marked obtained part

      //marked obtained part
      viewMarkSheet() {
        //alert("mark obtained");
        this.slideShow=true;
      },
      //marked obtained part
      //marked obtained part
      viewMarkInitial() {
        //alert("mark obtained");
        this.slideShow=false;
      },
      viewMarkwide() {
        //alert("mark obtained");
        this.slideShow=false;
        


      },
      //marked obtained part
      initialize() {
        this.TestToBeMarked = [{
            name: "Science (3A)",
            test: "1st test",
            testdate: "20-12-2020",
            assigned: 30,
            attended: 28,
            evaluated: 13,
            colorcode: "b-l-warning"
          },
          {
            name: "Maths (5B)",
            test: "2nd test",
            testdate: "20-12-2020",
            assigned: 30,
            attended: 28,
            evaluated: 13,
            colorcode: "b-l-primary"
          },
          {
            name: "Science (3A)",
            test: "3rd  test",
            testdate: "21-12-2020",
            assigned: 30,
            attended: 28,
            evaluated: 13,
            colorcode: "b-l-primary"
          }
        ];
        this.desserts = [{
            name: "Amal el Moussaif",
            image:"../../../../assets/images/avatars/1.jpg",
            active:"active"
          },
          {
            name: "Andrea Joesp",
            image:"../../../../assets/images/avatars/2.jpg",
             active:"inactive"
          },
          {
            name: "Andrea Procopio",
            image:"../../../../assets/images/avatars/3.jpg",
             active:"inactive"
          },
          {
            name: "Beatrice Bruto",
            image:"../../../../assets/images/avatars/4.jpg",
             active:"inactive"
          },
          {
            name: "Carola Schiavini",
            image:"../../../../assets/images/avatars/5.jpg",
             active:"inactive"
          },
          {
            name: "Gabriele	Volpi",
            image:"../../../../assets/images/avatars/6.jpg",
             active:"inactive"
          },
          {
            name: "Andrea Joesp",
            image:"../../../../assets/images/avatars/7.jpg",
             active:"inactive"
          },
          {
            name: "Andrea Procopio",
            image:"../../../../assets/images/avatars/8.jpg",
             active:"inactive"
          },
          {
            name: "Beatrice Bruto",
            image:"../../../../assets/images/avatars/9.jpg",
             active:"inactive"
          },
          {
            name: "Carola Schiavini",
            image:"../../../../assets/images/avatars/1.jpg",
             active:"inactive"
          },
          {
            name: "Gabriele	Volpi",
            image:"../../../../assets/images/avatars/2.jpg",
             active:"inactive"
          }
        ];
      }
    }
  };
</script>

<style scoped>
  .np {
    padding: 0px
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
.search-with-title {    margin: 9px auto 9px 10px;
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
    font-size: 12px !important
  }

  .marks-table {
    width: 100%
  }

  .marks-table>tr>td {
    padding: 10px;
  }
 
  .v-application p {
    margin-bottom: 16px;
    border: 1px solid #d7d7d7;
    padding: 20px;
}
</style>