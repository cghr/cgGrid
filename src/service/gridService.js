angular.module('cgGrid.gridFactory', ['cgGrid.config'])
    .factory('GridFactory', function GridFactory(GridConfig, $http, $location, $log) {

        GridFactory.data = {}

        GridFactory.getData = function () {

            var dataUrl = GridConfig.getGridServiceBaseUrl + $location.url()

            function success(data) {
                GridFactory.data = data
            }

            function err() {
                $log.error('Failed to fetch data for ' + dataUrl)
            }

            return $http.get(dataUrl).success(success).error(err)
        }
        
        return GridFactory

    })
