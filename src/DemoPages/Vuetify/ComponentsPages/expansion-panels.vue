<template>
  <div>
    <page-title :heading="heading" :subheading="subheading"></page-title>
    <layout-wrapper>
      <demo-card heading="Basic" subheading="Accordion expansion-panels can only have 1 panel open at a time.">
        <expanel1></expanel1>
      </demo-card>
      <demo-card heading="Readonly" subheading="readonly prop does the same thing as disabled, but it doesn't touch styles.">
        <expanel2></expanel2>
      </demo-card>
      <demo-card heading="External control" subheading="Expansion panels can be controlled externally by modifying the v-model. Its value corresponds to a zero-based index of the currently opened expansion panel content.">
        <expanel3></expanel3>
      </demo-card>
      <demo-card heading="Disabled" subheading="Both the expansion-panel and its content can be disabled using the disabled prop..">
        <expanel4></expanel4>
      </demo-card>
      <demo-card heading="Popout" subheading="The expansion-panel also has popout design. With it, expansion-panel is enlargened when activated.">
        <expanel5></expanel5>
      </demo-card>
      <demo-card heading="Inset" subheading="inset expansion-panel becomes smaller when activated..">
        <expanel8></expanel8>
      </demo-card>
      <demo-card heading="Icon slot" subheading="Expand action icon can be customized using actions slot.">
        <expanel6></expanel6>
      </demo-card>
      <demo-card heading="Focusable" subheading="The expansion-panel headers can be made focusable with the prop focusable.">
        <expanel7></expanel7>
      </demo-card>
    </layout-wrapper>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle2.vue";
import LayoutWrapper from "../../../Layout/Components/LayoutWrapper";
import DemoCard from "../../../Layout/Components/DemoCard";

import expanel1 from "../Components/expansion-panels/usage";
import expanel2 from "../Components/expansion-panels/expand";
import expanel3 from "../Components/expansion-panels/external";
import expanel4 from "../Components/expansion-panels/disabledAndReadonly";
import expanel5 from "../Components/expansion-panels/popout";
import expanel6 from "../Components/expansion-panels/iconSlot";
import expanel7 from "../Components/expansion-panels/focusable";
import expanel8 from "../Components/expansion-panels/inset";


export default {
  components: {
    PageTitle,
    "layout-wrapper": LayoutWrapper,
    "demo-card": DemoCard,

    expanel1,
    expanel2,
    expanel3,
    expanel4,
    expanel5,
    expanel6,
    expanel7,
    expanel8
  },
  data: () => ({
    heading: "Expansion Panel",
    subheading:
      "The v-expansion-panel component is useful for reducing vertical space with large amounts of information.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {}
};
</script>
