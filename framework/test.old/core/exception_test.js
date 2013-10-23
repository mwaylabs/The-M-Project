test('M.Exception implementation', function() {
    ok(M.Exception, 'M.Exception is defined');
    ok(typeof M.Exception === 'object', 'M.Exception is an object');

    ok(M.Exception._type && M.Exception._type === 'M.Exception', 'M.Exception._type is M.Exception');
    ok(typeof M.Exception._type === 'string', 'M.Exception._type is a string');

    ok(M.Exception.hasOwnProperty('message') && typeof M.Exception.message === 'string', 'M.Exception.message is defined.');
    ok(M.Exception.hasOwnProperty('name') && typeof M.Exception.name === 'string', 'M.Exception.name is defined.');
    ok(M.Exception.hasOwnProperty('getException') && typeof M.Exception.getException === 'function', 'M.Exception.getException is defined.');


    ok(M.Exception.hasOwnProperty('INVALID_INPUT_PARAMETER') && typeof M.Exception.INVALID_INPUT_PARAMETER === 'object', 'M.Exception.INVALID_INPUT_PARAMETER is defined.');
    ok(M.Exception.INVALID_INPUT_PARAMETER.hasOwnProperty('message') && typeof M.Exception.INVALID_INPUT_PARAMETER.message === 'string', 'M.Exception.INVALID_INPUT_PARAMETER.message is implemented.');
    ok(M.Exception.INVALID_INPUT_PARAMETER.hasOwnProperty('name') && M.Exception.INVALID_INPUT_PARAMETER.name === 'INVALID_INPUT_PARAMETER', 'M.Exception.INVALID_INPUT_PARAMETER.name is implemented.');

    ok(M.Exception.hasOwnProperty('RESERVED_WORD') && typeof M.Exception.INVALID_INPUT_PARAMETER === 'object', 'M.Exception.INVALID_INPUT_PARAMETER is defined.');
    ok(M.Exception.RESERVED_WORD.hasOwnProperty('message') && typeof M.Exception.RESERVED_WORD.message === 'string', 'M.Exception.RESERVED_WORD.message is implemented.');
    ok(M.Exception.RESERVED_WORD.hasOwnProperty('name') && M.Exception.RESERVED_WORD.name === 'RESERVED_WORD', 'M.Exception.RESERVED_WORD.name is implemented.');

    throws(function() {
        throw M.Exception.INVALID_INPUT_PARAMETER.getException();
        },/^M.Exception.INVALID_INPUT_PARAMETER/, M.Exception.INVALID_INPUT_PARAMETER.message);

    throws(function() {
        throw M.Exception.RESERVED_WORD.getException();
    },/^M.Exception.RESERVED_WORD$/, M.Exception.RESERVED_WORD.message);
});