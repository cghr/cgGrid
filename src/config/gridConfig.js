angular.module('cgGrid.config', ['cgGrid.lodash'])
    .factory('GridConfig', function ($rootScope, _) {

        var gridServiceBaseUrl = function () {

            if (_.isUndefined($rootScope.serviceBaseUrl))
                throw  'Service base url not found in $rootScope'

            return $rootScope.serviceBaseUrl + 'api/GridService'
        }

        var config = {
            width: '600px',
            height: '300px',
            autoUpdate: false,
            autoUpdateInterval: 10000,
            imagePath: 'assets/dhtmlx/imgs/',
            skin: 'modern',
            pagingSkin: 'bricks',
            paging: true,
            recordsPerPage: 500,
            getGridServiceBaseUrl: gridServiceBaseUrl
        }

        return config
    });
