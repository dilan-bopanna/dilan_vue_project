<template>
<div>
    <!-- <br>{{selectedallocation}} -->
 <div class="top-selection">
     <v-select
                v-model="selectedallocation"
                @change="selectedAllocation(selectedallocation)"
                item-value="id"
                dense
                return-object
                solo
                item-text="class_name"
                :items="parent_details"
                v-bind:label="$t('select_children')"
                class="mt-2 ml-4"
              >
                <template slot="selection" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                  </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                </template>
     </v-select>
  <!-- <v-select v-model="selectedallocation"
  item-value="id" item-text="class_name"  
          dense
          solo :items="parent_details" label="Select Class" style="width:180px">
   <template slot="selection"  slot-scope="data" >
        <span>{{ data.item.firstname }} {{data.item.lastname}} </span>
    </template>
    <template slot="item" slot-scope="data">
       <span> {{ data.item.firstname }} {{data.item.lastname}}  </span>
    </template>
  </v-select> -->
   </div>
        <!-- Vue Template HTML Markup -->

        </div>
</template>
<script>
 import axios from "axios";

   export default {
      props:["selected_std"],
     components: {
     
     },
     data: () => ({
        selectedallocation:'',
        parent_details:[],
        // arr_all:[{
        //    "id": "",
        //     "subject_name": "All",
        //     "class_name": "",
        //     "section": "",
        //     "color_code": ""
        // }],
        //primes : arr1.concat(allocations),
        sub: "All",
     }),
     watch:{
       selected_std:{
          immediate: true,
          handler() {
          this.selectedAllocation(this.selected_std);
          this.selectedallocation = this.selected_std;
           }
        
       }
     },
     computed:{
       arr_all(){
         return [{
           "id": "",
            "subject_name": this.$t('all'),
            "class_name": "",
            "section": "",
            "color_code": ""
         }]
       },

      },
        mounted(){
            this.user = JSON.parse(localStorage.getItem('user'));
            this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
            this.parent_id = this.user.emp_id;
            this.fetchDetails();
           
        },

     methods: {
         fetchDetails() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.parent_id,
          },
        })
        .then((res) => {
          this.parent_details = res.data.all_children;
          this.selectedallocation = res.data.all_children[0];
          this.selectedAllocation(this.selectedallocation);
          this.loader=false; 
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },
       selectedAllocation(allocationobj){
           console.log(allocationobj)
           this.$emit('selected-allocation',allocationobj.student_id,allocationobj.class_id,allocationobj.section_id,allocationobj.firstname,allocationobj.lastname);
            localStorage.setItem("allocation", JSON.stringify(allocationobj));
       },
        Subject(val) {
         this.sub = val;
       },
     },
  
   };
</script>
<style scoped>
   .align-equal {
   background: #fff;
   display: flex;
   justify-content: space-between;
   align-items: center;
   }
   .link {
   cursor: pointer;
   }
   .np {
   padding: 0px;
   }
   .top-selection {
   display:flex;
   justify-content: flex-end;
   align-items: center;
   }
   .sub-button {
   background: rgb(247 185 36);
   color: #fff;
   transition: all 0.2s;
   padding: 8px 18px !important;
   border-radius: 5px;
   }
  
   .sub-button {
   background: rgb(247 185 36);
   color: #fff;
   transition: all 0.2s;
   padding: 8px 18px !important;
   border-radius: 5px;
   }
   
   
</style>

  