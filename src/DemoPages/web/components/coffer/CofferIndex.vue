<template>
    <div class="row">
                   <!--Observations-->
                    <div class="col-sm-12 m-l-r">
                       <div class="card-header-tab card-header">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal mt-2">
                   <!-- {{$t('observations')}}  -->
                    <button type="button"  class="btn mr-2 mb-2 btn-primary" style="position: absolute;right: 57px;z-index:1000" @click="studentCofferOpen()">{{$t('add')}} </button>                                         
                         </div>                 
                     </div>   
                            <div class="card-body card">
                                <VueElementLoading :active="loader" spinner="bar-fade-scale" color="var(--primary)"/> 
                                <div class="d-block font-weight-normal text-capitalize mt-1 grey--text text-left p-4" v-if="!studentcofferdata.length">{{$t('no_details_found')}}</div> 
                                <!-- <div class="coffer" v-for="(cofferdata,cofferindex) in studentcofferdata" :key="cofferindex">
                                    <div>
                                     <div><strong>Title:</strong>{{cofferdata.title}} </div>
                                     <div>
                                     <p class="text-truncate"><strong>Description:</strong> {{cofferdata.description|striphtml}}</p> </div>
                                    </div>
                                    <div>
                                   
                                    <i @click="EditCoffer(cofferdata.id)" class="lnr-pencil link ml-4"></i>  
                                     <i @click="previewCoffer(cofferdata.id)" class="lnr-eye link"></i> 
                                    </div>
                                 <v-spacer></v-spacer>    
                                </div> -->
                                 <div class="card mb-4 p-3"   v-for="(cofferdata,cofferindex) in studentcofferdata" :key="cofferindex">
                                 <div class="content-view">
                                    <span class="coffertitle"><h4 v-html="cofferdata.title" class="quill-content"></h4></span>
                                    <div class="action-buttons">
                                        <br>
                                        <span v-html="cofferdata.coffer_created_at"></span>
                                            <i @click="EditCoffer(cofferdata.id,'cofferedit')" class="lnr-pencil link ml-4"></i>  
                                            <i @click="deleteCoffer(cofferdata.id)" class="lnr-trash link"></i> 
                                            <i @click="previewCoffer(cofferdata.id,'preview')" class="lnr-eye link"></i> 
                                    </div>
                                </div>
                                <div class="ql-editor">
                                    <span class="content-ellipse pr-2 quill-content" v-html="cofferdata.description"></span>
                                            
                                    </div>
                                </div>
                            </div>
                        </div>
                <!--coffer add pop up-->
      <v-dialog v-model="cofferaddpopup" persistent max-width="800" max-height="1000" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
          <FlashMessage :position="'right bottom'" ></FlashMessage>
         <v-card >
            <div>
               <v-card-title class="headline text-info" v-if="!preview">{{$t('my_coffer')}}   </v-card-title>
                <v-card-title class="headline text-info" v-if="preview">{{studentdata.title}} <i  @click="EditCoffer(studentdata.id)" v-if="previewicon" class="lnr-pencil link mr-8"></i></v-card-title>
                <v-card-text v-if="preview">  
                      <div class="ql-editor">
                          <span class="pr-2 quill-content" v-html="studentdata.description"></span>  
                           <button  class="btn btn-light mr-2" color="green darken-1" style="float:right;" text @click="cofferaddpopup = false">{{$t('cancel')}}</button>                                
                      </div>
                </v-card-text>
               <v-card-text>
                   <v-form ref="form">
                        <v-text-field v-if="!preview"
                        v-model="studentdata.title"
                        label="Title"
                        required
                        outlined
                        ></v-text-field>

                        <!-- <v-textarea v-model="studentdata.description" label="Please enter description here" outlined>
                        </v-textarea> -->
                        <quill-editor v-model="studentdata.description" ref="myQuillEditor" :options="editorOption" v-if="!preview"> </quill-editor>
                        <div class="row mt-4 btn-actions-pane-right" style="float:right;">
                            <button class="btn btn-primary mr-2" color="green darken-1" text @click="saveCofferData()" v-if="!preview">{{$t('submit')}}</button>
                             <button  class="btn btn-light mr-2" v-if="!preview" color="green darken-1" text @click="cofferaddpopup = false">{{$t('cancel')}}</button>
                        </div>
                    </v-form>
               </v-card-text>
            </div>
         </v-card>
    </v-dialog>
    </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
import VueElementLoading from "vue-element-loading";
import FlashMessage from "@smartweb/vue-flash-message";
import { quillEditor } from "vue-quill-editor";
Vue.use(FlashMessage);
// import paginate from "../../DemoPages/Components/pagination.vue";
   export default {
       components: {
         VueElementLoading,quillEditor
        //  paginate
       },
         computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },

    data: () => ({
        editorOption: {
      // some quill options
    },
      previewicon:false,
      cofferaddpopup:false,
      studentcofferdata:[],
      loader:false,
      student_id:0,
      user:'',
      preview:false,
      cofferedit:true,
      studentdata:{
            id:0,
            title:"",
            description:""
      },
      fieldRules: [(v) => !!v || "Field is required"],
       }),

     mounted() 
       {
        this.user = JSON.parse(localStorage.getItem("user"));
        this.student_id = this.user.emp_id;
        this.fetchCofferData();
       },

    methods: {
        fetchCofferData(){
            this.loader=true;
                        axios.get(process.env.VUE_APP_API_URL_STAFF +"fetchstudentcoffer?student_id="+this.student_id)
                        .then(res => {
                        this.studentcofferdata =res.data.studentcoffer;
                        this.loader=false;
                         }).catch(err => {
                            console.log("this error" + err);
                             this.loader=false;
                         })
                    },
        studentCofferOpen()
        {  
            this.cofferedit=true;
            this.preview=false;
            this.studentdata={"id":0,"title":'',"description":''};
            this.cofferaddpopup=true;
            
        },
        saveCofferData()
        {
        
        
        axios.post(process.env.VUE_APP_API_URL_STAFF + "savecoffer", {
                cofferdata: this.studentdata,
                student_id: this.student_id,
                })
                .then((res) => {
                     if(Array.isArray(res.data.message)) {
                     this.array_data = res.data.message.toString();
                    }else{
                     this.array_data = res.data.message;
                    }
                if(res.data.status == 'E') {
                  this.flashMessage.error({
                     title: res.data.title, 
                     message: this.array_data,
                     time: 4000,
                     blockClass: 'custom-block-class',
                  });
                  this.loader = false;
               }else {
                  this.flashMessage.success({
                     title: res.data.title, 
                     message: this.array_data,
                     time: 4000,
                     blockClass: 'custom-block-class'
                  });
                 this.loader = false;
                 this.cofferaddpopup=false;
               }
               }).catch(err => {
                  console.log("this error" + err)
               })
                this.fetchCofferData();
        },
        EditCoffer(cofferid,type)
    {
            this.cofferedit=true;
            this.cofferaddpopup=true;
            this.preview=false;
            if(type=='cofferedit') 
            {
              this.previewicon=false;
            } 
            else
            {
              this.previewicon=true;
            }
               
        axios.post(process.env.VUE_APP_API_URL_STAFF + "editcoffer", {
                coffer_id: cofferid,
                })
                .then((res) => {
                this.studentdata = res.data.cofferdata;
                console.log(res.data.cofferdata)
                this.loader = false;
                })
                .catch((err) => {
                console.log("this error" + err);
                });
        },
        previewCoffer(cofferid)
        {
        this.previewicon=true;
        this.preview=true;
        this.cofferedit=true;
        this.cofferaddpopup=true;
        axios.post(process.env.VUE_APP_API_URL_STAFF + "editcoffer", {
                coffer_id: cofferid,
                })
                .then((res) => {
                this.studentdata = res.data.cofferdata;
                console.log(res.data.cofferdata)
                this.loader = false;
                })
                .catch((err) => {
                console.log("this error" + err);
                });
        },
        deleteCoffer(cofferid)
        {
        if(confirm("Do you really want to delete?")){ 
            axios.post(process.env.VUE_APP_API_URL_STAFF + "deletecoffer", {
                id: cofferid,
                student_id:this.student_id
                })
                .then((res) => {
                      if(Array.isArray(res.data.message)) {
                     this.array_data = res.data.message.toString();
               }else{
                     this.array_data = res.data.message;
               }
               if(res.data.status == 'S') {
                  this.flashMessage.success({
                  title: res.data.title, 
                  message: this.array_data,
                  time: 4000,
                  blockClass: 'custom-block-class'
                  });
                  this.loader = false;
                  this.studentdata = res.data.cofferdata;
                  console.log(res.data.cofferdata)
                    } else if(res.data.status == 'E') {
                  this.flashMessage.error({
                     title: res.data.title, 
                     error: this.array_data,
                     time: 4000,
                     blockClass: 'custom-block-class',
                  });
                  this.loader = false;
               }else {
                  this.flashMessage.error({
                     title: res.data.title, 
                     error: this.array_data,
                  });
                  this.loader = false;
               }                                                                                  
            }).catch(err => {
                  console.log("this error" + err)
            }) 
            }
             this.fetchCofferData();
        }
  

    }
   };
</script>

<style scoped>
@import "~quill/dist/quill.core.css";
@import "~quill/dist/quill.snow.css";
@import "~quill/dist/quill.bubble.css";

.text-truncate {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    width: 1034px !important;
}
.coffertitle
{
    white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
   
}
.coffertitle>>>h4{margin-bottom: 0px !important;}
.coffer
{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.ql-editor>>>img{width:100% !important}
  .f-12{font-size: 12px;}
  .link{cursor:pointer}
  .content-view{display: flex;flex-direction: row;align-items: center;justify-content: space-between;border-bottom: 1px solid #e6dddd;margin-bottom: 12px;}
  .content-ellipse{display: block;display: -webkit-box;max-width: 100%;margin: 0 auto;line-height: 20px;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;text-overflow: ellipsis;}
  .headline{display: flex;justify-content: space-between;}
  .video-ellipse{white-space: nowrap;text-overflow: ellipsis;overflow: hidden;}
  .action-buttons>i{padding:4px}
</style>