//testing app

describe('app', function() {

    it('defines app namespace', function() {
        expect(app).toBeDefined();
    });

    it('defines countries array', function() {
        expect(countries).toBeDefined();
    });

    it('defines countries array', function() {
        expect(countries).toBeDefined();
    });


    describe('contains function', function() {

        it('is defined', function() {
            expect(contains).toBeDefined();
            expect(typeof contains).toEqual('function');
        });

        it('returns true if array contains object', function() {
            var obj = {
                my: 'attribute'
            };
            var array = [1, 2, obj, 3];
            //test the function
            var ret = contains(array, obj);
            //
            expect(ret).toEqual(true);
        });

        it('returns false if array does not contain object', function() {
            var obj = {
                my: 'attribute'
            };
            var array = [1, 2, 3];
            //test the function
            var ret = contains(array, obj);
            //
            expect(ret).toEqual(false);
        });

    });

});//describe