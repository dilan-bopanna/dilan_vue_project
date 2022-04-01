<template>
  <div>   
    <!-- {{topic_id}} -->
   <!-- {{createdSlides}} -->
    <!--Template One Start-->     
      <div class="col-lg-12 p-0 mt-5">       
              <slick ref="slick" :options="slickOptions2" >            
                <div v-for="slide in createdSlides" :key="slide.id">
                     <div class="col-lg-12 p-0" v-if="slide.template_id=='1'" >     
                            <div class="card m-3 p-4 br-10">
                                <h3>{{slide.title}}</h3>
                                <div class="image-text">
                                   <div>
                                    <!--Image start-->
                                    <div v-for="(image,imageindex) in slide.slideimages" :key="imageindex">
                                        <img :src="instance_pimcore_url+image.path+image.filename" style="width: 300px; height: 200px"/>
                                    </div>
                                    <!--Image end-->
                                    <div v-for="(video,videoindex) in slide.slidevideos" :key="videoindex" class="border-all">
                                      <video controls width="300" height="200">
                                            <source :src="instance_pimcore_url+video.path+video.filename" type="video/webm">
                                            <source :src="instance_pimcore_url+video.path+video.filename" type="video/mp4">
                                            {{$t('browser_doesnt_support_embeddedvideos')}}
                                      </video>
                                  </div>
                                </div>
                                  <!--Add Content start-->
                                      <div v-for="(content,contentindex) in slide.slidecontent" :key="contentindex">
                                        <p class="pl-4" v-html="content.detail"></p>
                                      </div>
                                    <!--Add Content end-->
                                </div>
                                
                                               
                            </div>     
                      </div> 
                  
                  <!--if TEMPLATE TWO-->
                  <div class="col-lg-12 p-0" v-if="slide.template_id=='2'" >     
                            <div class="card m-3 p-4 br-10">
                                <h3>{{slide.title}}</h3>
                                  <div class="image-text">
                                    <!--Add Content start-->
                                      <div v-for="(content,contentindex) in slide.slidecontent" :key="contentindex">
                                        <p class="pr-4" v-html="content.detail"></p>
                                      </div>
                                    <!--Add Content end-->
                                   <div>
                                    <!--Image start-->
                                    <div v-for="(image,imageindex) in slide.slideimages" :key="imageindex">
                                        <img :src="instance_pimcore_url+image.path+image.filename" style="width: 300px; height: 200px"/>
                                    </div>
                                    <!--Image end-->
                                    <div v-for="(video,videoindex) in slide.slidevideos" :key="videoindex" class="border-all">
                                      <video controls width="300" height="200">
                                            <source :src="instance_pimcore_url+video.path+video.filename" type="video/webm">
                                            <source :src="instance_pimcore_url+video.path+video.filename" type="video/mp4">
                                            {{$t('browser_doesnt_support_embeddedvideos')}}
                                      </video>
                                  </div>
                                </div>
                                  
                                </div>                
                            </div>     
                      </div> 
                  <!--if TEMPLATE TWO-->



                </div> 
              </slick>     
      </div>
     <!--Template One End--> 
  </div>
</template>

<script>
import Slick from "vue-slick";
import axios from "axios";
export default {
  components: {
 Slick
  },
  props:['topic_id'],
  data: () => ({
    instance_pimcore_url: process.env.VUE_APP_PIMCORE_BASE_URL,  
    createdSlides:[],
    heading: "Carousels & Slideshows",
    subheading:
      "Create easy and beautiful slideshows with these Vue components.",
    icon: "pe-7s-album icon-gradient bg-sunny-morning",
    slickOptions2: {
      slidesToShow: 1,
      dots: true
    },
    slide: 0,
    sliding: null,
  
  }),
  computed: {
    
  },
  watch: { 
    topic_id() {
      this.fetchSlides();
    },
   },
    mounted() {
    this.fetchSlides();
  },
  methods: {
     handleClick(newTab) {
      this.currentTab = newTab;
    },
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    reInit() {
      this.$nextTick(() => {
        this.$refs.slick.reSlick();
      });
    },
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    fetchSlides() {
      this.loader = true;
      //RECENT CLASSES
      axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "topicslides?topic_id="+this.topic_id
        )
        .then((response) => {
         // console.log(response.data.upcoming_classes);
          this.createdSlides = response.data.topicslides;
          this.loader = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  }
};
</script>
<style scoped>
.br-10{
    border-radius: 10px;
    border: 2px solid #a0a0a0;
}
.bg {
  background:#f1f1f1;
  border: 1px solid #f1f1f1;
  padding: 20px !important;
  
}
.br-10{border-radius: 10px;border: 2px solid #a0a0a0;}
.template-image {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px;
  height: 190px;
}
.image-text {
  display: flex;
    justify-content: space-between;
}
.template-image {
  width: 300px;
  height: 300px;
  background: #f1f1f1;
  margin: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.drop-zone {
  margin-bottom: 10px;
}
.drag-el {
 
  cursor: all-scroll;
}
.drag-el>h3{font-size:12px}
.slides {
  cursor: pointer;
  padding: 40px 0px;
  background: #f7f7f7;
  border-bottom: 1px solid #dde1ea;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.created-slides {
  height: 100vh;
  overflow-y: scroll;
}
.link{cursor: pointer;}
.bl {border-left: 1px solid #e2e6ef;}
.nav-item>a{font-size:12px !important}
</style>
