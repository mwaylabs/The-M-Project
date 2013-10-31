test('M.Logger implementation', function() {

    // CLASS
    ok(M.Logger, 'M.Logger is defined');
    ok(typeof M.Logger === 'object', 'M.Logger is an object');
    ok(M.Logger._type && M.Logger._type === 'M.Logger', 'M.Logger._type is M.Logger');
    ok(typeof M.Logger._type === 'string', 'M.Logger._type is a string');

    // CONST defined
    ok(M.Logger.hasOwnProperty('_OUTPUT_LOG') , 'M.Logger._OUTPUT_LOG is defined.');
    ok(M.Logger.hasOwnProperty('_OUTPUT_DEBUG') , 'M.Logger._OUTPUT_DEBUG is defined.');
    ok(M.Logger.hasOwnProperty('_OUTPUT_WARN') , 'M.Logger._OUTPUT_WARN is defined.');
    ok(M.Logger.hasOwnProperty('_OUTPUT_ERROR') , 'M.Logger._OUTPUT_ERROR is defined.');
    ok(M.Logger.hasOwnProperty('_LEVEL_TIME_END') , 'M.Logger._LEVEL_TIME_END is defined.');

    ok(typeof M.Logger._OUTPUT_LOG === 'number', 'M.Logger._OUTPUT_LOG is a number.');
    ok(typeof M.Logger._OUTPUT_DEBUG === 'number', 'M.Logger._OUTPUT_DEBUG is a number.');
    ok(typeof M.Logger._OUTPUT_WARN === 'number', 'M.Logger._OUTPUT_WARN is a number.');
    ok(typeof M.Logger._OUTPUT_ERROR === 'number', 'M.Logger._OUTPUT_ERROR is a number.');
    ok(typeof M.Logger._LEVEL_TIME_END === 'number', 'M.Logger._LEVEL_TIME_END is a number.');

    ok(M.Logger._OUTPUT_LOG === 0, 'M.Logger._OUTPUT_LOG is 0.');
    ok(M.Logger._OUTPUT_DEBUG === 1, 'M.Logger._OUTPUT_DEBUG is 1.');
    ok(M.Logger._OUTPUT_WARN === 2, 'M.Logger._OUTPUT_WARN is 2.');
    ok(M.Logger._OUTPUT_ERROR === 3, 'M.Logger._OUTPUT_ERROR is 3.');
    ok(M.Logger._LEVEL_TIME_END === 4, 'M.Logger._LEVEL_TIME_END is 4.');

    // PROPERTIES defined
    ok(M.Logger.hasOwnProperty('filter') , 'M.Logger.filter is defined.');
    ok(M.Logger.hasOwnProperty('_times') , 'M.Logger._times is defined.');
    ok(M.Logger.hasOwnProperty('_counts') , 'M.Logger._counts is defined.');

    ok(_.isArray(M.Logger.filter), 'M.Logger.filter is a array.');
    ok(_.isArray(M.Logger._times), 'M.Logger._times is a array.');
    ok(_.isArray(M.Logger._counts), 'M.Logger._counts is a array.');

    // METHODS defined
    ok(M.Logger.hasOwnProperty('log') , 'M.Logger.log is defined.');
    ok(M.Logger.hasOwnProperty('warn') , 'M.Logger.warn is defined.');
    ok(M.Logger.hasOwnProperty('error') , 'M.Logger.error is defined.');
    ok(M.Logger.hasOwnProperty('time') , 'M.Logger.time is defined.');
    ok(M.Logger.hasOwnProperty('timeEnd') , 'M.Logger.timeEnd is defined.');
    ok(M.Logger.hasOwnProperty('count') , 'M.Logger.count is defined.');
    ok(M.Logger.hasOwnProperty('_print') , 'M.Logger._print is defined.');
    ok(M.Logger.hasOwnProperty('_time') , 'M.Logger._time is defined.');
    ok(M.Logger.hasOwnProperty('_timeEnd') , 'M.Logger._timeEnd is defined.');
    ok(M.Logger.hasOwnProperty('_count') , 'M.Logger._count is defined.');
    ok(M.Logger.hasOwnProperty('_appRunsInNotDebugMode') , 'M.Logger._appRunsInNotDebugMode is defined.');
    ok(M.Logger.hasOwnProperty('_preventOutputByTag') , 'M.Logger._preventOutputByTag is defined.');

    ok(typeof M.Logger.log === 'function', 'M.Logger.log is a function.');
    ok(typeof M.Logger.warn === 'function', 'M.Logger.warn is a function.');
    ok(typeof M.Logger.error === 'function', 'M.Logger.error is a function.');
    ok(typeof M.Logger.time === 'function', 'M.Logger.time is a function.');
    ok(typeof M.Logger.timeEnd === 'function', 'M.Logger.timeEnd is a function.');
    ok(typeof M.Logger.count === 'function', 'M.Logger.count is a function.');
    ok(typeof M.Logger._print === 'function', 'M.Logger._print is a function.');
    ok(typeof M.Logger._time === 'function', 'M.Logger._time is a function.');
    ok(typeof M.Logger._timeEnd === 'function', 'M.Logger._timeEnd is a function.');
    ok(typeof M.Logger._count === 'function', 'M.Logger._count is a function.');
    ok(typeof M.Logger._preventOutputByTag === 'function', 'M.Logger._preventOutputByTag is a function.');

});