angular.module('cgGrid.jsonUtil', ['cgGrid.lodash'])
    .factory('JsonUtil', function (_) {

        function transformJsonArray(jsonArray) {

            return _.map(jsonArray, function (obj, index) {
                return { id: index++, data: _.values(obj) }
            })
        }

        return { jsonToArray: transformJsonArray }
    });