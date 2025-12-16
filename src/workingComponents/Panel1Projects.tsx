function Panel1Projects() {
  return (
    <>
  <div id="loader" className="loader">
    <div className="plane-container">
      <div className="preloader-wrapper small active">
        <div className="spinner-layer spinner-blue">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
        <div className="spinner-layer spinner-red">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
        <div className="spinner-layer spinner-yellow">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
        <div className="spinner-layer spinner-green">
          <div className="circle-clipper left">
            <div className="circle" />
          </div>
          <div className="gap-patch">
            <div className="circle" />
          </div>
          <div className="circle-clipper right">
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="app">
    <aside
      className="main-sidebar fixed offcanvas shadow"
      data-toggle="offcanvas"
    >
      <section className="sidebar">
        <div className="w-80px mt-3 mb-3 ml-3">
          <img src="../src/assets/img/basic/logo.png" alt="" />
        </div>
        <div className="relative">
          <a
            data-toggle="collapse"
            href="#userSettingsCollapse"
            role="button"
            aria-expanded="false"
            aria-controls="userSettingsCollapse"
            className="btn-fab btn-fab-sm absolute fab-right-bottom fab-top btn-primary shadow1 "
          >
            <i className="icon icon-cogs" />
          </a>
          <div className="user-panel p-3 light mb-2">
            <div>
              <div className="float-left image">
                <img
                  className="user_avatar"
                  src="../src/assets/img/dummy/u2.png"
                  alt="User Image"
                />
              </div>
              <div className="float-left info">
                <h6 className="font-weight-light mt-2 mb-1">
                  Alexander Pierce
                </h6>
                <a href="#">
                  <i className="icon-circle text-primary blink" /> Online
                </a>
              </div>
            </div>
            <div className="clearfix" />
            <div className="collapse multi-collapse" id="userSettingsCollapse">
              <div className="list-group mt-3 shadow">
                <a
                  href="index.html"
                  className="list-group-item list-group-item-action "
                >
                  <i className="mr-2 icon-umbrella text-blue" />
                  Profile
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <i className="mr-2 icon-cogs text-yellow" />
                  Settings
                </a>
                <a href="#" className="list-group-item list-group-item-action">
                  <i className="mr-2 icon-security text-purple" />
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu">
          <li className="header">
            <strong>MAIN NAVIGATION</strong>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-sailing-boat-water purple-text s-18" />{" "}
              <span>Dashboard</span>{" "}
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="index.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 1
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard1-rtl.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 1 - RTL
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard2.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 2
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard3.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 3
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard4.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 4
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard5.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 5
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard6.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 6
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard7.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 7
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard9.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 9
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard10.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 10
                </a>
              </li>
              <li>
                <a href="panel-page-dashboard11.html">
                  <i className="icon icon-folder5" />
                  Panel Dashboard 11
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon icon-package blue-text s-18" />
              <span>Products</span>
              <span className="badge r-3 badge-primary pull-right">4</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-page-products.html">
                  <i className="icon icon-circle-o" />
                  All Products
                </a>
              </li>
              <li>
                <a href="panel-page-products-create.html">
                  <i className="icon icon-add" />
                  Add New{" "}
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-account_box light-green-text s-18" />
              Users
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-page-users.html">
                  <i className="icon icon-circle-o" />
                  All Users
                </a>
              </li>
              <li>
                <a href="panel-page-users-create.html">
                  <i className="icon icon-add" />
                  Add User
                </a>
              </li>
              <li>
                <a href="panel-page-profile.html">
                  <i className="icon icon-user" />
                  User Profile{" "}
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview no-b">
            <a href="#">
              <i className="icon icon-package light-green-text s-18" />
              <span>Inbox</span>
              <span className="badge r-3 badge-success pull-right">20</span>
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-page-inbox.html">
                  <i className="icon icon-circle-o" />
                  All Messages
                </a>
              </li>
              <li>
                <a href="panel7-inbox.html">
                  <i className="icon icon-circle-o" />
                  Panel7 - Inbox
                </a>
              </li>
              <li>
                <a href="panel8-inbox.html">
                  <i className="icon icon-circle-o" />
                  Panel8 - Inbox
                </a>
              </li>
              <li>
                <a href="panel-page-inbox-create.html">
                  <i className="icon icon-add" />
                  Compose
                </a>
              </li>
            </ul>
          </li>
          <li className="header light mt-3">
            <strong>UI COMPONENTS</strong>
          </li>
          <li className="treeview ">
            <a href="#">
              <i className="icon icon-package text-lime s-18" />{" "}
              <span>Apps</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-page-chat.html">
                  <i className="icon icon-circle-o" />
                  Chat
                </a>
              </li>
              <li>
                <a href="panel7-tasks.html">
                  <i className="icon icon-circle-o" />
                  Tasks / Todo
                </a>
              </li>
              <li>
                <a href="panel-page-calendar.html">
                  <i className="icon icon-date_range" />
                  Calender
                </a>
              </li>
              <li>
                <a href="panel-page-calendar2.html">
                  <i className="icon icon-date_range" />
                  Calender 2
                </a>
              </li>
              <li>
                <a href="panel-page-contacts.html">
                  <i className="icon icon-circle-o" />
                  Contacts
                </a>
              </li>
              <li>
                <a href="panel1-projects.html">
                  <i className="icon icon-circle-o" />
                  Panel1 - Projects
                </a>
              </li>
              <li>
                <a href="panel7-projects-list.html">
                  <i className="icon icon-circle-o" />
                  Panel7 - Projects List
                </a>
              </li>
              <li>
                <a href="panel7-invoices.html">
                  <i className="icon icon-circle-o" />
                  Invoices
                </a>
              </li>
              <li>
                <a href="panel7-meetings.html">
                  <i className="icon icon-circle-o" />
                  Meetings
                </a>
              </li>
              <li>
                <a href="panel7-payments.html">
                  <i className="icon icon-circle-o" />
                  Payments
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-documents3 text-blue s-18" />{" "}
              <span>Pages</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="#">
                  <i className="icon icon-documents3" />
                  Blank Pages
                  <i className="icon icon-angle-left s-18 pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="panel-page-blank.html">
                      <i className="icon icon-document" />
                      Simple Blank
                    </a>
                  </li>
                  <li>
                    <a href="panel-page-blank-tabs.html">
                      <i className="icon icon-document" />
                      Tabs Blank{" "}
                      <i className="icon icon-angle-left s-18 pull-right" />
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-fingerprint text-green" />
                  Auth Pages
                  <i className="icon icon-angle-left s-18 pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="login.html">
                      <i className="icon icon-document" />
                      Login Page 1
                    </a>
                  </li>
                  <li>
                    <a href="login-2.html">
                      <i className="icon icon-document" />
                      Login Page 2
                    </a>
                  </li>
                  <li>
                    <a href="login-3.html">
                      <i className="icon icon-document" />
                      Login Page 3
                    </a>
                  </li>
                  <li>
                    <a href="login-4.html">
                      <i className="icon icon-document" />
                      Login Page 4
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-bug text-red" />
                  Error Pages
                  <i className="icon icon-angle-left s-18 pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="panel-page-404.html">
                      <i className="icon icon-document" />
                      404 Page
                    </a>
                  </li>
                  <li>
                    <a href="panel-page-500.html">
                      <i className="icon icon-document" />
                      500 Page
                      <i className="icon icon-angle-left s-18 pull-right" />
                    </a>
                  </li>
                  <li>
                    <a href="panel-page-error.html">
                      <i className="icon icon-document" />
                      420 Page
                      <i className="icon icon-angle-left s-18 pull-right" />
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">
                  <i className="icon icon-documents3" />
                  Other Pages
                  <i className="icon icon-angle-left s-18 pull-right" />
                </a>
                <ul className="treeview-menu">
                  <li>
                    <a href="panel-page-invoice.html">
                      <i className="icon icon-document" />
                      Invoice Page
                    </a>
                  </li>
                  <li>
                    <a href="panel-page-no-posts.html">
                      <i className="icon icon-document" />
                      No Post Page
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-goals-1 amber-text s-18" />{" "}
              <span>Elements</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-element-widgets.html">
                  <i className="icon icon-widgets amber-text s-14" />{" "}
                  <span>Widgets</span>
                </a>
              </li>
              <li>
                <a href="panel-element-counters.html">
                  <i className="icon icon-filter_9_plus amber-text s-14" />{" "}
                  <span>Counters</span>
                </a>
              </li>
              <li>
                <a href="panel-element-buttons.html">
                  <i className="icon icon-touch_app amber-text s-14" />{" "}
                  <span>Buttons</span>
                </a>
              </li>
              <li>
                <a href="panel-element-typography.html">
                  <i className="icon icon-text-width amber-text s-14" />{" "}
                  <span>Typography</span>
                </a>
              </li>
              <li>
                <a href="panel-element-tabels.html">
                  <i className="icon icon-table amber-text s-14" />{" "}
                  <span>Tables</span>
                </a>
              </li>
              <li>
                <a href="panel-element-alerts.html">
                  <i className="icon icon-exclamation-circle amber-text s-14" />{" "}
                  <span>Alerts</span>
                </a>
              </li>
              <li>
                <a href="panel-element-slider.html">
                  <i className="icon icon-view_carousel amber-text s-14" />
                  <span>Slider</span>
                </a>
              </li>
              <li>
                <a href="panel-element-tabs.html">
                  <i className="icon icon-folders2 amber-text s-14" />
                  <span>Tabs</span>
                </a>
              </li>
              <li>
                <a href="panel-element-progress-bars.html">
                  <i className="icon icon-folders2 amber-text s-14" />
                  <span>Progress Bars</span>
                </a>
              </li>
              <li>
                <a href="panel-element-badges.html">
                  <i className="icon icon-flag7 amber-text s-14" />
                  <span>Badges</span>
                </a>
              </li>
              <li>
                <a href="panel-element-preloaders.html">
                  <i className="icon icon-data_usage amber-text s-14" />
                  <span>Preloaders</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview ">
            <a href="#">
              <i className="icon icon-wpforms light-green-text s-18 " />{" "}
              <span>Forms &amp; Plugins</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-element-forms.html">
                  <i className="icon icon-wpforms light-green-text" />
                  Bootstrap Inputs
                </a>
              </li>
              <li>
                <a href="form-jquery-validations.html">
                  <i className="icon icon-note-important light-green-text" />
                  Form Validation (Jquery)
                </a>
              </li>
              <li>
                <a href="form-bootstrap-validations.html">
                  <i className="icon icon-note-important light-green-text" />
                  Form Validation (Bootstrap)
                </a>
              </li>
              <li>
                <a href="panel-element-editor.html">
                  <i className="icon icon-pen2 light-green-text" />
                  Editor
                </a>
              </li>
              <li>
                <a href="panel-element-toast.html">
                  <i className="icon icon-notifications_active light-green-text" />
                  Toasts
                </a>
              </li>
              <li>
                <a href="panel-element-stepper.html">
                  <i className="icon icon-burst_mode light-green-text" />
                  Stepper
                </a>
              </li>
              <li>
                <a href="panel-element-date-time-picker.html">
                  <i className="icon icon-date_range light-green-text" />
                  Date Time Picker
                </a>
              </li>
              <li>
                <a href="panel-element-color-picker.html">
                  <i className="icon icon-adjust light-green-text" />
                  Color Picker
                </a>
              </li>
              <li>
                <a href="panel-element-range-slider.html">
                  <i className="icon icon-space_bar light-green-text" />
                  Range Slider
                </a>
              </li>
              <li>
                <a href="panel-element-select2.html">
                  <i className="icon  icon-one-finger-click light-green-text" />
                  Select 2
                </a>
              </li>
              <li>
                <a href="panel-element-tags.html">
                  <i className="icon  icon-tags3 light-green-text" />
                  Tags
                </a>
              </li>
              <li>
                <a href="panel-element-data-tables.html">
                  <i className="icon icon-table light-green-text" />
                  Data Tables
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-bar-chart2 pink-text s-18" />
              <span>Charts</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-element-charts-js.html">
                  <i className="icon icon-area-chart pink-text s-14" />
                  <span>Charts.Js</span>
                </a>
              </li>
              <li>
                <a href="panel-element-morris.html">
                  <i className="icon icon-bubble_chart pink-text s-14" />
                  Morris Charts
                </a>
              </li>
              <li>
                <a href="panel-element-echarts.html">
                  <i className="icon icon-bar-chart-o pink-text s-14" />
                  Echarts
                </a>
              </li>
              <li>
                <a href="panel-element-easy-pie-charts.html">
                  <i className="icon icon-area-chart pink-text s-14" />
                  Easy Pie Charts
                </a>
              </li>
              <li>
                <a href="panel-element-jqvmap.html">
                  <i className="icon icon-map pink-text s-14" />
                  Jqvmap
                </a>
              </li>
              <li>
                <a href="panel-element-sparklines.html">
                  <i className="icon icon-line-chart2 pink-text s-14" />
                  Sparklines
                </a>
              </li>
              <li>
                <a href="panel-element-float.html">
                  <i className="icon icon-pie-chart pink-text s-14" />
                  Float Charts
                </a>
              </li>
            </ul>
          </li>
          <li className="treeview">
            <a href="#">
              <i className="icon icon-dialpad blue-text  s-18" />
              <span>Extra</span>
              <i className="icon icon-angle-left s-18 pull-right" />
            </a>
            <ul className="treeview-menu">
              <li>
                <a href="panel-element-letters.html">
                  <i className="icon icon-brightness_auto light-blue-text s-14" />
                  <span>Avatar Placeholders</span>
                </a>
              </li>
              <li>
                <a href="panel-element-icons.html">
                  <i className="icon icon-camera2 light-blue-text s-14" />{" "}
                  <span>Icons</span>
                </a>
              </li>
              <li>
                <a href="panel-element-colors.html">
                  <i className="icon icon-palette light-blue-text s-14" />{" "}
                  <span>Colors</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
    {/*Sidebar End*/}
    <div className="has-sidebar-left">
      <div className="pos-f-t">
        <div className="collapse" id="navbarToggleExternalContent">
          <div className="bg-dark pt-2 pb-2 pl-4 pr-2">
            <div className="search-bar">
              <input
                className="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50"
                type="text"
                placeholder="start typing..."
              />
            </div>
            <a
              href="#"
              data-toggle="collapse"
              data-target="#navbarToggleExternalContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="paper-nav-toggle paper-nav-white active "
            >
              <i />
            </a>
          </div>
        </div>
      </div>
      <div className="sticky">
        <div className="navbar navbar-expand navbar-dark d-flex justify-content-between bd-navbar blue accent-3">
          <div className="relative">
            <a
              href="#"
              data-toggle="push-menu"
              className="paper-nav-toggle pp-nav-toggle"
            >
              <i />
            </a>
          </div>
          {/*Top Menu Start */}
          <div className="navbar-custom-menu">
            <ul className="nav navbar-nav">
              {/* Messages*/}
              <li className="dropdown custom-dropdown messages-menu">
                <a href="#" className="nav-link" data-toggle="dropdown">
                  <i className="icon-message " />
                  <span className="badge badge-success badge-mini rounded-circle">
                    4
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li>
                    {/* inner menu: contains the actual data */}
                    <ul className="menu pl-2 pr-2">
                      {/* start message */}
                      <li>
                        <a href="#">
                          <div className="avatar float-left">
                            <img src="../src/assets/img/dummy/u4.png" alt="" />
                            <span className="avatar-badge busy" />
                          </div>
                          <h4>
                            Support Team
                            <small>
                              <i className="icon icon-clock-o" /> 5 mins
                            </small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      {/* end message */}
                      {/* start message */}
                      <li>
                        <a href="#">
                          <div className="avatar float-left">
                            <img src="../src/assets/img/dummy/u1.png" alt="" />
                            <span className="avatar-badge online" />
                          </div>
                          <h4>
                            Support Team
                            <small>
                              <i className="icon icon-clock-o" /> 5 mins
                            </small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      {/* end message */}
                      {/* start message */}
                      <li>
                        <a href="#">
                          <div className="avatar float-left">
                            <img src="../src/assets/img/dummy/u2.png" alt="" />
                            <span className="avatar-badge idle" />
                          </div>
                          <h4>
                            Support Team
                            <small>
                              <i className="icon icon-clock-o" /> 5 mins
                            </small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      {/* end message */}
                      {/* start message */}
                      <li>
                        <a href="#">
                          <div className="avatar float-left">
                            <img src="../src/assets/img/dummy/u3.png" alt="" />
                            <span className="avatar-badge busy" />
                          </div>
                          <h4>
                            Support Team
                            <small>
                              <i className="icon icon-clock-o" /> 5 mins
                            </small>
                          </h4>
                          <p>Why not buy a new awesome theme?</p>
                        </a>
                      </li>
                      {/* end message */}
                    </ul>
                  </li>
                  <li className="footer s-12 p-2 text-center">
                    <a href="#">See All Messages</a>
                  </li>
                </ul>
              </li>
              {/* Notifications */}
              <li className="dropdown custom-dropdown notifications-menu">
                <a
                  href="#"
                  className=" nav-link"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icon-notifications " />
                  <span className="badge badge-danger badge-mini rounded-circle">
                    4
                  </span>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="header">You have 10 notifications</li>
                  <li>
                    {/* inner menu: contains the actual data */}
                    <ul className="menu">
                      <li>
                        <a href="#">
                          <i className="icon icon-data_usage text-success" /> 5
                          new members joined today
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon icon-data_usage text-danger" /> 5
                          new members joined today
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="icon icon-data_usage text-yellow" /> 5
                          new members joined today
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="footer p-2 text-center">
                    <a href="#">View all</a>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  className="nav-link "
                  data-toggle="collapse"
                  data-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className=" icon-search3 " />
                </a>
              </li>
              {/* Right Sidebar Toggle Button */}
              <li>
                <a className="nav-link ml-2" data-toggle="control-sidebar">
                  <i className="icon-tasks " />
                </a>
              </li>
              {/* User Account*/}
              <li className="dropdown custom-dropdown user user-menu ">
                <a href="#" className="nav-link" data-toggle="dropdown">
                  <img
                    src="../src/assets/img/dummy/u8.png"
                    className="user-image"
                    alt="User Image"
                  />
                  <i className="icon-more_vert " />
                </a>
                <div className="dropdown-menu p-4 dropdown-menu-right">
                  <div className="row box justify-content-between my-4">
                    <div className="col">
                      <a href="#">
                        <i className="icon-apps purple lighten-2 avatar  r-5" />
                        <div className="pt-1">Apps</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-beach_access pink lighten-1 avatar  r-5" />
                        <div className="pt-1">Profile</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-perm_data_setting indigo lighten-2 avatar  r-5" />
                        <div className="pt-1">Settings</div>
                      </a>
                    </div>
                  </div>
                  <div className="row box justify-content-between my-4">
                    <div className="col">
                      <a href="#">
                        <i className="icon-star light-green lighten-1 avatar  r-5" />
                        <div className="pt-1">Favourites</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-save2 orange accent-1 avatar  r-5" />
                        <div className="pt-1">Saved</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-perm_data_setting grey darken-3 avatar  r-5" />
                        <div className="pt-1">Settings</div>
                      </a>
                    </div>
                  </div>
                  <hr />
                  <div className="row box justify-content-between my-4">
                    <div className="col">
                      <a href="#">
                        <i className="icon-apps purple lighten-2 avatar  r-5" />
                        <div className="pt-1">Apps</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-beach_access pink lighten-1 avatar  r-5" />
                        <div className="pt-1">Profile</div>
                      </a>
                    </div>
                    <div className="col">
                      <a href="#">
                        <i className="icon-perm_data_setting indigo lighten-2 avatar  r-5" />
                        <div className="pt-1">Settings</div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="page has-sidebar-left">
      <header className="blue accent-3 relative nav-sticky">
        <div className="container-fluid text-white">
          <div className="row p-t-b-10 ">
            <div className="col">
              <h4>
                <i className="icon-box" />
                Projects
              </h4>
            </div>
          </div>
          <div className="row">
            <ul
              className="nav responsive-tab nav-material nav-material-white"
              id="v-pills-tab"
            >
              <li>
                <a
                  className="nav-link active"
                  id="v-pills-1-tab"
                  data-toggle="pill"
                  href="#v-pills-1"
                >
                  <i className="icon icon-home2" />
                  Today
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  id="v-pills-2-tab"
                  data-toggle="pill"
                  href="#v-pills-2"
                >
                  <i className="icon icon-plus-circle mb-3" />
                  Yesterday
                </a>
              </li>
              <li>
                <a
                  className="nav-link"
                  id="v-pills-3-tab"
                  data-toggle="pill"
                  href="#v-pills-3"
                >
                  <i className="icon icon-calendar" />
                  By Date
                </a>
              </li>
            </ul>
            <a
              className="btn-fab absolute fab-right-bottom btn-primary"
              data-toggle="control-sidebar"
            >
              <i className="icon icon-menu" />
            </a>
          </div>
        </div>
      </header>
      <div className="container-fluid relative animatedParent animateOnce p-0">
        <div className="row no-gutters">
          <div className="col-md-9">
            <div className="pl-3 pr-3 my-3">
              <div className="row">
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p4.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={30}
                            data-options='{"lineWidth": 5, "barColor": "#ed5564","size":60}'
                          >
                            <span className="percent">30</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p1.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p2.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p5.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p9.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p8.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p7.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p6.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p4.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p1.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p2.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="card shadow my-3 no-b">
                    <img
                      className="card-img-top"
                      src="../src/assets/img/demo/portfolio/p5.jpg"
                      alt=""
                    />
                    <div className="card-img-overlay">
                      <div className="avatar-group mt-3">
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u4.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <span className="avatar-letter avatar-letter-l circle" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u5.png" alt="" />
                        </figure>
                        <figure className="avatar">
                          <img src="../src/assets/img/dummy/u6.png" alt="" />
                        </figure>
                      </div>
                    </div>
                    <div className="card-body">
                      <h6 className="mb-1">Paper Panel 7</h6>
                      <span>A light version of paper panel.</span>
                    </div>
                    <div className="p-2 b-t">
                      <div className="row">
                        <div className="col-md-6">
                          <span
                            className="easy-pie-chart easy-pie-chart-sm"
                            data-percent={55}
                            data-options='{"lineWidth": 5, "barColor": "#7dc855","size":60}'
                          >
                            <span className="percent">55</span>
                          </span>
                        </div>
                        <div className="col-md-6">
                          <div className="mt-2 ml-2">
                            <strong>Deadline:</strong>
                            <br />2 Days Left
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            {/* Right Sidebar */}
            <aside className="white h-100 shadow">
              {/* The time line */}
              <div className="p-3">
                <ul className="timeline">
                  {/* timeline time label */}
                  <li className="time-label">
                    <span className="badge badge-danger r-3">10 Feb. 2014</span>
                  </li>
                  {/* /.timeline-label */}
                  {/* timeline item */}
                  <li>
                    <i className="ion icon-envelope bg-primary" />
                    <div className="timeline-item card">
                      <div className="card-header white">
                        <a href="#">Support Team</a> sent you an email{" "}
                        <span className="time float-right">
                          <i className="ion icon-clock-o" /> 12:05
                        </span>
                      </div>
                      <div className="card-body">
                        Etsy doostang zoodles disqus groupon greplin oooj voxy
                        zoodles, weebly ning heekya handango imeem plugg dopplr
                        jibjab, movity jajah plickers sifteo edmodo ifttt
                        zimbra. Babblely odeo kaboodle quora plaxo ideeli hulu
                        weebly balihoo...
                      </div>
                      <div className="card-footer">
                        <a className="btn btn-primary btn-xs">Read more</a>
                        <a className="btn btn-danger btn-xs">Delete</a>
                      </div>
                    </div>
                  </li>
                  {/* END timeline item */}
                  {/* timeline item */}
                  <li>
                    <i className="ion icon-comments bg-danger" />
                    <div className="timeline-item  card">
                      <div className="card-header white">
                        <a href="#">Jay White</a> commented{" "}
                        <span className="float-right">
                          <i className="ion icon-clock-o" /> 27 mins ago
                        </span>
                      </div>
                      <div className="card-body">
                        Take me to your leader! Switzerland is small and
                        neutral! We are more like Germany, ambitious and
                        misunderstood!
                      </div>
                      <div className="card-footer">
                        <a className="btn btn-warning btn-flat btn-xs">
                          View comment
                        </a>
                      </div>
                    </div>
                  </li>
                  {/* END timeline item */}
                  {/* timeline time label */}
                  <li className="time-label">
                    <span className="badge badge-success r-3">3 Jan. 2014</span>
                  </li>
                  {/* /.timeline-label */}
                  {/* timeline item */}
                  <li>
                    <i className="ion icon-camera indigo" />
                    <div className="timeline-item  card">
                      <div className="card-header white">
                        <a href="#">Mina Lee</a> uploaded new photos
                        <span className="time float-right">
                          <i className="ion icon-clock-o" /> 2 days ago
                        </span>
                      </div>
                      <div className="card-body">
                        <img
                          src="../src/assets/img/previews/d9.jpg"
                          alt="..."
                          className="margin"
                        />
                      </div>
                    </div>
                  </li>
                  {/* END timeline item */}
                  {/* timeline item */}
                  <li>
                    <i className="ion icon-video-camera bg-maroon" />
                    <div className="timeline-item  card">
                      <div className="card-header white">
                        <a href="#">Mr. Doe</a> shared a video
                        <span className="time float-right">
                          <i className="ion icon-clock-o" /> 5 days ago
                        </span>
                      </div>
                      <div className="card-body">
                        <div className="embed-responsive embed-responsive-16by9">
                          <iframe
                            className="embed-responsive-item"
                            src="https://www.youtube.com/embed/tMWkeBIohBs"
                                                        frameBorder={0}
                          />
                        </div>
                      </div>
                      <div className="card-footer">
                        <a href="#" className="btn btn-xs bg-maroon">
                          See comments
                        </a>
                      </div>
                    </div>
                  </li>
                  {/* END timeline item */}
                  <li>
                    <i className="ion icon-clock-o bg-gray" />
                  </li>
                </ul>
              </div>
            </aside>
            {/* /.right-sidebar */}
          </div>
        </div>
      </div>
    </div>
    {/* Right Sidebar */}
    <aside className="control-sidebar fixed white ">
      <div className="slimScroll">
        <div className="sidebar-header">
          <h4>Activity List</h4>
          <a
            href="#"
            data-toggle="control-sidebar"
            className="paper-nav-toggle  active"
          >
            <i />
          </a>
        </div>
        <div className="p-3">
          <div>
            <div className="my-3">
              <small>25% Complete</small>
              <div className="progress" style={{ height: 3 }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "25%" }}
                  aria-valuenow={25}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div className="my-3">
              <small>45% Complete</small>
              <div className="progress" style={{ height: 3 }}>
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "45%" }}
                  aria-valuenow={45}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div className="my-3">
              <small>60% Complete</small>`
              <div className="progress" style={{ height: 3 }}>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "60%" }}
                  aria-valuenow={60}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div className="my-3">
              <small>75% Complete</small>
              <div className="progress" style={{ height: 3 }}>
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: "75%" }}
                  aria-valuenow={75}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
            <div className="my-3">
              <small>100% Complete</small>
              <div className="progress" style={{ height: 3 }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "100%" }}
                  aria-valuenow={100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 bg-primary text-white">
          <div className="row">
            <div className="col-md-6">
              <h5 className="font-weight-normal s-14">Sodium</h5>
              <span className="font-weight-lighter text-primary">
                Spark Bar
              </span>
              <div>
                {" "}
                Oxygen
                <span className="text-primary">
                  <i className="icon icon-arrow_downward" /> 67%
                </span>
              </div>
            </div>
            <div className="col-md-6">
              <canvas
                width={100}
                height={70}
                data-chart="spark"
                data-chart-type="bar"
                data-dataset="[[28,68,41,43,96,45,100,28,68,41,43,96,45,100,28,68,41,43,96,45,100,28,68,41,43,96,45,100]]"
                data-labels="['a','b','c','d','e','f','g','h','i','j','k','l','m','n','a','b','c','d','e','f','g','h','i','j','k','l','m','n']"
              ></canvas>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table
            id="recent-orders"
            className="table table-hover mb-0 ps-container ps-theme-default"
          >
            <tbody>
              <tr>
                <td>
                  <a href="#">INV-281281</a>
                </td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>$ 1228.28</td>
              </tr>
              <tr>
                <td>
                  <a href="#">INV-01112</a>
                </td>
                <td>
                  <span className="badge badge-warning">Overdue</span>
                </td>
                <td>$ 5685.28</td>
              </tr>
              <tr>
                <td>
                  <a href="#">INV-281012</a>
                </td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>$ 152.28</td>
              </tr>
              <tr>
                <td>
                  <a href="#">INV-01112</a>
                </td>
                <td>
                  <span className="badge badge-warning">Overdue</span>
                </td>
                <td>$ 5685.28</td>
              </tr>
              <tr>
                <td>
                  <a href="#">INV-281012</a>
                </td>
                <td>
                  <span className="badge badge-success">Paid</span>
                </td>
                <td>$ 152.28</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="sidebar-header">
          <h4>Activity</h4>
          <a
            href="#"
            data-toggle="control-sidebar"
            className="paper-nav-toggle  active"
          >
            <i />
          </a>
        </div>
        <div className="p-4">
          <div className="activity-item activity-primary">
            <div className="activity-content">
              <small className="text-muted">
                <i className="icon icon-user position-left" /> 5 mins ago
              </small>
              <p>
                Lorem ipsum dolor sit amet conse ctetur which ascing elit users.
              </p>
            </div>
          </div>
          <div className="activity-item activity-danger">
            <div className="activity-content">
              <small className="text-muted">
                <i className="icon icon-user position-left" /> 8 mins ago
              </small>
              <p>
                Lorem ipsum dolor sit ametcon the sectetur that ascing elit
                users.
              </p>
            </div>
          </div>
          <div className="activity-item activity-success">
            <div className="activity-content">
              <small className="text-muted">
                <i className="icon icon-user position-left" /> 10 mins ago
              </small>
              <p>
                Lorem ipsum dolor sit amet cons the ecte tur and adip ascing
                elit users.
              </p>
            </div>
          </div>
          <div className="activity-item activity-warning">
            <div className="activity-content">
              <small className="text-muted">
                <i className="icon icon-user position-left" /> 12 mins ago
              </small>
              <p>
                Lorem ipsum dolor sit amet consec tetur adip ascing elit users.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
    {/* /.right-sidebar */}
    {/* Add the sidebar's background. This div must be placed
   immediately after the control sidebar */}
    <div className="control-sidebar-bg shadow white fixed" />
  </div>
</>

  )
}

export default Panel1Projects