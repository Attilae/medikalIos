'use strict';

mediaApp.controller('MainCtrl', function($scope, $timeout) {

    $scope.navTitle = 'Medikal';

    ionic.Platform.ready(function() {
        console.log("Cordova is ready");
        // Add device specific stuff here
    });



    /*
     $scope.toggle = true;
     $scope.hideAdv = function() {
     $scope.toggle=false;
     console.log("lfeuit")
     }
     
     $timeout(function() {
     $scope.toggle = false
     }, 3000);*/


});


mediaApp.controller('AppCtrl', function($scope, $location) {
    $scope.goHome = function() {

        if ((window.location) && (window.location.hash) && (window.location.hash.indexOf('home') > 0)) {
            navigator.app.exitApp();   // This will exit the application
        }
        else {
            $location.path('/home');  // This will redirect the application to home page

            if (!$scope.$$phase)
                $scope.$apply();
        }
    }
})

mediaApp.controller('ErrorCtrl', function($scope, $location) {

    ionic.Platform.ready(function() {
        console.log("Cordova is ready");
        // Add device specific stuff here
    });

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];
})

mediaApp.controller('QuestionsentCtrl', function($scope, $location) {

    ionic.Platform.ready(function() {
        console.log("Cordova is ready");
        // Add device specific stuff here
    });

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];
})

mediaApp.controller('GpserrorCtrl', function($scope, $location) {

    ionic.Platform.ready(function() {
        console.log("Cordova is ready");
        // Add device specific stuff here
    });

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];
})

mediaApp.controller('ConditionsCtrl', function($scope, $location) {

    $scope.navTitle = "Használati feltételek";


    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];

})

mediaApp.controller('MedicinesCtrl', function($scope, $window, $state) {
    $scope.navTitle = "Gyógyszerek";

    $scope.fixHeight = function() {
        $scope.viewCss = angular.element(document.querySelector('.view'));
        $scope.bodyCss = angular.element(document.querySelector('body'));
        $scope.mainCss = angular.element(document.querySelector('.mainCtrl'));

        $scope.viewCss.css("top", "20px");
        $scope.viewCss.css("top", "20px");
        $scope.mainCss.css("top", "20px");
    }

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.master = {};
    $scope.name = "";


    $scope.update = function(medicines) {
        $scope.master = angular.copy(medicines);
    };

    $scope.reset = function() {
        $scope.medicines = angular.copy($scope.master);
    };

    $scope.reset();

    $scope.searchMedicines = function() {

        $scope.name = $scope.medicines.name;

        /* $scope.viewCss = angular.element(document.querySelector('.view'));
         $scope.bodyCss = angular.element(document.querySelector('body'));
         $scope.mainCss = angular.element(document.querySelector('.mainCtrl'));
         
         $scope.viewCss.css("top", "20px");
         $scope.viewCss.css("top", "20px");
         $scope.mainCss.css("top", "20px");*/

        if ($scope.name != null) {
            $state.go('menu.searchmedicines', {
                name: $scope.name
            });
        }
    }

    $scope.fullList = function() {
        $state.go('menu.medicinesfull');
    }

});

mediaApp.controller('SearchmedicinesCtrl', function($scope, $ionicLoading, $http, $stateParams, $state, $window, $templateCache) {

    $scope.navTitle = "Gyógyszerek";

    $scope.medicinesList = null;
    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('gyogyszerlista', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };

    $scope.show();



    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.name = $stateParams.name;

    $http({
        method: 'GET',
        url: 'http://medikal.hu/hu/search/jsonresult/name/' + $scope.name,
        data: {},
        timeout: 15000,
        cache: $templateCache
    }).success(function(result) {
        $scope.medicinesList = result;
        $scope.iScroll();
        $scope.hide();
    }).error(function(e) {
        $scope.hide();
        $state.go('menu.error');
    });

    $scope.medicineView = function(id) {

        //$location.path("menu.products");

        $state.go('menu.medicineview', {
            id: id
        });
    }


//console.log($scope.medicinesList.length);

    /*if ($scope.medicinesList) {
     console.log("lefut");
     setTimeout(function() {
     $scope.refreshiScroll();
     }, 0);
     }*/

})

mediaApp.controller('MedicineviewCtrl', function($scope, $ionicLoading, $stateParams, $state, $http, $window, $templateCache) {
    $scope.navTitle = "Gyógyszerek";

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };
    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.show();

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('gyogyszer', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }





    $stateParams.productId;

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $http({
        method: 'GET',
        url: 'http://medikal.hu/hu/products/jsonview/id/' + $stateParams.id,
        data: {},
        timeout: 15000,
        //cache: $templateCache
    }).success(function(result) {
        //console.log(result);
        $scope.product = result;
        $scope.iScroll();
        $scope.hide();
    }).error(function(e) {
        //console.log(e);
        $scope.hide();
        $state.go('menu.error');
    });

    $scope.question = function(id) {
        console.log(id);
        $state.go('menu.productquestion', {
            id: $stateParams.id
        });
    }

    $scope.leaflat = function(id) {
        //$window.open("http://medikal.hu/hu/products/leaflat/product/" + $stateParams.id, '_blank');
        $state.go('menu.medicineleaflat', {
            id: id
        });
    }



});

mediaApp.controller('MedicineleaflatCtrl', function($scope, $ionicLoading, $stateParams, $state, $http, $window, $templateCache, $sce) {
    $scope.navTitle = "Gyógyszerek";

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('betegtajekoztato', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };
    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.show();

    $stateParams.productId;

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    }

    $scope.frameUrl = $scope.trustSrc("https://medikal.hu/hu/products/leaflat/product/" + $stateParams.id);
    
    $scope.hide();

    /*$http({
     method: 'GET',
     url: "http://medikal.hu/hu/products/leaflat/product/" + $stateParams.id,
     data: {},
     timeout: 15000,
     cache: $templateCache
     }).success(function(result) {
     console.log(result);
     $scope.frameUrl = result;
     //$scope.iScroll();
     $scope.hide();
     }).error(function(e) {
     //console.log(e);
     $scope.hide();
     $state.go('menu.error');
     });*/

});

mediaApp.controller('DiseaselistCtrl', function($scope, $location) {
    $scope.navTitle = "Tünetek";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];
});

mediaApp.controller('AgyCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Agy";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('ArcCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Arc";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('TorokCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Torok";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('MellkasCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Mellkas";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('HassCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Has";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('AgyekCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Ágyék";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('LabCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Láb";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('KarCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Kar";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('HatCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Hát";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('BorCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Bőr";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('SzervezetCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Szervezet";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('FenekCtrl', function($scope, $window) {
    $scope.navTitle = "Tünetek: Fenék";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
});

mediaApp.controller('BodyCtrl', function($scope, $location, preloader, $interval) {
    $scope.navTitle = "Tünetek";

    $scope.stop;

    $scope.i = 0;

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $location.path("/");
            }
        }];


    $scope.doSomething = function() {
        $location.path("/diseaselist");
    };

    $scope.isLoading = true;
    $scope.isSuccessful = false;
    $scope.percentLoaded = 0;

    // I am the image SRC values to preload and display./
    // --
    // NOTE: "cache" attribute is to prevent images from caching in the
    // browser (for the sake of the demo).
    $scope.imageLocations = [
        ("img/body/00.png"),
        ("img/body/05.png"),
        ("img/body/10.png"),
        ("img/body/15.png"),
        ("img/body/25.png"),
        ("img/body/30.png"),
        ("img/body/35.png"),
        ("img/body/40.png"),
        ("img/body/45.png"),
        ("img/body/50.png"),
        ("img/body/55.png"),
        ("img/body/60.png"),
        ("img/body/65.png"),
        ("img/body/70.png"),
        ("img/body/75.png"),
        ("img/body/80.png"),
        ("img/body/85.png"),
        ("img/body/90.png"),
        ("img/body/95.png"),
    ];



    // Preload the images; then, update display when returned.
    preloader.preloadImages($scope.imageLocations).then(
            function handleResolve(imageLocations) {

                // Loading was successful.
                $scope.isLoading = false;
                $scope.isSuccessful = true;

                console.info("Preload Successful");

            },
            function handleReject(imageLocation) {

                // Loading failed on at least one image.
                $scope.isLoading = false;
                $scope.isSuccessful = false;

                console.error("Image Failed", imageLocation);
                console.info("Preload Failure");

            },
            function handleNotify(event) {

                $scope.percentLoaded = event.percent;

                //console.info("Percent loaded:", event.percent);

            }
    );

    $scope.front = true;
    $scope.side = false;
    $scope.back = false;


    $scope.rotateStart = function() {
        console.log("start")
        $scope.stop = $interval(function() {
            $scope.rotate();
        }, 100, 10);
    }

    $scope.rotateStop = function() {
        console.log("stop")
        $interval.cancel($scope.stop);
        $scope.stop = undefined;
    }

    $scope.rotate = function() {

        $scope.i = $scope.i + 5;
        if ($scope.i == 100) {
            $scope.i = 0;
        }

        console.log($scope.i);

        if ($scope.i == 25) {
            console.log("van ilyen")
            $scope.front = false;
            $scope.side = true;
            $scope.back = false;

        }
        if ($scope.i == 50) {
            $scope.front = false;
            $scope.side = false;
            $scope.back = true;
        }
        if ($scope.i == 75) {
            $scope.front = false;
            $scope.side = true;
            $scope.back = true;
        }
        if ($scope.i == 95) {
            $scope.front = true;
            $scope.side = false;
            $scope.back = false;
        }
        $scope.officeMap = $("#officeMap img");
        if ($scope.i < 10) {
            $scope.officeMap.attr('src', 'img/body/0' + $scope.i + '.png');
        } else {
            $scope.officeMap.attr('src', 'img/body/' + $scope.i + '.png');
        }
    }

});

mediaApp.controller('DiseaseCtrl', function($scope, $location, $stateParams, $state, $http, $ionicLoading, $window, $templateCache) {
    $scope.navTitle = "Tünet: " + $stateParams.id;

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };

    $scope.show();

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('tunet', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $http({
        method: 'GET',
        url: 'http://medikal.hu/hu/search/jsondiseaselist/disease/' + $stateParams.id,
        data: {},
        timeout: 15000,
        cache: $templateCache
    }).success(function(result) {
        $scope.disease = result;
        $scope.iScroll();
        $scope.hide();
    }).error(function(e) {
        $scope.hide();
        $state.go('menu.error');
    });

    $scope.medicineView = function(id) {

        //$location.path("menu.products");

        $state.go('menu.medicineview', {
            id: id
        });
    }
});


mediaApp.controller('MedicinesFullCtrl', function($scope, $window, $ionicLoading, $http, $state, $templateCache) {

    $scope.navTitle = "Gyógyszerek";

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };

    $scope.show();

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('teljeslista', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];


    $scope.selectedTestAccount = null;
    $scope.productList = [];
    $scope.query = {}
    $scope.queryBy = 'name'

    //var countUp = function() {
    $http({
        method: 'GET',
        url: 'list.json',
        data: {},
        cache: $templateCache
    }).success(function(result) {
        $scope.medicinesList = result;
        $scope.iScroll();
        $scope.hide();
    }).error(function(e) {

    })
    //}

    //$timeout(countUp, 500);

    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.medicineView = function(id) {

        //$location.path("menu.products");

        $state.go('menu.medicineview', {
            id: id
        });
    }

})



mediaApp.controller('ProductquestionCtrl', function($scope, $ionicLoading, $stateParams, $state, $http, $window) {
    $scope.navTitle = "Kérdőív";

    $stateParams.productId;

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('kerdoiv', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.iScroll();

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.sent = function() {

        //$location.path("menu.products");

        $state.go('menu.questionsent');
    }

});


mediaApp.controller('PlacesCtrl', function($scope, $state, $window) {

    $scope.navTitle = "Gyógyszertárkereső";

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.fixHeight = function() {
        $scope.viewCss = angular.element(document.querySelector('.view'));
        $scope.bodyCss = angular.element(document.querySelector('body'));
        $scope.mainCss = angular.element(document.querySelector('.mainCtrl'));

        $scope.viewCss.css("top", "20px");
        $scope.viewCss.css("top", "20px");
        $scope.mainCss.css("top", "20px");

    }

    $scope.master = {};
    $scope.name = "";
    $scope.zip_code = "";
    $scope.city = "";


    $scope.update = function(places) {
        $scope.master = angular.copy(places);
    };

    $scope.reset = function() {
        $scope.places = angular.copy($scope.master);
    };

    $scope.reset();

    $scope.searchPlace = function() {

        $scope.name = $scope.places.name;
        $scope.city = $scope.places.city;
        $scope.zip_code = $scope.places.zip_code;

        //$location.path("menu.products");

        if ($scope.name != null || $scope.city != null || $scope.zip_code != null) {
            $state.go('menu.placeslist', {
                name: $scope.name,
                city: $scope.city,
                zip_code: $scope.zip_code
            });
        }
    }

    $scope.gps = function() {

        /*if ($scope.name == "" && $scope.city == "" && $scope.zip_code == "") {
         */
        $state.go('menu.gps');
        /*
         }*/
    }

})

mediaApp.controller('PlaceslistCtrl', function($scope, $ionicLoading, $timeout, $http, $stateParams, $state, $window, $templateCache) {

    $scope.navTitle = "Gyógyszertárkereső";

    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };

    $scope.show();

    $scope.scroll = null;

    $scope.iScroll = function() {
        $scope.scroll && $scope.scroll.destroy();
        $scope.scroll = new iScroll('gyogyszertarlista', {
            hScroll: false
        });
        setTimeout(function() {
            $scope.scroll.refresh();
        }, 100);
    }

    $scope.hide = function() {
        $scope.loading.hide();
    };

    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];

    $scope.name = $stateParams.name;
    $scope.city = $stateParams.city;
    $scope.zip_code = $stateParams.zip_code;

    $http({
        method: 'GET',
        url: 'http://medikal.hu/hu/places/jsonsearch/city/' + $scope.city + '/zip_code/' + $scope.zip_code + '/name/' + $scope.name,
        data: {},
        timeout: 15000,
        cache: $templateCache
    }).success(function(result) {
        $scope.placesList = result;
        $scope.iScroll();
        $scope.hide();
    }).error(function(e) {
        //console.log(e);
        $scope.hide();
        $state.go('menu.error');
    });


    $scope.mapView = function(id, latitude, longitude) {

        //$location.path("menu.products");

        $state.go('menu.placeview', {
            latitude: latitude,
            longitude: longitude
        });
    }
})

mediaApp.controller('GpsCtrl', function($scope, $location, $ionicLoading, $stateParams, $state, $http, $window, $templateCache) {
    $scope.navTitle = "Gyógysztertárak";
    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Földrajzi hely meghatározása...'
        });
    };
    $scope.show2 = function() {
        $scope.loading2 = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };
    $scope.hide = function() {
        $scope.loading.hide();
    };
    $scope.hide2 = function() {
        $scope.loading2.hide();
    };
    $scope.show();
    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
    $scope.lat = "0";
    $scope.lng = "0";
    $scope.accuracy = "0";
    $scope.error = "";
    $scope.model = {
        myMap: undefined
    };
    $scope.myMarkers = [];
    $scope.showResult = function() {
        return $scope.error == "";
    }

    $scope.mapOptions = {
        center: new google.maps.LatLng($scope.lat, $scope.lng),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    $scope.showPosition = function(position) {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
        $scope.accuracy = position.coords.accuracy;
        $scope.$apply();
        var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
        console.log($scope.lat + " " + $scope.lng)

        $scope.geocoder = new google.maps.Geocoder();

        $scope.geocoder.geocode({
            'latLng': latlng
        }, function(results, status) {
            $scope.$apply(function() {

                if (status == google.maps.GeocoderStatus.OK) {


                    if (results[0]) {
                        for (var i = 0; i < results[0].address_components.length; i++)
                        {
                            if (results[0].address_components[i].types[0] == "postal_code") {
                                var postalCode = results[0].address_components[i].short_name;
                                $scope.hide();
                                $scope.show2();
                                $http({
                                    method: 'GET',
                                    url: 'http://medikal.hu/hu/places/jsonsearch/city//zip_code/' + postalCode,
                                    data: {},
                                    timeout: 10000,
                                    //cache: $templateCache
                                }).success(function(result) {
                                    console.log(result);
                                    $scope.placesList = result;
                                    $scope.hide2();
                                }).error(function(e) {
                                    //console.log(e);
                                    $scope.hide();
                                    $scope.hide2();
                                    $state.go('menu.gpserror');
                                });
                            }
                        }
                    }
                } else {
                    $scope.hide();
                    $scope.hide2();
                    $state.go('menu.gpserror');
                }
            })
        })
        /*$scope.model.myMap.setCenter(latlng);
         $scope.myMarkers.push(new google.maps.Marker({map: $scope.model.myMap, position: latlng}));*/
        $scope.hide();
    }

    $scope.showError = function(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                $scope.error = "User denied the request for Geolocation."
                $scope.hide();
                $state.go('menu.gpserror');
                break;
            case error.POSITION_UNAVAILABLE:
                $scope.error = "Location information is unavailable."
                $scope.hide();
                $state.go('menu.gpserror');
                break;
            case error.TIMEOUT:
                $scope.error = "The request to get user location timed out."
                $scope.hide();
                $state.go('menu.gpserror');
                break;
            case error.UNKNOWN_ERROR:
                $scope.error = "An unknown error occurred."
                $scope.hide();
                $state.go('menu.gpserror');
                break;
        }
        $scope.$apply();
    }

    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
        }
        else {
            $scope.hide();
            $scope.error = "Geolocation is not supported by this browser.";
            $state.go('menu.gpserror');
        }
    }

    $scope.getLocation();

    $scope.mapView = function(id, latitude, longitude) {

        //$location.path("menu.products");

        $state.go('menu.gpsplaceview', {
            latitude: latitude,
            longitude: longitude,
            ownLat: $scope.lat,
            ownLng: $scope.lng
        });
    }
})

mediaApp.controller('PlaceviewCtrl', function($scope, $location, $ionicLoading, $stateParams, $state, $http, $window) {
    $scope.navTitle = "Gyógysztertárak";
    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };
    $scope.hide = function() {
        $scope.loading.hide();
    };
    $scope.show();
    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
    $scope.latitude = $stateParams.latitude;
    $scope.longitude = $stateParams.longitude;
    $scope.map = {
        center: {
            latitude: $scope.longitude,
            longitude: $scope.latitude
        },
        zoom: 17
    };
    $scope.coords = {
        latitude: $scope.longitude,
        longitude: $scope.latitude
    }

    $scope.hide();
});

mediaApp.controller('GpsPlaceviewCtrl', function($scope, $ionicLoading, $stateParams, $window) {
    $scope.navTitle = "Gyógysztertárak";
    $scope.show = function() {
        $scope.loading = $ionicLoading.show({
            content: 'Betöltés...'
        });
    };
    $scope.hide = function() {
        $scope.loading.hide();
    };
    $scope.show();
    $scope.leftButtons = [{
            type: 'button-clear',
            content: 'Vissza',
            tap: function(e) {
                $window.history.back();
            }
        }];
    $scope.latitude = $stateParams.latitude;
    $scope.longitude = $stateParams.longitude;
    $scope.ownLatitude = $stateParams.ownLat;
    $scope.ownLongitude = $stateParams.ownLng;

    $scope.ownLine1 = new google.maps.LatLng($scope.ownLatitude, $scope.ownLongitude);
    $scope.ownLine2 = new google.maps.LatLng($scope.latitude, $scope.longitude);

    $scope.ownLine = [
        $scope.ownLine1,
        $scope.ownLine2
    ]

    $scope.map = {
        center: {
            latitude: $scope.ownLatitude,
            longitude: $scope.ownLongitude
        },
        zoom: 14
    };
    $scope.coords = {
        latitude: $scope.longitude,
        longitude: $scope.latitude
    }

    $scope.coordsOwn = {
        latitude: $scope.ownLatitude,
        longitude: $scope.ownLongitude
    }

    $scope.icon = "http://medikal.hu/public/skins/mediapp/images/marker.png";

    $scope.hide();
});




