<template>
    <div class="row">
        <!--News part start-->
        <div class="col-sm-12 col-lg-12" v-if="!newswide">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="header-icon lnr-paperclip icon-gradient bg-happy-itmeo"></i>
                        {{$t('news')}}
                    </div>
                     <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm" @click="openNewsWide">  {{$t('viewall')}} </button>
                    </div>
                </div>
                <div class="p-0 card-body">
                    <div class="row">
                        <!--Slide row one start-->
                                <div class="col-sm-4">
                                 <img class="news-image m-3" src=process.env.VUE_APP_API_URL_STAFF alt />
                                   
                                </div>
                                <div class="col-sm-8 p-3">
                                 <!-- <h4 class="pl-3 pr-3 card-header-title font-size-sm text-capitalize font-weight-normal">{{news_notices[0].title|striphtml}}</h4> -->

                                  <!-- <p class="pl-3 pr-3 m-0">{{news_notices[0].description|striphtml}}</p> -->
                                            <!-- <p class="p-3 m-0 text-right link" @click="openNewsWide">View More <i class="lnr-arrow-right"></i></p> -->
                                </div>
                       <!--Slide row one end-->
                    </div>
                </div>
            </div>
        </div>
        <!--News part end-->
        <!--News part full details start-->
        <div class="col-sm-12 col-lg-12" v-if="newswide">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="header-icon lnr-paperclip icon-gradient bg-happy-itmeo"></i>
                        News
                    </div>
                     <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <p @click="closeNewsWide" class="link"><i class="lnr-arrow-left"></i> Back </p>
                    </div>
                </div>
                <div class="p-0 card-body">
                    <div class="row">
                        <div class="col-sm-3" style="padding: 10px 0px 0px 32px;border-right: 1px solid #dddddd;">
                            <h6 class="text-muted text-uppercase font-size-md opacity-9 mb-2 font-weight-normal">School
                                News</h6>
                            <div class="scroll-area-lg shadow-overflow">
                                <VuePerfectScrollbar class="scrollbar-container" v-once>
                                    <ul class="todo-list-wrapper list-group list-group-flush">
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-warning"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">Old Bangalore University students
                                                            can clear failed exam papers</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-info"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">
                                                            IIM-B tops list of best B-schools in Eduniversal rankings
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-primary"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">Government school enrolment rises in
                                                            rural Karnataka: Report</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-danger"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">
                                                            Bengaluru: Admissions on, social media buzzing with review
                                                            requests</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-warning"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">
                                                            Karnataka government warns schools against flouting online
                                                            class rules</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-focus"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">
                                                            Karnataka: Educationists want schools to reopen, but doctors
                                                            feel its unsafe</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li class="list-group-item">
                                            <div class="todo-indicator bg-success"></div>
                                            <div class="widget-content p-0">
                                                <div class="widget-content-wrapper">

                                                    <div class="widget-content-left">
                                                        <div class="widget-heading">
                                                            Reopening dilemma: Bengaluru schools mull alternate days,
                                                            double shifts</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>

                                    </ul>
                                </VuePerfectScrollbar>
                            </div>
                        </div>
                        <div class="col-sm-9 np">
                            <div class="p-1 slick-slider-sm mx-auto">
                                <slick ref="slick" :options="slickOptions2">
                                    <!--Slide row one start-->
                                    <div class="widget-chart widget-chart2 text-left p-0">
                                     <h4 class="pl-3 pr-3 pt-3 card-header-title font-size-sm text-capitalize font-weight-normal">The educational institutions in Assam reopened</h4>
                                    <div style="display:flex">
                                         <div class="col-sm-6">
                                         <img class="news-image" src="@/assets/images/class-view.jpg" alt />
                                    </div>
                                    <div class="col-sm-6"> 
                                        <p>The educational institutions in Assam reopened on Monday after
                                                    more than seven months, while the other northeastern states are yet to
                                                    decide on the resumption of classes in schools on a regular basis, officials
                                                    said.
                                                    Tripura Education Department Director Uttam Kumar Chakma told IANS that 50
                                                    per cent teachers and staff are coming to the schools across the state since
                                                    October 15 and the students of Class IX to XII are allowed to come to the
                                                    schools for counselling by the teachers with the permission of their
                                                    parents.</p>
                                    </div>


                                    </div>
                                        
                                    </div>
                                    <!--Slide row one end-->
                                    <!--Slide row two start-->
                                     <div class="widget-chart widget-chart2 text-left p-0">
                                     <h4 class="pl-3 pr-3 pt-3 card-header-title font-size-sm text-capitalize font-weight-normal">The educational institutions in Assam reopened</h4>
                                    <div style="display:flex">
                                         <div class="col-sm-6">
                                         <img class="news-image" src="@/assets/images/class-view.jpg" alt />
                                    </div>
                                    <div class="col-sm-6"> 
                                        <p>The educational institutions in Assam reopened on Monday after
                                                    more than seven months, while the other northeastern states are yet to
                                                    decide on the resumption of classes in schools on a regular basis, officials
                                                    said.
                                                    Tripura Education Department Director Uttam Kumar Chakma told IANS that 50
                                                    per cent teachers and staff are coming to the schools across the state since
                                                    October 15 and the students of Class IX to XII are allowed to come to the
                                                    schools for counselling by the teachers with the permission of their
                                                    parents.</p>
                                    </div>


                                    </div>
                                        
                                    </div>
                                    <!--Slide row two end-->
                                     <div class="widget-chart widget-chart2 text-left p-0">
                                     <h4 class="pl-3 pr-3 pt-3 card-header-title font-size-sm text-capitalize font-weight-normal">The educational institutions in Assam reopened</h4>
                                    <div style="display:flex">
                                         <div class="col-sm-6">
                                         <img class="news-image" src="@/assets/images/class-view.jpg" alt />
                                    </div>
                                    <div class="col-sm-6"> 
                                        <p>The educational institutions in Assam reopened on Monday after
                                                    more than seven months, while the other northeastern states are yet to
                                                    decide on the resumption of classes in schools on a regular basis, officials
                                                    said.Tripura Education Department Director Uttam Kumar Chakma told IANS that 50
                                                    per cent teachers and staff are coming to the schools across the state since
                                                    October 15 and the students of Class IX to XII are allowed to come to the
                                                    schools for counselling by the teachers with the permission of their
                                                    parents.</p>
                                    </div>


                                    </div>
                                        
                                    </div>
                                </slick>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--News part details end-->
         <!--Chat Block start-->
        <div class="col-sm-12 col-lg-4" v-if="!newswide">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="header-icon pe-7s-chat icon-gradient bg-happy-itmeo"></i>
                         {{$t('chat')}}
                    </div>
                    <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm" v-on:click="gototab('tab2')"> {{$t('viewall')}} </button>
                    </div>
                </div>
                <div class="p-0 card-body">
                    <div class="scroll-area-md">
                        <!-- {{chatoverviewlist}} -->
                        <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
            <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4" v-if="chatoverviewlist.length==0">{{$t('no_details_found')}}</div> 
                        <ul class="todo-list-wrapper list-group list-group-flush">
                            <li class="nav-item"  v-for="(chat_list,chat_list_index) in chatoverviewlist" :key="chat_list_index">
                                <button type="button" tabindex="0" class="dropdown-item">
                                    <div class="widget-content p-0">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left mr-3">
                                                <div class="avatar-icon-wrapper">
                                                    <!-- <div
                                                        class="badge badge-bottom badge-success badge-dot badge-dot-lg">
                                                    </div> -->
                                                    <div class="avatar-icon" v-if="chat_list.type!='Group'">
                                                        <img  src="@/assets/images/avatars/1.png" alt />
                                                    </div>
                                                    <div class="avatar-icon" v-if="chat_list.type=='Group'">
                                                        <img  src="@/assets/images/avatars/group.png" alt />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="widget-content-left">
                                                <div class="widget-heading">{{chat_list.name}}
                                                    <span class="unread-message-count">
                                                        <small>{{chat_list.unseen_msg_count}}</small>
                                                    </span>
                                                </div>
                                            </div>
                                            <div class="widget-content-right">
                                                <button type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-secondary" @click="chat_tab(chat_list.id,chat_list.name,chat_list.type)"> Reply </button>
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
         <!--Chat Block end-->

          <!--Mail Blocks start-->
        <div class="col-sm-12 col-lg-4" v-if="!newswide">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="header-icon pe-7s-mail icon-gradient bg-happy-itmeo"></i>
                       {{$t('mail')}}
                    </div>
                    <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm" v-on:click="gototab('tab3')"> {{$t('viewall')}} </button>
                    </div>
                </div>
                <div class="p-0 card-body">
                    <div class="scroll-area-md">
                        <VuePerfectScrollbar class="scrollbar-container" v-once>
                            <div class="bg-white">
                                <div class="table-responsive">
                                    <table class="text-nowrap table-lg mb-0 table table-hover align-middle">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left mr-3">
                                                                <img width="42" class="rounded-circle"
                                                                    src="@/assets/images/avatars/1.jpg" alt />
                                                            </div>
                                                            <div class="widget-content-left">
                                                                <div class="widget-heading">Alina Mcloughlin</div>
                                                                <div class="widget-subheading">Today | 15 minutes ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-right">
                                                                            <button  type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-secondary"> Reply </button>

                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left mr-3">
                                                                <img width="42" class="rounded-circle"
                                                                    src="@/assets/images/avatars/2.jpg" alt />
                                                            </div>
                                                            <div class="widget-content-left">
                                                                <div class="widget-heading">John Smith</div>
                                                                <div class="widget-subheading">Today | 17 minutes ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="text-right">
                                                    <button  type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-secondary"> Reply </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left mr-3">
                                                                <img width="42" class="rounded-circle"
                                                                    src="@/assets/images/avatars/3.jpg" alt />
                                                            </div>
                                                            <div class="widget-content-left">
                                                                <div class="widget-heading">Eliot Huber</div>
                                                                <div class="widget-subheading">Yesterday | 1 day ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="text-right">
                                                                            <button  type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-secondary"> Reply </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div class="widget-content p-0">
                                                        <div class="widget-content-wrapper">
                                                            <div class="widget-content-left mr-3">
                                                                <img width="42" class="rounded-circle"
                                                                    src="@/assets/images/avatars/4.jpg" alt />
                                                            </div>
                                                            <div class="widget-content-left">
                                                                <div class="widget-heading">Ella-Rose Henry</div>
                                                                <div class="widget-subheading">18-11-2020 | 2 day ago
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td class="text-right">
                                                                            <button  type="button" class="btn btn-sm mr-2 mb-2 btn-pill btn-hover-shine btn-transition btn-secondary"> Reply </button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </VuePerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
         <!--Mail Blocks end-->

          <!--Noticeboard Block start-->
        <div class="col-sm-12 col-lg-4" v-if="!newswide">
            <div class="mb-3 card">
                <div class="card-header-tab card-header">
                    <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                        <i class="header-icon lnr-pointer-up icon-gradient bg-happy-itmeo"></i>
                        {{$t('noticeboard')}}
                    </div>
                    <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
                        <button class="btn-shadow btn-wide  btn btn-focus btn-sm" v-on:click="gototab('tab4')"> {{$t('viewall')}} </button>
                    </div>
                </div>
                <div class="p-0 card-body">
                     <div class="scroll-area-md">
                        <NoticeBoard @news-id="getnewsid"></NoticeBoard>
                     </div>
                </div>
            </div>
        </div>
         <!--Noticeboard Block  end-->
    </div>
</template>

<script>
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    import VueElementLoading from "vue-element-loading";
    import NoticeBoard from "../news/news_notices";
    import Slick from "vue-slick";
    import Vue from 'vue';
    import axios from 'axios';
    export default {
        components: {
            Slick,
            NoticeBoard,
            VuePerfectScrollbar,
            VueElementLoading
        },
        data: () => ({
            slickOptions2: {
                slidesToShow: 1,
                dots: true
            },
            isMobileOpen: false,
            newswide:false,
            news_id:'',
            loader:false,
            news_notices:[],
            chatoverviewlist:[],
            title:"",
        }),
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
            this.roleid = this.user.role_id;
            this.user_id = this.user.id;
            this.fetchNews();
            this.chatoverview();
            var channel = this.$pusher.subscribe('private-chatify');
            // chat messages event
            channel.bind('chatmessages',(data)=>{
                if(data.data.to_id != this.user_id){
                return;
                }else{
                    this.chatoverview();
                }
            });
        },
        methods: {
            getnewsid(newsid){
                //alert(newsid);
                this.news_id=newsid;
                this.$emit('news-id',newsid);
            },

             fetchNews(){
                // alert(this.roleid);
                 axios.get(process.env.VUE_APP_API_URL_STAFF +'news_notices', {
                    params: {
                        role:'Student',
                        academic_year:this.academic_year
                    }
                    })
                    .then(response =>  {
                       
                        this.news_notices = response.data.news_notices; 
                        
                    })
                    .catch((err) => {
                        console.log(err);
                    })
              },
              chatoverview(){
                this.loader = true;
                axios.get(process.env.VUE_APP_API_URL_STAFF +'chatoverview?user_id='+this.user_id
                ).then(res => {
                this.chatoverviewlist = res.data.chat_list;
                this.loader=false;
                }).catch(err => {
                    console.log("this error" + err)
                })
            },
            groupfilterunseenmessage(from_ids){
                this.msg_count = this.$store.state.chatmessages[0].filter((s) => s.seen==0 && s.to_id==this.user_id && s.from_id!=this.user_id && s.group_id==from_ids).length
                if(this.msg_count > 0){
                    return this.msg_count;
                }else{
                    this.msg_count ="";
                    return this.msg_count;
               }
            },
            userfilterunseenmessage(from_ids){
                this.msg_count = this.$store.state.chatmessages[0].filter((s) => s.seen==0 && s.to_id==this.user_id && s.from_id==from_ids && s.group_id==0).length
                if(this.msg_count > 0){
                return this.msg_count;
                }else{
                this.msg_count ="";
                return this.msg_count;
                }
            },
             gototab: function(tab) {
                console.log(tab);
                this.$emit('gototab',tab);
            },
            openNewsWide(){
              this.newswide=true
            },
             closeNewsWide(){
              this.newswide=false
            },
            chat_tab(studentid,chattype,type){
                //alert(chattype)
                this.$emit('selected-tab','tab2',studentid,chattype,type);
            },
            toggleLayoutClass(className) {
                const el = document.body;
                this.isMobileOpen = !this.isMobileOpen;
                if (this.isMobileOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            }
        }
    };
</script>
<style>
.np {padding: 0px}
.news-image {width: 100%;}
.link{cursor:pointer}
.slick-slide img{    width: 80%;
    margin: 0px auto !important;}
.unread-message-count{
    padding: 10px;
    color: green;
}
</style>