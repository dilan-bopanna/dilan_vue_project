<template>
    <div class="card-shadow-primary card-border mb-3 card">
      <!-- {{profile}} -->
          <div class="dropdown-menu-header">
            <div class="dropdown-menu-header-inner bg-primary">
              <div class="menu-header-image"
                style="background-image: url('assets/images/dropdown-header/city2.jpg');">
              </div>
              <div class="menu-header-content">
                <div class="avatar-icon-wrapper avatar-icon-lg">
                  <div class="avatar-icon rounded btn-hover-shine"> 
                    <div v-if="profile.profilepic != null">
                       
                      <img
                        :src="instance_filepath_url + profile.profilepic"
                      />
                    </div>
                    <div v-else>
                      
                      <img
                        src="@/assets/images/avatars/12.jpg"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h5 class="menu-header-title" >{{studentname}}</h5>
                  <!-- <h1 class="menu-header-title" style="font-size: 15px">Register Number-{{profile.code}}</h1> -->
                  <!-- <h1 class="menu-header-title" style="font-size: 15px">{{profile.class_name}}-({{profile.shortname}})</h1> -->
                </div>
              </div>
            </div>
          </div>
          
            
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left center-elem mr-2">
                      </div>
                      <div class="widget-content-left">
                        <div class="widget-heading" style="font-size: 15px;" > {{profile.email}} </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="list-group-item">
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left center-elem mr-2">
                      </div>
                      <div class="widget-content-left">
                        <div class="widget-heading" style="font-size: 15px" >{{$t('mobile')}}    :    {{profile.mobile_no}} </div>
                      </div>
                    </div>
                  </div>
                </li>

                <!-- <li class="list-group-item">
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left center-elem mr-2">
                      </div>
                      <div class="widget-content-left">
                        <div class="widget-heading" style="font-size: 15px" >Gender     :    {{profile.gender}} </div>
                      </div>
                    </div>
                  </div>
                </li> -->

                <li class="list-group-item">
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left center-elem mr-2">
                      </div>
                      <div class="widget-content-left">
                        <div class="widget-heading" style="font-size: 15px" >{{$t('dob')}}     :    {{profile.date_of_birth|formatDate}} </div>
                      </div>
                    </div>
                  </div>
                </li>

              </ul>
            
          
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
    instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
  }),
   mounted() {
      this.user = JSON.parse(localStorage.getItem('user'));
      //  this.student_id = this.user.emp_id;
    this.fetchStudentProfile();
  },

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

  methods: {
       fetchStudentProfile() {
      this.loader = true;
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF + "parentprofile?parent_id="+ this.user.emp_id
        )
        .then((res) => {
          this.profile = res.data.familydetails;
          this.studentname = this.profile.firstname + ' ' +this.profile.lastname;
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
</style>
