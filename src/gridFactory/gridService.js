angular.module('cgGrid.gridFactory', ['cgGrid.config','cgGrid.jsonUtil'])
  .factory('GridFactory', function GridFactory(GridConfig, $http, $location, $log ,JsonUtil) {


    GridFactory.data = {}
    GridFactory.getData = getData

    function getData() {

      var dataUrl = GridConfig.getGridServiceBaseUrl + $location.url()

      return $http.get(dataUrl)
        .success(function (data) {
          GridFactory.data = JsonUtil.jsonToArray(data)
        })
        .error(function () {
          $log.error('Failed to fetch data for ' + dataUrl)
        })
    }

    return GridFactory

  })
