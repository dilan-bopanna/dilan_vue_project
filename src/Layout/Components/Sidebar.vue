<template>
  <div
    :class="sidebarbg"
    class="app-sidebar sidebar-shadow"
    @mouseover="toggleSidebarHover('add', 'closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove', 'closed-sidebar-open')"
  >
    <div class="app-header__logo">
    
      <div class="header__pane ml-auto">
        <button
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
          v-bind:class="{ 'is-active': isOpen }"
          @click="toggleBodyClass('closed-sidebar')"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </div>
    <!-- {{menu}} -->
    <!-- <div> -->
      <!-- <div > -->
    <div class="app-sidebar-content" style="overflow-y:scroll;overflow-x:hidden">
      <sidebar-menu showOneChild :menu="menu" />
    </div>
   <div > 
    <div class="pb-2" style="position: relative; background-color: #fff;display:flex" >
      <span class="mt-2">
      </span>
      <span class="img-responsive">
       
      </span>
    </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from "vue-sidebar-menu";
export default {
  components: {
    SidebarMenu,
  },

  computed: {
      menu(){
        return [
            {
               href: "/",
               title: "Sections",
            },
           
            {
               href: "/testcasereport",
               title: "Test Cases",
            },
          
          ]
        }
        },

  data() {
    return {
      isOpen: false,
      sidebarActive: false,
      language: "",
      org_id: 0,
      instance_filepath_url: process.env.VUE_APP_API_URL_STAFF_FILEPATH,
      organisation_data: {},
      date_format:"",
      collapsed: true,
      windowWidth: 0,
    };
  },
  props: {
    sidebarbg: String,
  },

  created() {


    this.language = localStorage.getItem("selected");
    
  },
  methods: {
   
    toggleBodyClass(className) {
      const el = document.body;
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    },
    toggleSidebarHover(add, className) {
      const el = document.body;
      this.sidebarActive = !this.sidebarActive;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth > "992") {
        if (add === "add") {
          el.classList.add(className);
        } else {
          // el.classst.remove(className);
        }
      }
    },
    getWindowWidth() {
      const el = document.body;

      this.windowWidth = document.documentElement.clientWidth;

      if (this.windowWidth < "1200") {
        el.classList.add("closed-sidebar", "closed-sidebar-md");
      } else {
        el.classList.remove("closed-sidebar", "closed-sidebar-md");
      }
    },
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      // this.getWindowWidth();
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
};
</script>
<style scoped>
.v-sidebar-menu .vsm-arrow:after {
  margin-left: 20px;
}

.txt-sidebar-image {
  /* margin-left: 50px;
  margin-top: -55px; */
  font-family: roboto;
  font-size: 25px;

}
.sidebar-image-para {
  margin-left: 39px;
  font-size: 11px;
}
.v-sidebar-menu .vsm-link:active{
  color: aqua!important;
  background-color: black!important;
}
.logo_img{
  max-height: 21px;
}
.app-logo {
    display: flex;
    background-repeat: no-repeat;
}
</style>
