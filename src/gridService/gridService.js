angular.module('cgGrid.service', ['cgGrid.config'])
    .factory('GridService', function (GridConfig, $http, $location) {



        // Public API here
        return {
            getData: function () {

                var dataUrl = GridConfig.getGridServiceBaseUrl() + $location.url();
                return $http.get(dataUrl);
            }
        };
    });
