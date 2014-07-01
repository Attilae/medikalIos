'use strict';

/* App Module */
var mediaApp = angular.module('mediaApp', ['ionic', 'ngResource', 'google-maps', 'hmTouchevents', 'ng-iscroll'])

mediaApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
            .state('menu', {
        abstract: true,
        url: "/menu",
        templateUrl: "menu.html"
    })
            /* Could update home to be in it's own separate file */
            .state('menu.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "views/home.html"
            }
        }
    })
            .state('menu.medicines', {
        url: "/medicines",
        views: {
            'menuContent': {
                templateUrl: "views/medicines.html",
                controller: "MedicinesCtrl"
            }
        }
    })
            .state('menu.medicinesfull', {
        url: "/medicinesfull",
        views: {
            'menuContent': {
                templateUrl: "views/medicinesfull.html",
                controller: "MedicinesFullCtrl"
            }
        }
    })
            .state('menu.searchmedicines', {
        url: "/searchmedicines/:name",
        views: {
            'menuContent': {
                templateUrl: "views/searchmedicines.html",
                controller: "SearchmedicinesCtrl"
            }
        }
    })
            .state('menu.medicineview', {
        url: "/medicineview/:id",
        views: {
            'menuContent': {
                templateUrl: "views/medicineview.html",
                controller: "MedicineviewCtrl"
            }
        }
    })
    .state('menu.medicineleaflat', {
        url: "/medicineleaflat/:id",
        views: {
            'menuContent': {
                templateUrl: "views/medicineleaflat.html",
                controller: "MedicineleaflatCtrl"
            }
        }
    })
    .state('menu.productquestion', {
        url: "/productquestion/:id",
        views: {
            'menuContent': {
                templateUrl: "views/medicinequestion.html",
                controller: "ProductquestionCtrl"
            }
        }
    })
    .state('menu.questionsent', {
        url: "/questionsent",
        views: {
            'menuContent': {
                templateUrl: "views/questionsent.html",
                controller: "QuestionsentCtrl"
            }
        }
    })
            .state('menu.diseaselist', {
        url: "/diseaselist",
        views: {
            'menuContent': {
                templateUrl: "views/diseaselist.html",
                controller: "DiseaselistCtrl"
            }
        }
    })
            .state('menu.agy', {
        url: "/agy",
        views: {
            'menuContent': {
                templateUrl: "views/body/agy.html",
                controller: "AgyCtrl"
            }
        }
    })
            .state('menu.arc', {
        url: "/arc",
        views: {
            'menuContent': {
                templateUrl: "views/body/arc.html",
                controller: "ArcCtrl"
            }
        }
    })
            .state('menu.torok', {
        url: "/torok",
        views: {
            'menuContent': {
                templateUrl: "views/body/torok.html",
                controller: "TorokCtrl"
            }
        }
    })
            .state('menu.mellkas', {
        url: "/mellkas",
        views: {
            'menuContent': {
                templateUrl: "views/body/mellkas.html",
                controller: "MellkasCtrl"
            }
        }
    })
            .state('menu.hass', {
        url: "/hass",
        views: {
            'menuContent': {
                templateUrl: "views/body/hass.html",
                controller: "HassCtrl"
            }
        }
    })

            .state('menu.agyek', {
        url: "/agyek",
        views: {
            'menuContent': {
                templateUrl: "views/body/agyek.html",
                controller: "AgyekCtrl"
            }
        }
    })
            .state('menu.fenek', {
        url: "/fenek",
        views: {
            'menuContent': {
                templateUrl: "views/body/fenek.html",
                controller: "FenekCtrl"
            }
        }
    })
            .state('menu.hat', {
        url: "/hat",
        views: {
            'menuContent': {
                templateUrl: "views/body/hat.html",
                controller: "HatCtrl"
            }
        }
    })
            .state('menu.kar', {
        url: "/kar",
        views: {
            'menuContent': {
                templateUrl: "views/body/kar.html",
                controller: "KarCtrl"
            }
        }
    })
            .state('menu.lab', {
        url: "/lab",
        views: {
            'menuContent': {
                templateUrl: "views/body/lab.html",
                controller: "LabCtrl"
            }
        }
    })
    .state('menu.bor', {
        url: "/bor",
        views: {
            'menuContent': {
                templateUrl: "views/body/bor.html",
                controller: "BorCtrl"
            }
        }
    })
    .state('menu.szervezet', {
        url: "/szervezet",
        views: {
            'menuContent': {
                templateUrl: "views/body/szervezet.html",
                controller: "SzervezetCtrl"
            }
        }
    })
            .state('menu.disease', {
        url: "/disease/:id",
        views: {
            'menuContent': {
                templateUrl: "views/disease.html",
                controller: "DiseaseCtrl"
            }
        }
    })
            .state('menu.body', {
        url: "/body",
        views: {
            'menuContent': {
                templateUrl: "views/body.html",
                controller: "BodyCtrl"
            }
        }
    })
            .state('menu.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "views/search.html",
                controller: "SearchCtrl"
            }
        }
    })

            .state('menu.settings', {
        url: "/settings",
        views: {
            'menuContent': {
                templateUrl: "views/settings.html",
                controller: "SettingsCtrl"
            }
        }
    })
            .state('menu.places', {
        url: "/places",
        views: {
            'menuContent': {
                templateUrl: "views/places.html",
                controller: "PlacesCtrl"
            }
        }
    })
            .state('menu.placeslist', {
        url: "/placeslist/:city/:name/:zip_code",
        views: {
            'menuContent': {
                templateUrl: "views/placeslist.html",
                controller: "PlaceslistCtrl"
            }
        }
    })
            .state('menu.placeview', {
        url: "/placeview/:latitude/:longitude",
        views: {
            'menuContent': {
                templateUrl: "views/placeview.html",
                controller: "PlaceviewCtrl"
            }
        }
    })
    .state('menu.gpsplaceview', {
        url: "/placeview/:latitude/:longitude/:ownLat/:ownLng",
        views: {
            'menuContent': {
                templateUrl: "views/gpsplaceview.html",
                controller: "GpsPlaceviewCtrl"
            }
        }
    })
            .state('menu.gps', {
        url: "/gps",
        views: {
            'menuContent': {
                templateUrl: "views/gps.html",
                controller: "GpsCtrl"
            }
        }
    })
            .state('menu.conditions', {
        url: "/conditions",
        views: {
            'menuContent': {
                templateUrl: "views/conditions.html",
                controller: "ConditionsCtrl"
            }
        }
    })
            .state('menu.error', {
        url: "/error",
        views: {
            'menuContent': {
                templateUrl: "views/error.html",
                controller: "ErrorCtrl"
            }
        }
    }).state('menu.gpserror', {
        url: "/gpserror",
        views: {
            'menuContent': {
                templateUrl: "views/gpserror.html",
                controller: "GpserrorCtrl"
            }
        }
    });

    $urlRouterProvider.otherwise("/menu/home");
})

