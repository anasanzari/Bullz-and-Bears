<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Moments</title>
    <link rel="stylesheet" href="css/vendor.css" />
    <link rel="stylesheet" href="css/app.css" />
  </head>
  <body ng-app="moments" ng-controller="NavController">
    <div class="header">
      <div class="toolbar">
        <div `class="toolbar__left mr++">
          <lx-button lx-size="l" lx-color="white" lx-type="icon" ng-click="toggle()">
            <i class="mdi mdi-menu"></i>
          </lx-button>
        </div>
        <span class="toolbar__label fs-title">BnB</span>

        <div class="toolbar__right">
          <lx-search-filter lx-color="white" lx-closed="true">
            <input type="text" ng-model="vm.toolbar" />
          </lx-search-filter>

          <lx-dropdown lx-position="right" lx-over-toggle="true">
            <lx-dropdown-toggle>
              <lx-button lx-size="l" lx-color="white" lx-type="icon">
                <i class="mdi mdi-dots-vertical"></i>
              </lx-button>
            </lx-dropdown-toggle>

            <lx-dropdown-menu>
              <ul>
                <li>
                  <a class="dropdown-link">Action</a>
                </li>
                <li>
                  <a class="dropdown-link">Another action</a>
                </li>
                <li>
                  <a class="dropdown-link">Something else here</a>
                </li>
                <li class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-link dropdown-link--is-header">Header</a>
                </li>
                <li>
                  <a class="dropdown-link">Separated link</a>
                </li>
              </ul>
            </lx-dropdown-menu>
          </lx-dropdown>
        </div>
      </div>
    </div>

    <div class="sidebar" ng-class="{'sidebar-closed': !isOpen}">
      <div flex-container="row" flex-wrap>
        <div flex-item="12">

          <ul class="menu">
            <li ng-repeat="item in menu" class="menu-item">
              <a ui-sref="{{item.link}}"><i class="mdi {{item.img}}" ></i>
              {{ item.name }}
            </a>
            </li>
          </ul>

        </div>
      </div>

    </div>

    <div class="maincontainer" ng-class="{'main-sidebar-closed': !isOpen}">
      <div ui-view></div>
    </div>

      <!-- Application Dependencies -->
      <script src="bower_components/jquery/dist/jquery.min.js"></script>
      <script src="bower_components/velocity/velocity.min.js"></script>
      <script src="bower_components/moment/min/moment-with-locales.min.js"></script>
      <script src="bower_components/angular/angular.min.js"></script>
      <script src="bower_components/angular-resource/angular-resource.min.js"></script>
      <script src="bower_components/angular-animate/angular-animate.js"></script>
      <script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
      <script src="bower_components/satellizer/satellizer.min.js"></script>
      <script src="bower_components/lumx/dist/lumx.min.js"></script>

      <!-- Application Scripts -->
      <script src="app/app.js"></script>

    </body>

  </html>
