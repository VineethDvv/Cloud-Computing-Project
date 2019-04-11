var ContentApp = angular.module("contentApp", []);

ContentApp.controller("hospitalController", function ($scope, $http) {
    $scope.profAddress = JSON.parse(localStorage.profileInfo).address;
    $scope.hosp = false;
    console.log($scope.profAddress);
    $http.get('https://api.foursquare.com/v2/venues/explore?client_id=UI4R30BP32O2W3TNNZ4KUQVSXSNFHWATY3MK1XT0SDGRVY0V&client_secret=ZC5VMUCFNK1GR3N1F1SWSW1KF2DSJQVKXTLPOKP2VVR4RGUA&v=20180323&limit=3&near=' + $scope.profAddress + '&query=hospitals').then(function (data) {
        console.log(data);
        $scope.hospitalsList = [];
        for (var i = 0; i < data.data.response.groups[0].items.length; i++) {
            $scope.hospitalsList[i] = {
                "name": data.data.response.groups[0].items[i].venue.name
            };
        }
    });

});

