<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="departments.name"
      :rules="nameRules"
      label="Department Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="departments.description"
      :rules="nameRules"
      label="Description"
      required
    ></v-text-field>
<!-- 
    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select> -->


    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="saveDept()"
    >
      Save
    </v-btn>

    <v-btn
      @click="cancel"
    >
      Cancel
    </v-btn>
  </v-form>
</template>
<script>
import axios from "axios";
  export default {
    data: () => ({
      valid: true,
      name: '',
      message:"",
      departments:{
          id:0,
          name:"",
          description:"",
      },
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
    }),
    watch:{
        "$route.params.id":{
          
            immediate:true,
            handler(){
                if(this.$route.params.id){
                    axios.get(process.env.VUE_APP_API_URL + 'fetch_dept_byid/'+this.$route.params.id).then((res)=>
                    {
                        this.message = res.data.message;
                        if(res.data.status == 'S'){
                            this.departments = res.data.Department_data;
                        }else{
                            console.log('error');
                        }
                    });
                }
            }
        }
    },
    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      saveDept(){

            axios.post(process.env.VUE_APP_API_URL + 'save_dept',this.departments).then((res)=>
            {
                this.message = res.data.message;
                if(res.data.status == 'S'){
                    this.$router.push({
                        name:"section_amend",
                    });
                }else{
                    console.log('error');
                }
            })
          
      },
      cancel(){
        this.$router.push({
            name:"section_amend",
        });
      }
    },
  }
</script>
