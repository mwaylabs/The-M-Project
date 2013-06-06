test('M.Layout Test', function() {

    ok(M.hasOwnProperty('Layout'), 'M.Layout is defined.');

    ok(M.Layout.getObjectType() === 'M.Layout', 'The type of M.Layout is M.Layout.');

    ok(M.Layout.hasOwnProperty('_setContent') && typeof M.Layout._setContent === 'function', 'M.Layout has a _setContent() method.');

    ok(M.Layout.hasOwnProperty('_generateMarkup') && typeof M.Layout._generateMarkup === 'function', 'M.Layout has a _generateMarkup() method.');

});