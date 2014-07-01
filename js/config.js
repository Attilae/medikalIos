function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
    FastClick.attach(document.body);    
}

var onDeviceReady = function() {
    document.addEventListener("backbutton", handleDeviceBackButton, false);
}


function handleDeviceBackButton() {
    angular.element('[ng-controller=AppCtrl]').scope().goHome();
}

