<template>
  <div>
    <page-title :heading="heading" :subheading="subheading"></page-title>
    <layout-wrapper>
      <demo-card heading="Basic" subheading="The standard data-table will by default render your data as simple rows.">
        <datatable1></datatable1>
      </demo-card>
      <demo-card  heading="Selectable rows" subheading="The show-select prop will render a checkbox in the default header to toggle all rows, and a checkbox for each default row. You can customize these with the slots header.data-table-select and item.data-table-select respectively. You can also switch between allowing multiple selected rows at the same time or just one with the single-select prop.">
        <datatable9></datatable9>
      </demo-card>
      <demo-card  heading="Grouped rows" subheading="Using the group-by and group-desc props you can group rows on an item property. The show-group-by prop will show a group button in the default header. You can use the groupable property on header items to disable the group button.">
        <datatable15></datatable15>
      </demo-card>
      <demo-card  heading="Sort on multiple columns" subheading="Using the multi-sort prop will enable you to sort on multiple columns at the same time. When enabled, you can pass arrays to both sort-by and sort-desc to programmatically control the sorting, instead of single values.">
        <datatable16></datatable16>
      </demo-card>
      <demo-card  heading="Remove default header and footer" subheading="You can apply the hide-default-header and hide-default-footer props to remove the default header and footer respectively.">
        <datatable17></datatable17>
      </demo-card>
      <demo-card  heading="Dense" subheading="Using the dense prop you are able to give your data tables an alternate style.">
        <datatable18></datatable18>
      </demo-card>
      <demo-card  heading="Footer props" subheading="The v-data-table renders a default footer using the v-data-footer component. You can pass props to this component using footer-props.">
        <datatable19></datatable19>
      </demo-card>
      <demo-card  heading="Filterable columns" subheading="You can easily disable specific columns from being included when searching through table rows by setting the property filterable to false on the header item(s). In the example below the dessert name column is no longer searchable.">
        <datatable20></datatable20>
      </demo-card>
      <demo-card  heading="Simple Checkbox" subheading="When wanting to use a checkbox component inside of a slot template in your data tables, use the v-simple-checkbox component rather than the v-checkbox component. The v-simple-checkbox component is used internally and will respect header alignment.">
        <datatable21></datatable21>
      </demo-card>
      <demo-card  heading="Expandable rows" subheading="The show-expand prop will render an expand icon on each default row. You can customize this with the item.data-table-expand slot. The position of this slot can be customized by adding a column with value: 'data-table-expand' to the headers array. You can also switch between allowing multiple expanded rows at the same time or just one with the single-expand prop. The expanded rows are available on the synced prop expanded.sync">
        <datatable22></datatable22>
      </demo-card>
      <demo-card  heading="Custom filtering" subheading="You can override the default filtering used with search prop by supplying a function to the custom-filter prop. If you need to customize the filtering of a specific column, you can supply a function to the filter property on header items. The signature is (value: any, search: string | null, item: any) => boolean. This function will always be run even if search prop has not been provided. Thus you need to make sure to exit early with a value of true if filter should not be applied.">
        <datatable23></datatable23>
      </demo-card>
      <demo-card  heading="Customizing default header" subheading="You can use the dynamic slots header.<name> to customize only certain columns. <name> is the name of the value property in the corresponding header item sent to headers.">
        <datatable24></datatable24>
      </demo-card>
      <demo-card  heading="Customizing default rows" subheading="You can use the dynamic slots item.<name> to customize only certain columns. <name> is the name of the value property in the corresponding header item sent to headers. So to customize the calories column we're using the item.calories slot.">
        <datatable25></datatable25>
      </demo-card>
      <demo-card heading="Slot: progress" subheading="There is also a progress slot for when you want to customize the display for the data table's loading state. By default this is an indeterminate v-progress-linear">
        <datatable5></datatable5>
      </demo-card>
      <demo-card heading="Search with custom no-results slot" subheading="The data table exposes a search prop that allows you to filter your data.">
        <datatable10></datatable10>
      </demo-card>
      <demo-card heading="External pagination" subheading="Pagination can be controlled externally by using the pagination prop. Remember that you must apply the .sync modifier.">
        <datatable11></datatable11>
      </demo-card>
      <demo-card heading="External sorting" subheading="Sorting can also be controlled externally by using the pagination prop. Remember that you must apply the .sync modifier. You can also use the prop to set the default sorted column.">
        <datatable12></datatable12>
      </demo-card>
      <demo-card heading="CRUD Actions" subheading="data-table with CRUD actions using a v-dialog component for editing each row">
        <datatable14></datatable14>
      </demo-card>
    </layout-wrapper>
  </div>
</template>

<script>
import PageTitle from "../../../Layout/Components/PageTitle2.vue";
import LayoutWrapper from "../../../Layout/Components/LayoutWrapper";
import DemoCard from "../../../Layout/Components/DemoCard";
import datatable1 from "../Components/data-tables/usage";
import datatable5 from "../Components/data-tables/progress";
import datatable9 from "../Components/data-tables/select";
import datatable10 from "../Components/data-tables/search";
import datatable11 from "../Components/data-tables/paginate";
import datatable12 from "../Components/data-tables/sort";
import datatable14 from "../Components/data-tables/crud";
import datatable15 from "../Components/data-tables/groupRow";
import datatable16 from "../Components/data-tables/SortOnMultipleColumns";
import datatable17 from "../Components/data-tables/noHeaderFooter";
import datatable18 from "../Components/data-tables/dense";
import datatable19 from "../Components/data-tables/footerProps";
import datatable20 from "../Components/data-tables/filterColom";
import datatable21 from "../Components/data-tables/simpleCheckbox";
import datatable22 from "../Components/data-tables/expandableRows";
import datatable23 from "../Components/data-tables/customFiltering";
import datatable24 from "../Components/data-tables/customizingDefaultHeader";
import datatable25 from "../Components/data-tables/customizingDefaultRows";


export default {
  components: {
    PageTitle,
    "layout-wrapper": LayoutWrapper,
    "demo-card": DemoCard,

    datatable1,
    datatable5,
    datatable9,
    datatable10,
    datatable11,
    datatable12,
    datatable14,
    datatable15,
    datatable16,
    datatable17,
    datatable18,
    datatable19,
    datatable20,
    datatable21,
    datatable22,
    datatable23,
    datatable24,
    datatable25
  },
  data: () => ({
    heading: "Data table",
    subheading:
      "The v-data-table component is used for displaying tabular data. Features include sorting, searching, pagination, inline-editing, header tooltips, and row selection.",
    icon: "pe-7s-plane icon-gradient bg-tempting-azure"
  }),

  methods: {}
};
</script>
