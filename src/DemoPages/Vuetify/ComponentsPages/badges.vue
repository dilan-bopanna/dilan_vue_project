<template>
  <div>
    <page-title :heading="heading" :subheading="subheading"></page-title>
    <layout-wrapper>
      <demo-card heading="Tabs" subheading="Any element can be used with a badge.">
        <badge4></badge4>
      </demo-card>
      <demo-card heading="Dynamic notifications" subheading="The badge will overlap its content when using the overlap prop">
        <badge3></badge3>
      </demo-card>
      <demo-card heading="Customization options" subheading="The badge can use all of the currently supported icon sets.">
        <badge1></badge1>
      </demo-card>
    </layout-wrapper>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle2.vue";
import LayoutWrapper from "../../../Layout/Components/LayoutWrapper";
import DemoCard from "../../../Layout/Components/DemoCard";

import badge1 from "../Components/badges/custom";
import badge3 from "../Components/badges/dynamicNotification";
import badge4 from "../Components/badges/tabs";

export default {
  components: {
    PageTitle,
    "layout-wrapper": LayoutWrapper,
    "demo-card": DemoCard,

    badge1,
    badge3,
    badge4
  },
  data: () => ({
    heading: "Badge",
    subheading:
      "The v-badge component can wrap any type of content to highlight information to a user or to just draw attention to a specific element.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {}
};
</script>
