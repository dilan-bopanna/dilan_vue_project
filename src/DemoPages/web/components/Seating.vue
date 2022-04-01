<template>
   <div class="main-card mb-3 card">
      <div class="card-body">
         <div class="row">
            <!--Left Table with bubble list-->
            <div class="col-sm-4 card">
               <div class="card-header-tab card-header" style="display:flex;justify-content:space-between">
                  <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                     <i class="lnr-construction icon-gradient bg-malibu-beach mr-2"></i>Seating Bubbles
                  </div>
                  <button class="btn btn-primary btn-sm" @click="addNewbubble">Add</button>
               </div>
               <div class="search-with-title">
                  <div>
<div class="input-group"><div class="input-group-prepend"><div class="input-group-text"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-search fa-w-16"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" class=""></path></svg></div></div>
                    <input placeholder="Search..." v-model="search" type="text" class="form-control"></div>                  </div>
                  
               </div>
               <!--Table part -->
               <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="name" class="elevation-1">
                  <template v-slot:item="props">
                     <tr>
                        <td>{{props.item.roll}}</td>
                        <td>{{props.item.name}}
                        </td>
                        <td class="text-center" v-if="!props.item.bbno==''">
                           <b-dropdown toggle-class="btn-icon btn-icon-only" variant="link" no-caret :disabled="props.item.infected1">
                              <span slot="button-content">
                                 <div class="icon-wrapper rounded-circle">
                                    <div class="icon-wrapper-bg opacity-9" v-bind:class="[props.item.infected1 ? 'red' : props.item.bubble]"></div>
                                    <span class="text-white">{{props.item.bbno}}</span>
                                 </div>
                              </span>
                              <ul class="nav flex-column">
                                 <li class="nav-item-header nav-item" style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #dddddd;"> 
                                    <button  type="button" class="text-sm btn btn-sm mr-2 btn-pill text-white btn-info">
                                    Add New
                                    </button>
                                    <button @click="removeFromBubble(props.item.roll)" type="button" class="text-sm btn btn-sm mr-2 btn-pill text-white" v-bind:class="props.item.bubble">
                                    Remove
                                    </button>
                                 </li>
                                 <b style="padding: 2px 16px;">Move To</b>
                                 <li class="nav-item " v-for="item in Bubbleslist" :key="item.name">
                                    <a v-if="item.value!=props.item.bubble"  class="nav-link"  @click="movetoExistingBubble(props.item.roll,item.value,item.No)">
                                       {{item.BubbleName}}
                                       <div class="ml-auto badge text-white" v-bind:class="item.value">{{item.No}}</div>
                                    </a>
                                 </li>
                                 <!-- <li class="nav-item-divider nav-item"></li>
                                    <li class="nav-item-btn nav-item">
                                      <button class="btn-wide btn-shadow btn btn-danger btn-sm">Cancel</button>
                                    </li>-->
                              </ul>
                           </b-dropdown>
                        </td>
                        <td class="text-center" v-if="props.item.bbno==''">
                           <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                              <b-dropdown toggle-class="btn-icon btn-icon-only" variant="link" no-caret>
                                 <span slot="button-content">
                                 <i class="pe-7s-add-user btn-icon-wrapper"></i>
                                 </span>
                                 <ul class="nav flex-column">
                                    <li class="nav-item-header nav-item" style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #dddddd;"> 
                                       <button  type="button" class="text-sm btn btn-sm mr-2 btn-pill text-white btn-info">
                                       Add New
                                       </button>
                                    </li>
                                    <li class="nav-item" v-for="item in Bubbleslist" :key="item.name">
                                       <a class="nav-link" @click="addTobubble(props.item.roll,props.item.name,item.BubbleName,item.No,item.value)">
                                          {{item.BubbleName}}
                                          <div class="ml-auto badge" v-bind:class="item.value">{{item.No}}</div>
                                       </a>
                                    </li>
                                    <!-- <li class="nav-item-divider nav-item"></li>
                                       <li class="nav-item-btn nav-item">
                                         <button class="btn-wide btn-shadow btn btn-danger btn-sm">Cancel</button>
                                       </li>-->
                                 </ul>
                              </b-dropdown>
                           </div>
                        </td>
                        <td class="text-center">
                           <div @click="showMedInfo(props.item.name)" role="group" class="btn-shadow btn-group-sm btn-group link">
                              <button class="btn btn-outline-dark text-sm" v-bind:class="{ 'covid text-white': props.item.covid }">C</button>
                              <button type="button" class="btn btn-outline-dark text-sm" v-bind:class="{ 'covid text-white': props.item.Quarantine }">Q</button>
                           </div>
                        </td>
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
<!--Table part -->
</div>
<!--Right Table with bubble list-->
<!--Bubble-->
<div class="col-sm-8">
            <div style="display: flex;font-size: 12px;    margin-bottom: 30px;">
                <div class="mr-2"><span class="board">C</span> - Covid Infected</div>
                 <div class="ml-2"><span class="board">Q</span> - Quarantined</div>
            </div>
<div class="col-sm-12 hide" id="medInfo">
<i class="lnr-arrow-left link" @click="hideMedInfo"></i>
<div class="card-header-tab card-header">
<div class="card-header-title font-size-lg text-capitalize font-weight-normal">
<i class="pe-7s-bandaid icon-gradient bg-malibu-beach mr-2"></i>Medical Information - <b> {{student}}</b></div>
</div>
<div class="row">
<!--medical info area-->
<div class="col-sm-12" >
<v-data-table :headers="medheaders" :items="medicalinfo" :search="search" sort-by="slno" class="elevation-1">
<template v-slot:item="props">
<tr>
<td>{{props.item.covidstatus}}</td>
<td class="datespace">{{props.item.Date}}</td>
<td>{{props.item.Quarantine}}</td>
<td class="datespace">{{props.item.Quarantinefdate}}</td>
<td class="datespace">{{props.item.Quarantinetdate}}</td>
<td class="datespace"><v-tooltip left>
<template v-slot:activator="{ on }">
<div class="avatar-wrapper mt-2 avatar-wrapper-overlap">
<div class="avatar-icon-wrapper avatar-icon-sm">
<div v-on="on" class="avatar-icon">
<img  src="@/assets/images/avatars/1.jpg" alt />
</div>
</div>
<div v-on="on" class="avatar-icon-wrapper avatar-icon-sm">
<div class="avatar-icon">
<img src="@/assets/images/avatars/2.jpg" alt />
</div>
</div>
<div v-on="on" class="avatar-icon-wrapper avatar-icon-sm">
<div class="avatar-icon">
<img src="@/assets/images/avatars/2.jpg" alt />
</div>
</div>
</div>
</template>
<span>{{props.item.cperson}}</span>
</v-tooltip></td>
<td><i class="pe-7s-pen"></i></td>
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
<!--Medical Info area-->
</div>
</div>
<div style="display: flex;flex-flow: wrap;" id="bubbleParent">
<!--bubble one-->
<div class="bubble" v-bind:class="[infected ? 'red' : 'b1']">
<v-tooltip left>
<template v-slot:activator="{ on }">
<i class="lnr-plus-circle adbtn" @click="openCovidDetails(1)" v-if="!infected"></i>
</template>
<span>Add Covid data</span>
</v-tooltip>

<h4 class="bb-no">1</h4>
<div v-for="item in desserts" :key="item.name">
<div v-if="item.bbno == 1">{{item.name}} <i  @click="removeFromBubble(item.roll)" class="pe-7s-close text-dark link"></i></div>
</div>
</div>
<!--bubble one-->
<!--bubble two-->
<div class="bubble" v-bind:class="'b2'"> 
<v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
              <i v-bind="attrs" v-on="on" class="pe-7s-plus adbtn" @click="openCovidDetails(2)"></i>              
              </template>
              Add Covid data
            </v-tooltip>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         

<h4 class="bb-no">2</h4>
<div v-for="item in desserts" :key="item.name" >
<div v-if="item.bbno == 2">{{item.name}} <i @click="removeFromBubble(item.roll)" class="pe-7s-close text-dark link"></i></div>
</div>
</div>
<!--bubble two-->
<!--bubble three-->
<div class="bubble" v-bind:class="'b3'">
<v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
              <i v-bind="attrs" v-on="on" class="pe-7s-plus adbtn" @click="openCovidDetails(3)"></i>              
              </template>
              Add Covid data
            </v-tooltip> 

<h4 class="bb-no">3</h4>
<div v-for="item in desserts" :key="item.name" >
<div v-if="item.bbno == 3">{{item.name}} <i @click="removeFromBubble(item.roll)" class="pe-7s-close text-dark link"></i></div>
</div>
</div>
<!--bubble three-->
<!--bubble three-->
<div class="bubble hide" v-bind:class="'b4'" id="newbubble">
<h4 class="bb-no">4</h4>                        
</div>
<!--bubble three-->
</div>
<!--Covid info area-->
<div class="col-sm-12 hide" id="coviddetails" style="border: 1px solid #d5e9df;padding: 0px;">
<div class="card-header-tab card-header" style="display:flex;justify-content:space-between">
<div class="card-header-title font-size-lg text-capitalize font-weight-normal">
<i class="lnr-construction icon-gradient bg-malibu-beach mr-2"></i>Covid Effected
</div>
</div>
<div class="table-responsive">
<table class="align-middle mb-0 table table-borderless table-striped table-hover">
<thead>
<tr>
<th>Name</th>
<th class="text-center">Covid</th>
<th class="text-center">Quarantined</th>                
</tr>
</thead>
<tbody>
<tr v-for="item in covidlist" :key="item.name">
<td>{{item.name}}</td>
<td class="text-center">
 <toggle-button id="changed-font"  v-model="item.covid" :width="50" :height="25" :speed="480"
                                          :color="{checked: '#3ac47d', unchecked: '#d92550'}"
                                          :labels="{checked: 'Yes', unchecked: 'No'}" />
                                          <span v-if="item.covid"> 20-11-2020</span>

</td>
<td class="text-center">
<toggle-button id="changed-font"  v-model="item.Quarantine" :width="50" :height="25" :speed="480"
                                          :color="{checked: '#3ac47d', unchecked: '#d92550'}"
                                          :labels="{checked: 'Yes', unchecked: 'No'}" />
                                         

</td>
</tr>
</tbody>
</table>
</div>
<div class="d-block text-center card-footer">
<div style="display: flex;justify-content: space-between;align-items: center;" >
<v-col cols="12" sm="6" md="4" >
<v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px" >
<template v-slot:activator="{ on, attrs }" >
<v-text-field v-model="date"  label="Quratined From"
   prepend-icon="event" readonly v-bind="attrs" v-on="on" >
</v-text-field>
</template>
<v-date-picker v-model="date" scrollable>
<v-spacer></v-spacer>
<v-btn text color="primary" @click="modal = false">Cancel</v-btn>
<v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
</v-date-picker>
</v-dialog>
</v-col>  
<div>
</div>
<v-col cols="12" sm="6" md="4" >
<v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
<template v-slot:activator="{ on, attrs }">
<v-text-field v-model="date"  label="Quratined till"
   prepend-icon="event" readonly v-bind="attrs" v-on="on">
</v-text-field>
</template>
<v-date-picker v-model="date" scrollable>
<v-spacer></v-spacer>
<v-btn text color="primary" @click="modal = false">Cancel</v-btn>
<v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
</v-date-picker>
</v-dialog>
</v-col>  
<button class="btn-wide btn btn-success">Save</button>
</div>
</div>       
</div>
<!--Covid Info area-->
</div>
<!--Bubble-->
</div>
</div>
</div>
</template>
<script>
import { ToggleButton } from "vue-js-toggle-button";
   //import VuePerfectScrollbar from "vue-perfect-scrollbar";
   export default {
     components: {
        // VuePerfectScrollbar 
 ToggleButton

         },
     data: () => ({
         date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
     hodor:false,
       search: "",
       index:0,
       student:"",
       infected:true,
       placements: [
      "topright",
      "top",
      "topleft",
      "bottomright",
      "bottom",
      "bottomleft",
      "righttop",
      "right",
      "lefttop",
      "rightbottom",
      "left",
      "leftbottom"
    ],
       medheaders: [
               {
                   text: "Covid",
                   value: "name"
               },
               {
                   text: "Affected On",
                   value: "affdate"
               },
               {
                   text: "Quarantined",
                   value: "quarantine"
               },
               {
                   text: "From",
                   value: "quarantinefrom"
               },
               {
                   text: "To",
                   value: "quarantineto"
               },
               {
                   text: "Contact",
                   value: "quarantineto"
               }
               ,
               {
                   text: "Action",
                   value: "action"
               }
           ], 
           covidheaders: [{
               
                   text: "Name",
                   value: "name"
               },
               {
                   text: "Covid",
                   value: "cstatus"
               },
               {
                   text: "Qurantined",
                   value: "qstatus"
               }
           ],
           headers: [{
               
                   text: "#Roll",
                   value: "roll"
               },
               {
                   text: "Name",
                   value: "name"
               },
               {
                   text: "Bubble",
                   value: "bubble"
               },
               {
                   text: "Medical info",
                   value: "med"
               }
           ],
           Bubbleslist: [{
               BubbleName:"Bubble One",
                  No:1,
                  value: "b1",
                  infected:true
               },
               {
                   BubbleName:"Bubble Two",
                    No:2,
                  value: "b2",
                  infected:false
               },
               {
                   BubbleName:"Bubble Three",
                    No:3,
                  value: "b3",
                  infected:false
               }
           ],
           desserts: [],
           medicalinfo: [],
           covidlist: []
     }),
   created() {
           this.initialize();
       },
     methods: {
         handleClick(newTab) {
               this.currentTab = newTab;
           },
           addNewbubble(){
             document.getElementById("newbubble").classList.remove("hide");
             document.getElementById("newbubble").classList.add("show");
           },
          
         addTobubble(rollid,one,two,three,bbcolor){
               this.index = this.desserts.findIndex(item=> item.roll === rollid);
               // alert(this.index);
               this.desserts[this.index].bbno = three;
               this.desserts[this.index].bubble = bbcolor;
           },
         removeFromBubble(rollid){
               //alert(rollid);
               this.index = this.desserts.findIndex(item=> item.roll === rollid);
               //alert(this.index);
               this.desserts[this.index].bbno = '';
           },
         movetoExistingBubble(rollid,bbcolor,bubbleno){        
               this.index = this.desserts.findIndex(item=> item.roll === rollid);
               //alert(this.index);
               this.desserts[this.index].bubble = bbcolor;
               this.desserts[this.index].bbno = bubbleno;
           },
         openCovidDetails(rollid){ 
            document.getElementById("coviddetails").classList.remove("hide");
             document.getElementById("coviddetails").classList.add("show");
            
            this.covidlist=[]
               // alert(rollid);
              this.index = this.desserts.findIndex(item=> item.bbno === rollid);
            //   alert(this.index);
            for(var i = 0; i<= this.desserts.length; i++){
               // alert(this.desserts[i].bbno);
               if(rollid == this.desserts[i].bbno){
                     var item = {}
                     item ["roll"] = this.desserts[i].roll;
                     item ["name"] = this.desserts[i].name;
                     item ["bbno"] = this.desserts[i].bbno;
                     item ["Quarantine"] = this.desserts[i].Quarantine;
                     item ["covid"] = this.desserts[i].covid;
                     console.log(item);
                     this.covidlist.push(item);
                     console.log(this.covidlist);
               }
              }
              console.log('this');
              console.log(this.desserts[this.index]);
            //   this.desserts[this.index].bubble;
               //this.desserts[this.index].bbno = bubbleno;
           },
         initialize() {
             this.desserts = [{
                 roll:1,
                    name: "Amal el Moussaif",
                    bubble:"b1",
                    bbno:1,
                    Quarantine:true,
                    covid:true,   
                    infected1: true               
                },
                {
                    roll:2,
                    name: "Andrea Joesp",
                   bubble:"b1",
                    bbno:1,
                    Quarantine:true,
                    covid:false,
                    infected1: true
                },
                {
                    roll:3,
                    name: "Andrea Procopio",
                   bubble:"b1",
                    bbno:1,
                    Quarantine:true,
                    covid:false,
                    infected1: true
                },
                {
                    roll:4,
                    name: "Beatrice Bruto",
                   bubble:"b3",
                    bbno:3,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
                {
                    roll:5,
                    name: "Carola Schiavini",
                    bubble:"b2",
                    bbno:2,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
                {
                    roll:6,
                    name: "Gabriele	Volpi",
                    bubble:"b2",
                    bbno:2,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
               
                {
                    roll:7,
                    name: "Andrea Joesp",
                    bubble:"b1",
                    bbno:1,
                    Quarantine:true,
                    covid:true,
                    infected1: true
                },
                {
                    roll:8,
                    name: "Andrea Procopio",
                   bubble:"b3",
                    bbno:3,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
                {
                    roll:9,
                    name: "Beatrice Bruto",
                   bubble:"b3",
                    bbno:"",
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
                {
                    roll:10,
                    name: "Carola Schiavini",
                   bubble:"b3",
                    bbno:3,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                },
                {
                    roll:11,
                    name: "Gabriele	Volpi",
                   bubble:"b3",
                    bbno:3,
                    Quarantine:false,
                    covid:false,
                    infected1: false
                }
            ];
            this.medicalinfo = [{
                 roll:1,
                    name: "Amal el Moussaif",
                    covidstatus:"Yes",
                    Date:'19-10-2020',
                    Quarantine:"Yes",
                    Quarantinefdate:'20-10-20',
                    Quarantinetdate:'05-11-20',
                    cperson:"Andrea Procopio"
                   
                },
                {
                    roll:2,
                    name: "Andrea Joesp",
                    covidstatus:"Yes",
                    Date:'19-10-2020',
                    Quarantine:"No",
                    Quarantinefdate:'20-10-20',
                    Quarantinetdate:'05-11-20',
                     cperson:"Andrea Procopio"
                }
            ];
           },
          showMedInfo(studentName){
             //alert(studentName);
             this.student=studentName;
              document.getElementById("medInfo").classList.remove("hide");
              document.getElementById("medInfo").classList.add("show");
              document.getElementById("bubbleParent").classList.remove("show");
              document.getElementById("bubbleParent").classList.add("hide");   
              document.getElementById("coviddetails").classList.add("hide");  
               document.getElementById("coviddetails").classList.remove("show");      
          } ,
          hideMedInfo(){
             //alert(studentName);
             //this.student=studentName;
              document.getElementById("medInfo").classList.remove("show");
              document.getElementById("medInfo").classList.add("hide");  
              document.getElementById("bubbleParent").classList.remove("hide");
              document.getElementById("coviddetails").classList.add("hide");  
               document.getElementById("coviddetails").classList.remove("show");
              document.getElementById("bubbleParent").style.display="flex !important";
              document.getElementById("bubbleParent").style.flexFlow="wrap !important";    
                  
          }
           
     }
   };
     
</script>
<style scoped>
.v-label{font-size: 12px !important;}
   .b1{background: #f7b924;}
   .b2{background: #4bc988;}
   .b3{background: #3f6ad7;}
   .covid{background:#F44336;}
   .b4{background: rgb(170, 169, 169)}
   .link{cursor: pointer;}
   .icon-wrapper {
   width: 40px;
   height: 40px;}
   .icon-wrapper span {
   margin: 0 auto;
   font-size:18px;
   position: relative;
   z-index: 5;
   }
   .large{    font-size: 28px;}
   .datespace{width: 116px !important;}
   .pe-7s-close{background: #ffffff;
   border-radius: 16px;}
   .bb-no{color: #fff;}
   .adbtn{       position: relative;
    top: -20px;
    right: 0;
    font-size: 23px;
    color: #ffffff;
    border-radius: 30px;}
   .bubble{
   color:#000;
   width: 200px;
   height: 200px;
   font-weight: 500;
   border-radius: 140px;
   display: flex;
   align-items: center;
   box-shadow: 0px 0px 18px 4px #d1d4db;
   flex-flow: column;
   justify-content: center;margin: 10px;}
   .text-sm{font-size: 11px;}
   .board{    background: #f44336;
    color: #fff;
    padding: 3px 8px;
    display: inline-block;
    border-radius: 5px;
    border: 1px solid #343a40;
    font-size: 12px;}
    .search-with-title {    margin: 9px auto 9px 10px;
}
</style>