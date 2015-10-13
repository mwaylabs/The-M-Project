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

    /**
     * The stack contains an object with the
     * name of the route and the corresponding data
     * @type {Array}
     */
    stack: [],

    /**
     * The counter counts your steps
     * trough the application forwards and backwards
     * @type {Integer}
     */
    counter: 0,

    /**
     * Is set to YES when first time starting
     * at root route or deleting stack
     * @type {Integer}
     */
    initial: YES,

    /**
     * Recognizes if moving forward in history stack or
     * backwards and push or pop item to the stack.
     */
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

    /**
     * Deletes complete stack and initializes it with acutal route
     */
    deleteStack: function(){
        this.stack = [];
        this.initial = YES;
        this.counter = 0;
        this.manage();
        return;
    },

    /**
     * Stack is set one step back
     */
    goBack: function(){
        this.stack.pop();
        this.counter--;
        return;
    },

    /**
     * Searches for route in stack and jumps to that position.
     * Removes all following items in stack
     * @param route
     */
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

    /**
     * Getter for data of actual route
     * @returns {Object}
     */
    getData: function(){
        return this.stack[this.counter].data;
    },

    /**
     * Setter for data of actual route
     * @param data
     */
    setData: function(data){
        if(data){
            this.stack[this.counter].data = data;
        }
        return;
    }

});