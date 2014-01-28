// Copyright (c) 2013 M-Way Solutions GmbH
// http://github.com/mwaylabs/The-M-Project/blob/absinthe/MIT-LICENSE.txt

/**
 *
 * Use the BackStack to manage the navigation stack
 * @module M.BackStack
 *
 * @type {*}
 * @extends M.Object
 */
M.BackStack = M.Object.design({

    stack: [],
    counter: 0,
    initial: YES,

    manage: function(){

        var next = Backbone.history.fragment ? Backbone.history.fragment : '/';

        var previous = '';
        if(this.stack[this.counter-1]){
            previous = this.stack[this.counter-1].path;
        }

        if(this.initial){
            this.initial = NO;
            this.stack.push({
                path: next,
                data: {}
            });
            this.counter = 0;

        }else {
            if(previous !== next){
                this.stack.push({
                    path: next,
                    data: {}
                });
                this.counter++;

            }else{
                this.stack.pop();
                this.counter--;
            }
        }

        var route = '';

        _.each(this.stack, function(item){
            route = route.concat(' '+ item.path);
        });
        route = ('--------------- \n' + 'route: ' + route);

        console.log(route);

        console.log(this.stack[this.counter]);

    },

    deleteStack: function(){
        this.stack = [];
        this.initial = YES;
        this.counter = 0;
        this.manage();
        return;
    },

    goBack: function(){
        this.stack.pop();
        this.counter--;
        return;
    },

    goBackTo: function(route){
        if(route && typeof route === 'string'){
            var searchIndex = 0;
            _.each(this.stack, function(item, index){
                if(item.path === route){
                    searchIndex = index;
                    this.stack = this.stack.splice(searchIndex);
                    return;
                }
            }, this);
        }
    },

    getData: function(){
        return this.stack[this.counter].data;
    },

    setData: function(data){
        if(data){
            this.stack[this.counter].data = data;
        }
        return;
    }

});