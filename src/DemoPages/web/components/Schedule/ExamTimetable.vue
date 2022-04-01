<template>
  <div>
      <!-- {{studentid}} -->

    <v-card > 
        <v-layout>
             <v-flex xs12 md4>
              <v-select
                v-model="test_type_id"
                item-value="id"
                item-text="class_name"
                :items="typeOfTest"
                v-bind:label="$t('select_test_type')"
                class=" mr-4"
                required
                :rules="fieldRules"
                outlined
                @change="fetchExamTimetable(test_type_id)"
              >
                <template slot="selection" slot-scope="data">{{
                  data.item.shortname
                }}</template>
                <template slot="item" slot-scope="data">{{
                  data.item.shortname
                }}</template>
              </v-select>
            </v-flex>
        </v-layout>
            </v-card> 
    <v-app-bar flat color="white">

      <v-toolbar-title>
        {{ $t("exam_timetable") }}
           
        </v-toolbar-title>

      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="search"
            append-icon="search"
            v-bind:label="$t('search')"
            single-line
            hide-details
            class="srch_bar"
          ></v-text-field>
        </template>
        <span>{{ $t("search") }}</span>
      </v-tooltip>
      <!-- <v-tooltip bottom>
            <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on" style="background-color: #032C48 !important;border-color: #032C48 !important;">
                    <router-link :to="{ name:'emailtemplates.amend' }" style="color:white">
                        Add New
                    </router-link>
                </v-btn>
            </template>
            <span>Add New</span>
        </v-tooltip> -->
    </v-app-bar>
    <v-data-table
      :headers="headers"
      :items="exam_timetable"
      class="elevation-1"
      :search="search"
      :loading="initval"
      v-bind:no-data-text="$t('no_data_available')"
      :footer-props="{
        'items-per-page-text': $t('rows_per_page'),
      }"
    >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.subject_name }} ({{ props.item.subject_code }})</td>
          <td>{{ props.item.exam_date|formatDate }}</td>
          <td>{{ props.item.start_time }}</td>
          <td>{{ props.item.end_time }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from "vue";
import axios from "axios";
// import AllocationLov from "../allocation_lov/allocationslov.vue"
Vue.use(FlashMessage);
export default {
    props: ["selectedLOV" ],
components: {
    // AllocationLov
  },
  data: () => ({
    search: "",
    dialog: false,
    email_templates: [],
    initval: false,
    test_type_id:null,
    typeOfTest:[],
    exam_timetable:[],
    exam_timetable_details:[],
    add_type:'Default Templates',
    studentid:null,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
        {
          text: this.$t("subject"),
          value: "subject_data.subject_name",
        },
        {
          text: this.$t("exam_date"),
          value: "exam_date",
        },
        {
          text: this.$t("start_time"),
          value: "start_time",
        },
        {
          text: this.$t("end_time"),
          value: "end_time",
        },
      ];
    },


  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    selectedLOV:{
       immediate: true,
    handler() {
        this.studentid = this.selectedLOV;
        this.test_type_id = null;
        this.exam_timetable=[];
    }
    },
  },

  created() {
    // this.initialize();
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchlookup();
  },

  methods: {
      studentID(lovstudentid){
          this.studentid = lovstudentid;
      },
  fetchlookup() {
       axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetchlookup", {
          params: {
            lookup_type: "TEST_TYPE",
          },
        })
        .then((response) => {
          this.typeOfTest = response.data.lookup_details;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchExamTimetable(test_type_id) {
        this.exam_timetable =[];
        this.initval=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "exam_timetable?test_type_id="+test_type_id+"&student_id="+this.studentid)
        .then((res) => {
         // let exam_timetable = res.data.exam_timetable;
         // exam_timetable.map((res)=>{
              this.exam_timetable = res.data.exam_timetable;
         // });
          this.initval = false;
        })
        .catch((err) => {
          this.initval = false;
          console.log(err);
        });
    },

    deleteItem(template_id) {
        axios
          .delete(
            process.env.VUE_APP_API_URL_STAFF + "emailtemplates/" + template_id
          )
          .then((res) => {
            if (Array.isArray(res.data.message)) {
              this.array_data = res.data.message.toString();
            } else {
              this.array_data = res.data.message;
            }
            if (res.data.status == "E") {
              this.flashMessage.error({
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
            } else {
              this.flashMessage.success({
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.fetchEmailTemplates();
            }
          })
          .catch((err) => {
            console.log("this error" + err);
          });
    },

    
  },
};
</script>
<style scoped>
.list_item{
  cursor: pointer;
}

</style>