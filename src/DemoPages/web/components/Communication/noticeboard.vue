<template>
    <!--News part full details start-->
    <div class="col-sm-12 col-lg-12 np">
      <!-- {{news_notice}} -->
        <v-card>
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
            {{$t('notice_board')}}
          </div>
          <v-spacer> </v-spacer>
          <div>
             <v-text-field
                
                v-model="search"
                append-icon="search"
                v-bind:label="$t('search')"
                single-line
                hide-details
                v-on:keyup="myFunction()"
                class="srch_bar ml-4 font_design"
                style="padding-bottom:20px"
                id="myInput" 
              ></v-text-field>
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <p class="link"> {{$t('back')}} </p>
          </div> -->
        </div>
        <div class="p-0 card-body">
          <div class="row">
            <div class="col-sm-3" style="border-right: 1px solid #dddddd;">
              <div>
              <h6 class="text-muted text-uppercase font-size-md opacity-9 text_align mb-2 ml-4 font-weight-normal">{{$t('latest_notice')}} </h6>
              </div>
              <div class="scroll-area-lg" >
               
                  <ul class="todo-list-wrapper list-group list-group-flush" id="myUL">
                    <li class="list-group-item"  v-for="(newsnotice,news_index) in news_notice" :key="news_index">
                      <div class="todo-indicator bg-warning"></div>
                      <div class="widget-content p-0">
                        <div class="widget-content-wrapper">
                          <div class="widget-content-left">
                            <div class="widget-heading" v-bind:class="{'selected': current === newsnotice.id}" @click="getNewsDetails(newsnotice.id)">{{newsnotice.title}}</div>
                            <span class="badge-news badge p-1 display" v-bind:class="{'badge-circular': newsnotice.content.shortname === 'News'}">{{newsnotice.content.shortname}} : {{ newsnotice.created_at | formatDate }} </span >
                          </div>
                          <!-- <div class="widget-content-right  p-2 " v-bind:class="{'badge-circular': news_notice.content.shortname === 'News'}" > {{news_notice.content.shortname}} </div> -->
                        </div>
                      </div>
                    </li>
                  </ul>
              </div>
            </div>
            <div class="col-sm-9 np">
               <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>  
               <div v-if="news_content == ''"> </div>  
              
              <div v-else class="p-1 slick-slider-sm mx-auto" >
                <slick ref="slick" :options="slickOptions2">
                  <!--Slide row one start-->
                  <div class="widget-chart widget-chart2 text-left p-0">

                    <div class="mt-6 p-2 mb-8 badge-info badge">
                     {{ news_content.notice_number }}
                    </div>   
                     <div class="mt-6 mb-8 p-2 published_on badge-info badge text-right">
                     {{ $t("published_on")}} {{ news_content.created_at | formatDate }}
                    </div>                 
                    <h4
                      class="pl-3 pr-3 pt-3 mb-4 text-center" >
                      {{ news_content.title }}
                    </h4>

                    <div>
                      <div class="col-sm-12">
                        <center>
                          <div > 
                         <div v-if="news_content.image==null" ></div>
                         <div v-else> <img height="200px" width="200px"  :src="instance_filepath_url+news_content.image" /> </div>
                          </div>
                        </center>
                      </div>
                      <div class="col-sm-12" style="text-align: initial">
                        <div class="ql-editor"> 
                        <p class="pr-4 quill-content" v-html="news_content.description"
                        >
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </slick> 
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </div>
    <!--News part details end-->
</template>

<script>
  import axios from "axios";
  import Slick from "vue-slick";
  import VueElementLoading from "vue-element-loading";

  export default {
    components: {
      Slick,
      VueElementLoading
    },
    props: ["studentNoticeBoard","newsid","studentid"],
    data: () => ({
      slickOptions2: {
        slidesToShow: 1,
        dots: true
      },
      loader:false,
      instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
      showNoticedetails: false,
      showNoticesubmit: false,
      news_content:[],
      news_id:"",
      notice: false,
      isMobileOpen: false,
      get_news_details : [],
      news_notice:[],
      search:"",
      current: null,
      news_array:[],
      staffid:null,
    }),

    computed:{

  newsSearch() {
      if (this.search) {
        return this.news_notice.filter(news_notice => {
          return (
            news_notice.title.toLowerCase().includes(this.search.toLowerCase()) 
          );
        });
      } else {
        return this.news_notice;
      }
    },
  },
watch: {

      studentNoticeBoard(){
     //   alert('studentNoticeBoard')
        this.news_notice=[];
        this.news_array=[];
        this.news_content=[];
        this.fetchNews(this.studentNoticeBoard);
   },
    newsid(){
     // alert(this.newsid+'............news')
     this.current = this.newsid;

   },
 
   studentid:{
          immediate: true,
          handler() {
        //   alert(this.studentNoticeBoard)
            this.fetchNews(this.studentNoticeBoard);
          },
        
   },
},
   mounted(){
      this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
      this.user = JSON.parse(localStorage.getItem('user'));
      
    },
    methods: {
       
    fetchNews(id) {
    // alert("news"+id)
      this.studentid = id;
      axios 
        .get(process.env.VUE_APP_API_URL_STAFF  + "news_notices", {
         params: {
            role: 'Student',
            academic_year:this.academic_year,
            entity_id:this.studentid,
          },
        })
        .then((res) => {
          this.news_notice = res.data.news_notices;
          //  if(typeof this.news_notice === 'object'){
          //     alert("OBJECT")
          //  }
            if(Array.isArray(this.news_notice)){
               this.getNewsDetails(this.news_notice[0]['id']);
           }
           else{
            for(this.item in this.news_notice){
               this.news_array.push(this.news_notice[this.item]);
              }
              this.getNewsDetails(this.news_array[0]['id'])
           }
         
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },

      getNewsDetails(id) {
       // alert('test')
      this.loader=true;
      this.current = id;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "news_notices/" + id, {})
         .then((res) => {
          this.loader=false;
          this.news_content = res.data.news_notices;
        })
        .catch((err) => {
          console.log("this error" + err);
          this.loader=false;
        });
    },

  myFunction() {
  var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
   li = ul.getElementsByTagName('li');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = li[i].textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
    
  },


      closeshowNoticedetails() {
        this.showNoticedetails = true;
        this.showNoticesubmit = false;
        this.notice = true;
      },
      hideNoticedetails() {
        this.showNoticedetails = false;
        this.notice = false;
          this.showNoticesubmit = false;
         this.$emit('back-btn', "tab1");
      },
      showsubdetails() {
        this.showNoticesubmit = true;
        this.notice = true;
        
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


<style >
.selected {
  cursor:pointer;
  padding:0 0 3px 0;
  color:#3f6ad8;
}

.list-group-item:hover {
  cursor:pointer;
  color:#3f6ad8;
}
.text_align{
  margin-top: 10px;
}
.published_on{
  float: right;
}
.contentType{
  color: #eb4c0eba;
  font-size: medium;
  font-style: oblique 13deg;
  font-weight: bolder;
}
.contentType_news{
  color: #127e8f;
  font-size: medium;
  font-style: oblique 13deg;
  font-weight: bolder;
}
.badge-news{
  color: #fff;
background-color: #eb4c0eba;
}
.badge-circular{
  color: #fff;
  background-color: #127e8f;
}
.badge{
  font-weight: bold;
text-transform: uppercase;
padding: 8px 10px;
min-width: 19px;
} 
.display{
  text-align: left;
}
.font_design{
  text-transform: none!important;
  font-weight: normal!important;
}
</style>
