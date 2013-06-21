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
            _id: '1',
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
                person.fetch({
                    success: function() {
                        that.addText('FirstName in Database: ' + person.get('firstName'));
                    }
                });

                that.testCollection();

            },

            error: function( error ) {

                that.addText('Error saving Person: ' + error);
            }
        });
    },

    testCollection: function() {
        var that = this;
        var personList = this.personList = new SampleApp.PersonList();

        personList.create({
                _id: '2',
                firstName: 'Frank',
                sureName: 'Stierle',
                birthDate: '13.11.2007',
                bmi: 27.9,
                notes: 'Loves JavaScript',
                address: { street: 'Leitzstraße', house_nr: 45, zip: '70469', city: 'Stuttgart' },
                displayName: 'Frank Stierle'
            }, {
                success: function(model) {
                    that.addText('Added new Person: ' + model.get('firstName') + ' ' + model.get('sureName') + ' to empty personList.');

                    that.addText('The personList holds now '+ personList.length + ' Persons.');

                    personList.fetch({
                        success: function(result) {
                            that.addText('The personList holds now '+ personList.length + ' Persons, after fetch().');
                            that.testStore();
                        }
                    });
                }
            }
        );

    },

    testStore: function() {
        var that = this;
        SampleApp.PersonStore.fetch({
            order: '_id',
            entity: 'contact',
            success: function( result ) {
                if (result.length > 0) {
                    var model = result.at(0);

                    that.addText('found ' + result.length + ' persons. first SureName: ' + model.get('sureName'));

                    SampleApp.PersonStore.save(model, { notes: 'The-M-Project goes Backbone!' }, {
                        success: function() {
                            that.addText('changed Person.notes in Database to: ' + model.get('notes'));

                            model.fetch({
                                success: function(person) {
                                    that.addText('fetched Person, notes in Database: ' + person.get('notes'));
                                    var model;
                                    while (model = result.pop()) {
                                        SampleApp.PersonStore.destroy(model, {
                                            success: function(model) {
                                                that.addText('Deleted Person: ' + model.get('firstName') + ' ' + model.get('sureName'));
                                            },
                                            error: function(model) {
                                                that.addText('Error Deleting Person: ' + model.get('firstName') + ' ' + model.get('sureName'));
                                            }
                                        });
                                    }
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
            finish: function() { // alert('find persons finished.' );
            }
        });
    }

});