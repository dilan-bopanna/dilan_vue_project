<template>
<div>
<div class="spacebetween mb-5" >
     <h4 class="mt-2"> <strong> {{ $t("leave_application_details") }} </strong> </h4>
   <v-btn
      color="primary"
      dark
      class="mt-1"
      @click="applyleave()"
      v-bind="attrs"
   >
    {{$t('apply_leave')}}
   </v-btn>
</div>
<tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'" :tab-class="'tab-item'"
      :tab-active-class="'tab-item-active'" :line-class="'tab-item-line'"  @onClick="handleClick" /> 
   <!-- STUDENTS TAB -->
     <div  v-if="currentTab == 'tab1'">
       <v-data-table
      id="print"
      :headers="leave_headers"
      :items="leave_details.filter((item) => item.leave_type=='Leave')"
      class="elevation-1"
      :search="search_name"
      :loading="initval"
      v-bind:no-data-text="$t('no_data_available')"
      :footer-props="{
        'items-per-page-text': $t('rows_per_page'),
      }"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.firstname }} {{ item.lastname}}</td>
          <td>{{ item.class_name }}({{ item.section}})</td>
          <td>{{ item.start_date|formatDate}}</td>
          <td>{{ item.end_date|formatDate}}</td>
          <td>{{ item.leave_reason }}</td>
          <td>{{ item.status }}</td>
          <td> 
               <v-icon v-if="item.start_date>=date  && item.status!=='Cancelled'" @click="editleave(item.id)" v-on="on" small class="mr-2">edit</v-icon>    
          </td>
        </tr>
      </template>
    </v-data-table> 
     </div>

  <div v-if="currentTab == 'tab2'">
   <v-data-table
      id="print"
      :headers="permission_header"
      :items="leave_details.filter((item) => item.leave_type=='Permission')"
      class="elevation-1"
      :search="search_name"
      :loading="initval"
      v-bind:no-data-text="$t('no_data_available')"
      :footer-props="{
        'items-per-page-text': $t('rows_per_page'),
      }"
    >
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.firstname }} {{ item.lastname}}</td>
          <td>{{ item.class_name }}({{ item.section}})</td>
          <td>{{ item.start_date|formatDate }}</td>
          <td>{{ item.start_time }}</td>
          <td>{{ item.end_time }}</td>
          <td>{{ item.leave_reason }}</td>
          <td>{{ item.status }}</td>
           <td> 
               <v-icon v-if="item.start_date>=date" @click="editleave(item.id)" v-on="on" small class="mr-2">edit</v-icon>    
          </td>
        </tr>
      </template>
    </v-data-table> 
  </div>
   
</div>
</template>

<script>
import axios from "axios";
import Tabs from "vue-tabs-with-active-line";
import Vuetify from 'vuetify';

export default {
  components: {
    Tabs
  },
  vuetify: new Vuetify(),
  data:() => ({
      leave_details:[],
      initval:false,
      date: new Date().toISOString().substr(0, 10),
      currentTab: "tab1",
  }),

  mounted(){
  this.user = JSON.parse(localStorage.getItem('user'));
        this.staff_id = this.user.emp_id;
        this.user_id = this.user.emp_id;
        this.fetchLeaveData();
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
},
   computed: {
      tabs() {
      return [
        {
          title: this.$t("leave_report"),
          value: "tab1",
        },

         {
          title: this.$t("permission_report"),
          value: "tab2",
        },
      
      ];
    },

     fieldRules() {
      return [(v) => !!v || this.$t("field_required")];
    },
     leave_headers() {
      return [
        
        {
          text: this.$t("student_name"),
          value: "firstname",
        },
        {
          text: this.$t("classandsec"),
          value: "class_name",
        },
        {
          text: this.$t("from_date"),
          value: "start_date",
        },
        {
          text: this.$t("to_date"),
          value: "end_date",
        },
        {
          text: this.$t("reason"),
          value: "leave_reason",
        },
        {
          text: this.$t("status"),
          value: "status",
        },
         {
          text: this.$t("action"),
          value: "action",
        },
      ];
    },

    permission_header() {
      return [
      
        {
          text: this.$t("student_name"),
          value: "firstname",
        },
        {
          text: this.$t("classandsec"),
          value: "class_name",
        },
        {
          text: this.$t("from_date"),
          value: "start_date",
        },
        {
          text: this.$t("start_time"),
          value: "start_time",
        },
         {
          text: this.$t("end_time"),
          value: "end_time",
        },
        {
          text: this.$t("reason"),
          value: "leave_reason",
        },
        {
          text: this.$t("status"),
          value: "status",
        },
        {
          text: this.$t("action"),
          value: "action",
        },
      ];
    },
    
  },

  methods:{
    handleClick(newTab) {
       this.currentTab = newTab;
       
   },
   applyleave(){
        this.$router.push({ name: "apply_leave" });
   },
   
    editleave(id) {
      this.leaveid = id;
      this.$router.push({
        name: "apply_leave",
        params: { leave_id: this.leaveid },
      });
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
td:first-child{
  font-weight: normal;
}
</style>