test('M.LabelView Test', function() {

    ok(M.hasOwnProperty('LabelView'), 'M.LabelView is defined.');

    ok(M.LabelView.getObjectType() === 'M.LabelView', 'The type of M.LabelView is M.LabelView.');

    ok(M.LabelView.hasOwnProperty('_getValueForDOM') && typeof M.LabelView._getValueForDOM === 'function', 'M.LabelView has its own _getValueForDOM() method.');

    ok(M.LabelView.hasOwnProperty('_nl2br') && typeof M.LabelView._nl2br === 'function', 'M.LabelView has a _nl2br() method.');

    ok(M.LabelView.hasOwnProperty('_tab2space') && typeof M.LabelView._tab2space === 'function', 'M.LabelView has a _tab2space() method.');

    ok(M.LabelView.hasOwnProperty('_stringify') && typeof M.LabelView._stringify === 'function', 'M.LabelView has a _stringify() method.');

    ok(M.LabelView.hasOwnProperty('_replaceValue') && typeof M.LabelView._replaceValue === 'function', 'M.LabelView has a _replaceValue() method.');

    var label = M.LabelView.design({
        value: 'test\ntest\ntest\n\ntest'
    });
    label._nl2br();
    ok(label.value === 'test<br />test<br />test<br /><br />test', 'M.LabelView._nl2br() replaces all \n with <br/>.');

    label = M.LabelView.design({
        value: 'test	testtest		test1234'
    });
    label._tab2space();
    ok(label.value === 'test    testtest        test1234', 'M.LabelView._tab2space() replaces all \t with four white spaces.');

    label = M.LabelView.design({
        value: 456123
    });
    label._stringify();
    ok(label.value === String(456123), 'M.LabelView._stringify() forces the value of the label into a string (was number).');

    label = M.LabelView.design({
        value: {
            test: 123
        }
    });
    label._stringify();
    ok(label.value === String({test: 123}), 'M.LabelView._stringify() forces the value of the label into a string (was object).');

    label = M.LabelView.design({
        value: 'hello <%LABEL%> my <%LABEL%>friend!'
    });
    label._replaceValue(/ <%LABEL%>/g, '')
    ok(label.value === 'hello myfriend!', 'M.LabelView._replaceValue() replaces each occurrence of a search string with a given replacement.');

});