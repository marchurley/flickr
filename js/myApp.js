//myApp module with ngMessages & ngAnimate as dependencies //
angular.module('myApp', ['ngMessages', 'ngAnimate'])


//config function to properly configure the header//
.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
})


//controller function with $scope, $http, $sce, $q, $timeout as arguments //
.controller('MyCtrl', function($scope, $http, $sce, $q, $timeout) {
    
    //Set this as vm for easier and even reference with html //
    var vm = this;

    //creating trusted source url to load into html for image //
    vm.trustSrc = function(src) {
      return $sce.trustAsResourceUrl(src);
    };

    //Wait function to defer for 0.5 seconds//
    function wait() {
        var defer = $q.defer();

        $timeout(function(){
            defer.resolve();
        }, 500);
        return defer.promise;
    }


    //searchFlickrs function that gets called when user clicks submit. It validates form, displayes loading and does the flickr API call//
    vm.searchFlickr = function(searchTag) {
        
        //If Statement to see if form is valid //
        if( this.userInputForm.$valid ) {
            //display loading //
            vm.loading = true;
            //create searchTag //
            vm.searchTag = searchTag;
            //set flickr API url //
            var url = "https://api.flickr.com/services/rest";
            //set request parameters for flickr API //
            var request = {
                method: 'flickr.photos.search',
                api_key: "a04edf71f1fae0d976c341d324cae2f4",
                tags: searchTag,
                format: 'json',
                nojsoncallback: 1
            };

            //$http function to flickr url with above specified parameters //
            $http({
                url: url,
                params: request
            })
            //then promise to run when API call successful //
            .then(function(response) {
                //wait function gets called and then promise to display the pictures //
                wait().then(function(){
                    vm.loading = false;
                    vm.results = response.data.photos.photo;
                    vm.pictureUrl1 = "https://farm";
                    vm.pictureUrl2 = ".staticflickr.com/";
                    vm.pictureUrl3 = "/";
                    vm.pictureUrl4 = "_";
                    vm.pictureUrl5 = ".jpg"
                });
            },       
            function(response) {
                alert("We could not perform the Flickr-Search. Please try again");
            });
            //Empty Input field //
            vm.searchTag ="";
        } else {
            alert("Please enter a valid search query");
        }
    }


});