<template>

  <div class="container">
   
  <FlashMessage :position="'right bottom'"></FlashMessage>
    <div class="main-card mb-3 card">
    <div class="card-header-tab card-header"> 
      <div class="card-header"> 
      <div class="
                card-header-title
                font-size-lg
                text-capitalize
                font-weight-bold
                titlewrap
              "
            >
              Test Cases
        </div> 
    </div>
    </div>
    <div class="card-body py-3">
         <b-row>

           <b-col md="4">
              <VueElementLoading
                :active="loader"
                spinner="bar-fade-scale"
                color="var(--primary)"
              />
              <div class="centered">
                <h5>Modules</h5>
                <v-treeview
                  hoverable
                  :items="modules"
                  v-model="selected"
                  section_name
                >
                  <template slot="label" slot-scope="{ item }">
                    <a @click="assignModule(item.id)">{{ item.name }}</a>
                  </template>
                </v-treeview>
              </div>
  
           </b-col>

          <b-col md="8">
             <v-app-bar flat color="white">
                  <v-toolbar-title>Test Cases Report</v-toolbar-title>
                  <v-divider class="mx-2" inset vertical></v-divider>
                  <v-spacer></v-spacer>
                  <v-btn @click="create()" color="primary" class=""  small> Add</v-btn>
              </v-app-bar>

                  <v-data-table
                    :headers="headers"
                    :items="testcases"
                    :items-per-page="5"
                    :search="search"
                    class="elevation-1"
                    :loading="initval"
                    v-bind:no-data-text="'No Data Available'"
                    :footer-props="{
                      'items-per-page-text': 'Rows per page',
                    }"
                  >
                    <template v-slot:item="props">
                      <tr>
                          <td>{{ props.item.summary }}</td>
                          <td>{{ props.item.description }}</td>
                          <td>
                            <router-link
                              style="padding-top: 15px"
                              :to="{
                                name: 'testcaseamend',
                                params: { id: props.item.id },
                              }"
                            >
                              <v-icon small class="mr-2">edit</v-icon>
                            </router-link>

                            <v-icon small class="mr-2" @click="DeleteItem(props.item.id)"
                              >delete</v-icon
                            >
                          </td>
                        </tr>
                    </template>
                  </v-data-table>
           </b-col>
         </b-row>
      </div>
   
    </div>

  </div>
</template>


<script>
import VueElementLoading from "vue-element-loading";
import Vue from "vue";
Vue.use(FlashMessage);
import FlashMessage from "@smartweb/vue-flash-message";
import axios from "axios";
export default {
  components: {
    VueElementLoading,
  },
  data() {
    return {
      loader: false,
      initval:true,
      testcases: [],
      modules: [],
      selected: "",
      moduleId: "",
      headers: [
        {
          text: "Test Case Summary",
          align: "start",
          sortable: false,
          value: "summary",
        },
        { text: "Description", value: "description" },
        { text: "Actions", value: "actions" },
      ],
      search: "",
     
    };
  },
  mounted() {
    this.fetchTestcases();
    this.fetchModules();
  },
  methods: {

    assignModule(moduleid) {
      this.moduleId = moduleid;
      this.fetchTestcases();
    },

    fetchTestcases() {
      
      this.initval = true;
      axios
        .get(
          process.env.VUE_APP_API_URL +
            "getTestCases?moduleId=" +
            this.moduleId
        )
        .then((res) => {
          this.testcases = res.data.testcases;
          this.initval = false;
        });
    },

    fetchModules() {
      this.loader = true;
      axios.get(process.env.VUE_APP_API_URL + "parentChildModule").then((res) => {
        this.modules = res.data.module_data;
        this.loader = false;
      });
    },

    DeleteItem(id) {
      if (confirm("Do you really wish to delete the record?")) {
        axios
          .get(process.env.VUE_APP_API_URL + "delete_testcases/" + id)
          .then((res) => {
            if (res.data.status == "S") {
              this.message = res.data.message;
              this.fetchTestcases();
            } else {
              console.log("error");
            }
          });
      }
    },

    create() {
      this.$router.push({
        name: "testcaseamend",
      });
    },

  },
};
</script>
<style scoped>
.split {
  height: 90%;
  width: 60%;
  position: fixed;
  z-index: 1;
  top: 0.5;
  overflow-x: hidden;
  padding-top: 70px;
  background-color: white;
  padding-right: 20px;
}

.left {
  left: 0;
}

.right {
  right: 0;
}

</style>