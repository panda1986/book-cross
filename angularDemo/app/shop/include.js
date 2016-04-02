(function(){
  var app = angular.module('gem_include',[]);
  app.directive("productDescription" ,function (){ //包含一个html页面，包含的页面可以引用父页面的angularjs标签
    return {
      restrict:"E",//A类型限制html引用该模板时使用<productDescription>替代div
      templateUrl:"product-description.html"
    };
  });

  app.directive("productSpecs",function(){
    return {
      restrict:"A",//A类型限制html引用该模板时使用<div product-specs>
      templateUrl:"product-specs.html"
    };
  });

  app.directive("productTabs",function(){
    return {
      restrict:"E",
      templateUrl:"product-tabs.html",
      controller:function(){
        this.tab = 1;
        this.setTab = function(newValue){ //在控制器中定义一个匿名函数
          this.tab = newValue;
        };
        this.isSet = function(tabName){
          return this.tab === tabName;
        };
      },
      controllerAs:"tab"
    };
  });

  app.directive('productGallery',function(){
    return {
      restrict:"E",
      templateUrl:"product-gallery.html",
      controller:function(){   //匿名的controller，只能在当前的directive引用的html下使用，更加安全
        this.current = 0;
        this.setCurrent = function(newGallery){
          this.current = newGallery || 0;
        };
      },
      controllerAs:"gallery"
    }
  });
})();