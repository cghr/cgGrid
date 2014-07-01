angular.module('cgGrid.jsonUtil', ['cgGrid.lodash'])
    .factory('JsonUtil', function (_) {

        var transformJsonArray=function (jsonArray) {

            var i = 0;
            return _.map(jsonArray, function (obj) {
                return { id: i++, data: _.values(obj) }
            })

        }

        return {
            jsonToArray: transformJsonArray
        };
    });