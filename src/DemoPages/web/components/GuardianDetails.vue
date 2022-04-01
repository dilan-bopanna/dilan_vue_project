<template>
        <section class="content">
  <div class="container-fluid">
    <div class="row">
      <!-- left column -->
       <span v-if="!details.length>0">{{$t('no_details_found')}}</span>
      <div class="col-md-12" v-for="family in details" :key='family._id'>
        <!-- general form elements -->
        <div class="card card-success card-outline">
         
            <div class="card-body">
                   
                      <label for="patient_name" v-if="family.is_primary_contact == 'Y'"><u><b>{{$t('primary_contact')}}</b></u> </label>

              <div class="row">

                  <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('name')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.firstname" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('email')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.email" autofocus="" readonly="">
                                </div>
                    </div>
                    
                    

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('phone')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.phone_no" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('mobile')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.mobile_no" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('work_no')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.work_no" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('qualification')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.qualification" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('designation')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.designation" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('organizations')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.organization" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('dob')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.date_of_birth" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-6">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('other_info')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.other_info" autofocus="" readonly="">
                                </div>
                    </div>

                    <div class="col-md-12">
                            <div class="input-group">
                                 
                                    <div class="input-group-prepend">
                                            <button class="btn btn-secondary align">{{$t('address')}}</button>
                                        </div>
                                        <input type="text" class="form-control" v-model="family.address" autofocus="" readonly="">
                                </div>
                    </div>
                    

                </div>
          <!-- /.card -->
      </div>
    </div>
      <!-- /.row -->
  </div>
  </div>
  </div><!-- /.container-fluid -->
</section>
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
//        this.student_id = this.user.emp_id;
    // this.fetchStudentProfile();
    this.fetchFamilyDetails();
  },
  methods:{
      fetchFamilyDetails(){
        this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF + "studentfamilyDetail/"+ this.student_id
        )
        .then((res) => {
          this.families = res.data.family_detail;
        //   this.familyname = res.data.family_detail.firstname + ' ' +res.data.family_detail.lastname;
          console.log(res.data.family_detail);
          this.loader = false;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
  },
    computed: {
      details: function () {
        return this.families.filter(family => family.shortname == 'Guardian')
      },
    },

}
</script>

<style  scoped>
.input-group-prepend .btn, .input-group-append .btn{
    width:115px !important;
}
.align{
    text-align: left;
}
</style>