var bcApp = angular.module('bcApp', ['ngRoute', 'bcControllers', 'bcServices', 'bcFilters', 'bcDirectives']);
var bcControllers = angular.module('bcControllers', []);
// the filters, for system to regenerate data.
var bcFilters = angular.module('bcFilters', []);
// the services, system model, RESTful data from backend api.
var bcServices = angular.module('bcServices', ['ngResource']);
var bcDirectives = angular.module('bcDirectives', []);

var links = {
    index: {
        mount: "/homepage"
    },
    homepage: {
        mount: "/homepage", link: "#/homepage",
        page: "views/homepage.html", controller: "CHomepage", text: "漂流概览"
    },
    book: {
        mount: "/book", link: "#/book",
        page: "views/book.html", controller: "CBookMgmt", text: "图书管理"
    }
};

// config the http interceptor.
bcApp.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('MHttpInterceptor')
}]);

// config the route
bcApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when(links.homepage.mount, {
            templateUrl: links.homepage.page, controller: links.homepage.controller
        })
        .when(links.book.mount, {
            templateUrl: links.book.page, controller: links.book.controller
        })
        .otherwise({
            redirectTo: links.homepage.mount
        });
}])
    .controller('CMain', ['$scope', function($scope) {
        // the navigator bind and update.
        $scope.navs = {
            homepage: {mount: links.homepage.mount, url: links.homepage.link, text: links.homepage.text, target:"_self"},
            book: {mount: links.book.mount, url: links.book.link, text: links.book.text, target:"_self"}
        };
        $scope.nav_active_homepage = function() {
            $scope.__nav_active = $scope.navs.homepage;
        };
        $scope.nav_active_book = function() {
            $scope.__nav_active = $scope.navs.book;
        };
        $scope.is_nav_selected = function(nav_or_navs) {
            if ($scope.__nav_active == nav_or_navs) {
                return true;
            }
            return false;
        };
        $scope.select_nav = function(nav_or_navs) {
            $scope.__nav_active = nav_or_navs;
        };
        $scope.nav_active_homepage();
    }]);

bcControllers.controller('CHomepage', ['$scope',function($scope){
    $scope.user = {
        role: "主任",
        name: "胡天辰"
    };
    $scope.$parent.nav_active_homepage();
}]);

bcControllers.controller('CBookMgmt', ['$scope',function($scope){
    $scope.info = {
        classes: ["一年1班", "一年2班", "一年3班", "一年4班", "二年1班", "二年2班", "二年3班"],
        books: []
    };
    $scope.$parent.nav_active_book();
}]);

bcServices.factory('MHttpInterceptor', function($q){
    // register the interceptor as a service
    // @see: https://code.angularjs.org/1.2.0-rc.3/docs/api/ng.$http
    // @remark: the function($q) should never add other params.
    return {
        'request': function(config) {
            return config || $q.when(config);
        },
        'requestError': function(rejection) {
            return $q.reject(rejection);
        },
        'response': function(response) {
            if (response.data.code && response.data.code != Errors.Success) {
                bc_on_error(response.data.code, response.status, response.data.desc);
                // the $q.reject, will cause the error function of controller.
                // @see: https://code.angularjs.org/1.2.0-rc.3/docs/api/ng.$q
                return $q.reject(response.data.code);
            }
            return response || $q.when(response);
        },
        'responseError': function(rejection) {
            code = bc_on_error(Errors.UIApiError, rejection.status, rejection.data);
            return $q.reject(code);
        }
    };
});