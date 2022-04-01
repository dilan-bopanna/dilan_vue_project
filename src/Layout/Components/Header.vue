<template>
  <div :class="headerbg" class="app-header header-shadow">
    <div class="logo-src" />
    <div class="app-header__content">
      <div class="app-header-left">
        <!-- <SearchBox /> -->
      </div>
      <div class="app-header-right">
        <!-- <HeaderDots /> -->
        <!-- <UserArea /> -->
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleMobile('closed-sidebar-open')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <!-- <div class="app-header__menu">
      <span>
        <b-button
          class="btn-icon btn-icon-only"
          variant="primary"
          size="sm"
          v-bind:class="{ active: isOpenMobileMenu }"
          @click="toggleMobile2('header-menu-open')"
        >
          <div class="btn-icon-wrapper">
            <font-awesome-icon icon="ellipsis-v" />
          </div>
        </b-button>
      </span>
    </div> -->
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";


library.add(faEllipsisV);
export default {
  name: "Header",
  components: {
    // SearchBox,
    // MegaMenu,
    // HeaderDots,
    // UserArea,
   
  },

  data() {
    return {
      isOpen: false,
      isOpenMobileMenu: false,
    };
  },
  props: {
    headerbg: String,
  },
  mounted(){
      // this.chatmessages();
      // this.assignmentstatus();
      // var channel = this.$pusher.subscribe('private-chatify');
      // channel.bind('chatmessages',(data)=>{
      //   this.data_recevie(data);
      // });
      // channel.bind('message_seen_status',(data)=>{
      //   this.data_update(data);
      // });
      // channel.bind('home_test_status',(data)=>{
      //   this.student_status_update(data);
      // });
      // channel.bind('home_test_create',(data)=>{
      //   this.student_assignment(data);
      // });
      // channel.bind('home_test_evaluated',(data)=>{
      //   this.student_assignment_evaluated(data);
      // });
    },

  methods: {
    toggleMobile(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },

    toggleMobile2(className) {
      const el = document.body;
      this.isOpenMobileMenu = !this.isOpenMobileMenu;

      if (this.isOpenMobileMenu) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    // data_recevie(data){
    //   this.pusher_msg=[],
    //   this.pusher_msg= {
    //     id:data.msgid,
    //     from_id:data.from_id,
    //     to_id:data.to_id,
    //     body:data.body,
    //     type:data.type,
    //     attachment:data.attachment,
    //     created_at:data.created_at,
    //     group_id:data.group_id,
    //     seen:data.msg_seen
    //   }
    //   this.$store.commit('UPDATE_MESSAGES_FROM_PUSHERS',this.pusher_msg);
    // },
    // data_update(data){
    //   this.array_index = this.$store.state.chatmessages[0].findIndex(x => x.id ==data.msgid);
    //   Vue.set(this.$store.state.chatmessages[0], this.array_index, {"id": data.msgid,"from_id": data.from_id,"to_id": data.to_id, "body": data.body, "seen": data.seen, "created_at": data.created_at,"group_id": data.group_id,"type": data.type,"attachment":data.attachment});
    // },
    // chatmessages(){
    //   axios.get(process.env.VUE_APP_API_URL_STAFF +'getmessages').then(res => {
    //     this.$store.commit('UPDATE_MESSAGES',res.data.data);
    //   }).catch(err => {
    //     console.log("this error" + err)
    //   })                
    // },
    // student_assignment(data){
    //   this.pusher_data=[],
    //   this.pusher_data= {
    //     id:data.id,
    //     status:data.status,
    //     staff_id:data.staff_id,
    //     student_id:data.student_id,
    //     type:data.type,
    //   }
    // this.$store.commit('STORE_ASSIGNMENT_DETAILS_FORM_PUSHERS',this.pusher_data);
    // },
    // student_status_update(data){
    //   this.array_index = this.$store.state.assignmentdetails[0].findIndex(x => x.id ==data.id);
    //   Vue.set(this.$store.state.assignmentdetails[0], this.array_index, {"id": data.id,"type": data.type,"status": data.status, "staff_id": data.staff_id,"student_id": data.student_id});

    // },
    // student_assignment_evaluated(data){
    //   this.array_index = this.$store.state.assignmentdetails[0].findIndex(x => x.id ==data.id);
    //   Vue.set(this.$store.state.assignmentdetails[0], this.array_index, {"id": data.id,"type": data.type,"status": data.status, "staff_id": data.staff_id,"student_id": data.student_id});
    // },
    
  },
};
</script>
