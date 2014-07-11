angular.module('cgGrid.config', ['cgGrid.lodash'])
    .factory('GridConfig', function ($rootScope, _) {


        return {
            width: '600px',
            height: '300px',
            autoUpdate: false,
            autoUpdateInterval: 5000,
            imagePath: 'assets/dhtmlx/imgs/',
            skin: 'modern',
            pagingSkin: 'bricks',
            paging: true,
            recordsPerPage: 500,
            getGridServiceBaseUrl: 'api/GridService'
        }

    });
