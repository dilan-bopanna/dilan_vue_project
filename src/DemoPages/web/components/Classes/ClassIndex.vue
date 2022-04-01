<template>
  <div>
    <div class="app-page-title">
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
        <v-btn style="color:white;" to="/teacher/class" type="button" class="btn-shadow d-inline-flex align-items-center btn btn-success">
          <font-awesome-icon class="mr-2" icon="plus" />Create
        </v-btn>
      </div>
    </div>
  </div>

      <div class="content">
        <div>
          <div class="row">
            <div class="col-12">
              <div class="main-card mb-3 card">
                <div class="card-header text-white" style="background:skyblue;">All Classes</div>
                <div class="card-body">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Sr. No</th>                        
                        <th>Class (Sec)</th>                        
                        <th rowspan="2">Edit</th>
                        <th rowspan="2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in items" :key="item.id">
                        <td>{{index+1}}</td>
                        <td>{{item.name}}</td>
                        <td>
                           <router-link class="btn mr-2 mb-2 btn-square btn-info text-white" :to="{ name: 'edit-class', params: { id: item.id }}">Edit</router-link>
                        </td>
                        <td>

                            <button @click="deleteClass(item.id)" type="button" class="btn mr-2 mb-2 btn-square btn-danger">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>  
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
window.axios = require('axios');

import PageTitle from "../../../Layout/Components/PageTitle.vue";
import Tabs from "vue-tabs-with-active-line";
import VueElementLoading from "vue-element-loading";
import CreateOnlineClasses from "../../../Layout/Components/Classes/Online-classes.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import FlashMessage from '@smartweb/vue-flash-message';
import Swal from 'sweetalert';

Vue.use(FlashMessage);

export default {
  components: {
    PageTitle,
    VueElementLoading,
    "font-awesome-icon": FontAwesomeIcon
  },
  data: () => ({
    heading: "All Classes",
    subheading:
      "Here You can see all your created classes.",
    icon: "pe-7s-global icon-gradient bg-amy-crisp",

    completedCls: [],

    items: [],
    date: '',
  }),
  
  mounted () {
      this.getClassDetails();
    
      //get the list of completed class
      axios.get('/api/teacher/get-completed-meeting-details')
      .then(response => {  
        this.completedCls = response.data.data
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
  },

  methods: {

      getClassDetails(){
        axios.get('/api/teacher/get-classes')
          .then(response => {  
            this.items = response.data
          })
          .catch(error => {
            console.log(error)
            this.errored = true
          })
      },

    //delete meeting
    deleteClass(id) {
      swal({
        title: "Are you sure?",
        text: "Are you sure that you want to delete this Class?",
        icon: "warning",
        dangerMode: true,
        buttons: ["No!", "Yes!"],
      })
      .then(willDelete => {
        axios.post('/api/teacher/delete-class/' + id).then(response => {
      })
      .catch(error => {
        console.log(error)
        this.errored = true
      })
      .finally(() => this.loading = false)
        if (willDelete) {
          this.getClassDetails();
          swal("Deleted!", "Class has been deleted!", "success");
        }
      });
    },

  }
};
</script>
