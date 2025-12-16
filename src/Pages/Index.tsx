import { useState, useEffect } from 'react';


function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('v-pills-1');

  useEffect(() => {
    // Simulate loading or wait for resources
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'inherit';
    }, 1000); // 1 second delay to show loader briefly

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const win = window as any;
    if (win.Chart) {
      setTimeout(() => {
        const charts = document.querySelectorAll(`canvas[data-chart]`);
        charts.forEach((canvas: any) => {
          if (canvas.chart) return;

          const parse = (str: string | null) => {
            if (!str) return null;
            try { return new Function('return ' + str)(); } catch (e) { return null; }
          };

          const type = canvas.getAttribute('data-chart');
          const chartType = canvas.getAttribute('data-chart-type') || (type === 'spark' ? 'line' : type);

          const dataset = parse(canvas.getAttribute('data-dataset'));
          const labels = parse(canvas.getAttribute('data-labels'));
          const options = parse(canvas.getAttribute('data-options')) || {};
          const datasetOptions = parse(canvas.getAttribute('data-dataset-options')) || [];

          const datasets: any[] = [];
          if (dataset && Array.isArray(dataset[0])) {
            dataset.forEach((data: any, index: number) => {
              datasets.push({
                data: data,
                ...(datasetOptions[index] || {})
              });
            });
          } else if (dataset) {
            datasets.push({
              data: dataset,
              ...(datasetOptions[0] || {})
            });
          }

          const config = {
            type: chartType,
            data: {
              labels: labels,
              datasets: datasets
            },
            options: options
          };

          new win.Chart(canvas.getContext('2d'), config);
          canvas.chart = true;
        });
      }, 100);
    }
  }, [activeTab]);

  return (
    <>

      {isLoading && (
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
      )}
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
        <div className="page has-sidebar-left height-full">
          <header className="blue accent-3 relative nav-sticky">
            <div className="container-fluid text-white">
              <div className="row p-t-b-10 ">
                <div className="col">
                  <h4>
                    <i className="icon-box" />
                    Dashboard
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
                      className={`nav-link ${activeTab === 'v-pills-1' ? 'active' : ''}`}
                      id="v-pills-1-tab"
                      onClick={() => setActiveTab('v-pills-1')}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="icon icon-home2" />
                      Today
                    </a>
                  </li>
                  <li>
                    <a
                      className={`nav-link ${activeTab === 'v-pills-2' ? 'active' : ''}`}
                      id="v-pills-2-tab"
                      onClick={() => setActiveTab('v-pills-2')}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="icon icon-plus-circle mb-3" />
                      Yesterday
                    </a>
                  </li>
                  <li>
                    <a
                      className={`nav-link ${activeTab === 'v-pills-3' ? 'active' : ''}`}
                      id="v-pills-3-tab"
                      onClick={() => setActiveTab('v-pills-3')}
                      style={{ cursor: 'pointer' }}
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
          <div className="container-fluid relative">
            <div className="tab-content pb-3" id="v-pills-tabContent">
              {/*Today Tab Start*/}
              <div
                className={`tab-pane ${activeTab === 'v-pills-1' ? 'show active' : ''}`}
                id="v-pills-1"
              >
                <div className="row my-3">
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-note-list text-light-blue s-48" />
                        </div>
                        <div className="counter-title">Web Projects</div>
                        <h5 className="sc-counter mt-3">1228</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-mail-envelope-open s-48" />
                        </div>
                        <div className="counter-title ">Premium Themes</div>
                        <h5 className="sc-counter mt-3">1228</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-stop-watch3 s-48" />
                        </div>
                        <div className="counter-title">Support Requests</div>
                        <h5 className="sc-counter mt-3">1228</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-inbox-document-text s-48" />
                        </div>
                        <div className="counter-title">Support Requests</div>
                        <h5 className="sc-counter mt-3">550</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="white p-5 r-5">
                      <div className="card-title">
                        <h5> Sales Overview</h5>
                      </div>
                      <div className="row my-3">
                        <div className="col-md-3">
                          <div className="my-3 mt-4">
                            <h5>
                              Sales <span className="red-text">+203.48</span>
                            </h5>
                            <span className="s-24">$2652.07</span>
                            <p>
                              A short summary of sales report if you want to add
                              here. This could be useful for quick view.
                            </p>
                          </div>
                          <div className="row no-gutters bg-light r-3 p-2 mt-5">
                            <div className="col-md-6 b-r p-3">
                              <h5>Net Sales</h5>
                              <span>$2351.08 </span>
                            </div>
                            <div className="col-md-6 p-3">
                              <div className="">
                                <h5>
                                  Costs <span className="amber-text">+87.4</span>
                                </h5>
                                <span>$900.09</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-9" style={{ height: 350 }}>
                          <canvas
                            data-chart="line"
                            data-dataset="[
                                                      [0, 15, 4, 30, 8, 5, 18],
                                                      [1, 7, 21, 4, 12, 5, 10],
                                          
                                                      ]"
                            data-labels="['A', 'B', 'C', 'D', 'E', 'F']"
                            data-dataset-options="[
                                                      {   label:'HTML',
                                                          fill: true,
                                                          backgroundColor: 'rgba(50,141,255,.2)',
                                                          borderColor: '#328dff',
                                                          pointBorderColor: '#328dff',
                                                          pointBackgroundColor: '#fff',
                                                          pointBorderWidth: 2,
                                                          borderWidth: 1,
                                                          borderJoinStyle: 'miter',
                                                          pointHoverBackgroundColor: '#328dff',
                                                          pointHoverBorderColor: '#328dff',
                                                          pointHoverBorderWidth: 1,
                                                          pointRadius: 3,
                                                          
                                                      },
                                                      {  
                                                          label:'Wordpress',
                                                          fill: false,
                                                          borderDash: [5, 5],
                                                          backgroundColor: 'rgba(87,115,238,.3)',
                                                          borderColor: '#2979ff',
                                                          pointBorderColor: '#2979ff',
                                                          pointBackgroundColor: '#2979ff',
                                                          pointBorderWidth: 2,
                                          
                                                          borderWidth: 1,
                                                          borderJoinStyle: 'miter',
                                                          pointHoverBackgroundColor: '#2979ff',
                                                          pointHoverBorderColor: '#fff',
                                                          pointHoverBorderWidth: 1,
                                                          pointRadius: 3,
                                                          
                                                      }
                                                      ]"
                            data-options="{
                                                              maintainAspectRatio: false,
                                                              legend: {
                                                                  display: true
                                                              },
                                                  
                                                              scales: {
                                                                  xAxes: [{
                                                                      display: true,
                                                                      gridLines: {
                                                                          zeroLineColor: '#eee',
                                                                          color: '#eee',
                                                                      
                                                                          borderDash: [5, 5],
                                                                      }
                                                                  }],
                                                                  yAxes: [{
                                                                      display: true,
                                                                      gridLines: {
                                                                          zeroLineColor: '#eee',
                                                                          color: '#eee',
                                                                          borderDash: [5, 5],
                                                                      }
                                                                  }]
                                                  
                                                              },
                                                              elements: {
                                                                  line: {
                                                                  
                                                                      tension: 0.4,
                                                                      borderWidth: 1
                                                                  },
                                                                  point: {
                                                                      radius: 2,
                                                                      hitRadius: 10,
                                                                      hoverRadius: 6,
                                                                      borderWidth: 4
                                                                  }
                                                              }
                                                          }"
                          ></canvas>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row row-eq-height">
                  {/* Chat Widget Start */}
                  <div className="col-md-4">
                    <div className="card my-3 no-b r-5">
                      <div className="card-header white no-b">
                        <h6>
                          <span className="badge badge-danger r-3 mr-2">5</span>New
                          Chats{" "}
                        </h6>
                      </div>
                      <div
                        className="card-body chat-widget  p-3 r-5 slimScroll"
                        data-height={435}
                      >
                        <ul className="list-unstyled">
                          <li className="by-me">
                            <div className="avatar float-left">
                              <img
                                src="../src/assets/img/dummy/u1.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator busy" />
                            </div>
                            <div className="chat-content">
                              {/* In meta area, first include "name" and then "time" */}
                              <div className="chat-meta">
                                Sent
                                <span className="float-right">3 hours ago</span>
                              </div>
                              Vivamus diam elit diam, consectetur dapibus adipiscing
                              elit.
                            </div>
                          </li>
                          {/* Chat by other. Use the class "by-other". */}
                          <li className="by-other">
                            {/* Use the class "float-right" in avatar */}
                            <div className="avatar float-right">
                              {/* Online or offline */}
                              <b className="c-off" />
                              <img
                                src="../src/assets/img/dummy/u4.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator idle" />
                            </div>
                            <div className="chat-content">
                              {/* In the chat meta, first include "time" then "name" */}
                              <div className="chat-meta">
                                3 hours ago
                                <span className="float-right">Received</span>
                              </div>
                              Vivamus diam elit diam, consectetur elit.
                            </div>
                          </li>
                          <li className="by-me">
                            <div className="avatar float-left">
                              <b className="c-on" />
                              <img
                                src="../src/assets/img/dummy/u5.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator online" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-meta">
                                Seen
                                <span className="float-right">4 hours ago</span>
                              </div>
                              Lorem dolor sit sit amet dolo.
                            </div>
                          </li>
                          <li className="by-other">
                            {/* Use the class "float-right" in avatar */}
                            <div className="avatar float-right">
                              <b className="c-off" />
                              <img
                                src="../src/assets/img/dummy/u4.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator online" />
                            </div>
                            <div className="chat-content">
                              {/* In the chat meta, first include "time" then "name" */}
                              <div className="chat-meta">
                                3 hours ago
                                <span className="float-right">Undelivered</span>
                              </div>
                              Vivamus diam elit diam, consectetur.
                            </div>
                          </li>
                          <li className="by-me">
                            <div className="avatar float-left">
                              <b className="c-on" />
                              <img
                                src="../src/assets/img/dummy/u3.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator bust" />
                            </div>
                            <div className="chat-content">
                              <div className="chat-meta">
                                Audio
                                <span className="float-right">4 hours ago</span>
                              </div>
                              Vivamus diam eget, Vivamus consectetur.
                            </div>
                          </li>
                          <li className="by-other">
                            {/* Use the class "float-right" in avatar */}
                            <div className="avatar float-right">
                              <b className="c-off" />
                              <img
                                src="../src/assets/img/dummy/u2.png"
                                alt=""
                                className="img-responsive"
                              />
                              <span className="avatar-badge has-indicator online" />
                            </div>
                            <div className="chat-content">
                              {/* In the chat meta, first include "time" then "name" */}
                              <div className="chat-meta">
                                3 hours ago
                                <span className="float-right">Image</span>
                              </div>
                              Duis dolor sit eut purus dolor feugius diam elit
                              diamt.
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="card-footer white">
                        {/* Chat button */}
                        <form>
                          <div className="input-group">
                            <input
                              className="form-control s-12 bg-light r-30 mr-3"
                              placeholder="Type your message..."
                              type="text"
                            />
                            <span className="input-group-btn">
                              <button
                                type="submit"
                                className="btn-fab btn-danger p-0 s-14"
                              >
                                <i className="icon-subdirectory_arrow_left" />
                              </button>
                            </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* Followers */}
                  <div className="col-md-3">
                    <div className="card no-b r-5 my-3">
                      <div className="card-body">
                        <h5 className="card-title">
                          New Followers{" "}
                          <span className="badge badge-success r-3">30+</span>
                        </h5>
                        <p>There are 30 new followers</p>
                        <div className="avatar-group">
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
                          <figure className="avatar">
                            <img src="../src/assets/img/dummy/u7.png" alt="" />
                          </figure>
                          <figure className="avatar">
                            <span className="avatar-letter avatar-letter-a circle" />
                          </figure>
                          <figure className="avatar">
                            <span className="avatar-letter avatar-letter-b circle" />
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="card no-b r-5 my-3">
                      <div className="bg-primary text-white lighten-2 r-5">
                        <div className="pt-5 pb-0 pl-4 pr-4">
                          <div
                            className="lightSlider masonry-container"
                            data-item={1}
                            data-item-md={1}
                            data-item-sm={1}
                            data-auto="true"
                            data-pause={6000}
                            data-pager="false"
                            data-controls="false"
                            data-loop="true"
                          >
                            <div>
                              <h5 className="font-weight-normal s-14">
                                Followers Increased
                              </h5>
                              <div className="my-5">
                                <span>Today 30%</span>
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
                              <div className="my-5">
                                <span>Yesterday 10%</span>
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
                              <canvas
                                width={378}
                                height={140}
                                data-chart="spark"
                                data-chart-type="bar"
                                data-dataset="[[28,530,200,430,28,530,200,430,28,530,200,430,28,530,200,430,28,530,200,430]]"
                                data-labels="['a','b','c','d','a','b','c','d','a','b','c','d','a','b','c','d','a','b','c','d']"
                                data-dataset-options="[
                                                  { borderColor:  'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235,1)'},
                                                  ]"
                              ></canvas>
                            </div>
                            <div>
                              <h5 className="font-weight-normal s-14">
                                Followers Increased
                              </h5>
                              <div className="my-5">
                                <span>Today 30%</span>
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
                              <div className="my-5">
                                <span>Yesterday 10%</span>
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
                              <canvas
                                width={378}
                                height={140}
                                data-chart="spark"
                                data-chart-type="line"
                                data-dataset="[[28,530,200,430,28,530,200,430,28,530,200,430,28,530,200,430,28,530,200,430]]"
                                data-labels="['a','b','c','d','a','b','c','d','a','b','c','d','a','b','c','d','a','b','c','d']"
                                data-dataset-options="[
                                                  { borderColor:  'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235,1)'},
                                                  ]"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Daily Sale Report*/}
                  <div className="col-md-5">
                    <div className="card my-3 no-b ">
                      <div className="card-header white b-0 p-3">
                        <div className="card-handle">
                          <a
                            data-toggle="collapse"
                            href="#salesCard"
                            aria-expanded="false"
                            aria-controls="salesCard"
                          >
                            <i className="icon-menu" />
                          </a>
                        </div>
                        <h4 className="card-title">Daily Sale Report</h4>
                        <small className="card-subtitle mb-2 text-muted">
                          Items purchase by users.
                        </small>
                      </div>
                      <div className="collapse show" id="salesCard">
                        <div className="card-body p-0">
                          <div className="table-responsive">
                            <table className="table table-hover earning-box">
                              <thead className="bg-light">
                                <tr>
                                  <th colSpan={2}>Client Name</th>
                                  <th>Item Purchased</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="w-10">
                                    <a
                                      href="panel-page-profile.html"
                                      className="avatar avatar-lg"
                                    >
                                      <img src="../src/assets/img/dummy/u6.png" alt="" />
                                    </a>
                                  </td>
                                  <td>
                                    <h6>Sara Kamzoon</h6>
                                    <small className="text-muted">
                                      Marketing Manager
                                    </small>
                                  </td>
                                  <td>25</td>
                                  <td>$250</td>
                                </tr>
                                <tr>
                                  <td className="w-10">
                                    <a
                                      href="panel-page-profile.html"
                                      className="avatar avatar-lg"
                                    >
                                      <img src="../src/assets/img/dummy/u7.png" alt="" />
                                    </a>
                                  </td>
                                  <td>
                                    <h6>Sara Kamzoon</h6>
                                    <small className="text-muted">
                                      Marketing Manager
                                    </small>
                                  </td>
                                  <td>25</td>
                                  <td>$250</td>
                                </tr>
                                <tr>
                                  <td className="w-10">
                                    <a
                                      href="panel-page-profile.html"
                                      className="avatar avatar-lg"
                                    >
                                      <img src="../src/assets/img/dummy/u9.png" alt="" />
                                    </a>
                                  </td>
                                  <td>
                                    <h6>Sara Kamzoon</h6>
                                    <small className="text-muted">
                                      Marketing Manager
                                    </small>
                                  </td>
                                  <td>25</td>
                                  <td>$250</td>
                                </tr>
                                <tr>
                                  <td className="w-10">
                                    <a
                                      href="panel-page-profile.html"
                                      className="avatar avatar-lg"
                                    >
                                      <img src="../src/assets/img/dummy/u11.png" alt="" />
                                    </a>
                                  </td>
                                  <td>
                                    <h6>Sara Kamzoon</h6>
                                    <small className="text-muted">
                                      Marketing Manager
                                    </small>
                                  </td>
                                  <td>25</td>
                                  <td>$250</td>
                                </tr>
                                <tr>
                                  <td className="w-10">
                                    <a
                                      href="panel-page-profile.html"
                                      className="avatar avatar-lg"
                                    >
                                      <img src="../src/assets/img/dummy/u12.png" alt="" />
                                    </a>
                                  </td>
                                  <td>
                                    <h6>Sara Kamzoon</h6>
                                    <small className="text-muted">
                                      Marketing Manager
                                    </small>
                                  </td>
                                  <td>25</td>
                                  <td>$250</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Today Tab End*/}
              {/*Yesterday Tab Start*/}
              <div className={`tab-pane ${activeTab === 'v-pills-2' ? 'show active' : ''}`} id="v-pills-2">
                <div className="row my-3">
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-note-list text-light-blue s-48" />
                        </div>
                        <div className="counter-title">Web Projects</div>
                        <h5 className="sc-counter mt-3">3000</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-mail-envelope-open s-48" />
                        </div>
                        <div className="counter-title ">Premium Themes</div>
                        <h5 className="sc-counter mt-3">1000</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "50%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-stop-watch3 s-48" />
                        </div>
                        <div className="counter-title">Support Requests</div>
                        <h5 className="sc-counter mt-3">600</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="counter-box white r-5 p-3">
                      <div className="p-4">
                        <div className="float-right">
                          <span className="icon icon-inbox-document-text s-48" />
                        </div>
                        <div className="counter-title">Support Requests</div>
                        <h5 className="sc-counter mt-3">525</h5>
                      </div>
                      <div className="progress progress-xs r-0">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "25%" }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={128}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-3">
                  <div className="col-md-12">
                    <div className="white p-5 r-5">
                      <div style={{ height: 528 }}>
                        <canvas
                          data-chart="line"
                          data-dataset="[
                                          [0,528,228,728,528,1628,0],
                                          [0,628,228,1228,428,1828,0],
                                          ]"
                          data-labels="['Blue','Yellow','Green','Purple','Orange','Red','Indigo']"
                          data-dataset-options="[
                                      { label:'Sales', borderColor:  'rgba(54, 162, 235, 1)', backgroundColor: 'rgba(54, 162, 235,1)'},
                                      { label:'Orders', borderColor:  'rgba(255,99,132,1)', backgroundColor: 'rgba(255, 99, 132, 1)' }]"
                          data-options="{
                                          maintainAspectRatio: false,
                                          legend: {
                                              display: true
                                          },
                              
                                          scales: {
                                              xAxes: [{
                                                  display: true,
                                                  gridLines: {
                                                      zeroLineColor: '#eee',
                                                      color: '#eee',
                                                
                                                      borderDash: [5, 5],
                                                  }
                                              }],
                                              yAxes: [{
                                                  display: true,
                                                  gridLines: {
                                                      zeroLineColor: '#eee',
                                                      color: '#eee',
                                                      borderDash: [5, 5],
                                                  }
                                              }]
                              
                                          },
                                          elements: {
                                              line: {
                                              
                                                  tension: 0.4,
                                                  borderWidth: 1
                                              },
                                              point: {
                                                  radius: 2,
                                                  hitRadius: 10,
                                                  hoverRadius: 6,
                                                  borderWidth: 4
                                              }
                                          }
                                      }"
                        ></canvas>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Yesterday Tab Start*/}
              {/*Yesterday Tab Start*/}
              <div className={`tab-pane ${activeTab === 'v-pills-3' ? 'show active' : ''}`} id="v-pills-3">
                <div className="row">
                  <div className="col-md-4 mx-md-auto m-5">
                    <div className="card no-b shadow">
                      <div className="card-body p-4">
                        <div>
                          <i className="icon-calendar-check-o s-48 text-primary" />
                          <p className="p-t-b-20">
                            Hey Soldier welcome back signin now there is lot of new
                            stuff waiting for you
                          </p>
                        </div>
                        <form action="dashboard2.html">
                          <div className="form-group has-icon">
                            <i className="icon-calendar" />
                            <input
                              className="form-control form-control-lg datePicker"
                              placeholder="Date From"
                              type="text"
                            />
                          </div>
                          <div className="form-group has-icon">
                            <i className="icon-calendar" />
                            <input
                              className="form-control form-control-lg datePicker"
                              placeholder="Date TO"
                              type="text"
                            />
                          </div>
                          <input
                            className="btn btn-success btn-lg btn-block"
                            defaultValue="Get Data"
                            type="submit"
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Yesterday Tab Start*/}
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

export default Index