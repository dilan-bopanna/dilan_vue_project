  <template>
  <div>
   
    <FlashMessage :position="'right bottom'"></FlashMessage>
    <v-app-bar flat color="white">
      <v-toolbar-title>Module Listing</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      

     <v-btn @click="addModule()" color="primary" class=""  small> Add</v-btn>
    </v-app-bar>

    <v-data-table
      :headers="headers"
      :items="modules"
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
          <td>{{ props.item.module_name }}</td>
          <td>{{ props.item.parent_module_name }}</td>
          <td>
          
              <v-icon small class="mr-2" @click="editModule(props.item.id)">edit</v-icon>
            
            <v-icon small class="mr-2" @click="deleteItem(props.item.id)"
              >delete</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>

    <!-- Dialogue starts -->

        <v-dialog v-model="dialog" max-width="1000px">
          <div class="main-card card">
      <div class="card-header">
          <div
          class="card-header-tab card-header"
          style="display: flex; width: 100%; justify-content: space-between"
        >
          <div
            class="card-header-title font-size-lg text-capitalize font-weight-bold titlewrap"
          >
            Amend Module
          </div>
        </div>
      </div>
      <div class="card-body">
        <VueElementLoading
          :active="loader"
          spinner="bar-fade-scale"
          color="var(--primary)"
        />
        <v-form ref="form">
                      <v-container grid-list-md style="width:80%">
                        <v-layout wrap>
                          <v-flex md12 sm6>
                             <v-select
                                v-model="fieldItem.parent_id"
                                :items="modules.filter((item)=>item.id !== fieldItem.id ) "
                                item-text="module_name"
                                item-value="id"
                                outlined
                                label="Select Module"
                               required
                            ></v-select>
                          </v-flex>
                        </v-layout>
                        <v-layout wrap>
                          <v-flex md12 sm6>
                            <v-text-field
                              v-model="fieldItem.module_name"
                              outlined
                              clearable
                              clear-icon="mdi-close-circle"
                              label="Name of the module"
                              :rules="fieldRules"
                            ></v-text-field>
                          </v-flex>
                        </v-layout>
                      </v-container>
        </v-form>
      </div>
      <div class="d-block text-right card-footer">
       
            <button
             
              class="btn mr-2 btn-hover-shine btn-transition btn-secondary"
              @click="dialog = false"
            >
              Cancel
            </button>
         
            <div class="d-inline-block">
              <button
                color="green darken-1"
                 @click="saveModule"
                class="btn mr-2btn-hover-shine btn-transition btn-success"
              >
                Save
              </button>
            </div>
         
      </div>
    </div>
    </v-dialog>
  </div>
</template>

<script>
import Vue from "vue";
Vue.use(FlashMessage);
import FlashMessage from "@smartweb/vue-flash-message";
import axios from "axios";
export default {
  data() {
    return {
      modules: [],
      dialog:false,
      initval: true,
      search: "",
      departments:[],
      fieldItem:{
        id:0,
        section_name:"",
        parent_id:0,
      },
      valid: false,
      fieldRules: [(v) => !!v || "Field is required"],

      headers: [
        {
          text: "Module Name",
          align: "start",
          sortable: false,
          value: "module_name",
        },

        { text: "Parent Module", 
          value: "parent_name"
        },

        { text: "Actions",
          value: "action"
        },
      ],

    };
  },
  mounted() {
    this.getModule();
  },
  methods: {

    saveModule(){

          if (this.$refs.form.validate()) {
            axios.post(process.env.VUE_APP_API_URL + 'storeModule',this.fieldItem).then((res)=>
            {
                this.message = res.data.message;
                if(res.data.status == 'S'){
                  this.dialog = false;
                  this.flashMessage.success({
                    title: res.data.title,
                    message: this.message,
                    time: 4000,
                    blockClass: "custom-block-class",
                  });
                   this.getModule();
                }else{
                  this.flashMessage.error({
                  title: res.data.title,
                  message: this.message,
                  time: 4000,
                  blockClass: "custom-block-class",
                });
                    console.log('error');
                }
            })
             .catch((err) => {
            console.log(err);
          });
          }
      },

    addModule(){
      this.fieldItem.id = 0;
      this.fieldItem.section_name = "";
      this.fieldItem.parent_id = 0;
      this.dialog = true;
      this.getModule();
    },

    editModule(id){
      this.dialog = true;
      axios.post(process.env.VUE_APP_API_URL + 'getModuleById', { id: id}).then((res)=>
      {
          this.message = res.data.message;
          if(res.data.status == 'S'){
              this.fieldItem = res.data.module_data;
          }else{
              console.log('error');
          }
      });
    },

    getModule() {
       this.initval =  true,
      axios.get(process.env.VUE_APP_API_URL + "getModule").then((res) => {
        this.modules = res.data.module_data;
        this.initval =  false;
          })
           .catch((err) => {
            console.log(err);
          });
     
    },

    deleteItem(id) {

      if (confirm("Do you really wish to delete?")) {
        axios
          .post(process.env.VUE_APP_API_URL + "deleteModule",{ module_id: id})
          .then((res) => {
            if (res.data.status == "S") {
              this.message = res.data.message;
               this.flashMessage.success({
                title: res.data.title,
                message: this.message,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.getModule();
            } else {
              this.flashMessage.error({
                title: res.data.title,
                message: this.message,
                time: 4000,
                blockClass: "custom-block-class",
              });
              console.log("error");
            }
          })
           .catch((err) => {
            console.log(err);
          });
      }
    },

    
  },

};
</script>
<style scoped>
h5 {
  color: rgb(107, 103, 103);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.search_align {
  margin-right: 15px;
 
}
.create_button {
  margin-top: 22px;
}
</style>