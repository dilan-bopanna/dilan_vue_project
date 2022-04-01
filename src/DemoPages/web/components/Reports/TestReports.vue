<template>
  <div>
    <!-- <FlashMessage :position="'right bottom'" ></FlashMessage> -->
    <!-- <v-toolbar-title>Email Templates - In Progress</v-toolbar-title>-->
    <div>
      <!-- {{studentdata}} -->
<!-- {{studentdata}} -->
          <v-form ref="form" v-model="valid">
          <v-layout class="ml-4 mt-4">
            <v-flex xs12 md5>
              <v-select
                v-model="selectedallocation"
                item-value="id"
                return-object
                outlined
                item-text="class_name"
                :items="child_details"
                v-bind:label="$t('select_children')"
                 class="pr-8"
                 @change="onChange()"
              >
                <template slot="selection" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                  </template>
                <template slot="item" slot-scope="data">
                    {{ data.item.firstname }} {{ data.item.lastname }}
                </template>
     </v-select>
            </v-flex>

            <v-flex xs12 md5>
              <v-select
                v-model="formdata.test_type"
                item-value="id"
                item-text="shortname"
                @change="fetchReportData(formdata.test_type)"
                :items="testtypes"
                v-bind:label="$t('test_type')"
                class="pr-8"
                required
                :rules="fieldRules"
                outlined
              >
                <template slot="selection" slot-scope="data">{{
                  data.item.shortname
                }}</template>
                <template slot="item" slot-scope="data">{{
                  data.item.shortname
                }}</template>
              </v-select>
            </v-flex>
          </v-layout>
    </v-form>
      </div>
    <v-app-bar flat color="white">
        
      <v-toolbar-title>{{ $t("test_report") }}</v-toolbar-title>
 
    
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
          
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-text-field
            v-on="on"
            v-model="search"
            append-icon="search"
            v-bind:label="$t('search')"
            single-line
            hide-details
          v-on:keyup="myFunction()"
            class="srch_bar"
             id="myInput"
          ></v-text-field>
        </template>
        <span>{{ $t("search") }}</span>
      </v-tooltip>
      <!-- <input type="text" id="myInput" v-on:keyup="myFunction()" placeholder="Search for names.."> -->
     <div  style="display:flex;" v-if="studentdata">
          <v-tooltip bottom>
        <template v-slot:activator="{ on }">
            <v-icon class="img_style"  @click="createPDF" v-on="on">lnr-printer</v-icon>
           </template>
        <span>{{ $t("print") }}</span>
      </v-tooltip>
       <!-- <v-tooltip bottom>
         <template v-slot:activator="{ on }">
          <download-excel :data="studentdata" :fields="json_fields" name="Studentreport.xls">
          <v-icon class="img_style cursor" v-on="on">lnr-download</v-icon>
          </download-excel>
           </template>
          <span>{{ $t("download") }}</span>
        </v-tooltip> -->
        <v-tooltip bottom v-if="studentdata">
          <template v-slot:activator="{ on }">
          <button style="padding-bottom: 9px;padding-left:22px" @click="exportTableToExcel('excel','student_report')" > <v-icon v-on="on">lnr-download</v-icon></button>
          </template>
          <span >{{ $t("download") }}</span>
        </v-tooltip>
    </div>

    </v-app-bar>
    <!-- <v-data-table
     id="print"
      :headers="headers"
      :items="studentdata"
      class="elevation-1"
      :search="search"
      :loading="initval"
      v-bind:no-data-text="$t('no_data_available')"
      :footer-props="{
        'items-per-page-text': $t('rows_per_page'),
      }"
    >

      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.studentdata.code }}</td>
          <td>{{ props.item.studentdata.firstname }} {{ props.item.studentdata.lastname }}</td>
          <td>{{ props.item.studentdata.total_marks }}  </td>
          <td>{{ props.item.studentdata.obtained_marks }}  </td>
          <td>{{ props.item.studentdata.score }}</td>
          <td>{{ props.item.studentdata.result }}</td>
        </tr>
      </template>
    </v-data-table> -->

                <div class="p-0 card-body" id='print' style="background-color: white;">
                 <div class="table-responsive">
                    
                   <span  class="d-block font-weight-normal text-capitalize mt-1 grey--text text-center p-4" v-if="!studentdata.length ">{{$t('no_details_found')}}</span>
            <table 
              class="align-middle mb-0 table table-bordered table-striped table-hover table-fixed" id='excel'
            >
              <thead v-if="studentdata.length">
                <tr>
                  <!-- <th>{{$t('reg_no')}}</th> -->
                  <th>{{$t('subject_name')}}</th>
                  <th>{{$t('total_marks')}} </th>
                  <th>{{$t('obtained_marks')}} </th>
                  <th v-if="studentdata[0].studentdata.grade_type=='pass/fail'">{{$t('percentage')}} </th>
                    <th v-else >{{$t('grade')}} </th>
                     <th v-if="studentdata[0].studentdata.grade_type=='cgpa'">{{$t('grade_points')}} </th>
                     <th v-if="studentdata[0].studentdata.grade_type!=='pass/fail'">{{$t('grade_defination')}} </th>
                  <th>{{$t('result')}} </th>
                </tr>
              </thead>

            <tbody>

                     <tr v-for="(student_report,index) in studentdata" :key="index">
    
                         <!-- <td >
                          <div > {{student_report.studentdata.code}}</div> 
                         </td> -->
 
                        <td >    
                          <div >{{student_report.studentdata.subject}} </div>  
                        </td>

                        <td>{{student_report.studentdata.total_marks}}  </td>
                          <td>{{student_report.studentdata.obtained_marks}}  </td>
                            <td v-if="studentdata[0].studentdata.grade_type=='pass/fail'">{{student_report.studentdata.score}}  </td>
                            <td v-else> {{student_report.studentdata.grade_name}} </td>
                            <td  v-if="studentdata[0].studentdata.grade_type=='cgpa'"> {{student_report.studentdata.grade_points}} </td>
                            <td  v-if="studentdata[0].studentdata.grade_type!=='pass/fail'"> {{student_report.studentdata.grade_defination}} </td>
                              <td>{{student_report.studentdata.result}}  </td>
            
                     </tr>
             </tbody>
         </table>
       </div>
            </div>
  </div>

  
</template>

<script>
import FlashMessage from "@smartweb/vue-flash-message";
import Vue from "vue";
import axios from "axios";
Vue.use(FlashMessage);
export default {
  data: () => ({
      json_fields: {
      'Register number': "studentdata.code",
      'Firstname' :"studentdata.firstname",
      'Lastname':"studentdata.lastname",
      'Total Marks':"studentdata.total_marks",
      'Obtained Marks':"studentdata.obtained_marks",
      'Percentage':"studentdata.score",
      'result':"studentdata.result"
    },
    search: "",
    shownote:true,
    dialog: false,
    email_templates: [],
    studentdata:[],
    initval: true,
    formdata:{
        allocation:"",
        test_type:"",
    },
    academic_year:"",
    user:"",
    selectedallocation:"",
    child_details:[],
    testtypes:[],
gradetype:[],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    headers() {
      return [
        // {
        //   text: this.$t("reg_no"),
        //   value: "studentdata.code",
        // },
        {
          text: this.$t("name"),
          value: "studentdata.firstname",
        },
         {
          text: this.$t("total_marks"),
          value: "studentdata.total_marks",
        },
         {
          text: this.$t("obtained_marks"),
          value: "studentdata.obtained_marks",
        },
        {
          text: this.$t("percentage"),
          value: "studentdata.score",
        },
        {
          text: this.$t("result"),
          value: "studentdata.result",
        },
        // {
        //   text: this.$t("status"),
        //   value: "status",
        // },
      ];
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    // this.initialize();
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.academic_year = JSON.parse(localStorage.getItem('academic_year'));
   //this.headers();
    this.fetchTestType();
    this.fetchStudent();
   // this.fetchReportData();
  },

  methods: {

    fetchStudent() {
       this.loader=true;
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "all_children_data",{
         params: {
            parentid:this.user.emp_id,
          },
        })
        .then((res) => {
          this.child_details = res.data.all_children;
          this.selectedallocation = res.data.all_children[0];
         // this.selectedAllocation(this.selectedallocation);
          this.loader=false; 
        })
        .catch((err) => {
        this.loader=false;
          console.log(err);
        });
    },
    testType(){
      this.formdata.test_type = "";
      this.studentdata = "";
    },
    fetchTestType(){
   //   this.shownote = false;
         axios
        .get(
          process.env.VUE_APP_API_URL_STAFF +
            "fetchlookup?lookup_type=TEST_TYPE"
        )
        .then((res) => {
          this.testtypes = res.data.lookup_details;
        })
        .catch((err) => {
          console.log("this error" + err);
        });
    },
    
    onChange(){
        this.studentdata=[];
        this.fetchReportData(this.formadata.test_type);
    },
    fetchReportData(testtype) {
      //this.shownote =false;
      // alert('test')
      this.studentdata = [];
      axios
        .get(process.env.VUE_APP_API_URL_STAFF + "student_multiple_testreport?student_id="+this.selectedallocation.student_id+'&test_type='+testtype)
        .then((res) => {
          this.studentdata = res.data.assignmentdata;
          this.initval = false;
        })
        .catch((err) => {
          this.initval = false;
          console.log(err);
        });
    },
      
    deleteItem(template_id) {
      if (confirm(this.$t("delete_confirmation"))) {
        axios
          .delete(
            process.env.VUE_APP_API_URL_STAFF + "emailtemplates/" + template_id
          )
          .then((res) => {
            if (Array.isArray(res.data.message)) {
              this.array_data = res.data.message.toString();
            } else {
              this.array_data = res.data.message;
            }
            if (res.data.status == "E") {
              this.flashMessage.error({
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
            } else {
              this.flashMessage.success({
                message: this.array_data,
                time: 4000,
                blockClass: "custom-block-class",
              });
              this.fetchEmailTemplates();
            }
          })
          .catch((err) => {
            console.log("this error" + err);
          });
      }
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
                createPDF() {
                var sTable = document.getElementById('print').innerHTML;
                var style = "<style>";
                style = style + "table {width: 100%;font: 17px Calibri;}";
                style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
                style = style + "padding: 2px 3px;text-align: center;}";
                style = style + "</style>";
                // CREATE A WINDOW OBJECT.
                var win = window.open('', '', 'height=700,width=700');
                win.document.write('<html><head>');
                win.document.write('<title>download</title>'); // <title> FOR PDF HEADER.
                win.document.write(style); // ADD STYLE INSIDE THE HEAD TAG.
                win.document.write('</head>');
                win.document.write('<body>');
                win.document.write(sTable); // THE TABLE CONTENTS INSIDE THE BODY TAG.
                win.document.write('</body></html>');
                win.document.close(); // CLOSE THE CURRENT WINDOW.
                win.print(); // PRINT THE CONTENTS.
            },

       exportTableToExcel(tableID, filename){
                //alert(tableID)
                var downloadLink;
                var dataType = 'application/vnd.ms-excel';
                var tableSelect = document.getElementById(tableID);
                var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
                
                // Specify file name
                filename = filename?filename+'.xls':'excel_data.xls';
                
                // Create download link element
                downloadLink = document.createElement("a");
                
                document.body.appendChild(downloadLink);
                
                if(navigator.msSaveOrOpenBlob){
                    var blob = new Blob(['\ufeff', tableHTML], {
                        type: dataType
                    });
                    navigator.msSaveOrOpenBlob( blob, filename);
                }else{
                    // Create a link to the file
                    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
                
                    // Setting the file name
                    downloadLink.download = filename;
                    
                    //triggering the function
                    downloadLink.click();
                }
            },
        // myFunction() {
        //     // Declare variables
        //     var input, filter, table, tr,td,  i, txtValue;
        //     input = document.getElementById("myInput");
        //     filter = input.value.toUpperCase();
        //     table = document.getElementById("excel");
        //     tr = table.getElementsByTagName("tr");
     

        //     // Loop through all table rows, and hide those who don't match the search query
        //     for (i = 0; i < tr.length; i++) {
        //       td = tr[i].getElementsByTagName("td")[0];
        //       if (td) {
        //         txtValue = td.textContent || td.innerText;
        //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //           tr[i].style.display = "";
        //         } else {
        //           tr[i].style.display = "none";
        //         }
        //       }
        //     }
        

    
        //   }

    myFunction() {
    var input = document.getElementById("myInput");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("excel");
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        if (tr[i].textContent.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }      
      }
}
  },
};
</script>
<style scoped>
.img_style{
  margin-right: 15px;
  width: 35px;
}

#myInput {
  background-image: url('/css/searchicon.png'); /* Add a search icon to input */
  background-position: 10px 12px; /* Position the search icon */
  background-repeat: no-repeat; /* Do not repeat the icon image */
  width: 100%; /* Full-width */
  font-size: 16px; /* Increase font-size */
  padding: 12px 20px 12px 40px; /* Add some padding */
  border: 1px solid #ddd; /* Add a grey border */
  margin-bottom: 12px; /* Add some space below the input */
}

#excel {
  border-collapse: collapse; /* Collapse borders */
  width: 100%; /* Full-width */
  border: 1px solid #ddd; /* Add a grey border */
  font-size: 18px; /* Increase font-size */
}

#excel th, #excel td {
  text-align: left; /* Left-align text */
  padding: 12px; /* Add padding */
}

#excel tr {
  /* Add a bottom border to all table rows */
  border-bottom: 1px solid #ddd;
}

#excel tr.header, #excel tr:hover {
  /* Add a grey background color to the table header and on hover */
  background-color: #f1f1f1;
}
</style>