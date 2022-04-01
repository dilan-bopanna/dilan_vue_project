<template>
  <div>
    <div v-if="currentFile && progress < 100">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>
    <v-layout>
      <!-- <v-flex xs12 md7 style="margin-left: 10px;font-size: 10px;">
        <label for="files" class="btn" style="margin:0px; font-size:15px">{{label}}</label> 
        <input id="files" type="file" @change="onFileChange" >
      </v-flex> -->
        <v-flex xs12 md8 style="margin-left: 10px;font-size: 10px;">
           <p v-if="file_name!=''" class="filename card">{{file_name}}</p>
         <i  v-if="file_name!=''" class="lnr-cross-circle close-file" @click="cancelAttachment()"></i>
        <!-- <label for="files" class="btn" style="margin:0px; font-size:15px">{{label}}</label> -->   
        <div class="image-upload" style="position: absolute;top: 24px;right: 58px;">
          <label for="files">
              <i style="font-size: 25px;cursor: pointer;" class="header-icon lnr-paperclip icon-gradient bg-happy-itmeo"></i>
          </label>
         <input id="files" type="file" @change="onFileChange" >  
       </div>      
      </v-flex>
      <v-flex xs12 md5>
        <!-- <img :src="icon" height="40" /> -->
        <img v-if="image" :src="image" height="50" />
        <button v-if="image" @click="removeImage"><v-icon large>delete</v-icon></button>
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
  },
  name: "upload-files",
  data() {
    return {
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
  methods: {
     cancelAttachment(){
  this.file_name="";
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
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
            this.message = "Please select a file!";
            return;
        }
         this.message = "";
         return axios.post(process.env.VUE_APP_API_URL_STAFF +"upload", {'image':imagedata,'folder':this.folder,'filename':this.filename,'extension':this.extension})
            .then((res) => {
                console.log(res.data);
                if(res.data.status=='S'){
                    this.message = res.data.message;
                    this.fileurl = res.data.filepath;
                     this.file_name=this.fileurl.replace(/^.*[/]/, ''); 
                    this.$emit('file-url', this.fileurl);
                    this.$emit('file-name', this.file_name);

                }else{
                    alert(res.data.message);
                }

            }).catch((err) => {
                alert('Unable to upload file, try later');
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
.close-file{position: absolute;
top: -25px;
right: 0px;
font-size: 16px;}
.filename{position: absolute;
top: -21px;
left: 17px;
color: #32815c;
font-size: 12px;
font-weight: 400;
    width: 96%;
    text-align: left;

padding: 6px;}
.image-upload i
{
    width: 80px;
    cursor: pointer;
}
</style>
