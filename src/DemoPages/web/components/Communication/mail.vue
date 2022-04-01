<template>
  <div class="col-lg-12 p-0">
    <div class="app-inner-layout">

      <div class="app-inner-layout__wrapper">
       <iframe frameBorder="0" width="1000" src="http://192.168.1.40:8088/fetch-mail"></iframe>
        <!-- <div class="app-inner-layout__content card">
          <div>
            <div class="app-inner-layout__top-pane">
              <div class="pane-left">
                <div class="mobile-app-menu-btn">
                  <button type="button" class="hamburger hamburger--elastic"
                    v-bind:class="{ 'is-active' : isMobileOpen }" @click="toggleLayoutClass('open-mobile-menu')">
                    <span class="hamburger-box">
                      <span class="hamburger-inner"></span>
                    </span>
                  </button>
                </div>

                <h4 class="mb-0">{{$t('inbox')}}</h4>
                <b-dropdown toggle-class="btn-icon btn-icon-only dropdown-toggle-no-caret" menu-class="dropdown-menu-xs"
                  variant="link" no-caret>
                  <span slot="button-content">
                    <font-awesome-icon icon="angle-down" />
                  </span>

                  <ul class="nav" style="display:block">
                    <li class="nav-item ml-2 mb-1 link">{{$t('all')}}</li>
                    <li class="nav-item ml-2 mb-1 link">{{$t('none')}}</li>
                    <li class="nav-item  ml-2 mb-1 link">{{$t('read')}}</li>
                    <li class=" nav-item  ml-2 mb-1 link">{{$t('unread')}}</li>
                    <li class=" nav-item  ml-2 mb-1 link">{{$t('starred')}}</li>
                    <li class=" nav-item  ml-2 mb-1 link">{{$t('unstarred')}}</li>

                  </ul>
                </b-dropdown>
              </div>

              <div class="actions-align" v-if="actionbuttons">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i dark v-bind="attrs" v-on="on" class="pe-7s-trash"></i>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i dark v-bind="attrs" v-on="on" class="pe-7s-box1"></i>
                  </template>
                  <span>Archive</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i dark v-bind="attrs" v-on="on" class="pe-7s-mail-open-file"></i>
                  </template>
                  <span>Mark as read</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <i dark v-bind="attrs" v-on="on" class="pe-7s-check"></i>
                  </template>
                  <span>Add to tasks</span>
                </v-tooltip>
              </div>
            
              <div class="pane-right">

                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text">
                      <font-awesome-icon icon="search" />
                    </div>
                  </div>
                  <input placeholder="Search..." type="text" class="form-control" />
                </div>
              </div>
            </div>
            <div class="bg-white">
              <div class="table-responsive">
                <table class="text-nowrap table-lg mb-0 table table-hover align-middle">
                  <tbody>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox1" class="custom-control-input" @click="Showactions()" />
                          <label class="custom-control-label" for="eCheckbox1">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/1.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Alina Mcloughlin</div>

                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">Nullam dictum felis eu pede mollis pretium.</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />5 mins ago
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox12" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox12">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/2.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">John Smith</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">But I must explain to you how all this mistaken idea of denouncing pleasure
                        ...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />7 Dec
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox13" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox13">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/3.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Eliot Huber</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">But I must explain to you how all this mistaken idea of denouncing pleasure
                        ...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />6 Dec
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox14" class="custom-control-input" @click="Showactions()" />
                          <label class="custom-control-label" for="eCheckbox14">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/4.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Ella-Rose Henry</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">Create stunning UIs for your pages with these layout components...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />5 Dec
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox15" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox15">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/5.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Vinnie Wagstaff</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">Etiam sit amet orci eget eros faucibus...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />4 Dec
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox16" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox16">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/6.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Alina Mcloughlin</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">Nullam dictum felis eu pede mollis pretium.</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />28 Nov
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox17" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox17">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/7.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Eliot Huber</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">But I must explain to you how all this mistaken idea of denouncing pleasure
                        ...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />27 Nov
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox18" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox18">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/8.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Eliot Huber</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">But I must explain to you how all this mistaken idea of denouncing pleasure
                        ...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />25 Nov
                      </td>
                    </tr>
                    <tr>
                      <td class="text-center" style="width: 78px;">
                        <div class="custom-checkbox custom-control">
                          <input type="checkbox" id="eCheckbox19" class="custom-control-input" />
                          <label class="custom-control-label" for="eCheckbox19">&nbsp;</label>
                        </div>
                      </td>
                      <td class="text-left pl-1">
                        <font-awesome-icon icon="star" />
                      </td>
                      <td>
                        <div class="widget-content p-0">
                          <div class="widget-content-wrapper">
                            <div class="widget-content-left mr-3">
                              <img width="42" class="rounded-circle" src="@/assets/images/avatars/9.jpg" alt />
                            </div>
                            <div class="widget-content-left">
                              <div class="widget-heading">Ella-Rose Henry</div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="text-left">Create stunning UIs for your pages with these layout components...</td>

                      <td class="text-right">
                        <font-awesome-icon icon="calendar-alt" class="opacity-4 mr-2" />22 Nov
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="app-inner-layout__bottom-pane d-block text-center">
                <nav class aria-label="Page navigation example">
                  <ul class="pagination mb-0">
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                        <span class="sr-only">Previous</span>
                      </a>
                    </li>
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link">1</a>
                    </li>
                    <li class="page-item active">
                      <a href="javascript:void(0);" class="page-link">2</a>
                    </li>
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link">3</a>
                    </li>
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link">4</a>
                    </li>
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link">5</a>
                    </li>
                    <li class="page-item">
                      <a href="javascript:void(0);" class="page-link" aria-label="Next">
                        <span aria-hidden="true">»</span>
                        <span class="sr-only">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div> -->
        <!-- <div class="app-inner-layout__sidebar card">
          <ul class="nav flex-column">
            <li class="pt-4 pl-3 pr-3 pb-3 nav-item">
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="70%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" class="btn-pill" dark v-bind="attrs" v-on="on">Write New Email</v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="bg-focus text-white">
                      <span class="headline">New Mail</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-form>
                          <v-row>
                            <v-col cols="12" md="12" class="pt-0 pb-0">
                              <v-text-field label="To" class="mb-0"></v-text-field>
                             <div style="position: absolute;top: 23px;right: 15px;z-index:99999">
                             <span @click="showcc" class="p-2 link">Cc</span> 
                              <span @click="showbcc" class="p-2 link">Bcc</span>
                              </div>
                              <v-text-field v-if="showccinput" label="Cc" class="mb-0 mt-minus"></v-text-field>
                              <v-text-field v-if="showbccinput" label="Bcc" class="mb-0 mt-minus"></v-text-field>
                            </v-col>
  
                          </v-row>
                          <v-row>
                            <v-col cols="12" md="12" class="pt-0 pb-0">
                              <v-text-field label="Subject" class="mt-0"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="12" class="pt-0 pb-0">
                              <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" size="3">
                              </quill-editor>
                            </v-col>

                          </v-row>

                          <v-row>

                            <v-card-actions>
                              <v-btn class="btn btn-secondary text-white" style="background: #8f8a8a;" text @click="dialog = false">Close</v-btn>
                              <v-btn class="btn btn-primary text-white" style="background: #3f6ad8;" text @click="dialog = false">Send</v-btn>

                             
 <v-col cols="12" md="12" class="pt-0 pb-0">
                                <v-tooltip v-model="show" top>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on">
                                      
                                      <i class="lnr-paperclip" style="font-size: 21px;font-weight: 700;"></i>
                                    </v-btn>
                                  </template>
                                  <span>File Upload</span>
                                </v-tooltip>
                              </v-col>
                            </v-card-actions>
                          </v-row>

                        </v-form>
                      </v-container>
                    </v-card-text>

                  </v-card>
                </v-dialog>
              </v-row>

            </li>
            <li class="nav-item-header nav-item">My Account</li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon pe-7s-chat"></i>
                <span>{{$t('inbox')}}</span>
                <div class="ml-auto badge badge-pill badge-info">8</div>
              </a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon pe-7s-wallet"></i>
                <span>{{$t('sentitems')}}</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon pe-7s-config"></i>
                <span>{{$t('allmessages')}}</span>
                <div class="ml-auto badge badge-success">New</div>
              </a>
            </li>
            <li class="nav-item-divider nav-item"></li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon pe-7s-box2"></i>
                <span>{{$t('trash')}}</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon pe-7s-coffee"></i>
                <span>{{$t('others')}}</span>
                <div class="ml-auto badge badge-warning">512</div>
              </a>
            </li>

            <li class="nav-item-divider nav-item"></li>
            <li class="nav-item-header nav-item">
              {{$t('tags')}}
              <small class="ml-1">{{$t('important')}}</small>
            </li>
            <li class="nav-item">
              <button type="button" tabindex="0" class="center-elem dropdown-item">
                <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-success">Dark</div>{{$t('important')}}
              </button>
              <button type="button" tabindex="0" class="center-elem dropdown-item">
                <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-danger">Dark</div>{{$t('favourites')}}
              </button>
              <button type="button" tabindex="0" class="center-elem dropdown-item">
                <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-warning">Dark</div>{{$t('action')}}
              </button>
              <div tabindex="-1" class="dropdown-divider"></div>
              <button type="button" tabindex="0" class="center-elem dropdown-item">
                <div class="badge ml-0 mr-3 badge-dot badge-dot-xl badge-primary">Dark</div>{{$t('othertags')}}
              </button>
            </li>
          </ul>
        </div> -->
      </div>
    </div>
  </div>
</template>
 
<script>
  // import {
  //   quillEditor
  // } from "vue-quill-editor";
  import {
    library
  } from "@fortawesome/fontawesome-svg-core";
  import {
    faAngleDown,
    faTags,
    faStar,
    faSearch
  } from "@fortawesome/free-solid-svg-icons";
  // import {
  //   FontAwesomeIcon
  // } from "@fortawesome/vue-fontawesome";
  library.add(faAngleDown, faTags, faStar, faSearch);
  export default {
    components: {
      // quillEditor,
      // "font-awesome-icon": FontAwesomeIcon
    },
    data: () => ({
      heading: "Mailbox",
      subheading: "Create stunning UIs for your pages with these layout components.",
      actionbuttons: false,
      isMobileOpen: false,
      dialog: false,
      show2:true,
      showccinput:false,
      editorOption:"",
      showbccinput:false,
      text: "center",
      icon: "justify",
      toggle_none: null,
      toggle_one: 0,
      toggle_exclusive: 2,
      toggle_multiple: [0, 1, 2],
      selected: ["Trevor Handsen"],
      items: ["Trevor Handsen", "Alex Nelson"],
      title: "Hi,\nI just wanted to check in and see if you had any plans the upcoming weekend. We are thinking of heading up to Napa"
    }),
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill;
      }
    },
    methods: {
      showcc(){
        this.showccinput=true
       
      },
      showbcc(){
        this.showbccinput=true
       
      },
      Showactions() {
        this.actionbuttons = true;
      },
      toggleLayoutClass(className) {
        const el = document.body;
        this.isMobileOpen = !this.isMobileOpen;
        if (this.isMobileOpen) {
          el.classList.add(className);
        } else {
          el.classList.remove(className);
        }
      }
    }
  };
</script>
<style>
  .mail-title {
    font-size: 16px;
    padding-top: 20px;
  }

  .action-icons {
    padding: 6px;
    background: #e5e5e5;
    border-radius: 70px;
    font-size: 21px;
    margin: 2px;

  }

  .actions-align {
    width: 200px;
    display: flex;
    justify-content: space-evenly;
    font-size: 20px;
  }

  .actions-align i {
    padding: 5px;
  }

  .actions-align i:hover {
    background: rgb(224, 223, 223);
    padding: 5px;
    border-radius: 20px;
    cursor: pointer;
  }

  .file-select>.select-button {
    padding: 1rem;
    font-size: 20px;
    color: rgb(0, 0, 0);
    border-radius: .3rem;
    text-align: center;
    font-weight: bold;
  }

  .file-select>input[type="file"] {
    display: none;
  }
  .ql-editor{
    min-height:150px;
}
.mt-minus{margin-top: -24px;}
  @import "~quill/dist/quill.core.css";
  @import "~quill/dist/quill.snow.css";
  @import "~quill/dist/quill.bubble.css";
</style>