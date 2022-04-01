<template>
  <div>
   <h3 class="ml-2 pt-5 "> <strong> {{ $t("leave_application") }} </strong> </h3>   
    <v-card style="width:70%">
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-container>
            <div class="row">
              <div class="col-lg-12">
                  <v-layout>
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("leave_type")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                    v-model="leave_data.leave_type"
                      dense
                      @change="changeLeavetype(leave_data.leave_type)"
                      solo
                      class="pr-16 required_field"
                      item-text="class_name"
                      :items="leaveType"
                      v-bind:label="$t('select')"
                    >
                    </v-select>
                  </v-flex>
                </v-layout>
                
                <v-layout>
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("student_name")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                    v-model="leave_data.student_id"
                      dense
                      solo
                      class="pr-16 required_field"
                      item-value="student_id"
                      item-text="class_name"
                      :items="children_data"
                      v-bind:label="$t('select')"
                    >
                      <template slot="selection" slot-scope="data">
                        {{ data.item.firstname}} {{ data.item.lastname}}
                      </template>
                      <template slot="item" slot-scope="data">
                         {{ data.item.firstname}} {{ data.item.lastname}}
                      </template>
                    </v-select> 

                  </v-flex>
                 
                </v-layout>
                <v-layout>
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("reason_for_leave")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                      v-model="leave_data.leave_reason"
                      dense
                      solo
                      class="pr-16 required_field"
                      item-value="shortname"
                      item-text="class_name"
                      :items="leave_reasons"
                      v-bind:label="$t('select')"
                    >
                      <template slot="selection" slot-scope="data">
                        {{ data.item.shortname}} 
                      </template>
                      <template slot="item" slot-scope="data">
                         {{ data.item.shortname}} 
                      </template>
                    </v-select> 
                  </v-flex>
                </v-layout>
                <v-layout v-if="permissiondetails==true">
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("start_date")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12
                  style="display:flex" class="ml-14">
                   <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-text-field v-model="staffdata.joining_date" prepend-icon="mdi-calendar" v-bind:label="$t('joining_date')"   readonly v-on="on" outlined  ></v-text-field> -->
                        <v-text-field
                          v-model="scheduleDateFormatted"
                          v-bind:label="$t('select_date')"
                          @blur="scheduleDate = parseDate(dateFormatted)"
                          readonly
                          v-bind="attrs"
                          style="max-width:314px"
                          v-on="on"
                          dense
                          solo
                          class="ml-5 required_field
                          mr-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="leave_data.start_date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                 <v-layout  v-if="permissiondetails==false">
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("start_date")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12
                  style="display:flex" class="ml-14">
                   <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-text-field v-model="staffdata.joining_date" prepend-icon="mdi-calendar" v-bind:label="$t('joining_date')"   readonly v-on="on" outlined  ></v-text-field> -->
                        <v-text-field
                          v-model="scheduleDateFormatted"
                          v-bind:label="$t('select_date')"
                          @blur="scheduleDate = parseDate(dateFormatted)"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
                          solo
                          class="ml-5 required_field
                          mr-0"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="leave_data.start_date"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <v-select
                      v-if="permissiondetails==false"
                      class="ml-4"
                      dense
                      style="width:60px"
                      solo
                      item-text="class_name"
                      :items="leave_type"
                      v-model="leave_data.start_date_day_limit"
                      v-bind:label="$t('select')"
                      clearable
                    >
                    </v-select> 
                  </v-flex>
                </v-layout>

                <v-layout class="mb-4" v-if="permissiondetails==true">
                 <v-flex xs12 md4>
                 </v-flex>
                 <v-flex xs12 d-flex >
                     <div class="ml-16">
                      <h7 class="mr-4">{{$t("start_time")}}</h7>
                     <vue-timepicker
                     :minute-interval="15"
                      v-bind:label="$t('end_time')"
                      v-model="leave_data.start_time"
                      manual-input 
                  ></vue-timepicker>
                     </div>
                    <div class="ml-16">
                    <h7 class="mr-4">{{$t("end_time")}}</h7>
                     <vue-timepicker
                     :minute-interval="15"
                      v-bind:label="$t('end_time')"
                      v-model="leave_data.end_time"
                      manual-input 
                  ></vue-timepicker>
                     </div>
                 </v-flex>   
                </v-layout>

                  <v-layout v-if="permissiondetails==false">
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("end_date")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12  class="ml-14" style="display:flex">
                 <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dueDateFormatted"
                      v-bind:label="$t('select_date')"
                      @blur="scheduledate = parseDate(dateFormatted)"
                      readonly
                      :disabled="leave_data.start_limit=='First half'"
                      v-bind="attrs"
                      v-on="on"
                      dense
                      solo
                      class="ml-5 required_field"
                    >
                    </v-text-field>
                  </template>
                  <v-date-picker
                    :min="leave_data.start_date"
                    v-model="leave_data.end_date"
                    @input="menu4 = false"
                  ></v-date-picker>
                </v-menu>
                <v-select
                      class="ml-4"
                      dense
                      style="width:60px"
                      solo
                      item-text="class_name"
                      v-model="leave_data.end_date_day_limit"
                      :disabled="leave_data.start_date==leave_data.end_date || leave_data.start_limit=='First half'"
                      :items="leave_type.filter((item) => item=='First half')"
                      v-bind:label="$t('select')"
                      clearable
                    >
                    </v-select> 
                  </v-flex>
                </v-layout>

                <v-layout>
                  <v-flex xs12 md4 class="mt-3">
                    <h6><strong>{{$t("details")}}</strong></h6>
                  </v-flex>
                  <v-flex xs12 md8>
                <v-textarea
                class="mt-4 required_field"
                 v-model="leave_data.description"
                 dense
                 solo
               >
               </v-textarea>
                  </v-flex>
                </v-layout>
              </div>
              
            </div>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions class="justifycontent">
              
                  <button
                    v-on="on"
                    class="btn mr-2 mb-2 btn-hover-shine btn-transition btn-secondary"
                    @click="cancel()"
                  >
                    {{ $t("back") }}
                  </button>
                  <button
                    v-on="on"
                    v-if="cancel_leave_visible==true"
                    class="btn mr-2 mb-2 btn-hover-shine btn-transition btn-success"
                    @click="cancelLeave(leave_data.id)"
                  >
                    {{ $t("cancel_leave") }}
                  </button>
              
                  <button
                      class="btn mr-2 mb-2 btn-hover-shine btn-transition btn-success"
                      color="green darken-1"
                      @click="saveLeave()"
                  >
                      {{ $t("apply_leave") }}
    
                    </button>
                  
            </v-card-actions>
    </v-card>
    
  </div>
</template>
<script>
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from "vue";
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";
import axios from "axios";
Vue.use(FlashMessage);
//import VueElementLoading from "vue-element-loading";
export default {
  components: {
 VueTimepicker
  },
  data: () => ({
    heading: "My Profile",
    icon: "lnr-user text-info",
    date: new Date().toISOString().substr(0, 10),
    name: "",
    user: {},
    children_data:[],
    cancel_leave_visible:false,
    documentdata: [],
    leavedet:[],
    leaveType:["Leave","Permission"],
    leave_reasons:[],
    leave_type:["First half","Second Half"],
    message: "",
    leave_data:{
        id:0,
        leave_type:"",
        student_id:"",
        leave_reason:"",
        start_date:"",
        end_date:"",
        start_time:"",
        end_time:"",
        start_date_day_limit:"",
        end_date_day_limit:"",
        description:""
    },
    // leaveid:0,
    permission:"",
    valid_error: false,
    valid_success: false,
    menu1: false,
    menu2: false,
    menu3: false,
    permissiondetails:false,
    menu4: false,
    isBtnLoading: false,
    isDisabled: false,
    successmessage: "",
  }),

  watch: {
    "$route.params.leave_id": {
      immediate: true,
      handler() {
        if (this.$route.params.leave_id) {
          this.loader = true;
          this.leaveID = this.$route.params.leave_id;
          this.fetchLeavedetails(this.leaveID);
        }
      },
    },


  },

  mounted() {
    // this.fetchDocuments();
    this.user = JSON.parse(localStorage.getItem("user"));
    this.parent_id = this.user.emp_id;
    this.fetchChildrenData();
    this.fetchLeaveReasons();
  },
  methods: {
    saveLeave() {
    //  alert(this.leave_data['leave_type'])
         if(this.leave_data['leave_type']=='Permission'){
           this.permission=true;
        this.leave_data['end_date'] = this.leave_data['start_date']
      }
      if(this.leave_data['start_limit']=='First half'){
        this.leave_data['end_date'] = this.leave_data['start_date']
      }
        axios
          .post(
            process.env.VUE_APP_API_URL_STAFF + "save_leave_details",this.leave_data
            
          )
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
              this.$refs.form.reset();
              if(this.permission==true){
               // alert('type')
                  this.$router.push({name: "leave_report",params: { tab:'tab2'}});
                }else{
                  // alert('type')
                   this.$router.push({name: "leave_report"});
                }
              
            }
          })
          .catch((err) => {
            console.log("this error" + err);
      
          });
      },
              
    cancelLeave(id)
        {
        if(confirm(this.$t('cancel_leave_confirmation'))){ 
            axios.post(process.env.VUE_APP_API_URL_STAFF + "cancel_leave/"+id)
                .then((res) => {
                      if(Array.isArray(res.data.message)) {
                     this.array_data = res.data.message.toString();
               }else{
                     this.array_data = res.data.message;
               }
               if(res.data.status == 'S') {
                  this.flashMessage.success({
                  title: res.data.title, 
                  message: this.array_data,
                  time: 4000,
                  blockClass: 'custom-block-class'
                  });
                  this.loader = false;
                  this.studentdata = res.data.cofferdata;
                  console.log(res.data.cofferdata)
                    } else if(res.data.status == 'E') {
                  this.flashMessage.error({
                     title: res.data.title, 
                     error: this.array_data,
                     time: 4000,
                     blockClass: 'custom-block-class',
                  });
                  this.loader = false;
               }else {
                  this.flashMessage.error({
                     title: res.data.title, 
                     error: this.array_data,
                  });
                  this.loader = false;
               }                                                                                  
            }).catch(err => {
                  console.log("this error" + err)
            }) 
            }
        },
     parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
     fetchLeavedetails(leaveid) {
       this.cancel_leave_visible=true;
      axios
        .post(process.env.VUE_APP_API_URL_STAFF + "editLeaveDetails", {
          id: leaveid,
        })
        .then((res) => {
          this.leavedet = res.data.leavedetails;
          if(this.leavedet.leave_type=='Permission'){
            this.permissiondetails=true;
            this.leave_data = this.leavedet;
          }
          else{
            this.leave_data = this.leavedet;
          }
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
     },
  fetchChildrenData() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.parent_id,
          },
        })
        .then((res) => {
          this.children_data = res.data.all_children;   
          this.loader=false; 
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },
     changeLeavetype(type){
      if(type =='Leave'){
       this.permissiondetails=false;
      }
      else{
          this.permissiondetails=true;
          
      }
      this.leave_data['start_date']="";
      this.leave_data['end_date']=""
     },
     fetchLeaveReasons() {
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "fetchlookup?lookup_type= LEAVE_REASONS"
        )
        .then((res) => {
          this.leave_reasons = res.data.lookup_details;

          console.log(res.data.lookup_details);
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },

  cancel(){
      this.$router.push({
        name: "leave_report",
        
      });
  },
  },
  computed: {
     scheduleDateFormatted() {
      return this.formatDate(this.leave_data.start_date);
    },
    dueDateFormatted() {
      return this.formatDate(this.leave_data.end_date);
    },
  },
};
</script>
<style scoped>
.justifycontent{
    justify-content: end;
}
</style>
