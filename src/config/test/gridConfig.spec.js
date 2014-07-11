describe('Service: GridConfig', function () {

    // load the service's module
    beforeEach(module('cgGrid.config'))

    // instantiate service
    var GridConfig, $rootScope
    beforeEach(inject(function ($rootScope, _GridConfig_) {
        $rootScope = $rootScope
        GridConfig = _GridConfig_

    }))


    it('should do verify default Grid Config and GridService Base url', function () {


        expect(GridConfig).toEqual({
            width: '600px',
            height: '300px',
            autoUpdate: false,
            autoUpdateInterval: 5000,
            imagePath: 'assets/dhtmlx/imgs/',
            skin: 'modern',
            pagingSkin: 'bricks',
            paging: true,
            recordsPerPage: 500,
            getGridServiceBaseUrl: 'api/GridService'})

    })

})
