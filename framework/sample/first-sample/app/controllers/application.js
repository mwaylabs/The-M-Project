SampleApp.ApplicationController = M.Controller.extend({

    text: "",

    init: function() {

        this.testModel();
    },

    addText: function( txt ) {

        console.log(txt);

        this.text += txt + '<br>';
        SampleApp.Main.set(M.Model.create({value: this.text}));
    },

    testModel: function() {

        var that = this;

        var person = SampleApp.Person.create({
            id: 1,
            firstName: 'Marco',
            sureName: 'Hanowski',
            birthDate: '03.12.2011',
            bmi: 27.8,
            notes: 'Best HTML5 framework ever!',
            address: { street: 'Leitzstraße', house_nr: 45, zip: '70469', city: 'Stuttgart' },
            displayName: 'The M-Project'
        });

        person.save(null, {
            success: function() {
                that.addText('Person saved - FirstName: ' + person.get('firstName'));

                person.set('firstName', 'Frank');
                that.addText('FirstName changed to: ' + person.get('firstName'));

                // reset to value from database
//                person.fetch({
//                    success: function() {
//                        that.addText('FirstName in Database: ' + person.get('firstName'));
//                    }
//                });

                that.testConnector();

            },

            error: function( error ) {

                that.addText('Error saving Person: ' + error);
            }
        });
    },

    testConnector: function() {
        var that = this;
        SampleApp.LiveConnector.fetch(null, {
            order: '_id',
            entity: 'person',
            success: function( result ) {
                if (result.length > 0) {
                    var model = result.at(0);

                    that.addText('found ' + result.length + ' persons. first SureName: ' + model.get('sureName'));

                    model.save({ notes: 'The-M-Project goes Backbone!' }, {
                        success: function() {
                            that.addText('changed Person.notes in Database to: ' + model.get('notes'));

                            person.fetch({
                                success: function() {
                                    that.addText('fetched Person, notes in Database: ' + person.get('notes'));
                                }
                            });
                        }
                    });
                } else {
                    that.addText('no person found!!');
                }
            },
            error: function() {
                that.addText('error find persons.');
            },
            finish: function() { /* alert('find persons finished.' ); */
            }
        });

    }


});