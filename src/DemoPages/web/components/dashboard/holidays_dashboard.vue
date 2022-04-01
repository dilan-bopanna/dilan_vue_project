<template>
    <div>
      <!-- {{holiday_content}} -->
    <div class="row">
    <div class="col-sm-12 col-md-12 col-xl-12 ">
      <!--Unplanned Classes table start-->
      <div class="card-hover-shadow-2x mb-3 card" >
        <div class="card-header-tab card-header">
          <div class="card-header-title font-size-sm text-capitalize font-weight-normal">
            <i class="header-icon pe-7s-graph2 icon-gradient bg-malibu-beach mr-2"></i
            >{{ $t("upcoming_holiday") }}
          </div>
          <!-- <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
            <button
              class="btn mr-2 mb-2 btn-hover-shine btn_align btn-transition btn-primary"
              @click="goToHolidays()"
            >
              {{ $t("viewall") }}
            </button>
          </div> -->
        </div>
        <div class="scroll-area-md">
          <!-- <VuePerfectScrollbar class="scrollbar-container" v-once> -->
          <div class="table-responsive">
            
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover table-fixed"
            >
              <!-- <thead>
                <tr>
                  <th>{{ $t("date") }}</th>
                  <th>{{ $t("description") }}</th>
                  
                </tr>
              </thead> -->
              <tbody>
               <tr>
               <th>{{$t('date')}}</th>
                <th>{{$t('description')}}</th>
                                                   
      </tr>
                <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/>
                 <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4" v-if="holiday_content.length==0">{{$t('no_details_found')}}</div>
                <tr v-for="(holiday_content,index) in holiday_content" :key="index">
                      <td>
              <div class="badge badge-info">{{holiday_content.date|formatDate}} </div>
              </td>
                  <td>
                        <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                      <div class="widget-content-left flex2">
                   <div>{{holiday_content.description}}</div>
                      </div>
                       </div>
                     </div>
                  </td>
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
  components: {
    // VuePerfectScrollbar,
    VueElementLoading,
    
  },

   data: () => ({
    loader: false,
    holiday_content:[],
    
   
  }),
mounted() {
    this.fetchholidays();
  },


  methods: {
    fetchholidays() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "holidays")
        .then((res) => {
          this.loader=false;
          this.holiday_content = res.data.holidaydata;
          
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },

     goToHolidays(){
      this.$router.push({ name: 'holidays' });
      
    },
  },

}
</script>

<style scoped>
.btn_align{
     margin-top: 8px;
 }
</style>
