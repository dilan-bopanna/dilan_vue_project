<template>
  <div>
    <!-- <FlashMessage :position="'right bottom'" ></FlashMessage> -->
    <v-app-bar flat color="white">
      <v-toolbar-title
        >{{ $t("family_details") }}</v-toolbar-title
      >

      <v-spacer></v-spacer>
       <!-- <template>
       <div v-if="family_detail_data.id != 0">
                      <v-btn
                          color="primary"
                            dark
                            class="mb-2 edt-btn" @click="editItem(family_detail_data)">
                            {{ $t("edit") }}
                          </v-btn>
                      </div>
           </template>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            class="mb-2"
            v-on="on"
            style="background-color: #032c48 !important;border-color: #032c48 !important;"
          >
            <router-link
              :to="{
                name: 'Newfamilymember',
                params: {
                  studentid: studentid,
                  studentname: name,
                  type: 'new_member',
                  family_detail_id: 0,
                },
              }"
              style="color: white"
            >
              {{ $t("add_new") }}
            </router-link>
          </v-btn>
        </template>
        <span>{{ $t("add_new") }}</span>
      </v-tooltip> -->
           <!-- <span>{{ $t("edit") }}</span> -->
     
    </v-app-bar>
   <!-- <div class="col-md-12" v-if="family_detail_data=0">
     <h1>No details found</h1>
     </div>    -->
   <div  class="col-md-12">
              <div class="row">
                <div class="col-md-6">
                 <v-flex xs12 md12>
                      <v-select
                      @change="fetch_family_details(relationship_type)"
                        v-model="relationship_type"
                        item-value="id"
                        item-text="class_name"
                        :items="realationship.filter((item)=>item.id!=parentid)"
                        v-bind:label="$t('realationship')"
                        class="pr-8"
                        
                        outlined
                      >
                        <template slot="selection" slot-scope="data">
                          {{ data.item.shortname }}
                        </template>
                        <template slot="item" slot-scope="data">
                          {{ data.item.shortname }}
                        </template>
                      </v-select>
                    </v-flex>
                </div>
              <div class="col-md-6">
                <v-flex xs12 md12>
                  <v-select
                    v-model="family_detail_data.is_primary_contact"
                    item-value="shortname"
                    item-text="shortname"
                    :items="is_primary_contact"
                    v-bind:label="$t('is_primary_contact')"
                    class="pr-8"
                    disabled
                    outlined
                  >
                    <template slot="selection" slot-scope="data">
                      {{ data.item.longname }}
                    </template>
                    <template slot="item" slot-scope="data">
                      {{ data.item.longname }}
                    </template>
                  </v-select>
                </v-flex>
              </div>
              </div>
              </div>

              <div  class="col-md-12">
              <div  v-if="family_detail_data.id != 0" class="row">
              <div class="col-md-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                      <button class="btn btn-secondary align">{{$t('first_name')}}</button>
                  </div>
                  <input type="text" class="form-control"  v-model="family_detail_data.firstname" autofocus="" readonly="">
                </div>
              </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('last_name')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.lastname" autofocus="" readonly="">
                        </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('date_of_birth')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.date_of_birth" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('phone')}}</button>
                        </div>
                          <input type="text" class="form-control"  v-model="family_detail_data.phone_no" autofocus="" readonly="">
                        </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('email')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.email" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('mobile')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.mobile_no" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('address')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.address" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-12">
                     <div class="input-group">
                      <h6> <strong> {{ $t("professional_details") }} </strong></h6>
                     </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('qualification')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.qualification" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('occupation')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.occupation" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('designation')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.designation" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                          <div class="input-group-prepend">
                            <button class="btn btn-secondary align">{{$t('organisations')}}</button>
                          </div>
                          <input type="text" class="form-control"  v-model="family_detail_data.organization" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                          <button class="btn btn-secondary align">{{$t('work_no')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.work_no" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">
                        <div class="input-group-prepend">
                            <button class="btn btn-secondary align">{{$t('other_info')}}</button>
                        </div>
                        <input type="text" class="form-control"  v-model="family_detail_data.other_info" autofocus="" readonly="">
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="input-group">

                    <!-- <div v-if="family_detail_data.id != 0">
                      <v-btn
                          color="primary"
                            dark
                            class="mb-2" @click="editItem(family_detail_data.id)">
                            {{ $t("edit") }}
                          </v-btn>
                      </div> -->
                      </div>
                    </div>

                </div>
                <div class="row" v-else>
                <h3>  {{$t('no_details_found')}}</h3>
                </div>
          <!-- /.card -->
      </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from "vue";
import axios from "axios";
Vue.use(FlashMessage);

export default {
    props: [
    "studentID"],

  data: () => ({
    // UPLOAD
    aws_url: process.env.MIX_AWS_URL,
    staticasset: "/staticasset/defaultlogo.png",
    import_file: "",
    valid_error: false,
    valid_success: false,
    successmessage: "",
    valid: false,
    message: "",
    rolename: "",
    colorcode: "",
    is_primary_contact:[],
    realationship:[],
    fieldItems: {
      orgid: 0,
    },
    parentid:null,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
    mobileRules: [
      (v) => !!v || "Mobile is required",
      (v) =>
        (v >= 1000000000 && v <= 9999999999) || "Enter Mobile must be valid",
    ],
    phoneRules: [
      (v) => !!v || "Phone number is required",
      (v) =>
        (v >= 1000000000 && v <= 9999999999) ||
        "Enter Phone number must be valid",
    ],
    pinRules: [
      (v) => !!v || "Pincode  is required",
      (v) => (v >= 100000 && v <= 999999) || "Enter Pincode  must be valid",
    ],
       family_detail_data: {
      id: 0,
      firstname: "",
      loader: false,
      lastname: "",
      date_of_birth: "",
      mobile_no: "",
      phone_no: "",
      work_no: "",
      email: "",
      is_primary_contact: "",
      relationship_type: "",
      address: "",
      state: "",
      country: "",
      city: "",
      postcode: "",
      qualification: "",
      designation: "",
      occupation: "",
      other_info: "",
      organization: "",
    },
    search: "",
    name: "",
    student_id: 0,
    dialog: false,
    dialog_create: false,
    initval: true,
    familydetails: [],
    student: [],
    relationshiptype:0,
    loading: false,
    fieldRules: [(v) => !!v || "Field is required"],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
        {
          text: this.$t("realationship"),
          value: "class_name",
        },
        {
          text: this.$t("firstname"),
          value: "firstname",
        },
        {
          text: this.$t("lastname"),
          value: "lastname",
        },
        {
          text: this.$t("email"),
          value: "email",
        },
        {
          text: this.$t("mobile"),
          value: "mobile_no",
        },
        {
          text: this.$t("State"),
          value: "code",
        },
        {
          text: this.$t("city"),
          value: "class_name",
        },
        {
          text: this.$t("country"),
          value: "class_name",
        },
        {
          text: this.$t("is_primary_contact"),
          value: "class_name",
        },
        {
          text: this.$t("action"),
          value: "class_name",
        },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },

    studentID: {
      immediate: true,
      handler() {
    
    this.student_id = this.studentID
     this.fetch_family_details();
      }
    },
  },
  mounted(){
    this.user = JSON.parse(localStorage.getItem('user'));
    this.fetchlookup();
     this.fetch_family_details();
    // this.family_detail_data.relationship_type;

  },

  methods: {
    resetset(){
       this.family_detail_data = {
      id: 0,
      firstname: "",
      loader: false,
      lastname: "",
      date_of_birth: "",
      mobile_no: "",
      phone_no: "",
      work_no: "",
      email: "",
      is_primary_contact: "",
      relationship_type: "",
      address: "",
      state: "",
      country: "",
      city: "",
      postcode: "",
      qualification: "",
      designation: "",
      occupation: "",
      other_info: "",
      organization: "",
       }
    },

    fetch_family_details(relationshiptype){
      this.resetset();
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "parent_family", {
          params: {
            type: relationshiptype,
            id: this.user.emp_id
          },
        })
        .then((response) => {
                this.family_detail_data = response.data.familydetails;
                this.parentid = response.data.parent_relation.relationship_type;
                this.relationship_type = this.family_detail_data.relationship_type;
        })
        .catch((err) => {
          console.log(err);
        });

    },
     fetchlookup() {
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetchlookup", {
          params: {
            lookup_type: "RELATIONSHIP",
          },
        })
        .then((response) => {
          this.realationship = response.data.lookup_details;
        })
        .catch((err) => {
          console.log(err);
        });

         axios
        .get(process.env.VUE_APP_API_URL_STAFF + "fetchlookup", {
          params: {
            lookup_type: "STATUS",
          },
        })
        .then((response) => {
          this.is_primary_contact = response.data.lookup_details;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchfamily(studentid) {
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "family_details?studentid=" +
            studentid
        )
        .then((res) => {
          this.familydetails = res.data.familydetails;
          this.initval = false;
        })
        .catch((err) => {
          this.initval = false;
          console.log(err);
        });
    },
    closepopup() {
      this.dialog_create = false;
      this.$refs.form.reset();
    },

    deleteitem(familydetail_id) {
      if (confirm(this.$t("delete_confirmation"))) {
        this.familydetail_id = familydetail_id;
        axios
          .post(process.env.VUE_APP_API_URL_STAFF + "deletefamilydetail", {
            id: this.familydetail_id,
          })
          .then((res) => {
            if (Array.isArray(res.data.message)) {
              this.array_data = res.data.message.toString();
            } else {
              this.array_data = res.data.message;
            }
            if (res.data.status == "E") {
              this.flashMessage.error({
                title: res.data.title,
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
            } else {
              this.flashMessage.success({
                title: res.data.title,
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.fetchfamily(this.student_id);
            }
          })
          .catch((err) => {
            console.log("this error" + err);
          });
      }
    },
    editItem(familydetail) {
      this.familydetail_id = familydetail.id;
      this.$router.push({
        name: "Newfamilymember",
        params: {
          studentid: this.studentid,
          type: "edit",
          name: this.name,
          family_detail_id: this.familydetail_id,
        },
      });
    },
  },
};
</script>


<style  scoped>
.input-group-prepend .btn, .input-group-append .btn{
    width:120px !important;
}
.align{
    text-align: left;
}
.edt-btn{
  margin-right: 7px;
}
</style>
