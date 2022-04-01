<template>
  <div>
    <page-title :heading="heading" :subheading="subheading"></page-title>
    <layout-wrapper>
      <demo-card heading="Size" subheading="An avatar also accepts the v-icon component or text. Mix and match functionality to create something unique.">
        <avatars2></avatars2>
      </demo-card>
      <demo-card heading="Default slot" subheading="An avatar also accepts the v-icon component or text. Mix and match functionality to create something unique.">
        <avatars3></avatars3>
      </demo-card>
      <demo-card heading="Advanced usage" subheading="The avatar has a dynamic size that can be scaled for any situation. A tile variation is available for displaying an avatar without border radius.">
        <avatars1></avatars1>
      </demo-card>
    </layout-wrapper>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle2.vue";
import LayoutWrapper from "../../../Layout/Components/LayoutWrapper";
import DemoCard from "../../../Layout/Components/DemoCard";

import avatars1 from "../Components/avatars/usage";
import avatars2 from "../Components/avatars/size";
import avatars3 from "../Components/avatars/iconAndText";

export default {
  components: {
    PageTitle,
    "layout-wrapper": LayoutWrapper,
    "demo-card": DemoCard,

    avatars1,
    avatars2,
    avatars3
  },
  data: () => ({
    heading: "Avatar",
    subheading:
      "The v-avatar component is used to control the size and border radius of responsive images, typically used to show profile pictures.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {}
};
</script>
