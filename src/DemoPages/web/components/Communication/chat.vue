<template>
  <div>
    <div class="app-inner-layout chat-layout">
      <div class="app-inner-layout__wrapper">
        <div v-if="!isHidden" class="app-inner-layout__content card">
          <div class="table-responsive">
            <div class="app-inner-layout__top-pane" style="background: #e0f3ff;">
              <div class="pane-left">
                <div class="mobile-app-menu-btn">
                  <button type="button" class="hamburger hamburger--elastic"
                    v-bind:class="{ 'is-active' : isMobileOpen }" @click="toggleLayoutClass('open-mobile-menu')">
                    <span class="hamburger-box">
                      <span class="hamburger-inner"></span>
                    </span>
                  </button>
                </div>
                <div class="avatar-icon-wrapper mr-2">
                  <div class="avatar-icon avatar-icon-xl rounded">
                    <img width="82" src="@/assets/images/avatars/1.png" alt />
                  </div>
                </div>
                <input type="hidden" v-model="to_id" />
                <input type="hidden" v-model="chattype" />
                <h4 class="mb-0 text-nowrap">{{username}}
                  <!-- <div class="opacity-7">
                    {{$t('last_seen_online')}}:
                    <span class="opacity-8">10 minutes ago</span>
                  </div> -->
                </h4>
              </div>
              <div class="pane-right">
                <div class="btn-actions-pane-right text-capitalize actions-icon-btn" v-if="chattype=='Group'">
                  <!-- <input type="hidden" v-model="group_id" /> -->
                  <b-dropdown variant="link" right>
                    <p slot="button-content">
                      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </p>
                    <div>
                       <button type="button" tabindex="0" class="dropdown-item">
                        <i class="dropdown-icon lnr-users link"></i>
                        <span @click.stop="groupinfo(to_id)">Group Info</span>
                      </button>
                    </div>
                  </b-dropdown>
                </div>
                <button type="button" tabindex="0" class="dropdown-item">
                  <span @click.stop="closechatwindow()"><i class="dropdown-icon lnr-cross link"></i></span>
                </button>
              </div>
            </div>

            <div class="scroll-area-lg data_chat_height_scroll" v-chat-scroll>
              <div class="chat-wrapper" v-for="(chated_data,chated_data_index) in chatted_data " :key="chated_data_index">
                <!-- for group msg -->
                <div class="float-right user_msg" v-if="chated_data.from_id == student_id">
                  <div class="chat-box-wrapper float-right chat-box-wrapper-right">
                    <div>
                      <div  v-if="chated_data.body !='empty' ">
                        <div class="chat-box float-right">{{chated_data.body}}</div>
                      </div>
                      <div v-if="chated_data.attachment !='empty'">
                        <div v-if="get_url_extension(chated_data.attachment)== 'pdf'">
                          <img src="@/assets/images/pdf-logo.png" style="width: 50px;height: 50px;margin: 0px auto;">
                        </div>
                        <div v-if="get_url_extension(chated_data.attachment)!= 'pdf'">
                          <img src="@/assets/images/file-logo.png" style="width: 50px;height: 50px;margin: 0px auto;">
                        </div>
                        <a :href="instance_filepath_url+chated_data.attachment"> <div >{{chated_data.attachment.replace(/^.*[/]/, '')}}</div></a>
                      </div>
                      <small class="opacity-6">
                        <span v-if="(chated_data.seen==0) && (chated_data.type!='Group')">Unseen</span>
                        <span v-if="chated_data.seen!=0 && (chated_data.type!='Group')">Seen</span>
                        {{chated_data.created_at|formatDateTime}}
                      </small>
                    </div>
                    <div>
                      <div class="avatar-icon-wrapper ml-1 float-right">
                        <div class="avatar-icon avatar-icon-lg rounded">
                          <img src="@/assets/images/avatars/1.png" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-box-wrapper" v-if="chated_data.from_id != student_id">
                  <div>
                    <div class="avatar-icon-wrapper mr-1">
                      <!-- <div class="badge badge-bottom btn-shine badge-success badge-dot badge-dot-lg"></div> -->
                      <div class="avatar-icon avatar-icon-lg rounded">
                        <img src="@/assets/images/avatars/1.png" alt />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div  v-if="chated_data.body !='empty' ">
                      <div class="chat-box float-right">{{chated_data.body}}</div>
                    </div>
                    <div v-if="chated_data.attachment !='empty'">
                      <div v-if="get_url_extension(chated_data.attachment)== 'pdf'">
                        <img src="@/assets/images/pdf-logo.png" style="width: 50px;height: 50px;margin: 0px auto;">
                      </div>
                      <div v-if="get_url_extension(chated_data.attachment)!= 'pdf'">
                        <img src="@/assets/images/file-logo.png" style="width: 50px;height: 50px;margin: 0px auto;">
                      </div>
                      <a :href="instance_filepath_url+chated_data.attachment"> <div >{{chated_data.attachment.replace(/^.*[/]/, '')}}</div></a>
                    </div>
                    <small class="opacity-6">
                      <span v-if="chated_data.type=='Group'">{{chated_data.sender_name}}</span>
                      {{chated_data.created_at|formatDateTime}}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div class="app-inner-layout__bottom-pane d-block text-center">
              <div class="mb-0 position-relative row form-group">
                  <div class="col-md-10">
                  <v-text-field solo label="Message...." @keyup.enter="validate_message(to_id,message,chattype)" v-model="message" append-icon="pe-7s-smile" @click:append="showEmoji"></v-text-field>
                 <uploadfile @file-name="fileurl" :file_name="namefile"></uploadfile>
                  </div>              
                <div class="col-md-2" v-if ="message.length > 0 || file_url!=''">
                    <button class="btn mr- mb-2 btn-pill btn-info" color="green darken-1" text v-on:click="send_msg(to_id,message,chattype)"><i class="lnr-location"></i> Send</button>
                </div>
                 <VEmojiPicker v-if="Emoji" @select="selectEmoji" style="position: absolute;bottom: 95px;right: 290px;" />
              </div>
            </div>
          </div>
        </div>
        <div class="app-inner-layout__sidebar card">
          <div class="app-inner-layout__sidebar-header">
            <ul class="nav flex-column">
              <li class="pt-4 pl-3 pr-3 pb-3 nav-item">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <font-awesome-icon icon="search" />
                    </div>
                  </div>
                  <input placeholder="Search..." v-model="search" type="text" class="form-control" />
                </div>
              </li>
            </ul>
          </div>
           <b-tabs card>
                <b-tab :title="'Student('+total_student_useen_msg+')'" @click="closechattab('student')" :active="currentTab === 'tab1'">
                   <div class="scroll-area-md" v-if="currentTab === 'tab1'">
              <ul class="nav flex-column" v-for="(stafflist,stafflist_index) in student_list_data_array" :key="stafflist_index">
                <li class="nav-item" @click="getUserName(stafflist.id,stafflist.firstname,stafflist.type)">
                  <button type="button" tabindex="0" class="dropdown-item" v-bind:class="{ 'chat_selected_user': stafflist.id==to_id}">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                          <div class="avatar-icon-wrapper">
                            <div class="avatar-icon">
                              <img src="@/assets/images/avatars/1.png" alt />
                            </div>
                          </div>
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading time-name">
                            <span>{{stafflist.firstname}} {{stafflist.lastname}} ({{stafflist.code}})</span>
                          </div>
                        </div>
                          <span class="unread-message-count">
                            <small v-if="stafflist.unseen_msg_count > 0">{{stafflist.unseen_msg_count}}</small>
                          </span>
                      </div>
                    </div>
                  </button>
                </li>
               
              </ul>
          </div>
              </b-tab>
              <b-tab :title="'Staff ('+total_staff_useen_msg +')'" @click="closechattab('staff')" :active="currentTab === 'tab2'">
                    <div class="scroll-area-md" v-if="currentTab === 'tab2'">
              <ul class="nav flex-column" v-for="(stafflist,stafflist_index) in staff_list_data_array" :key="stafflist_index">
                <li class="nav-item" @click="getUserName(stafflist.id,stafflist.firstname,stafflist.type)">
                  <button type="button" tabindex="0" class="dropdown-item" v-bind:class="{ 'chat_selected_user': stafflist.id==to_id}">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                          <div class="avatar-icon-wrapper">
                            <div class="avatar-icon">
                              <img src="@/assets/images/avatars/1.png" alt />
                            </div>
                          </div>
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading time-name">
                          <span>{{stafflist.firstname}} {{stafflist.lastname}} ({{stafflist.code}})</span>
                          </div>
                        </div>
                          <span class="unread-message-count">
                            <small v-if="stafflist.unseen_msg_count > 0">{{stafflist.unseen_msg_count}}</small>
                          </span>
                      </div>
                    </div>
                  </button>
                </li>
               
              </ul>
          </div>
          </b-tab>
          <b-tab :title="'Groups('+total_group_useen_msg+')'"  @click="closechattab('group')" :active="currentTab === 'tab3'">
            <div class="scroll-area-md" v-if="currentTab === 'tab3'">
              <ul class="nav flex-column" v-for="(stafflist,stafflist_index) in group_list_data_array" :key="stafflist_index">
                <li class="nav-item" @click="getUserName(stafflist.id,stafflist.firstname,stafflist.type)">
                  <button type="button" tabindex="0" class="dropdown-item" v-bind:class="{ 'chat_selected_user': stafflist.id==to_id}">
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left mr-3">
                          <div class="avatar-icon-wrapper">
                             <div class="avatar-icon">
                                <img v-if="stafflist.type!='Group'" src="@/assets/images/avatars/1.png"
                                  alt />
                                <img v-if="stafflist.type=='Group'" src="@/assets/images/avatars/group.png" alt />                         
                              </div>
                          </div>
                        </div>
                        <div class="widget-content-left">
                          <div class="widget-heading time-name">
                            <span>{{stafflist.firstname}} {{stafflist.lastname}}</span>
                            <span class="unread-message-count">
                              <small v-if="stafflist.unseen_msg_count > 0">{{stafflist.unseen_msg_count}}</small>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </b-tab>
        </b-tabs>
        </div>
      </div>
    </div>
    <!-- Group info dialog -->
    <div>
      <v-dialog v-model="group_info" max-width="300">
        <v-card>
          <v-card-title class="headline">GROUP INFO</v-card-title>
          <v-card-text>
            <div style="align-items:center;justify-content:space-around">
              <div v-for="(group_info, group_info_index) in groupinfolist" :key="group_info_index">
                <div class="row">
                  <div class="col-md-6">
                    {{group_info.firstname}} {{group_info.lastname}}
                  </div>
                  <div class="col-md-6">
                    {{group_info.role}}
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="group_info = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!--Delete Model box-->

    <!--archive Model boxes-->
    <div>
      <v-dialog v-model="archivedialog" max-width="290">
        <v-card>
          <v-card-title class="headline">Are you sure you want to archive this chat?</v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="archivedialog = false">No</v-btn>
            <v-btn color="green darken-1" text @click="archivedialog = false">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <!--archive boxes-->

    <!--Create New Group Model-->
    <div>
    
    </div>
  </div>
</template>
<script>
import axios from "axios";
  //emojis section
  import {
    VEmojiPicker
  } from 'v-emoji-picker';
  // //emojis section
  import {
    library
  } from "@fortawesome/fontawesome-svg-core";
  import {
    faCog,
    faBusinessTime,
    faSearch,
    faStar
  } from "@fortawesome/free-solid-svg-icons";
  import {
    FontAwesomeIcon
  } from "@fortawesome/vue-fontawesome";
  import Vue from 'vue';
  import uploadfile from "../uploadfiles/upload_file";
  library.add(faCog, faBusinessTime, faSearch, faStar);
  Vue.use(require('vue-chat-scroll'))
  export default {
    components: {
      VEmojiPicker,
      uploadfile,
      "font-awesome-icon": FontAwesomeIcon,
    },
    props:["studentdetail"],
    data: () => ({
      currentTab: "tab1",
      heading: "Mailbox",
      subheading: "Create stunning UIs for your pages with these layout components.",
      icon: "pe-7s-power icon-gradient bg-mixed-hopes",
      username: "Alina Mcloughlin",
      isMobileOpen: false,
      Emoji: false,
      instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
      isHidden: true,
      check: true,
      stafflist_data:'',
      message: "",
      user_id:"",
      title:'',
        namefile:'',
      grouplist:[],
      chatusers:[],
      staff_list:[],
      student_list:[],
      groupinfolist:[],
      dialog: false,
      search:"",
      to_id:0,
      student:0,
      group_info:false,
      chatted_data:[],
      file_url:"",
      dialog1: false,
      archivedialog: false,
      CreateNewGroup: false,
      dialog3: false,
      autoUpdate: true,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      name: "Midnight Crew",
      people:"",
      user_name:'',
      total_staff_useen_msg:0,
      total_student_useen_msg:0,
      total_group_useen_msg:0
    }),
    
    computed: {
      student_list_data_array(){
        if(this.search){
          return this.student_list.filter(studentdata => {
          return studentdata.firstname.toLowerCase().includes(this.search.toLowerCase()) 
          })
        }else{
          return this.student_list;
        }
      },
      staff_list_data_array(){
        if(this.search){
          return this.staff_list.filter(staff_data => {
          return staff_data.firstname.toLowerCase().includes(this.search.toLowerCase()) 
          })
        }else{
          return this.staff_list;
        }
      },
      group_list_data_array(){
        if(this.search){
          return this.grouplist.filter(group_data => {
          return group_data.firstname.toLowerCase().includes(this.search.toLowerCase())
          })
        }else{
          return this.grouplist;
        }
      }
     },
     created(){
       console.log("hi hello");
       Vue.use(require('vue-pusher'), {
        api_key:process.env.VUE_APP_API_PUSHER_KEY,
        options: {
            cluster:process.env.VUE_APP_API_PUSHER_CLUSTER,
            authEndpoint: process.env.VUE_APP_API_URL_PUSHER,
            encrypted: true,
        }
      });
     },
    mounted(){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
      this.student_id= this.user.id;
      this.user_id= this.user.emp_id;
      this.user_name = this.user.name;
      this.ChatstudentUserList();
      this.to_id=0;
      // private chat channel
      var channel = this.$pusher.subscribe('private-chatify');
      // chat event chat messages
      channel.bind('chatmessages',(data)=>{
        this.chat_message_received(data);
      });
      // channel for seen message
      channel.bind('message_seen_status',(data)=>{
        this.message_seen_data_update(data);
      });
      // for routing
      if(this.studentdetail.length!=0){
        if(this.studentdetail['type']=='Staff'){
          this.currentTab="tab2";
          this.closechattab(2);
        }
        if(this.studentdetail['type']=='Group'){
          this.currentTab="tab3";
          this.closechattab(2);
        }
        this.getUserName(this.studentdetail['id'],this.studentdetail['name'],this.studentdetail['type']);
      }
    },
    // to clear a background data
    beforeDestroy: function(){
      this.to_id = 0;
      this.chattype = '';
      this.isHidden= true;
      console.log('Chat window Closed');
    },
    methods: {
      // message seen data update 
      message_seen_data_update(data){
        this.array_index = this.chatted_data.findIndex(x => x.id ==data.data.id);
        Vue.set(this.chatted_data, this.array_index, data.data);
        this.ChatstudentUserList();
      },
      // validate message
      validate_message(to_id,message,chattype){
        if(message.length > 0){
          this.send_msg(to_id,message,chattype);
        }
      },
      // file upload
      fileurl(filepath){
         this.file_url = filepath;
         localStorage.setItem("choosenfile", JSON.stringify(filepath));
          this.namefile = JSON.parse(localStorage.getItem('choosenfile'));
      },
      // remove file upload
      remove(item){
        const index = this.friends.indexOf(item.name);
        if (index >= 0) this.friends.splice(index, 1);
      },
      // select e-moji
      selectEmoji(emoji) {
        this.message += emoji.data;
      },
      // show e-moji
      showEmoji() {
        this.Emoji = true
      },
      // chat message from pusher to concat in chatted data
      chat_message_received(data){
        if(data.data.to_id != this.student_id){
            return;
        }
        this.ChatstudentUserList();

        if((data.data.type == "Group") && (data.data.to_id == this.student_id)  && (data.data.group_id == this.to_id)) {
          this.chatted_data.push(data.data);
          this.message_seen_unseen_update(this.to_id,this.chattype);
        }

        if((data.data.type!="Group") && (data.data.from_id == this.to_id) && (data.data.group_id==0) && ( data.data.to_id == this.student_id)){
          this.chatted_data.push(data.data);
          this.message_seen_unseen_update(this.to_id,this.chattype);
        }
      },
      //send message  function
      send_msg(receiver_id,message,chattype){
        this.receiver_id = receiver_id;
        this.body = message;
        this.from_id = this.student_id;
        this.chattype = chattype;
        axios.post(process.env.VUE_APP_API_URL_STAFF +'chats',{
        to_id:this.receiver_id,
        from_id:this.from_id,
        body:this.message,
        chattype:this.chattype,
        file_url:this.file_url,
        user_name:this.user_name
        }).then(res => {
          this.message="";
          this.file_url="";
          this.Emoji = false;
          this.namefile="";
          this.ChatstudentUserList();
          if(res.data.status=='S'){
              this.chatted_data.push(res.data.chats);
          }else{
           alert('Something went wrong') 
          }
        }).catch(err => {
          console.log("this error" + err)
        })
      },
      // get chatted data
      get_msg(id){
      this.chat_receiver_id = id;
      this.from_id = this.student_id;
      axios.get(process.env.VUE_APP_API_URL_STAFF +'chatdata?to_id='+this.chat_receiver_id+'&from_id='+this.from_id
        ).then(res => {
          this.chatted_data = res.data.chated_data;
          }).catch(err => {
            console.log("this error" + err)
          })
      },
      // get group messages
      get_grpmsg(User_id){
      this.group_id = User_id;
      axios.get(process.env.VUE_APP_API_URL_STAFF +'groupchatdata?group_id='+this.group_id+'&userid='+this.student_id
        ).then(res => {
              this.chatted_data = res.data.chated_data;
              }).catch(err => {
                console.log("this error" + err)
              })
      },
      // close chat tab
      closechattab(title){
        if(this.tab_value != title){
          this.tab_value = title;
          this.isHidden= true;
          this.to_id = 0;
        }
        if(title=='staff'){
          this.currentTab="tab2";
        }
        if(title=='student'){
          this.currentTab="tab1";
        }
        if(title=='group'){
          this.currentTab="tab3";
        }
        this.to_id = 0;
      },
      sp() {
        this.dialog3 = true;
      },
      // get user deatils
      getUserName(to_id,firstname,type) {
        this.to_id ="";
        this.username = firstname;
        this.to_id = to_id;
        this.chattype = type;
        this.message_seen_unseen_update(this.to_id,this.chattype);
        this.isHidden=false;
         if(type){
            if(type!="Group"){
            this.get_msg(this.to_id);
          }else{
            this.get_grpmsg(this.to_id);
          }
        }else{
          this.get_msg(this.to_id);
        }
        this.ChatstudentUserList();
      },
      //message_seen_unseen_update
      message_seen_unseen_update(id,chattype){
        this.receiver_id = id;
        this.chattype = chattype;
        this.from_id = this.student_id;
        axios.get(process.env.VUE_APP_API_URL_STAFF +'chatmeassagestatus?to_id='+this.receiver_id+'&from_id='+this.from_id+'&chattype='+this.chattype
          ).then(res => {
            this.chatted_datasssss= res.data.chated_data;
            }).catch(err => {
              console.log("this error" + err)
          })
        },
      // chat user list
      ChatstudentUserList(){
      axios.get(process.env.VUE_APP_API_URL_STAFF +'ChatstudentUserList?student_id='+this.student_id+'&user_id='+this.user_id+"&academic_year="+this.academic_year
        ).then(res => {
        this.staff_list = res.data.staff_list;
        this.grouplist = res.data.group_list;
        this.student_list = res.data.student_list;
        this.total_staff_useen_msg = res.data.total_staff_unseen_msg;
        this.total_student_useen_msg = res.data.total_student_unseen_msg;
        this.total_group_useen_msg = res.data.total_group_unseen_msg;
        }).catch(err => {
            console.log("this error" + err)
        })         
      },
      toggleLayoutClass(className) {
        const el = document.body;
        this.isMobileOpen = !this.isMobileOpen;
        if (this.isMobileOpen) {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      },
      //group information
      groupinfo(group_id){
       this.group_info = true;
        axios.get(process.env.VUE_APP_API_URL_STAFF +'chatgroupinfo?group_id='+group_id
        ).then(res => {
        this.groupinfolist = res.data.group_info_data_arr;
        }).catch(err => {
            console.log("this error" + err)
        })         
      },
      // getting file type
       get_url_extension( url ) {
        return (url || "").split(/[#?]/)[0].split('.').pop().trim();
      },
      // close chat window
      closechatwindow(){
        this.isHidden= true;
        this.to_id = 0;
      }
    }
  };
</script>
<style scoped>
  .time-name {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
   .user_msg{
        width: 100%!important;
  }
   .card{
    width: 600px!important;
  }
  @media only screen and (max-width: 768px) {
  /* For mobile phones: */
  .card{
    width: 500px!important;
  }
  .data-scroll{
    height:400px!important;
  }
  
  }
  .chat_selected_user{
    background: rgb(224, 243, 255) !important;
  }
  .unread-message-count{padding: 0px;color: green;width: 20px;height: 20px;text-align: center;border-radius: 19px;}
</style>