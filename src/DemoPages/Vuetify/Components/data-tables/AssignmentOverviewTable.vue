<template>
  <v-data-table
    :headers="dessertHeaders"
    :items="desserts"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    show-expand
    class="elevation-1"   
 @click:row="(item, slot) => slot.expand(!slot.isExpanded)"
  >
    <template v-slot:top>
      <v-toolbar flat>
   <i class="pe-7s-back bk" @click="showOutsandingAssignments"></i>&nbsp;
        <v-toolbar-title>      Expandable Table</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
      
    </template>
   
    <template v-slot:expanded-item="{ headers }">
    <td :colspan="headers.length">
          <table class="table-bordered stud-tab">
     <thead class="stud-details">
     <th class="hea">Name</th>
     <th class="hea">Assigned Date</th>
     <th class="hea">Action</th>
     </thead>
     <tbody>
     <tr>
     <td class="text-center">Amal	el Moussaif</td>
     <td class="text-center">19 Nov 2020</td>
     <td class="text-center">
     <button type="button" class="btn mr-2 mb-2 mt-2 btn-pill btn-hover-shine btn-transition btn-danger"> Alert</button></td>
     </tr>
      <tr>
     <td class="text-center">Andrea	Procopio</td>
     <td class="text-center">19 Nov 2020</td>
     <td class="text-center">
     <button type="button" class="btn mr-2 mb-2 mt-2 btn-pill btn-hover-shine btn-transition btn-danger"> Alert</button></td>
     </tr>
      <tr>
     <td class="text-center">Beatrice	Bruto</td>
     <td class="text-center">19 Nov 2020</td>
     <td class="text-center">
     <button type="button" class="btn mr-2 mb-2 mt-2 btn-pill btn-hover-shine btn-transition btn-danger"> Alert</button></td>
     </tr>
      <tr>
     <td class="text-center">Carola	Schiavini</td>
     <td class="text-center">19 Nov 2020</td>
     <td class="text-center">
     <button type="button" class="btn mr-2 mb-2 mt-2 btn-pill btn-hover-shine btn-transition btn-danger"> Alert</button></td>
     </tr>
      <tr>
     <td class="text-center">Gilberto	Vignati</td>
     <td class="text-center">19 Nov 2020</td>
     <td class="text-center">
     <button type="button" class="btn mr-2 mb-2 mt-2 btn-pill btn-hover-shine btn-transition btn-danger"> Alert</button></td>
     </tr>
     </tbody>
    </table>
      </td>
     
    </template>
    
  </v-data-table>
</template>
<script>
  export default {
    data () {
      return {
        expanded: [],
        singleExpand: true,
        dessertHeaders: [
          {
            text: 'Class (Sec)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Assignment', value: 'calories' },
          { text: 'Due Date', value: 'fat' },
          { text: 'Pending', value: 'carbs' },
          { text: '', value: 'data-table-expand' },
        ],
        desserts: [
          {
            name: 'Science (1A)',
            calories: "A Review of Recent Developments in Materials and Devices for Different Potential Applications",
            fat: "07 Nov 2020",
            carbs: "Alert",
           
          },
          {
            name: 'Science (2A)',
            calories: "Chemical reactions and stoichiometry",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Science (3A)',
            calories: "Enzyme-Responsive Peptide-Based AIE Bioprobes",
            fat: "07 Nov 2020",
            carbs: "Alert",
           
          },
          {
            name: 'Science (1B)',
            calories: "Chemical reactions and stoichiometry",
            fat:"07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Science (2B)',
            calories: "Molecules",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Science (3B)',
            calories: "Bioenergy to Fuel Next-Generation Devices",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Maths (1A)',
            calories: "Geometry and topology",
            fat: "07 Nov 2020",
            carbs: "Alert",
          
          },
          {
            name: 'Maths (2A)',
            calories: "Dynamical systems and differential equations",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Maths (3A)',
            calories: "Information theory and signal processing",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
          {
            name: 'Maths (4A)',
            calories: "General concepts",
            fat: "07 Nov 2020",
            carbs: "Alert",
            
          },
        ],
      }
    },
     methods: {
   showOutsandingAssignments(val){
  if (val == "overview") {
                
                document.getElementById("assign-overview").classList.remove("show");
                document.getElementById("outstand-assign-details").classList.remove("hide");
                document.getElementById("assign-overview").classList.add("hide");
                document.getElementById("outstand-assign-details").classList.add("show");

            } else {
                document.getElementById("assign-overview").classList.remove("hide");
                document.getElementById("outstand-assign-details").classList.remove("show");
                
                document.getElementById("assign-overview").classList.add("show");
                document.getElementById("outstand-assign-details").classList.add("hide");
            }
  
},
    handleClick(newTab) {
      this.currentTab = newTab;
    },
    onReady: function(instance) {
      const that = this;
      instance.update(that.endVal + 100);
    }
  }
  }
</script>
<style scoped>
.stud-details>th{ width: 200px;text-align: center;}
.stud-tab{margin: 30px;}
.bk {
    font-size: 25px;
    padding-right: 14px;
    cursor:pointer;
}
.show {
    display:  flex !important;
}

.hide {
    display: none !important;
}

.hea{height: 44px;background: #e8e8eb;}
</style>