 <template>
 <div>
 <!--Error Message Start-->
  <v-alert :value="success" border="left" close-text="Close Alert" color="success accent-4" dark dismissible v-if="success">
    {{ response_message }}
  </v-alert>
  <v-alert :value="error" lnr-warning border="left" close-text="Close Alert" color="error accent-4" dark dismissible v-if="!success">
     {{ response_message }}
  </v-alert>
    <!-- {{success}} {{error}} -->
<!--Error Message End--> 
 </div>
</template>
<script>

    export default {
        components: { },
        props:['response_message','success','error'],
        data: () => ({     
           is_success:false,       
           is_error:false,       
        }),
       
       
        methods: { }
    };

</script>
