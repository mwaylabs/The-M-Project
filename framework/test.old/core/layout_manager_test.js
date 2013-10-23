test('M.LayoutManager Test', function() {

    ok(M.hasOwnProperty('LayoutManager'), 'M.LayoutManager is defined.');

    ok(M.LayoutManager.getObjectType() === 'M.LayoutManager', 'The type of M.LayoutManager is M.LayoutManager.');

    ok(M.LayoutManager.hasOwnProperty('setLayout') && typeof M.LayoutManager.setLayout === 'function', 'M.LayoutManager has a setLayout() method.');

    ok(M.LayoutManager.hasOwnProperty('setContent') && typeof M.LayoutManager.setContent === 'function', 'M.LayoutManager has a setContent() method.');

});