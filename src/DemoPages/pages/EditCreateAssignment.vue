<template>
<div>
    <page-title :heading="heading" :subheading="subheading" :icon="icon"></page-title>
    <div class="row">
        <div class="col-lg-12">
            <div class="main-card mb-3 card">
                <div class="card-body">
                    <h5 class="card-title">Work in ssprogress</h5>
                </div>
            </div>
        </div>
    </div>

</div>
</template>

<script>
import PageTitle from "../../Layout/Components/PageTitle.vue";

export default {
    components: {

        PageTitle
    },
    data: () => ({
        heading: "Course Planning",
        subheading: "Plan activities for the assigned subjects.",
        icon: "pe-7s-rocket icon-gradient bg-malibu-beach",

    }),

    methods: {
        onReady: function (instance) {
            const that = this;
            instance.update(that.endVal + 100);
        }
    }
};
</script>
