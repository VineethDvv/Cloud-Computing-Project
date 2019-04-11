function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userDetails = {
        "name": profile.getName(),
        "email": profile.getEmail(),
        "address":"",
        "image_url": profile.getImageUrl()
    };
    localStorage.setItem("profileInfo",JSON.stringify(userDetails));
    location.replace("../Home/homepage.html");
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
var myApp = angular.module("HCDMSApp",[]);
myApp.controller("HCDMSController", function($scope){
    $scope.config = {
        apiKey: "AIzaSyCvricC-7u-89RJt2pW0AsqcL5qPEcU0oc",
        authDomain: "cloud-project-c922a.firebaseapp.com",
        databaseURL: "https://cloud-project-c922a.firebaseio.com",
        projectId: "cloud-project-c922a",
        storageBucket: "",
        messagingSenderId: "507019406136"
    };
    firebase.initializeApp($scope.config);
    /** Registration Storage **/
    $scope.createReg = function(){
        $scope.regData = {
            "Name": $scope.regName,
            "Email": $scope.regEmail,
            "Phone-no":$scope.regPhno,
            "Address":$scope.regAddress,
            "Password":$scope.regPwd
        };
        $scope.userDetails = {
            "name": $scope.regName,
            "email": $scope.regEmail,
            "address": $scope.regAddress,
            "image_url": "profileImage.jpg"
        };

        /** firebaseRef to push regData into server**/
        firebaseRef = firebase.database().ref();
        firebaseRef.push().set($scope.regData).then(function(){
            alert("Successfully!! Created an account");
            location.replace("../ProfileInfo/profile_info.html");
            console.log("Data created successfully");
        });
        localStorage.setItem("profileInfo",JSON.stringify($scope.userDetails));
        if($scope.regPwd !== $scope.regRepeatPwd){
            alert("mismatch");
        }

    };

    /** Login function**/
    $scope.login =  function(){
        firebaseRef = firebase.database().ref('//');
        firebaseRef.once('value',function(snapshot){
            $scope.jsonData = snapshot.val();
            $scope.keys = Object.keys(snapshot.val());
            console.log($scope.keys);
            $scope.checkUser = false;
            console.log($scope.jsonData);
            for(var i =0;i<$scope.keys.length;i++){
                if($scope.jsonData[$scope.keys[i]].Email === $scope.loginEmail && $scope.jsonData[$scope.keys[i]].Password === $scope.loginPwd )
                {
                    $scope.checkUser = true;
                    $scope.userDetails = {
                        "name": $scope.jsonData[$scope.keys[i]].Name,
                        "email": $scope.jsonData[$scope.keys[i]].Email,
                        "address": $scope.jsonData[$scope.keys[i]].Address,
                        "image_url": "profileImage.jpg"
                    };
                    localStorage.setItem("profileInfo",JSON.stringify($scope.userDetails));
                    alert("Hello  " + $scope.jsonData[$scope.keys[i]].Name);

                }
            }
            if($scope.checkUser === false){
                alert("Invalid Credentials");
            }
        });
    }

});