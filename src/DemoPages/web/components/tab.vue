<template>
  <div style="display: flex;justify-content: space-between;align-items: baseline;">
  <!--Tabs part-->
  <div>
          <tabs :tabs="tabs" :currentTab="currentTab" :wrapper-class="'body-tabs shadow-tabs'"
          :tab-class="'tab-item'" :tab-active-class="'tab-item-active'"
          :line-class="'tab-item-line'" @onClick="handleClick" />
        <div class="content">
          <div v-if="currentTab === 'tab1'">
       
          </div>
        
        </div>
  </div>
  <!--Tabs part-->
  <!--Action Drop Down part-->
  
      <div class="btn-actions-pane-right text-capitalize actions-icon-btn">
              <b-dropdown toggle-class="btn-icon btn-icon-only" right variant="link" no-caret>
                <span slot="button-content">
                  <i class="pe-7s-menu btn-icon-wrapper"></i>
                </span>
                <ul class="nav flex-column">
                  <li class="nav-item-header nav-item">Activity</li>
                  <li class="nav-item">
                    <a class="nav-link"> Last 7 days </a>
                  </li>
                 <li class="nav-item">
                    <a class="nav-link"> Last 4 weeks </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link"> Last 3 months </a>
                  </li>
                 
                </ul>
              </b-dropdown>
            </div>
    
  <!--Action Drop Down part-->
</div>
</template>

<script>
import Tabs from "vue-tabs-with-active-line";

const TABS = [
  {
    title: "Overview",
    value: "tab1"
  }
];

export default {
  components: {
    Tabs
  },
  data: () => ({
    heading: "Tabs",
    subheading:"Tabs",
    icon: "pe-7s-drawer icon-gradient bg-happy-itmeo",

    tabs: TABS,
    currentTab: "tab1"
  }),

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    }
  }
};
</script>
