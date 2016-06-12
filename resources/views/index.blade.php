<!doctype html>
<!-- development mode -->
<html>
  <head>
    <meta charset="utf-8">
    <title>Moments</title>
    <link rel="stylesheet" href="css/vendor.css">
    <link rel="stylesheet" href="css/app.css">
  </head>
  <body ng-app="moments">

    <div class="toolbar">
      <div class="toolbar__left mr++">
        <lx-button lx-size="l" lx-color="black" lx-type="icon">
          <i class="mdi mdi-menu"></i>
        </lx-button>
      </div>
      <span class="toolbar__label fs-title">BnB</span>

      <div class="toolbar__right">
        <lx-search-filter lx-closed="true">
          <input type="text" ng-model="vm.toolbar">
        </lx-search-filter>

        <lx-dropdown lx-position="right" lx-over-toggle="true">
          <lx-dropdown-toggle>
            <lx-button lx-size="l" lx-color="black" lx-type="icon">
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

    <div class="sidebar">hello</div>

    <div ui-view></div>

    <!-- Application Dependencies -->
    <script src="bower_components/jquery/dist/jquery.js"></script>
    <script src="bower_components/velocity/velocity.js"></script>
    <script src="bower_components/moment/min/moment-with-locales.js"></script>
    <script src="bower_components/angular/angular.js"></script>
    <script src="bower_components/angular-ui-router/release/angular-ui-router.js"></script>
    <script src="bower_components/satellizer/satellizer.js"></script>
    <script src="bower_components/lumx/dist/lumx.js"></script>

    <!-- Application Scripts -->
    <script src="app/app.js"></script>

    <script src="http://localhost:35729/livereload.js"></script>
  </body>

</html>
