describe('M.Collection', function() {

    var TEST = {};

    it('creating collection', function() {

        assert.typeOf(M.Collection, 'function', 'M.Collection is defined');

        TEST.Developer = M.Model.extend({
            idAttribute: 'id',
            entity: {
                name: 'Developer',
                fields:  {
                    sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                    firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                    age:         { type: M.CONST.TYPE.INTEGER }
                }
            }
        });

        assert.ok(typeof TEST.Developer === 'function', 'Developer model successfully extended.');

        TEST.DeveloperCollection = M.Collection.extend({
            model: TEST.Developer
        });

        assert.ok(typeof TEST.DeveloperCollection === 'function', 'Developer collection successfully extended.');

        TEST.Developers = TEST.DeveloperCollection.create();

        assert.ok(typeof TEST.Developers === 'object', 'Developer collection successfully created.');
    });
        /**
         * TEST: Adding records
         */

    it('adding data', function() {

        TEST.Developers.add({
            sureName: 'Laubach',
            firstName: 'Dominik',
            age: 27
        }).add({
            sureName: 'Hanowski',
            firstName: 'Marco',
            age: 27
        }).add({
            sureName: 'Stierle',
            firstName: 'Frank',
            age: 43
        }).add({
            sureName: 'Werler',
            firstName: 'Sebastian',
            age: 30
        }).add({
            sureName: 'Buck',
            firstName: 'Stefan',
            age: 26
        });

        assert.ok(TEST.Developers.length === 5, 'All records were added.');

        assert.ok(TEST.Developer.prototype.isPrototypeOf(TEST.Developers.at(0)), 'Records successfully converted to model records.');

    });

    it('sorting data', function() {

        /**
         * TEST: Sorting
         */

        TEST.Developers.sort({ 'sort' : { 'sureName': -1 } } );

        var p1 = TEST.Developers.at(0);
        assert.ok(p1.get('sureName') === 'Werler', 'Records correctly sorted descending by "sureName".');

        TEST.Developers.comparator = function(m1, m2) {
            return m2.get('age') - m1.get('age');
        };
        TEST.Developers.sort();

        var p2 = TEST.Developers.at(0);
        assert.ok(p2.get('sureName') === 'Stierle', 'Records correctly sorted by passed in sort function');

    });

    it('filtering data', function() {
        /**
         * TEST: Filtering
         */

        /* filter all devs older or equal to 26 */
        var a1 = TEST.Developers.filter(function(rec) {
            return rec.get('age') >= 26;
        });

        assert.ok(a1.length === 5, 'Records successfully filtered. Everyone is 26 or older.');

        /* filter all devs older than 26 */
        var a2 = TEST.Developers.filter(function(rec) {
            return rec.get('age') > 26;
        });

        assert.ok(a2.length === 4, 'Records successfully filtered. One dev is younger than 27.');

    });

    it('finding data', function() {

        /**
         * TEST: find
         */
        TEST.Developers.reset();
        TEST.Developers.add({
            sureName: 'Laubach',
            firstName: 'Dominik',
            age: 27
        }).add({
            sureName: 'Hanowski',
            firstName: 'Marco',
            age: 27
        }).add({
            sureName: 'Stierle',
            firstName: 'Frank',
            age: 43
        }).add({
            sureName: 'Werler',
            firstName: 'Sebastian',
            age: 30
        }).add({
            sureName: 'Buck',
            firstName: 'Stefan',
            age: 26
        });

        var result = TEST.Developers.select({
            query: { sureName: 'Stierle' }
        });

        assert.ok(typeof result === 'object', 'Find for value has a response object.');

        assert.ok(M.isCollection(result), 'The response is a M.Collection.');

        assert.ok(result.length === 1, 'The response holds one record.');

        // get first person record
        var p = result.at(0);

        assert.ok(p.get('sureName') === 'Stierle', 'Field "sureName" has correct value.');

        // SELECT *  FROM Developer WHERE firstName like 'S%'
        result = TEST.Developers.select({
            query: { firstName: /^S/ }
        });

        assert.ok(typeof result === 'object', 'Find with RegEx has a response object.');

        assert.ok(result.length === 2, 'The response holds 2 records.');

        // SELECT *  FROM Developer WHERE sureName like '%er%' OR (age > 25 AND age <= 26)
        result = TEST.Developers.select({
            query: { $or: [
                { sureName: /.?er/ }, // should match 'Stierle' and 'Werler'
                { age: { $gt: 25, $lte: 26 } } ] // should match Stefan Buck '26'
            },
            sort: ['age']
        });

        assert.typeOf(result, 'object', 'Find with $or, $gt, $lte and sort by "age" has a response object.');

        assert.equal(result.length, 3, 'The response holds 3 records.');

        var d1 = result.at(0); // has to be Stefan Buck
        assert.equal(d1.get('sureName'), 'Buck', 'The first developer field "sureName" has correct value.');

        var d2 = result.at(1); // has to be Sebastian Werler
        assert.equal(d2.get('sureName'), 'Werler', 'The second developer field "sureName" has correct value.');

        var d3 = result.at(2); // has to be Frank Stierle
        assert.equal(d3.get('sureName'), 'Stierle', 'The third developer field "sureName" has correct value.');

    });

});
