describe('Factory: GridFactory', function () {


    var currentLocation = '/user/1';

    // load the service's module
    beforeEach(module('cgGrid.config'));
    beforeEach(module('cgGrid.gridFactory'));

    // instantiate service
    var GridFactory, location, httpBackend;

    beforeEach(inject(function (_GridFactory_, _$http_, _$location_, _$httpBackend_) {
        GridFactory = _GridFactory_;
        location = _$location_;
        location.url(currentLocation);
        httpBackend = _$httpBackend_;
    }));

    it('should  get Data from a Restful GridService in the required format', function () {

        var dataUrl = 'api/GridService' + currentLocation;
        var mockResp = [{username: 'user1', roles: 'user'}];
        
        var output={headings:'username,roles',filters:'#text_filter,#text_filter',sortings:'str,str',
        data:{rows:[{id:1,data:['user1','user']}]}
        }

        httpBackend.whenGET(dataUrl).respond(mockResp);
        
        expect(GridFactory.data).toEqual({})

        GridFactory.getData().then(function () {
            expect(GridFactory.data).toEqual(output)
        })

        httpBackend.flush();
    });


});

