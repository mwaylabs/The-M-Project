Addressbook.Main = M.View.create({

    valueView: M.View.extend({
        valuePattern: "<%= firstname %>, <%= lastname %>"
    })

});


Addressbook.Detail = M.View.create({

    valuePattern: "<%= firstname %>, <%= lastname %>"

});