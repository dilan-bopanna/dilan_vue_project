<template>
  <div>
    <page-title :heading="heading" :subheading="subheading"></page-title>
    <layout-wrapper>
      <demo-card heading="App bar" subheading="An App bar is the primary toolbar of your application. It can contain icons, menus and more.">
        <toolbars2></toolbars2>
      </demo-card>
      <demo-card heading="Column width with hierarchy" subheading="Toolbars come in 2 variants, light and dark. Light toolbars have dark tinted buttons and dark text whereas Dark toolbars have white tinted buttons and white text.">
        <toolbars5></toolbars5>
      </demo-card>
      <demo-card heading="Flexible toolbar and card toolbar" subheading="With a few custom styles, you can easily create your amazing user interfaces.">
        <toolbars6></toolbars6>
      </demo-card>
      <demo-card heading="Floating with search" subheading="A floating toolbar can be placed over the content that it references.">
        <toolbars7></toolbars7>
      </demo-card>
      <demo-card heading="Variations" subheading="An app-bar has multiple variations that can be applied with themes and helper classes. These range from light and dark themes, colored and transparent.">
        <toolbars8></toolbars8>
      </demo-card>
      <demo-card heading="Prominent toolbars" subheading="Prominent toolbars add a slot where you can placed elements in the extended area. The content and extension areas will be locked to 64px in height.">
        <toolbars9></toolbars9>
      </demo-card>
      <demo-card heading="Dense toolbars" subheading="Dense toolbars reduce their height to 48px. This is also the default behavior for mobile landscape orientation.">
        <toolbars10></toolbars10>
      </demo-card>
      <demo-card heading="Scrolling techniques" subheading="A toolbar can transition off screen when scrolling. Here we demonstrate how you can specify the scroll target (default is window). Keep in mind, for this example there is special markup that will not be required in your application.">
        <toolbars11></toolbars11>
      </demo-card>
      <demo-card heading="App bar with menu" subheading="You can add menu components to a toolbar.">
        <toolbars12></toolbars12>
      </demo-card>
      <demo-card heading="System bars - status/window" subheading="System bars are useful for notification icons on mobile and desktop. For live examples of these, head to the pre-defined layouts.">
        <toolbars13></toolbars13>
      </demo-card>
    </layout-wrapper>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle2.vue";
import LayoutWrapper from "../../../Layout/Components/LayoutWrapper";
import DemoCard from "../../../Layout/Components/DemoCard";

import toolbars2 from "../Components/toolbars/appBar";
import toolbars5 from "../Components/toolbars/columnWidthWithHierarchy";
import toolbars6 from "../Components/toolbars/flexibleAndCard";
import toolbars7 from "../Components/toolbars/floatingWithSearch";
import toolbars8 from "../Components/toolbars/variations";
import toolbars9 from "../Components/toolbars/prominent";
import toolbars10 from "../Components/toolbars/dense";
import toolbars11 from "../Components/toolbars/scrolling";
import toolbars12 from "../Components/toolbars/appBarMenu";
import toolbars13 from "../Components/toolbars/systemBarsStatusWindow";

export default {
  components: {
    PageTitle,
    "layout-wrapper": LayoutWrapper,
    "demo-card": DemoCard,

    toolbars2,
    toolbars5,
    toolbars6,
    toolbars7,
    toolbars8,
    toolbars9,
    toolbars10,
    toolbars11,
    toolbars12,
    toolbars13
  },
  data: () => ({
    heading: "Toolbar",
    subheading:
      "The v-toolbar component is pivotal to any gui, as it generally is the primary source of site navigation. The toolbar component works great in conjunction with a navigation drawer for hiding links and presenting an activator to open the sidebar on mobile.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {}
};
</script>
