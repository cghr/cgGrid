angular.module('cgGrid.jsonUtil', ['cgGrid.lodash'])
    .factory('JsonUtil', function (_) {

    	function getKeys(json){
    		return _.keys(json);
    	}
    	function getHeaders(size,type){

    		return _.range(size)
    		.map(function(){
    			return type
    		})

    	}
    	



        function transformJsonArray(jsonArray) {

            var gridData = _.map(jsonArray, function (obj, index) {
                return { id: ++index, data: _.values(obj) }
            });

            var keys=getKeys(jsonArray[0]);
            var transformedData={
            	headings:keys.join(','),
            	filters:getHeaders(keys.length,'#text_filter').join(','),
            	sortings:getHeaders(keys.length,'str').join(','),
            	data:{rows:gridData}
            };
            return transformedData;
        }

        return { jsonToArray: transformJsonArray }
    });