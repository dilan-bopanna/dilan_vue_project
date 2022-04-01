<template>
  <div class="container-fluid">
    <FlashMessage :position="'right bottom'"></FlashMessage>
    
    <div class="main-card mb-3 card">
      <div class="card-header">
        <div
          class="card-header-tab card-header"
          style="display: flex; width: 100%; justify-content: space-between"
        >
          <div class="card-header-title font-size-lg text-capitalize font-weight-bold titlewrap">
            Amend Test Case
          </div>
        </div>
      </div>

      <div class="card-body">
        <v-form ref="form" v-model="valid">
          <v-layout>
            <v-flex xs12 md12>
              <v-select
                outlined
                v-model="testCase.module_id"
                :items="module_data"
                :rules="[(v) => !!v || 'Field is required']"
                label="Select modules"
                item-text="module_name"
                item-value="id"
                required
              ></v-select>
               </v-flex>
              </v-layout> 

            <v-layout>
              <v-flex xs12 md12> 
              <v-text-field
                outlined
                v-model="testCase.summary"
                :rules="nameRules"
                label="Testcase Summary"
                required
                ></v-text-field>
              </v-flex>
              </v-layout>

             <v-layout>  
            <v-flex xs12 md12>
              <v-textarea
                outlined
                v-model="testCase.description"
                label="Enter Description"
              ></v-textarea>
            </v-flex>
            </v-layout>
          <v-layout>
            <v-flex xs12 md6>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <span v-on="on">
                    <upload-files
                    
                      :folder="'testcases'"
                      :image="testCase.filename"
                      @filepath="updateImage"
                      @file-url="addfilename"
                      @file_extension="fileExtension"
                      ref="filedata"
                      :resizeheight="250"
                      :resizewidth="300"
                    ></upload-files>
                  </span>
                </template>
                <span>Add File</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
         
        </v-form>

        <div class="d-block text-right card-footer">

           <button class="btn mr-2 btn-hover-shine btn-transition btn-secondary" @click="cancel"> Cancel </button>

          <button
           
            color="success"
            class="btn mr-2btn-hover-shine btn-transition btn-success"
            @click="saveTestcases()"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
Vue.use(FlashMessage);
import FlashMessage from "@smartweb/vue-flash-message";
import axios from "axios";
import UploadFiles from "../uploadfiles/upload_file.vue";

export default {
  components: {
    UploadFiles,
  },
  data: () => ({
    valid: true,
    name: "",
    message: "",
    testCase: {
      id: 0,
      summary: "",
      description: "",
      module_id: null,
      file_name: "",
      status: 1,
    },
    nameRules: [(v) => !!v || "Name is required"],

    select: null,
    module_data: [],
  }),
  watch: {
    "$route.params.id": {
      immediate: true,
      handler() {
        if (this.$route.params.id) {
          axios
            .post(
              process.env.VUE_APP_API_URL +
                "fetch_testcases_by_id",
                {id: this.$route.params.id}
            )
            .then((res) => {
              this.message = res.data.message;
              if (res.data.status == "S") {
                this.testCase = res.data.testcases;
              } else {
                console.log("error");
              }
            });
        }
      },
    },
  },
  mounted() {
    this.getSections();
  },
  methods: {
    addfilename(filename) {
      this.testCase.filename = filename;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },

    getSections() {
      axios.get(process.env.VUE_APP_API_URL + "getModule").then((res) => {
        this.module_data = res.data.module_data;
      });
    },

    saveTestcases() {
      if (this.$refs.form.validate()) {
        axios
          .post(process.env.VUE_APP_API_URL + "storeTestCases", this.testCase)
          .then((res) => {
            this.message = res.data.message;
            if (res.data.status == "S") {
               this.flashMessage.success({
                title: res.data.title,
                message: this.message,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.$router.push({
                name: "testcasereport",
              });
            } else {
               this.flashMessage.error({
                title: res.data.title,
                message: this.message,
                time: 4000,
                blockClass: "custom-block-class",
              });
              console.log("error");
            }
          }).catch((err) => {
            console.log(err);
          });
      }
    },
    cancel() {
      this.$router.push({
        name: "testcasereport",
      });
    },
  },
};
</script>
