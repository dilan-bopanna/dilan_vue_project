<template>
    <div>
        <FlashMessage :position="'right top'"></FlashMessage>
        <transition name="fade" mode="out-in" appear>
            <div class="h-100">
                <b-row class="h-100 no-gutters">
                    <b-col
                        lg="12"
                        md="12"
                        class="h-100 d-flex bg-white justify-content-center align-items-center"
                    >
                        <b-col
                            lg="9"
                            md="10"
                            sm="12"
                            class="mx-auto app-login-box"
                        >
                            <div
                                style="
                  display: flex;
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                "
                            >
                                <div>
                                    <h4 class="mb-0">
                                        <!-- <img
                                            src="@/assets/images/home-login.png"
                                            style="width: 100%"
                                        /> -->
                                    </h4>
                                    <!-- <div class="font-login">Create Account</div> -->
                                </div>
                            </div>

                            <!-- <div class="divider" /> -->

                            <div>
                                <v-form v-model="valid">
                                    <v-container>
                                        <v-row>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pt-0 pb-0"
                                            >
                                                <v-text-field
                                                    v-model="details.email"
                                                    :rules="emailRules"
                                                    @keyup.enter="login"
                                                    v-bind:label="$t('email')"
                                                    required
                                                ></v-text-field>
                                                <div
                                                    class="v-messages__message"
                                                   
                                                >
                                                    {{ message }}
                                                </div>
                                            </v-col>
                                            <v-col
                                                cols="12"
                                                md="6"
                                                class="pt-0 pb-0"
                                            >
                                                <v-text-field
                                                    v-model="details.password"
                                                    :append-icon="
                                                        show1
                                                            ? 'mdi-eye'
                                                            : 'mdi-eye-off'
                                                    "
                                                    :rules="fieldRules"
                                                    :type="
                                                        show1
                                                            ? 'text'
                                                            : 'password'
                                                    "
                                                    name="input-10-1"
                                                    v-bind:label="
                                                        $t('password')
                                                    "
                                                    @keyup.enter="login"
                                                    counter
                                                    @click:append="
                                                        show1 = !show1
                                                    "
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                        <!-- <b-form-checkbox name="check" id="exampleCheck"
                      >{{$t('keep_me_logged_in')}}</b-form-checkbox
                    > -->

                                        <button
                                            :disabled="!valid || btnloading"
                                            type="button"
                                            @click="login"
                                            class="btn btn-primary w-100 mt-4"
                                        >
                                            {{ $t("sign_in") }}
                                            <b-spinner
                                                small
                                                v-if="btnloading"
                                            ></b-spinner>
                                        </button>
                                        <div
                                            class="d-flex align-items-center space-between"
                                        >
                                           
                                           
                                        </div>
                                    </v-container>
                                </v-form>
                            </div>
                        </b-col>
                    </b-col>
                </b-row>
            </div>
        </transition>
    </div>
</template>
<script>
//import Slick from "vue-slick";
import { mapGetters } from "vuex";// import axios from "axios";
import axios from "axios";
export default {
    components: {
        // Slick,
    },

    data: () => ({
        user: "",
        details: {
            email: "",
            password: ""
            //  userrole:["Institute","SuperUser"],
        },
        valid:true,
        userdata: "",
        message:"",

    }),
    computed: {
        fieldRules() {
            return [v => !!v || this.$t("field_required")];
        },

        emailRules() {
            return [
                v => !!v || this.$t("email_required"),
                v => /.+@.+/.test(v) || this.$t("email_valid")
            ];
        },

        ...mapGetters(["errors"])
    },

    mounted() {
    this.$store.commit("setErrors", {});
    },

    methods: {
       login(){
        //  alert('login')
            axios.post(process.env.VUE_APP_API_URL + 'Login',this.details).then(response=>
            {
              // console.log('response.data.......');
              // console.log(response.data);
                this.message = response.data.message;
                // alert(response.data.status)
                  if(response.data.status=='S'){
                    localStorage.setItem('user',JSON.stringify(response.data.userdata));
                    this.$router.push({
                    name: "deptreport"
                  });
                }else{
                  // alert('fail')
                   this.$router.push({
                    name: "login"
                  });
                  this.message = response.data.message;
                }
               
            });
        },
        // ...mapActions("auth", ["sendLoginRequest"]),

        // login: function() {
        //   alert('login')
        //     this.sendLoginRequest(this.details).then(() => {
        //         this.user = JSON.stringify(localStorage.getItem("user"));
        //         console.log('this.user...........');
        //         console.log(this.user);
        //         if(this.user){
        //             this.$router.push({
        //             name: "deptreport"
        //         });
        //         }else{
        //           alert('login failed')
        //         }
              
        //         // setTimeout(() => window.location.reload(),1200);
        //     });
        // }
    }
};
</script>

<style>
.v-messages__message,
.v-text-field--is-booted .error--text {
    color: red;
}

.d-flex {
    display: flex !important;
    align-items: center;
    justify-content: center;
    background: #fff;
}
</style>
