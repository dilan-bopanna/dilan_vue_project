<template>
<div>
<div style="display: flex;justify-content: space-between;between;
align-items: center;">
<tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'" :tab-class="'tab-item'"
      :tab-active-class="'tab-item-active'" :line-class="'tab-item-line'"  @onClick="handleClick" /> 
   
    <AllocationLov @selected-allocation="studentID" :selected_std="this.student_obj"></AllocationLov>
   </div>
     <div  v-if="currentTab == 'tab1'">
      <Mail></Mail>
     </div>

  <div v-if="currentTab == 'tab2'">
   <Noticeboard :studentNoticeBoard="this.studentlov_id" :newsid="this.news_id" :studentid="this.selected_stdid"></Noticeboard>
  </div>
   
</div>
</template>

<script>
import axios from "axios";
import Tabs from "vue-tabs-with-active-line";
import Vuetify from 'vuetify';
import Noticeboard from "./noticeboard.vue"
import AllocationLov from "../allocation_lov/allocationslov.vue"
import Mail from "./mail.vue"
export default {
  components: {
    Tabs,
    Noticeboard,
    Mail,
    AllocationLov
  },
  vuetify: new Vuetify(),
  data:() => ({
      leave_details:[],
      initval:false,
      studentlov_id:"",
      calssID:"",
      sectionID:"",
      currentTab: "tab1",
      news_id:null,
      selected_stdid:null,
      student_obj:"",
  }),

  mounted(){
  this.user = JSON.parse(localStorage.getItem('user'));
        this.staff_id = this.user.emp_id;
        this.user_id = this.user.emp_id;
  },
 watch:{
        "$route.params.tab": {
                immediate: true,
                handler() {
                    if (this.$route.params.tab) {

                      this.currentTab = this.$route.params.tab;
                    }
                },
            },
       "$route.params.newsid": {
                immediate: true,
                handler() {
                //  alert(this.$route.params.newsid+'......'+this.$route.params.studentid)
                    if (this.$route.params.newsid) {

                      this.currentTab = 'tab2';
                      this.news_id = this.$route.params.newsid;
                      console.log(this.$route.params.studentid);
                      this.selected_stdid = this.$route.params.studentid;
                     this.student_obj = this.$route.params.student_obj;
                    }
                },
            },
 },
   computed: {
      tabs() {
      return [
        {
          title: this.$t("mail"),
          value: "tab1",
        },

         {
          title: this.$t("notice_board"),
          value: "tab2",
        },
      
      ];
    },

  },

  methods:{
    studentID(lovstudentid,lovclassid,lovsectionid){
               this.studentlov_id=lovstudentid;
               this.calssID=lovclassid;
               this.sectionID=lovsectionid;
            //    this.$emit('selected-student',this.studentlov_id);
            },    

    handleClick(newTab) {
       this.currentTab = newTab;
       
   },
   applyleave(){
        this.$router.push({ name: "apply_leave" });
   },

   fetchLeaveData() {
       this.initval=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "get_leave_details"
        )
        .then((res) => {
          this.leave_details = res.data.leave_details;   
          this.initval=false; 
        })
        .catch((err) => {
        this.initval=false;
          console.log(err);
        });
    },
}
}
</script>

<style scoped>

#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
td:first-child {
    font-weight: none;
}
h1 {
  color: teal;
}

a {
  color: tomato;
}

.toggle {
  width: 120px;
  background: white;
  color: tomato;
  border: 0;
  padding: 5px;
  cursor: pointer;
}

.spacebetween{
    display: flex;
  justify-content: space-between;
}
.v-btn {
    text-transform: none!important;
}
.tab-item-lines{
    height: 35px;
    bottom: 20px!important;
    left: 0;
    border-radius: 0.25rem;
    -webkit-box-shadow: 0 16px 26px -10px rgba(63, 106, 216, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(63, 106, 216, 0.2);
    box-shadow: 0 16px 26px -10px rgba(63, 106, 216, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(63, 106, 216, 0.2);
    position: absolute;
    background: #3f6ad8;
    z-index: 5;
    -webkit-transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1) 0s;
    transition: all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1) 0s;
    width: 114px;
    -webkit-transform: translateX(12px);
    transform: translateX(12px);
}

</style>