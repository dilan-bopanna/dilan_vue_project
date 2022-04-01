<template>
    <v-data-table v-model="selected" :headers="headers" :items="desserts" :single-select="singleSelect" item-key="name"
        show-select class="elevation-1">
        <template v-slot:item="props">
            <tr @click="showStudentList()" style="cursor:pointer">
                <td>
                    <v-checkbox v-model="props.selected" @change="onCheckboxChange" primary hide-details></v-checkbox>
                </td>
                <td>{{props.item.calories}}</td>
                <td>{{props.item.name}}</td>
                <td>{{props.item.classes}}</td>
                <td><div class="badge badge-warning">{{props.item.average}}</div></td>
                <td>
                    <button type="button"
                       class="p-alert btn mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-danger btn-sm"
                        @click="sendmail('student')">
                        Alert
                    </button>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>
<script>
    export default {
        data() {
            return {
                singleSelect: false,
                selected: [],
                headers: [{
                        text: "Class",
                        align: "start",
                        sortable: false,
                        value: "name"
                    },
                    {
                        text: "Name",
                        value: "fat"
                    },
                     {
                        text: "Classes",
                        value: "fat"
                    },
                    {
                        text: "Average",
                        value: "fat"
                    },
                    {
                        text: "Action",
                        value: "carbs"
                    }
                ],
                desserts: [{
                        name: "Amal el Moussaif",
                        calories: "Maths (5B)",
                        classes:'22/30',
                        average: '36%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Andrea Joesph",
                        calories: "Science (3A)",
                        classes:'19/33',
                        average: '42%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Andrea Procopio",
                        calories: "Science (3A)",
                        classes:'23/30',
                        average: '55%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Carola Schiavini",
                        calories: "Maths (5B)",
                        classes:'22/30',
                        average: '41%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Amal el Moussaif",
                        calories: "Science (3A)",
                        classes:'21/30',
                        average: '38%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Andrea Joesph",
                        calories: "Maths (5B)",
                        classes:'20/30',
                        average: '36%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Andrea Procopio",
                        calories: "Science (3A)",
                        classes:'22/30',
                        average: '39%',
                        carbs: "Absent for 5 days"
                    },
                    {
                        name: "Carola Schiavini",
                        calories: "Maths (5B)",
                        classes:'26/30',
                        average: '40%',
                        carbs: "Absent for 5 days"
                    }
                ],
            };
        },
        methods : {
            showStudentList(){
                console.log('hai');
            },
            onCheckboxChange(){

            },
        },
    };
</script>