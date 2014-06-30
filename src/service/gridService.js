angular.module('cgGrid.service', ['cgGrid.config'])
    .factory('GridService', function (GridConfig, $http, $location) {

        var getData = function () {
            var gridBaseUrl = GridConfig.getGridServiceBaseUrl()
            var currentLocation = $location.url()

            var dataUrl = gridBaseUrl + currentLocation
            return $http.get(dataUrl)
        }

        return {
            getData: getData
        }
    })
