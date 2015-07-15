//testing app

describe('app', function() {

    var ret;

    it('defines app namespace', function() {
        expect(app).toBeDefined();
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
            ret = contains(array, obj);
            //
            expect(ret).toEqual(true);
        });

        it('returns false if array does not contain object', function() {
            var obj = {
                my: 'attribute'
            };
            var array = [1, 2, 3];
            //test the function
            ret = contains(array, obj);
            //
            expect(ret).toEqual(false);
        });

    });

    describe('browserSupportsCSSProperty', function() {

        it('is defined', function() {
            expect(browserSupportsCSSProperty).toBeDefined();
        });

        it('returns true if browser supports CSS property', function() {
            ret = browserSupportsCSSProperty('width');
            expect(ret).toEqual(true);
        });

        it('returns false if browser does not support CSS property', function() {
            ret = browserSupportsCSSProperty('ssss');
            expect(ret).toEqual(false);
        });

    });

    it('defines MiniCVModel', function() {
        expect(MiniCVModel).toBeDefined();
        //expect(MiniCVModel.urlRoot).toEqual('./data/mini-cv.json');
    });

    it('defines MiniCVCollection', function() {
        expect(MiniCVCollection).toBeDefined();
    });

    it('defines miniCVstations', function() {
        expect(miniCVstations).toBeDefined();
    });

    it('defines MiniCVView', function() {
        expect(MiniCVView).toBeDefined();
    });

    it('defines miniCVview', function() {
        expect(miniCVview).toBeDefined();
    });


/*
    it('sets portfolio link', function() {
        expect($('#komasurfer-link').attr('href')).toEqual('http://koma' + 'surfer.com/' + 'portfolio/');
    });
*/


});//describe