<template>
  <div>
   <!-- {{url}} -->
    <!-- <div>
    <div class="app-page-title">
    <FlashMessage :position="'right bottom'"></FlashMessage>
    <div class="page-title-wrapper">
      <div class="page-title-heading">
        <div class="page-title-icon">
          <i :class="icon" />
        </div>
        <div>
          {{heading}}
          <div class="page-title-subheading">{{subheading}}</div>
        </div>
      </div>

      <div class="page-title-actions">
        
        <v-btn style="color:white;" to="/components/onlineclasses" type="button" class="text-primary btn-shadow d-inline-flex align-items-center btn btn-primary">
          <font-awesome-icon class="mr-2" icon="plus" />Back
        </v-btn>
      </div>
    </div>
  </div>
  </div> -->
  <div class="content m-30">
    <!-- <iframe style="width:100%;height:800px" src="https://onlineclass.learnalize.education/bigbluebutton/api/join?meetingID=5qu3p9krcn&password=mp&fullName=Girish&userdata-bbb_skip_check_audio=true&userdata-bbb_auto_join_audio=true&userdata-bbb_listen_only_mode=false&userdata-bbb_client_title=LearnALize&userdata-bbb_mirror_own_webcam=true&userdata-bbb_show_public_chat_on_login=false&userdata-bbb_show_participants_on_login=false&checksum=492116df406dbf4512459593c297b9741300259e"></iframe>   -->
    <iframe style="width:100%;height:800px" :src="url"></iframe>  
  </div>
  <!-- <div>
     <CreateClass></CreateClass> -->
  </div>
    
  
</template>

<script>



// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";




export default {
  components: {

  // "font-awesome-icon": FontAwesomeIcon,
  },
  data: () => ({
    heading: "Meeting Room ",
    subheading:"Schedule and conduct online classes.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",
   
  }),
  
  created(){
    this.url = JSON.parse(localStorage.getItem('url'));
    console.log(this.url);
  },

  methods: {
      
  }
};
</script>
