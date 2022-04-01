<template>
    
  
    
      <!-- left column -->
      <div class="col-md-12">
              <div class="row">
                  <!-- <div class="col-md-12">
                  <div class="form-group">
                    <label for="patient_name">Name:</label>
                    <input type="text" class="form-control" v-model="studentname" autofocus="" readonly="">
                    </div>
                </div> -->

                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('phone')}}</button>
                            </div>
                                 <input type="text" class="form-control"  v-model="profile.phone_no" autofocus="" readonly="">

                         </div>
                    </div>

                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('work_no')}}</button>
                            </div>
                    <input type="text" class="form-control"  v-model="profile.work_no" autofocus="" readonly="">
                    
                          </div>
                    </div>
                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('accupation')}}</button>
                            </div>
                                       <input type="text" class="form-control"  v-model="profile.accupation" autofocus="" readonly="">

                             </div>
                    </div>

                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('qualification')}}</button>
                            </div>
                                <input type="text" class="form-control"  v-model="profile.qualification" autofocus="" readonly="">
                           </div>
                    </div>
     <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('designation')}}</button>
                            </div>
                              <input type="text" class="form-control"  v-model="profile.designation" autofocus="" readonly="">

                           </div>
                    </div>

                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('organization')}}</button>
                            </div>
                                 <input type="text" class="form-control"  v-model="profile.organization" autofocus="" readonly="">
                         </div>
                    </div>

                    <div class="col-md-6">
                     <div class="input-group">
                          <div class="input-group-prepend">
                                <button class="btn btn-secondary align">{{$t('nationality')}}</button>
                            </div>
                    <input type="text" class="form-control"  v-model="profile.country" autofocus="" readonly="">
                             </div>
                    </div>


               
                </div>
          <!-- /.card -->
      </div>

</template>

<script>
import axios from "axios";
export default {
    data: () => ({
    heading: "My Profile",
    icon: "lnr-user text-info",
    name:"",
     currentTab: "tab1",
     user:{},
    profile: [],
    families:[],
  }),

  watch: {
    "$route.params.studentid": {
      immediate: true,
      handler() {
        
        if (this.$route.params.studentid) {
          this.student_id = this.$route.params.studentid;
          // this.name = this.$route.params.name;
        }
      },
    },
  },

   mounted() {
      this.user = JSON.parse(localStorage.getItem('user'));
      //  this.student_id = this.user.emp_id;
    this.fetchStudentProfile();
  },
  methods: {
       fetchStudentProfile() {
         axios
        .get(
          process.env.VUE_APP_API_URL_STAFF + "parentprofile?parent_id="+ this.user.emp_id
        )
        .then((res) => {
          this.profile = res.data.familydetails;
          // this.studentname = this.profile.firstname + ' ' +this.profile.lastname;
          console.log(res.data);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
  },
}
</script>

<style  scoped>
.input-group-prepend .btn, .input-group-append .btn{
    width:120px !important;
}
.align{
    text-align: left;
}
</style>
