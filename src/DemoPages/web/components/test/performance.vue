<template>

    <div class="row">
       <div class="col-md-6 col-lg-3">
                <div class="widget-chart mb-3 widget-chart2 text-left card-btm-border card-shadow-warning border-warning card">
                    <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content">
                            <div class="widget-title text-warning text-uppercase">Science (3A)</div>
                            <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div class="widget-chart-flex align-items-center">
                                    <div class="test-info">
                                        <p>Test Conducted <span class="text-success">05</span> </p>
                                        <p>Average Class Score <span class="text-warning">46/50</span></p>
                                        <p>Student Below Average <span class="text-danger">01</span></p>
                                    </div>
                                    <div class="widget-title ml-auto font-size-sm font-weight-normal text-muted">
                                        <div class="circle-progress">
                                            <vue-circle :progress="90" :size="54" :reverse="false" line-cap="round"
                                                :fill="fill4" empty-fill="rgba(0, 0, 0, .1)"
                                                :animation-start-value="0.0" :start-angle="0" insert-mode="append"
                                                :thickness="4" :show-percent="true">
                                            </vue-circle>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div
                    class="widget-chart mb-3 widget-chart2 text-left card-btm-border card-shadow-warning border-warning card">
                    <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content">
                            <div class="widget-title text-warning text-uppercase">Science (3B)</div>
                            <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div class="widget-chart-flex align-items-center">
                                    <div class="test-info">
                                        <p>Test Conducted <span class="text-success">05</span> </p>
                                        <p>Average Class Score <span class="text-warning">36/50</span></p>
                                        <p>Student Below Average <span class="text-danger">04</span></p>
                                    </div>
                                    <div class="widget-title ml-auto font-size-sm font-weight-normal text-muted">
                                        <vue-circle :progress="65" :size="54" :reverse="false" line-cap="round"
                                            :fill="fill4" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0"
                                            :start-angle="0" insert-mode="append" :thickness="4" :show-percent="true">
                                        </vue-circle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-lg-3">
                <div
                    class="widget-chart mb-3 widget-chart2 text-left card-btm-border card-shadow-success border-primary card">
                    <div class="widget-chat-wrapper-outer">
                        <div class="widget-chart-content">
                            <div class="widget-title text-primary text-uppercase">Maths (5B)</div>
                            <div class="widget-numbers mt-2 fsize-4 mb-0 w-100">
                                <div class="widget-chart-flex align-items-center">
                                    <div class="test-info">
                                        <p>Test Conducted <span class="text-success">05</span> </p>
                                        <p>Average Class Score <span class="text-warning">15/50</span></p>
                                        <p>Student Below Average <span class="text-danger">07</span></p>
                                    </div>
                                    <div class="widget-title ml-auto font-size-sm font-weight-normal text-muted">
                                        <vue-circle :progress="35" :size="54" :reverse="false" line-cap="round"
                                            :fill="fill4" empty-fill="rgba(0, 0, 0, .1)" :animation-start-value="0.0"
                                            :start-angle="0" insert-mode="append" :thickness="4" :show-percent="true">
                                        </vue-circle>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        <div class="col-sm-12 col-lg-12">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
                        <i class="header-icon lnr-calendar-full icon-gradient bg-happy-itmeo"></i> Overall Performance - {{subject}}
                    </div>
                </div>
                <div class="p-0 card-body">
                    <v-data-table :headers="classtestheaders" :items="classtest" :search="search" sort-by="name"
                        class="elevation-1">
                        <template v-slot:item="props">
                            <tr>
                                <td>
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="widget-content-left">
                                                    <img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAA8AAD/4QMfaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQ3MDQwMTE2RUNGMDExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQ3MDQwMTE1RUNGMDExRThBNjRDQzQyMTE5Mjk5QTQ0IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJENDFFMzk5RUI1NDJFOUFCNzIzNzUzMDQ3QkJEMkQ3OSIgc3RSZWY6ZG9jdW1lbnRJRD0iRDQxRTM5OUVCNTQyRTlBQjcyMzc1MzA0N0JCRDJENzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwM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"
                                                        alt="Avatar 5" class="rounded-circle cir"></div>
                                            </div>
                                            <div class="widget-content-left flex2">
                                                <div>{{props.item.name}}</div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>20/25</td>
                                <td>
                                    <div v-bind:class="[props.item.test1=='Absent' ? 'badge badge-danger' : '' || props.item.test1=='Not Assigned' ? 'badge badge-secondary' : '']">
                                        {{props.item.test1}}</div>
                                </td>
                                <td>
                                    <div v-bind:class="[props.item.test2=='Absent' ? 'badge badge-danger' : '' || props.item.test2=='Not Assigned' ? 'badge badge-secondary' : '']">
                                        {{props.item.test2}}</div>
                                </td>
                                <td>
                                    <div v-bind:class="[props.item.test3=='Absent' ? 'badge badge-danger' : '' || props.item.test3=='Not Assigned' ? 'badge badge-secondary' : '']">
                                        {{props.item.test3}}</div>
                                </td>
                                <td>
                                    <div v-bind:class="[props.item.test4=='Absent' ? 'badge badge-danger' : '' || props.item.test4=='Not Assigned' ? 'badge badge-secondary' : '']">
                                        {{props.item.test4}}</div>
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

    </div>

</template>

<script>
 import VueCircle from "vue2-circle-progress";
    //import VuePerfectScrollbar from "vue-perfect-scrollbar";
    export default {
        components: {
            VueCircle
        },
        data: () => ({
            fill: {
                color: "#3f6ad8"
            },
            fill2: {
                color: "#d92550"
            },
            fill3: {
                color: "#f7b924"
            },
            fill4: {
                color: "#3ac47d"
            },
            search: "",
            subject:"All Subjects",
            classtestheaders: [{
                    text: "Student Name",
                    value: "class"
                },
                {
                    text: "Average",
                    value: "avg"
                },
                {
                    text: "Class Test-1",
                    value: "test"
                },
                {
                    text: "Class Test-2",
                    value: "testdate"
                },
                {
                    text: "Class Test-3",
                    value: "assigned"
                },
                {
                    text: "Class Test-4",
                    value: "attend"
                }
            ],
            TestToBeMarked: [],
        }),
        created() {
            this.initialize();
        },
        methods: {
           
            initialize() {
                this.classtest = [{
                        name: "Amal	el Moussaif",
                        test1: "25/25",
                        test2: "10/10",
                        test3: "24/25",
                        test4: "25/25"
                    },
                    {
                        name: "Andrea Joesph",
                        test1: "25/25",
                        test2: "Not Assigned",
                        test3: "24/25",
                        test4: "25/25"
                    },
                    {
                        name: "Andrea Procopio",
                        test1: "22/25",
                        test2: "Absent",
                        test3: "12/25",
                        test4: "20/25"
                    },
                    {
                        name: "Beatrice	Bruto",
                        test1: "24/25",
                        test2: "Not Assigned",
                        test3: "24/25",
                        test4: "23/25"
                    },
                    {
                        name: "Carola Schiavini",
                        test1: "20/25",
                        test2: "10/10",
                        test3: "Absent",
                        test4: "15/25"
                    },
                    {
                        name: "Gabriele	Volpi",
                        test1: "22/25",
                        test2: "08/10",
                        test3: "18/25",
                        test4: "15/25"
                    },
                    {
                        name: "Gilberto Vignati",
                        test1: "Absent",
                        test2: "10/10",
                        test3: "24/25",
                        test4: "Not Assigned"
                    },
                ];
            }
        }
    };
</script>
<style>
    .np {
        padding: 0px
    }

    .cir {
        width: 40px;
    }

    .b-l-warning {
        border-left: 4px solid #f7b924;
        text-align: left;
        padding: 4px;
    }
.test-info>p {
        font-size: 13px !important;
        margin-bottom: 5px;
        color: #5b5b5b;
        font-weight: 400;
    }
    .b-l-primary {
        border-left: 4px solid #3f6ad8;
        text-align: left;
        padding: 4px;
    }
</style>