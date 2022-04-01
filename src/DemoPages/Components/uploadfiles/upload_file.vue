<template>
  <div>
    <div v-if="currentFile && progress < 100">
      <div>
        <v-progress-linear v-model="progress" color="light-blue" height="25" reactive>
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>
    <v-layout>
      
      <v-flex xs12 md12>  
        <div>
          <label for="file">
             
          </label>
        
          <div class="file-upload">
            <div class="file-select">
              
                <input type="file" @change="onFileChange" name="files" id="files">
            </div>
         </div>
        
       </div>      
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props:{
      label:{
          type:String,
          default:"Logo"
      },
      image:{
          type:String,
          default:""
      },
      folder:{
          type:String,
          default:"others"
      },
      file_name:{
          type:String,
          default:"file_name"
      },     
      isfile:{
          type:String,
          default:"isfile"
      },     
  },
  name: "upload-files",
  data() {
    return {
    
    file_upload_data : this.$t('no_file_choose'),
    
      currentFile: undefined,
      progress: 0,
      message: "",
      fileInfos: [],
      fileurl:"",
      filename:"icon",
      extension:"png",
    };
  },
  mounted() {
  
  },
//    computed: {
//     formTitle() {
//       return this.editedIndex === -1 ? "New Item" : "Edit Item";
      
//     },
//     upload_data(){
        
//     }
    
//    },
  methods: {
    cancelAttachment(){
        this.file_name="";
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length){
        return;
      }
      this.createImage(files[0]);
      const filename = event.target.files[0].name;
      const lastDot = filename.lastIndexOf('.');
      const fileNameWithoutExt = filename.substring(0, lastDot);
      const ext = filename.substring(lastDot + 1);
      console.log('FileName => '+fileNameWithoutExt);
      this.filename = fileNameWithoutExt;
      console.log('Extension => '+ext);
      this.extension = ext;
    },
    createImage(file) {
      //var imagex = new Image();
      var reader = new FileReader();
      this.progress = 0;
      reader.onload = (e) => {
        this.$emit("updateImage",e.target.result);
        this.upload(e.target.result);
      };
      reader.readAsDataURL(file);
      //this.upload(this.image);
    },
    removeImage: function () {
      this.$emit("updateImage","");
      this.icon = '';
    },
    upload(imagedata) {
        if (!imagedata) {
            this.message = this.$t("selectfile");
            return;
        }
         this.message = "";
         return axios.post(process.env.VUE_APP_API_URL +"fileupload", {'image':imagedata,'folder':this.folder,'filename':this.filename,'extension':this.extension})
            .then((res) => {
                console.log(res.data);
                if(res.data.status=='S'){
                    this.message = res.data.message;
                    this.fileurl = res.data.filepath;
                   // console.log(res.data.filepath);
                    this.file_name=this.fileurl.replace(/^.*[/]/, ''); 
                    this.file_upload_data = this.file_name;
                    this.$emit('file-url', res.data.filename,'file_extension', this.extension);
                    this.$emit('filepath', this.fileurl);
                    this.$emit('file_extension', this.extension);
                }else{
                    alert(res.data.message);
                }

            }).catch((err) => {
                alert(this.$t("upload_file_error"));
                console.log("this error -> " + err);
            });
    },
  },
};
</script>
<style scoped>

.image-upload>input
{
    display: none;
}
.close-file{    position: absolute;
    top: 55px;
    right: 131px;
    font-size: 16px;
    color: #fff;}
.filename{    
  position: absolute;
    top: 52px;
    left: 0px;
    color: #32815c;
    font-size: 12px;
    font-weight: 400;
    width: 80%;
    text-align: left;
    padding: 6px;

padding: 6px;}
.image-upload i
{
    width: 80px;
    cursor: pointer;
}
.form-control-sm{height:auto !important}

</style>
