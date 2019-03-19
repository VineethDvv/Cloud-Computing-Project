function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userDetails = {
        "name": profile.getName(),
        "email": profile.getEmail(),
        "address":"",
        "image_url": profile.getImageUrl()
    };
    localStorage.setItem("profileInfo",JSON.stringify(userDetails));
    location.replace("../ProfileInfo/profile_info.html");
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
var myApp = angular.module("HCDMSApp",[]);

myApp.controller("HCDMSController", function($scope){



    /** Login function**/
    $scope.login =  function(){

    }

});