test('M.Collection', function() {

    ok(typeof M.Collection === 'object', 'M.Collection is defined');

    TEST.Developer = M.Model.create({
        config: {
            name:   'developer',
            key:    'id',
            fields:  {
                sureName:    { type: M.CONST.TYPE.STRING,  required: YES, index: true },
                firstName:   { type: M.CONST.TYPE.STRING,  length: 200 },
                age:         { type: M.CONST.TYPE.INTEGER }
            }
        }
    });

    ok(typeof TEST.Developer === 'object', 'Developer model successfully created.');

    TEST.DeveloperCollection = M.Collection.create(TEST.Developer);

    ok(typeof TEST.DeveloperCollection === 'object', 'Developer collection successfully created.');

    /**
     * TEST: Adding records
     */

    TEST.DeveloperCollection.add({
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

    ok(TEST.DeveloperCollection.getCount() === 5, 'All records were added.');

    ok(M.Model.isPrototypeOf(TEST.DeveloperCollection.getAt(0)), 'Records successfully converted to model records.');


    /**
     * TEST: Sorting
     */

    TEST.DeveloperCollection.sortBy({
        property: 'sureName',
        order: M.CONST.ORDER.DESC
    });

    p1 = TEST.DeveloperCollection.getAt(0);
    ok(p1.get('sureName') === 'Werler', 'Records correctly sorted descending by "sureName".');

    TEST.DeveloperCollection.sortBy(function(rec1, rec2) {
        return rec1.get('age') - rec2.get('age');
    });

    p2 = TEST.DeveloperCollection.getAt(0);
    ok(p2.get('sureName') === 'Buck', 'Records correctly sorted by passed in sort function');

    /**
     * TEST: Filtering
     */

    /* filter all devs older or equal to 26 */
    TEST.DeveloperCollection.filter(function(rec) {
        return rec.get('age') >= 26;
    });

    ok(TEST.DeveloperCollection.getCount() === 5, 'Records successfully filtered. Everyone is 26 or older.');

    /* filter all devs older than 26 */
    TEST.DeveloperCollection.filter(function(rec) {
        return rec.get('age') > 26;
    });

    ok(TEST.DeveloperCollection.getCount() === 4, 'Records successfully filtered. One dev is younger than 27.');


    /**
     * TEST: chaining sort and filter
     */

    /* get the two oldest devs, older than 26 */
    TEST.DeveloperCollection.sortBy({
        property: 'age',
        order: M.CONST.ORDER.DESC
    }).filter(function(rec) {
       return rec.get('age') > 26;
    }, {
        limit: 2
    });

    var oldPerson1 = TEST.DeveloperCollection.getAt(0);
    var oldPerson2 = TEST.DeveloperCollection.getAt(1);

    ok(TEST.DeveloperCollection.getCount() === 2, 'Filter correctly applied');
    ok(oldPerson1.get('firstName') === 'Frank' && oldPerson2.get('firstName') === 'Sebastian', 'Sorting correctly applied');


    /**
     * TEST: find
     */
    TEST.DeveloperCollection.clear();
    TEST.DeveloperCollection.add({
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

    var result = TEST.DeveloperCollection.find({
        where: { sureName: 'Stierle' }
    });

    ok(typeof result === 'object', 'Find for value has a response object.');

    ok(M.Collection.isPrototypeOf(result), 'The response is a M.Collection.');

    ok(result.getCount() === 1, 'The response holds one record.');

    // get first person record
    var p = result.getAt(0);

    ok(p.get('sureName') === 'Stierle', 'Field "sureName" has correct value.');

    // SELECT *  FROM Developer WHERE firstName like 'S%'
    result = TEST.DeveloperCollection.find({
        where: { firstName: /^S/ }
    });

    ok(typeof result === 'object', 'Find with RegEx has a response object.');

    ok(result.getCount() === 2, 'The response holds 2 records.');

    // SELECT *  FROM Developer WHERE sureName like '%er%' OR (age > 25 AND age <= 26)
    result = TEST.DeveloperCollection.find({
        where: { $or: [
            { sureName: /.?er/ },
            { age: { $gt: 25, $lte: 26 } } ]
        },
        sort: ['age']
    });

    ok(typeof result === 'object', 'Find with $or, $gt, $lte and sort by "age" has a response object.');

    ok(result.getCount() === 3, 'The response holds 3 records.');

    var d1 = result.getAt(0); // has to be Stefan Buck
    ok(d1.get('sureName') === 'Buck', 'The first developer field "sureName" has correct value.');

    var d2 = result.getAt(1); // has to be Sebastian Werler
    ok(d2.get('sureName') === 'Werler', 'The second developer field "sureName" has correct value.');

    var d3 = result.getAt(2); // has to be Frank Stierle
    ok(d3.get('sureName') === 'Stierle', 'The third developer field "sureName" has correct value.');


});
