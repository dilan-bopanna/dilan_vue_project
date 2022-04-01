<template>
    <div class="col-sm-12 col-md-12 col-xl-12 np">
        <!--Attendance report Filters Start-->
        <div style="display: flex;align-items: baseline;" class="bg-white mb-3 pl-3 pr-3 pb-3">
            <!--Class Filters-->
            <div class="pl-3 pr-3">
                <b>Sort:</b>
            </div>
            <!--Class Filters-->
            <!--Class Filters-->
            <div class="pl-3 pr-3">
                <v-select v-model="classname" :items="Classes" hide-details label="Subject/Class"
                    @change="getSubject(classname)" single-line>
                </v-select>
            </div>
            <!--Class Filters-->
            <!--Report Filters-->
            <div class="pl-3 pr-3">
                <v-select v-model="report" :items="Reports" hide-details label="Report type" @change="getReport(report)"
                    single-line></v-select>
            </div>
            <!--Report Filters-->
            <!--Month Filters-->
            <div class="pl-3 pr-3" v-if="showmonths">
                <v-select v-model="month" :items="Months" hide-details label="Month" single-line
                    @change="getmonth(month)"></v-select>
            </div>
            <!--Month Filters-->
            <!--At Filters-->
            <div class="pl-3 pr-3" v-if="showstatus">
                <v-select v-model="status" :items="atstatus" hide-details label="Status" single-line
                    @change="getstatus(status)"></v-select>
            </div>
            <!--At Filters-->
            <!--Calendar date from Filters-->
            <div class="pl-3 pr-3" v-if="showCalendarfromto">
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field style="padding-top: 31px;" v-model="date" label="From date" readonly
                            v-bind="attrs" v-on="on" format="dd MMM yyyy">
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="date" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
            </div>
            <!--Calendar date from Filters-->
            <!--Calendar date to Filters-->
            <div class="pl-3 pr-3" v-if="showCalendarfromto">
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date1" persistent width="290px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field style="padding-top: 31px;" v-model="date1" label="To date" readonly v-bind="attrs"
                            v-on="on" :format="dateFormat">
                        </v-text-field>
                    </template>
                    <v-date-picker v-model="date1" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.dialog.save(date1)">OK</v-btn>
                    </v-date-picker>
                </v-dialog>
                <!-- <p>
                    Date in ISO format:
                    <strong>{{ date }}</strong>
                </p>-->

            </div>
            <!--Calendar date to Filters-->

            <!--Submit-->
            <v-btn @click="submit(reporttype)" class="v-btn btn-sm primary">Search
            </v-btn>
            <!--Submit-->
        </div>
        <!--Attendance report Filters End-->

        <!--Day Reports attendance-->
        <div class="card-hover-shadow-2x mb-3 card" v-if="DayTable">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Day Reports -
                    <span>{{subject}}</span>
                </div>
                <div class="btn-actions-pane-right pt-5">
                    <div style="display: flex;align-items: center;justify-content: space-between;flex-direction: row-reverse;">
                        <div>
                            <button @click="createPDF" type="button"
                                class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus"><i
                                    class="btn-icon-wrapper pe-7s-cloud-download"></i>
                                PDF
                            </button>
                        </div>
                        <div>
                            <v-select v-model="value" :items="students" label="Select students" multiple>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }}
                                        others)</span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-0 card-body">
                <v-data-table id="print" :headers="Dayreportheaders" :items="Dayreport" :search="search"
                    sort-by="student" class="elevation-1">
                    <template v-slot:item="props">

                        <tr>
                            <td>
                                {{props.item.regno}}
                            </td>
                            <td>{{props.item.Student}}</td>

                            <td>
                                <div class="badge"
                                    v-bind:class="{ 'badge-success': props.item.Status=='P', 'badge-danger': props.item.Status=='A','badge-warning': props.item.Status=='L','badge-secondary': props.item.Status=='La' }">
                                    {{props.item.Status}}</div>
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
        <!--Monthly Reports attendance-->
        <div class="card-hover-shadow-2x mb-3 card" v-if="MonthTable">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Monthly Reports -
                    {{monthname}} {{subject}}
                </div>
                 <div class="btn-actions-pane-right pt-5">
                    <div style="display: flex;align-items: center;justify-content: space-between;flex-direction: row-reverse;">
                        <div>
                            <button @click="createPDF" type="button"
                                class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus"><i
                                    class="btn-icon-wrapper pe-7s-cloud-download"></i>
                                PDF
                            </button>
                        </div>
                        <div>
                            <v-select v-model="value" :items="students" label="Select students" multiple>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }}
                                        others)</span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-0 card-body">
                <v-data-table id="print" :headers="MonthlyReportheaders" :items="Monthreport" :search="search" sort-by="student"
                    class="elevation-1">
                    <template v-slot:item="props">

                        <tr>

                            <td>{{props.item.regno}}</td>
                            <td>{{props.item.Student}}</td>
                            <td>{{props.item.Status}}</td>
                            <td >{{props.item.day1}}</td>
                            <td v-bind:class="{ 'text-danger': props.item.day2=='La'}"> {{props.item.day2}}</td>
                            <td>{{props.item.day3}}</td>
                            <td>{{props.item.day4}}</td>
                            <td>{{props.item.day5}}</td>
                            <td>{{props.item.day6}}</td>
                            <td>
                                <div class="badge badge-warning">{{props.item.cattended}} </div>
                            </td>
                            <td>
                                <div class="badge badge-info">{{props.item.ctaken}}</div>
                            </td>

                            <td>
                                <div class="badge badge-success">{{props.item.average}}</div>
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
        <!--Monthly Reports attendance-->
        <!--Yearly Reports attendance-->
        <div class="card-hover-shadow-2x mb-3 card" v-if="AnnualTable">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Yearly Reports -
                    {{subject}}
                </div>
                 <div class="btn-actions-pane-right pt-5">
                    <div style="display: flex;align-items: center;justify-content: space-between;flex-direction: row-reverse;">
                        <div>
                            <button @click="createPDF" type="button"
                                class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus"><i
                                    class="btn-icon-wrapper pe-7s-cloud-download"></i>
                                PDF
                            </button>
                        </div>
                        <div>
                            <v-select v-model="value" :items="students" label="Select students" multiple>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }}
                                        others)</span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-0 card-body">
                <v-data-table id="print" :headers="YearlyReportheaders" :items="Yearlyreport" :search="search" sort-by="student"
                    class="elevation-1">
                    <template v-slot:item="props">
                        <tr>

                            <td>
                                {{props.item.regno}}
                            </td>
                            <td>{{props.item.Student}}</td>
                            <td @click="getmonthrep('Jan',props.item.Student,props.item.regno)" class="link">
                                {{props.item.Status}}
                            </td>
                            <td @click="getmonthrep('Feb',props.item.Student,props.item.regno)" class="link">

                                {{props.item.day1}}
                            </td>
                            <td @click="getmonthrep('Mar',props.item.Student,props.item.regno)" class="link">

                                {{props.item.day2}}
                            </td>
                            <td @click="getmonthrep('Apr',props.item.Student,props.item.regno)" class="link">

                                {{props.item.day3}}
                            </td>
                            <td @click="getmonthrep('May',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day4}}
                            </td>
                            <td @click="getmonthrep('Jun',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day5}}
                            </td>
                            <td @click="getmonthrep('Jul',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day6}}
                            </td>
                            <td @click="getmonthrep('Aug',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day7}}
                            </td>
                            <td @click="getmonthrep('Sep',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day8}}
                            </td>
                            <td @click="getmonthrep('Oct',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day9}}
                            </td>
                            <td @click="getmonthrep('Nov',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day10}}
                            </td>
                            <td @click="getmonthrep('Dec',props.item.Student,props.item.regno)" class="link">
                                {{props.item.day11}}
                            </td>
                            <td>
                                <div class="badge badge-warning">{{props.item.cattended}} </div>
                            </td>
                            <td>
                                <div class="badge badge-info">{{props.item.ctaken}}</div>
                            </td>

                            <td>
                                <div class="badge badge-success">{{props.item.average}}</div>
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
        <!--Yearly Reports attendance-->
        <!--custom Reports attendance-->
        <div class="card-hover-shadow-2x mb-3 card" v-if="CustomTable">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Custom Reports -
                    {{monthname}} {{subject}}
                </div>
                 <div class="btn-actions-pane-right pt-5">
                    <div style="display: flex;align-items: center;justify-content: space-between;flex-direction: row-reverse;">
                        <div>
                            <button @click="createPDF" type="button"
                                class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus"><i
                                    class="btn-icon-wrapper pe-7s-cloud-download"></i>
                                PDF
                            </button>
                        </div>
                        <div>
                            <v-select v-model="value" :items="students" label="Select students" multiple>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }}
                                        others)</span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-0 card-body">
                <v-data-table id="print" :headers="MonthlyReportheaders" :items="Monthreport" :search="search" sort-by="student"
                    class="elevation-1">
                    <template v-slot:item="props">

                        <tr>

                            <td>{{props.item.regno}}</td>
                            <td>{{props.item.Student}}</td>
                            <td>{{props.item.Status}}</td>
                            <td>{{props.item.day1}}</td>
                            <td v-bind:class="{ 'text-danger': props.item.day2=='La'}"> {{props.item.day2}}</td>
                            <td>{{props.item.day3}}</td>
                            <td>{{props.item.day4}}</td>
                            <td>{{props.item.day5}}</td>
                            <td>{{props.item.day6}}</td>
                            <td>
                                <div class="badge badge-warning">{{props.item.cattended}} </div>
                            </td>
                            <td>
                                <div class="badge badge-info">{{props.item.ctaken}}</div>
                            </td>

                            <td>
                                <div class="badge badge-success">{{props.item.average}}</div>
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
        <!--Custom Reports attendance-->
        <!--Monthly Reports per person attendance-->
        <div class="card-hover-shadow-2x mb-3 card" v-if="MonthrepTable">
            <div class="card-header-tab card-header">
                <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                    <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Monthly Reports -
                    {{monthname}} {{subject}}
                </div>
                <div class="btn-actions-pane-right pt-5">
                    <div style="display: flex;align-items: center;justify-content: space-between;flex-direction: row-reverse;">
                        <div>
                            <button @click="createPDF" type="button"
                                class="btn btn-sm ml-2 mb-2 btn-pill btn-icon btn-focus"><i
                                    class="btn-icon-wrapper pe-7s-cloud-download"></i>
                                PDF
                            </button>
                        </div>
                        <div>
                            <v-select v-model="value" :items="students" label="Select students" multiple>
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item }}</span>
                                    </v-chip>
                                    <span v-if="index === 1" class="grey--text caption">(+{{ value.length - 1 }}
                                        others)</span>
                                </template>
                            </v-select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-0 card-body">
                <v-data-table id="print" :headers="MonthlyReportheaders" :items="Monthreportbystudent" :search="search"
                    sort-by="student" class="elevation-1">
                    <template v-slot:item="props">

                        <tr>
                            <td class="text-muted">{{props.item.slno}}</td>
                            <td>{{props.item.regno}}</td>
                            <td>{{props.item.Student}}</td>
                            <td>{{props.item.Status}}</td>
                            <td>{{props.item.day1}}</td>
                            <td> {{props.item.day2}}</td>
                            <td>{{props.item.day3}}</td>
                            <td>{{props.item.day4}}</td>
                            <td>{{props.item.day5}}</td>
                            <td>{{props.item.day6}}</td>
                            <td>
                                <div class="badge badge-warning">{{props.item.cattended}} </div>
                            </td>
                            <td>
                                <div class="badge badge-info">{{props.item.ctaken}}</div>
                            </td>

                            <td>
                                <div class="badge badge-success">{{props.item.average}}</div>
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
        <!--Monthly Reports per person attendance-->
    </div>
</template>

<script>
    //import VuePerfectScrollbar from "vue-perfect-scrollbar";
    // import { jsPDF } from "jspdf";
    export default {
        components: {
            //  VuePerfectScrollbar
        },
        data: () => ({
            date: new Date().toISOString().substr(0, 10),
            date1: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            DayTable: false,
            MonthTable: false,
            AnnualTable: false,
            MonthrepTable: false,
            CustomTable:false,
            search: "",
            showstatus: true,
            status: "All",
            reporttype: "",
            // monthname:"ALL",
            showmonths: false,
            Monthreportbystudent: [],
            showCalendarfromto: false,
            Dayreportheaders: [{
                    text: "Roll#",
                    value: "reg"
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
            MonthlyReportheaders: [{
                    text: "Roll#",
                    value: "reg"
                },
                {
                    text: "Student Name",
                    value: "student"
                },
                {
                    text: "Mon - 1hr",
                    value: "day1"
                },
                {
                    text: "Tue - 1hr",
                    value: "day2"
                },
                {
                    text: "Wed - 1hr",
                    value: "day3"
                },
                {
                    text: "Thu - 1hr",
                    value: "day4"
                },
                {
                    text: "Fri - 1hr",
                    value: "day5"
                },
                {
                    text: "Sat - 1hr",
                    value: "day6"
                },
                {
                    text: "Sun - 1hr",
                    value: "day7"
                },
                {
                    text: "Total Classes Taken",
                    value: "ctaken"
                },
                {
                    text: "Total Classes Attended",
                    value: "cattended"
                },
                {
                    text: "Average",
                    value: "average"
                }
            ],
            YearlyReportheaders: [{
                    text: "Roll#",
                    value: "reg"
                },
                {
                    text: "Student Name",
                    value: "student"
                },
                {
                    text: "Jan",
                    value: "day1"
                },
                {
                    text: "Feb",
                    value: "day2"
                },
                {
                    text: "Mar",
                    value: "day3"
                },
                {
                    text: "Apr",
                    value: "day4"
                },
                {
                    text: "May",
                    value: "day5"
                },
                {
                    text: "Jun",
                    value: "day6"
                },
                {
                    text: "July",
                    value: "day7"
                },
                {
                    text: "Aug",
                    value: "day8"
                },
                {
                    text: "Sep",
                    value: "day9"
                },
                {
                    text: "Oct",
                    value: "day10"
                },
                {
                    text: "Nov",
                    value: "day11"
                },
                {
                    text: "Dec",
                    value: "day12"
                },
                {
                    text: "Attended",
                    value: "cattended"
                },
                {
                    text: "Taken",
                    value: "ctaken"
                },
                {
                    text: "Average",
                    value: "average"
                }
            ],
            Dayreport: [{
                    slno: 1,
                    regno: "01",
                    Student: "Amal	el Moussaif",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: "Irregular"
                },
                {
                    slno: 2,
                    regno: "02",
                    Student: "Gabriele Volpi",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: "Irregular"
                },
                {
                    slno: 3,
                    regno: "03",
                    Student: "Carola Schiavini",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: "Irregular"
                },
                {
                    slno: 4,
                    regno: "04",
                    Student: "Andrea Procopio",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "P",
                    comments: "Irregular"
                },
                {
                    slno: 5,
                    regno: "05",
                    Student: "Andrea Joesph",
                    class: "3A",
                    time: "9.30am - 10.30am",
                    Status: "A",
                    comments: "Irregular"
                }
            ],
            Monthreport: [{
                    slno: 1,
                    regno: "01",
                    Student: "Amal el Moussaif",
                    Status: "1",
                    day1: "A",
                    day2: "La",
                    day3: "3",
                    day4: "L",
                    day5: "L",
                    day6: "L",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    slno: 2,
                    regno: "02",
                    Student: "Gabriele Volpi",
                    Status: "1",
                    day1: "2",
                    day2: "La",
                    day3: "4",
                    day4: "L",
                    day5: "L",
                    day6: "A",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    slno: 3,
                    regno: "03",
                    Student: "Carola Schiavini",
                    Status: "1",
                    day1: "2",
                    day2: "La",
                    day3: "4",
                    day4: "L",
                    day5: "A",
                    day6: "L",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    slno: 4,
                    regno: "04",
                    Student: "Andrea Procopio",
                    Status: "1",
                    day1: "2",
                    day2: "La",
                    day3: "4",
                    day4: "L",
                    day5: "A",
                    day6: "L",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                },
                {
                    slno: 5,
                    regno: "05",
                    Student: "Andrea Joesph",
                    Status: "1",
                    day1: "2",
                    day2: "A",
                    day3: "3",
                    day4: "L",
                    day5: "L",
                    day6: "L",
                    ctaken: 30,
                    cattended: 21,
                    average: "80%",
                }
            ],
            Yearlyreport: [{
                    slno: 1,
                    regno: "01",
                    Student: "Amal	el Moussaif",
                    Status: "23/30",
                    day1: "23/30",
                    day2: "23/30",
                    day3: "23/30",
                    day4: "23/30",
                    day5: "23/30",
                    day6: "23/30",
                    day7: "23/30",
                    day8: "23/30",
                    day9: "23/30",
                    day10: "23/30",
                    day11: "23/30",
                    ctaken: 264,
                    cattended: 260,
                    average: "96%",
                },
                {
                    slno: 2,
                    regno: "02",
                    Student: "Gabriele Volpi",
                    Status: "23/30",
                    day1: "22/22",
                    day2: "20/22",
                    day3: "20/22",
                    day4: "18/22",
                    day5: "15/22",
                    day6: "18/20",
                    day7: "20/20",
                    day8: "20/20",
                    day9: "18/18",
                    day10: "23/23",
                    day11: "23/23",
                    ctaken: 264,
                    cattended: 245,
                    average: "80%",
                },
                {
                    slno: 3,
                    regno: "03",
                    Student: "Carola Schiavini",
                    Status: "23/30",
                    day1: "22/22",
                    day2: "20/22",
                    day3: "20/22",
                    day4: "18/22",
                    day5: "15/22",
                    day6: "18/20",
                    day7: "20/20",
                    day8: "20/20",
                    day9: "18/18",
                    day10: "23/23",
                    day11: "23/23",
                    ctaken: 264,
                    cattended: 225,
                    average: "60%",
                },
                {
                    slno: 4,
                    regno: "04",
                    Student: "Andrea Procopio",
                    Status: "23/30",
                    day1: "22/22",
                    day2: "20/22",
                    day3: "20/22",
                    day4: "18/22",
                    day5: "15/22",
                    day6: "18/20",
                    day7: "20/20",
                    day8: "20/20",
                    day9: "18/18",
                    day10: "23/23",
                    day11: "23/23",
                    ctaken: 264,
                    cattended: 245,
                    average: "80%",
                },
                {
                    slno: 5,
                    regno: "05",
                    Student: "Andrea Joesph",
                    Status: "23/30",
                    day1: "22/22",
                    day2: "20/22",
                    day3: "20/22",
                    day4: "18/22",
                    day5: "15/22",
                    day6: "18/20",
                    day7: "20/20",
                    day8: "20/20",
                    day9: "18/18",
                    day10: "23/23",
                    day11: "23/23",
                    ctaken: 264,
                    cattended: 255,
                    average: "88%",
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
                "Monthly",
                "Annual",
                "Custom",
            ],
            Months: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
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
            atstatus: [
                "All",
                "Presents",
                "Absentees",
                "Late Comers",
                "Leave"
            ]
        }),
        methods: {
            //get reports filter
            getReport(val) {
                // alert(val);
                this.reporttype = val;
                if (val == 'Day') {
                    this.showCalendarfromto = true;
                    this.MonthrepTable = false;
                    this.showmonths = false;
                } else if (val == 'Monthly') {
                    this.showmonths = true;
                    this.MonthrepTable = false;
                } else if (val == 'Annual' || val == 'Custom') {
                    this.showmonths = false;
                    this.showCalendarfromto = true;
                    this.MonthrepTable = false;
                }
                
            },
            //get reports filter
            submit(val) {
                // alert(val);
                if (val == 'Day') {
                    this.DayTable = true;
                    this.MonthTable = false;
                    this.AnnualTable = false;
                    this.MonthrepTable = false;
                    this.CustomTable = false;
                } else if (val == 'Monthly') {
                    this.MonthTable = true;
                    this.DayTable = false;
                    this.AnnualTable = false;
                    this.MonthrepTable = false;
                    this.CustomTable = false;
                } else if (val == 'Annual') {
                    this.AnnualTable = true;
                    this.MonthTable = false;
                    this.DayTable = false;
                    this.MonthrepTable = false;
                    this.CustomTable = false;
                }
                else if (val == 'Custom') {
                    this.CustomTable = true;
                    this.AnnualTable = false;
                    this.MonthTable = false;
                    this.DayTable = false;
                    this.MonthrepTable = false;
                }
            },
            getmonth(val) {
                this.monthname = val;
                this.MonthTable = false;
                //alert(val);
            },
            getSubject(sub) {
                this.subject = sub;
                this.MonthTable = false;
                //alert(val);
            },
            getmonthrep(val, name, roll) {
                this.Monthreportbystudent = [];
                this.MonthTable = false;
                this.DayTable = false;
                this.AnnualTable = false;
                this.showmonths = false;
                this.monthname = val;
                this.studname = name;
                this.MonthrepTable = true;
                this.index = this.Monthreport.findIndex(item => item.regno === roll);
                //alert(this.index);
                this.Monthreportbystudent.push(this.Monthreport[this.index]);
                console.log(this.Monthreportbystudent);
                //    this.desserts[this.index].bubble = bbcolor;
                //     Monthreportbystudent
                //     Monthreport
            },
            createPDF() {
                var sTable = document.getElementById('print').innerHTML;
                var style = "<style>";
                style = style + "table {width: 100%;font: 17px Calibri;}";
                style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
                style = style + "padding: 2px 3px;text-align: center;}";
                style = style + "</style>";
                // CREATE A WINDOW OBJECT.
                var win = window.open('', '', 'height=700,width=700');
                win.document.write('<html><head>');
                win.document.write('<title>download</title>'); // <title> FOR PDF HEADER.
                win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
                win.document.write('</head>');
                win.document.write('<body>');
                win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
                win.document.write('</body></html>');
                win.document.close(); // CLOSE THE CURRENT WINDOW.
                win.print(); // PRINT THE CONTENTS.
            }
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

    .v-select {
        font-size: 13px !important
    }
@media print {
         .theme--light.v-data-table .v-data-footer {display:none !important;}
      }
    label {
        font-size: 13px !important
    }
</style>