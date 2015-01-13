describe('Service: cgGrid.jsonUtil', function() {

    // load the service's module
    beforeEach(module('cgGrid.jsonUtil'));

    // instantiate service
    var JsonUtil;
    beforeEach(inject(function(_JsonUtil_) {
        JsonUtil = _JsonUtil_;
    }));

    //Uncomment the last expectation

    it('should do convert Json Array to Required Format ', function() {

        var users = [{
            'user': 'user1',
            'password': 'secret1'
        }, {
            'user': 'user2',
            'password': 'secret2'
        }, {
            'user': 'user3',
            'password': 'secret3'
        }];
        var usersArray = [{
            id: 1,
            data: ['user1', 'secret1']
        }, {
            id: 2,
            data: ['user2', 'secret2']
        }, {
            id: 3,
            data: ['user3', 'secret3']
        }];
        var output={
            headings:'user,password',
            filters:'#text_filter,#text_filter',
            sortings:'str,str',
            data:{rows:usersArray}
        };


        expect(JsonUtil.jsonToArray(users)).toEqual(output);

        var countries = [{
            'name': 'india',
            'continent': 'asia'
        }, {
            'continent': 'europe',
            'name': 'uk'
        }];
        var countriesArray = [
            ['india', 'asia'],
            ['uk', 'europe']
        ];


        //expect(JsonUtil.jsonToArray(countries)).toEqual(countriesArray);

    });

});