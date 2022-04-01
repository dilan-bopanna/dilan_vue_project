<template>
    <div class="col-sm-12 col-md-12 col-xl-12 np">
        <b-row style="background: #fff;padding: 12px 0px;">
            <b-col lg="2">
                <div class="main-card mb-3 card">
                    <div class="card-body np">
                        <h5 class="card-title p-20">Absences for this week</h5>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item student-main-list">
                                <div class="student-main">
                                    <div class="student-det">
                                        <span class="name">AG015, Girish</span>
                                        <span class="days">2 Days</span>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item student-main-list">
                                <div class="student-main">
                                    <div class="student-det">
                                        <span class="name">AG120, Raghavendra kumar</span>
                                        <span class="days">MONDAY, NOV 2</span>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item student-main-list">
                                <div class="student-main">
                                    <div class="student-det">
                                        <span class="name">AG081, Siddarth</span>
                                        <span class="days">2 Days</span>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item student-main-list">
                                <div class="student-main">
                                    <div class="student-det">
                                        <span class="name">AG071, Sunil Kumar</span>
                                        <span class="days">1 Days</span>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item student-main-list">
                                <div class="student-main">
                                    <div class="student-det">
                                        <span class="name">AG77, Mahesh</span>
                                        <span class="days">3 Days</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </b-col>
            <b-col lg="10">
                <!--Attendance report Filters Start-->
                <div style="display: flex;align-items: baseline;" class="bg-white mb-3 pl-3 pr-3 pb-3">
                    <!--Class Filters-->
                    <div class="pl-3 pr-2">
                        <b>Sort:</b>
                    </div>
                    <!--Class Filters-->
                    <!--Class Filters-->
                    <div class="pl-3 pr-3">
                        <v-select v-model="classname" :items="Classes" hide-details label="Subject/Class" single-line
                            @click="getSubject(classname)">
                        </v-select>
                    </div>
                    <!--Class Filters-->
                    <!--Report Filters-->
                    <div class="pl-3 pr-3">
                        <v-select v-model="report" :items="Reports" hide-details label="Report of" single-line
                            @change="getReport(report)">
                        </v-select>
                    </div>
                    <!--Report Filters-->
                    <!--Submit-->
                    <!--mark attendance-->
                    <div class="text-center" v-if="1==2">
                        <v-dialog v-model="dialog3" width="500">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                                    Mark Attendance
                                </v-btn>
                            </template>
                            <v-card>
                                <v-card-text>
                                    <div class="p-0 card-body">
                                        <div class="pl-3 pr-3">
                                            <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent
                                                width="290px">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field style="padding-top: 31px;" v-model="date"
                                                        label="Select date" readonly v-bind="attrs" v-on="on"
                                                        format="dd MMM yyyy">
                                                    </v-text-field>
                                                </template>
                                                <v-date-picker v-model="date" scrollable @change="getmonth(date)">
                                                    <v-spacer></v-spacer>
                                                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK
                                                    </v-btn>
                                                </v-date-picker>
                                            </v-dialog>
                                        </div>
                                    </div>
                                    <div class="row" style="display: flex; align-items: center;padding: 0 15px">
                                        <div class="col-3">
                                            Select Period
                                        </div>
                                        <div class="col-9">
                                            <div style="display: flex;justify-content: space-evenly;">
                                                <v-checkbox v-model="hours" label="1st hour" value="1st hour" disabled>
                                                </v-checkbox>
                                                <v-checkbox v-model="hours" label="2st hour" value="2nd hour" disabled>
                                                </v-checkbox>
                                                <v-checkbox v-model="hours" label="3st hour" value="3rd hour">
                                                </v-checkbox>
                                            </div>
                                            <div style="display: flex;justify-content: space-evenly;">
                                                <v-checkbox v-model="hours" label="4st hour" value="4th hour">
                                                </v-checkbox>
                                                <v-checkbox v-model="hours" label="5st hour" value="5th hour">
                                                </v-checkbox>
                                                <v-checkbox v-model="hours" label="6st hour" value="6th hour">
                                                </v-checkbox>
                                            </div>
                                        </div>
                                    </div>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="addtoattendance" class="v-btn-sm theme--light light">Cancel
                                    </v-btn>
                                    <v-btn @click="addtoattendance" class="v-btn-sm theme--light primary">Next
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                    <!--mark attendance-->
                    <!--Submit-->
                </div>
                <!--Attendance report Filters End-->
                <!--week/day report pagination-->
                <div style="display: flex;align-items: baseline;justify-content:center"
                    class="bg-white mb-3 pl-3 pr-3 pb-3 weeek-carousel ">
                     <i class="lnr-arrow-left-circle link icon-gradient bg-arielle-smile" v-on:click="preview()">
                    </i>
                    <!--Calendar date from Filters-->
                    <div class="pl-3 pr-3">
                        {{reporttype}} of {{month}} {{date}}
                        <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                            <template v-slot:activator="{ on }">
                                <i class="lnr-calendar-full pr-2 icon-gradient bg-mixed-hopes pl-2" v-on="on"></i>
                            </template>
                            <v-date-picker v-model="date" scrollable id="date">
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                    </div>
                    <!--Calendar date from Filters-->
                    <i class="lnr-arrow-right-circle link icon-gradient bg-arielle-smile" v-on:click="back()">
                    </i>
                </div>
                <!--week/day report pagination End-->
                <!--Day Reports attendance-->
                <div class="card-hover-shadow-2x mb-3 card" v-if="!WeekTable">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Day Reports -
                            {{classname}} - {{date}}
                        </div>
                        <div class="btn-actions-pane-right">
                            <v-select v-model="student" :items="students" hide-details label="Student"
                                class="mr-6 font-size-sm" single-line>
                            </v-select>
                        </div>
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            Save
                        </v-btn>
                    </div>
                    <div class="p-0 card-body">
                        <v-data-table :headers="Dayreportheaders" :items="Dayreport" :search="search" sort-by="student"
                            class="elevation-1">
                            <template v-slot:item="props">
                                <tr>
                                    <td>{{props.item.regno}}</td>
                                    <td>{{props.item.Student}}</td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.Status" 
                                            :items="attensancestatus" dense solo v-on:change="checkLALE(props.item.Status,props.item)"></v-select>
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
                    </div>
                </div>
                <!--Day Reports attendance-->
                <!--weekly Reports attendance-->
                <div class="card-hover-shadow-2x mb-3 card" v-if="WeekTable && weeklytable==2">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Weekly Reports -
                            {{classname}}
                        </div>
                        <div class="btn-actions-pane-right">
                            <v-select v-model="student" :items="students" hide-details label="Student"
                                class="mr-6 font-size-sm" single-line>
                            </v-select>
                        </div>
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            Save
                        </v-btn>
                    </div>
                    <div class="p-0 card-body">
                        <v-data-table :headers="weekreportheaders" :items="weekreport" :search="search"
                            sort-by="student" class="elevation-1">
                            <template v-slot:item="props">
                                <tr>
                                    <td>{{props.item.regno}}</td>
                                    <td>{{props.item.Student}}</td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day1"
                                            :items="attensancestatus" dense solo v-on:change="checkLALE(props.item.day1,props.item)"></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day2"
                                            :items="attensancestatus" dense solo v-on:change="checkLALE(props.item.day2,props.item)"></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day3"
                                            :items="attensancestatus" dense solo v-on:change="checkLALE(props.item.day3,props.item)"></v-select>
                                    </td>
                                    <td>
                                            <v-select class="pt-5 select-width" v-model="props.item.day4" 
                                            :items="attensancestatus" dense solo v-on:change="checkLALE(props.item.day4,props.item)"></v-select>
                                    </td>
                                    <td></td>
                                    <td></td>
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
                <!--weekly Reports attendance-->
                <!--weekly Reports attendance-->
                <!--prev weekly Reports attendance-->
                <div class="card-hover-shadow-2x mb-3 card" v-if="WeekTable && weeklytable==1">
                    <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Weekly Reports -
                            {{classname}}
                        </div>
                        <div class="btn-actions-pane-right">
                            <v-select v-model="student" :items="students" hide-details label="Student"
                                class="mr-6 font-size-sm" single-line>
                            </v-select>
                        </div>
                        <v-btn color="primary" dark v-bind="attrs" v-on="on">
                            Save
                        </v-btn>
                    </div>
                    <div class="p-0 card-body">
                        <v-data-table :headers="prevweekreportheaders" :items="prevweekreport" :search="search"
                            sort-by="student" class="elevation-1">
                            <template v-slot:item="props">
                                <tr>
                                    <td>{{props.item.regno}}</td>
                                    <td>{{props.item.Student}}</td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day1"
                                            :items="attensancestatus" dense solo></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day2"
                                            :items="attensancestatus" dense solo></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day3"
                                            :items="attensancestatus" dense solo></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day4"
                                            :items="attensancestatus" dense solo></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day5"
                                            :items="attensancestatus" dense solo></v-select>
                                    </td>
                                    <td>
                                        <v-select class="pt-5 select-width" v-model="props.item.day6"
                                            :items="attensancestatus" dense solo></v-select>
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
                    </div>
                </div>
                <!--prev weekly Reports attendance-->
                <!--reason for late / abbesant comments dialog-->
                <div class="text-center">
                    <v-dialog v-model="commentdialog" width="400">
                        <v-card>
                            <v-card-text>
                                <v-container fluid>
                                    <v-textarea v-model="reason" class="mx-2" :label="commentlabel" :rows="row">
                                    </v-textarea>
                                </v-container>
                            </v-card-text>
                                <v-btn color="primary" text v-on:click="linkreason()">
                                    Save
                                </v-btn>
                        </v-card>
                    </v-dialog>
                </div>
                <!--reason for late / abbesant comments dialog end-->
            </b-col>
        </b-row>
    </div>
</template>

<script>
    //import VuePerfectScrollbar from "vue-perfect-scrollbar";
    export default {
        components: {
            //  VuePerfectScrollbar
        },
        data: () => ({
            today: new Date().toISOString().substr(0, 10),
            date: new Date().toISOString().substr(0, 10),
            month: new Date().toLocaleString('default', {
                month: 'long'
            }),
            menu: false,
            modal: false,
            menu2: false,
            dialog3: false,
            DayTable: false,
            commentdialog: false,
            commentlabel:'',
            row:'',
            reason:'',
            WeekTable: true,
            AnnualTable: false,
            MonthrepTable: false,
            time: null,
            modal2: false,
            search: "",
            hours: [],
            weeklytable: 2,
            report: 'Week',
            reporttype: "Week",
            classname: 'Science (3A)',
            showhours: false,
            Monthreportbystudent: [],
            showCalendarfromto: false,
            attensancestatus: ['P', 'A', 'LA', 'LE'],
            Dayreportheaders: [{
                    text: 'Roll no',
                    value: "rollno"
                },
                {
                    text: "Student Name",
                    value: "student"
                },
                {
                    text: "Attendance Status",
                    value: "attstatus"
                }
            ],
            weekreportheaders: [{
                    text: 'Roll no',
                    value: "rollno"
                },
                {
                    text: "Student Name",
                    value: "student"
                },
                {
                    text: "Mon, 23- 1st hour",
                    value: "day1"
                },
                {
                    text: "Tue, 24- 4th hour",
                    value: "day2"
                },
                {
                    text: "Wed, 25- 2nd hour",
                    value: "day3"
                },
                {
                    text: "Thu, 26- 2nd hour",
                    value: "day4"
                },
                {
                    text: "Fri, 26- 3rd hour",
                    value: "day5"
                },
                {
                    text: "Sat, 27- 1st hour",
                    value: "day6"
                },
            ],
            prevweekreportheaders: [{
                    text: 'Roll no',
                    value: "rollno"
                },
                {
                    text: "Student Name",
                    value: "student"
                },
                {
                    text: "Mon, 16- 1st hour",
                    value: "day1"
                },
                {
                    text: "Tue, 17- 5th hour",
                    value: "day2"
                },
                {
                    text: "Wed, 18- 6th hour",
                    value: "day3"
                },
                {
                    text: "Thu, 19- 2nd hour",
                    value: "day4"
                },
                {
                    text: "Fri, 20- 4th hour",
                    value: "day5"
                },
                {
                    text: "Sat, 21- 4th hour",
                    value: "day6"
                },
            ],
            desserts: [{
                    name: "Girish, AG015",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Raghavendra, AG120",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Siddarth, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Siddarth, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Raghu, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Dr.Raghu, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '2',
                    day4: '1'
                },
                {
                    name: "Siddarth,AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '1',
                    day4: '3'
                },
                {
                    name: "Mahesh, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '4',
                    day3: '1',
                    day4: '1'
                },
                {
                    name: "Sunil, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '1',
                    day3: '2',
                    day4: '1'
                },
                {
                    name: "Bakkesh, AG081",
                    calories: "pe-7s-check",
                    day1: '1',
                    day2: '2',
                    day3: '1',
                    day4: '2'
                }
            ],
            Dayreport: [{
                    slno: 1,
                    regno: "01",
                    Student: "Amal	el Moussaif",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: ""
                },
                {
                    slno: 2,
                    regno: "02",
                    Student: "Gabriele Volpi",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: ""
                },
                {
                    slno: 3,
                    regno: "03",
                    Student: "Carola Schiavini",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: ""
                },
                {
                    slno: 4,
                    regno: "04",
                    Student: "Andrea Procopio",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: ""
                },
                {
                    slno: 5,
                    regno: "05",
                    Student: "Andrea Joesph",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: ""
                }
            ],
            weekreport: [{
                    regno: '01',
                    Student: "Amal el Moussaif",
                    Status: "P",
                    day1: "A",
                    day2: "P",
                    day3: "P",
                    day4: "P",
                },
                {
                    regno: '02',
                    Student: "Gabriele Volpi",
                    Status: "P",
                    day1: "P",
                    day2: "P",
                    day3: "P",
                    day4: "P",
                },
                {
                    regno: '03',
                    Student: "Carola Schiavini",
                    Status: "P",
                    day1: "P",
                    day2: "LA",
                    day3: "P",
                    day4: "P",
                },
                {
                    regno: '04',
                    Student: "Andrea Procopio",
                    Status: "P",
                    day1: "P",
                    day2: "P",
                    day3: "P",
                    day4: "P",
                },
                {
                    regno: '05',
                    Student: "Andrea Joesph",
                    Status: "P",
                    day1: "P",
                    day2: "A",
                    day3: "P",
                    day4: "P",
                }
            ],
            prevweekreport: [{
                    regno: '01',
                    Student: "Amal el Moussaif",
                    Status: "P",
                    day1: "P",
                    day2: "LA",
                    day3: "P",
                    day4: "P",
                    day5: "P",
                    day6: "P",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    regno: '02',
                    Student: "Gabriele Volpi",
                    Status: "P",
                    day1: "P",
                    day2: "P",
                    day3: "P",
                    day4: "P",
                    day5: "P",
                    day6: "P",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    regno: '03',
                    Student: "Carola Schiavini",
                    Status: "P",
                    day1: "P",
                    day2: "LA",
                    day3: "P",
                    day4: "P",
                    day5: "P",
                    day6: "P",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    regno: '04',
                    Student: "Andrea Procopio",
                    Status: "P",
                    day1: "P",
                    day2: "P",
                    day3: "P",
                    day4: "P",
                    day5: "P",
                    day6: "P",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    regno: '05',
                    Student: "Andrea Joesph",
                    Status: "P",
                    day1: "P",
                    day2: "A",
                    day3: "P",
                    day4: "P",
                    day5: "P",
                    day6: "P",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                }
            ],
            Classes: [
                "Science (3A)",
                "Maths (5B)",
                "Maths (5A)",
                "Science (3B)",
                "Science (3C)",
                "Maths (5C)",
            ],
            Reports: [
                "Day",
                "Week",
            ],
            students: [
                "Amal	el Moussaif",
                "Andrea	Joesph",
                "Andrea	Procopio",
                "Beatrice	Bruto",
                "Carola	Schiavini",
                "Gabriele	Volpi",
                "Gilberto	Vignati",
                "Giorgio 	Fumagalli",
            ],
        }),
        methods: {
            checkLALE(status,studentdata){
                // alert(status);
                if(status=='LA'){
                    this.commentlabel = 'Late by,';
                    this.commentdialog = true;
                    studentdata.reason = this.reason;
                    this.row = 1;
                }
                else if(status=='LE'){
                    this.commentlabel = 'Reason';
                    this.commentdialog = true;
                    studentdata.reason = this.reason;
                    this.row = 3;
                }
            },
            linkreason(){
                this.commentdialog = false;
            },
            getmonth(caldate) {
                // var day = new Date(caldate);
                // this.month = day.toLocaleString('default', { month: 'long' });
                console.log(caldate + ' ' + ' ' + this.month);
            },
            addtoattendance() {
                this.dialog3 = false;
                this.hours;
                console.log(this.hours.length);
                // for(var i=0;i<this.hours.length;i++){
                //    console.log(this.hours[i]);
                //      this.weekreportheaders.push({
                //         'text':'Thu '+this.hours[i],
                //         'value':'day7',
                //     });
                //     //  for(i in this.weekreport){
                //     //     i.push({'day7':''});
                //     //  }
                // }
            },
            overideclass: function() {
                this.dialog3 = true;
            },
            preview() {
                this.weeklytable = 1;
            },
            back() {
                this.weeklytable = 2;
            },
            //get reports filter
            getReport(val) {
                // alert(val);
                this.reporttype = val;
                if (val == 'Day') {
                    this.DayTable = true;
                    this.WeekTable = false;
                    this.showhours = true;
                } else {
                    this.showhours = false;
                    this.DayTable = false;
                    this.WeekTable = true;
                }
            },
            //get reports filter
            submit(val) {
                // alert(val);
                this.type = val;
                if (val == 'Day') {
                    this.DayTable = true;
                    this.WeekTable = false;
                } else {
                    this.WeekTable = true;
                    this.DayTable = false;
                }
            },
            getSubject(sub) {
                this.subject = sub;
            },
        }
    };
</script>
<style scoped>
    .btn.btn-pill.btn-wide,
    .btn.btn-pill {
        font-size: 12px !important
    }

    .link {
        cursor: pointer;
    }

    .select-width {
        width: 100px
    }
    .weeek-carousel {
        display: flex;
        justify-content: center;
        font-size: 20px;
        align-items: center;
        font-weight: 600;
    }
</style>