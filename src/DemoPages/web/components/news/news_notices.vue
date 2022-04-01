<template>
    <div>
 <div class="row">
    <div class="col-sm-12 col-md-12 col-xl-12 ">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" >
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("notifications") }}
          </div>
          <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button
              class="btn mr-1 btn-hover-shine btn_align btn-transition btn-primary"
              @click="gotonews()"
            >
              {{ $t("viewall") }}
            </button>
          </div>
        </div>
        <div class="scroll-area-md">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <tr>
                  <th>{{ $t("date") }}</th>
                  <th>{{ $t("published_to") }}</th>
                  <th>{{ $t("title") }}</th>
               
                </tr>
              <tbody>
        
                <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                 <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4" v-if="news_content.length==0">{{$t('please_select_student')}}</div>
                <tr v-for="(news,index) in news_content" :key="index">
            <td>
              <div class="badge badge-info">{{news.created_at|formatDate}} </div>
              </td>
              <td>
                
                  <div class="publishto">{{selectedStudent.firstname}} {{selectedStudent.lastname}} </div> 
              </td>

               
                  <td>
                       
                   <div><a @click="SendNewsid(news.id,selectedStudent.student_id,selectedStudent)">{{news.title}} </a></div>
                      
                  </td>
                  <!-- <td>
                   
                      <button  type="button" class="btn mr-2 mb-2 btn-hover-shine btn-transition btn-info" @click="SendNewsid(newsid)" > {{$t('view')}} </button>
                  </td> -->
              </tr>
     </tbody>
               </table>
          </div>
          <!-- </VuePerfectScrollbar> -->
        </div>
      </div>
      <!--Unplanned Classes table end-->
    </div>

    </div>


      
    </div>
</template>

<script>
  import VueElementLoading from "vue-element-loading";
  import axios from "axios";
    export default {
       props:["selectedStudent"],
        components: {
         VueElementLoading,
        },
        data: () => ({
            slickOptions2: {
                slidesToShow: 1,
                dots: true
            },
            news_content:[],
            isMobileOpen: false,
            newswide:false,
            loader:false,
        }),

        mounted(){
            //  this.fetchNews();
             this.user = JSON.parse(localStorage.getItem("user"));
             this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
             this.roleid = this.user.role_id;
        },

  watch:{
         selectedStudent(){
           this.news_content=[];
           this.fetchNews();
         }
        },

  methods: {
           SendNewsid(news_id,std_id,std_obj){
            //alert(newsid);
            this.$emit('news-id',news_id);
              this.$router.push({ name: 'communication_main',params: {newsid:news_id,studentid:std_id,student_obj:std_obj} })
          },

      fetchNews() {
      this.loader = true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "news_notices", {
          params: {
            role: "Student",
            academic_year:this.academic_year,
            entity_id:this.selectedStudent.student_id,
          },
        })
        .then((response) => {
          console.log(response.data.news_notices);
          this.news_content = response.data.news_notices;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },

     gotonews(){
      this.$router.push({ 
       name: 'communication_main',
       params: { tab:"tab2"}, });
      
    },
        }
    };
</script>
<style>
.np {padding: 0px}
.news-image {width: 100%;}
.link{cursor:pointer}
.slick-slide img{    width: 80%;
    margin: 0px auto !important;
}
/* .publishto{
margin-right: 50px;
} */
.selected {
  cursor:pointer;
  padding:0 0 3px 0;
  color:#3f6ad8;
}
</style>