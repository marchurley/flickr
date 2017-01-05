angular.module('myApp', ['ngMessages', 'ngAnimate'])

.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
})

.controller('MyCtrl', function($scope, $http, $sce) {
    var vm = this;

    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    console.log("page loaded");


    vm.searchFlickr = function(searchTag) {
        if( this.userInputForm.$valid ) {

            console.log("form validated");

            vm.searchTag = searchTag;

            var url = "https://api.flickr.com/services/rest";

            var request = {
                method: 'flickr.photos.search',
                api_key: "a04edf71f1fae0d976c341d324cae2f4",
                tags: searchTag,
                format: 'json',
                nojsoncallback: 1
            };

            $http({
                url: url,
                params: request
            })
            .then(function(response) {
                vm.results = response.data.photos.photo;
                vm.pictureUrl1 = "https://farm";
                vm.pictureUrl2 = ".staticflickr.com/";
                vm.pictureUrl3 = "/";
                vm.pictureUrl4 = "_";
                vm.pictureUrl5 = ".jpg"
            },
            function(response) {
                console.log('error');
            });
        } else {
            console.log("form not validated");
            this.inputValidated = false;
            this.inputComplete = true;
        }
    }


});