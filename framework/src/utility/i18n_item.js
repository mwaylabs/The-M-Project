M.I18NItem = M.Object.extend({

    _type: 'M.I18NItem',

    key: null,
    placeholder: null,

    create: function (key, placeholder) {
        if(!key) {
            return null;
        }

        this.key = key;
        if(placeholder) {
            this.placeholder = placeholder;
        }
        return _.extend({}, this);
    }
});