M.ChildrenEventHandler = M.View.extend({

    /**
     * The type of this object.
     *
     * @type String
     */
    type:'M.ChildrenEventHandler',

    /**
     * Renders a div and all childViews
     *
     * @private
     * @returns {String} The view's html representation.
     */
    render:function () {

        this.html += '<div id="' + this.id + '"' + this.style() + '>';

        this.renderChildViews();

        this.html += '</div>';

        return this.html;

        return this.html;
    },

    /**
     * Applies some style-attributes to the button.
     *
     * @private
     * @returns {String} The view's styling as html representation.
     */
    style:function () {
        var html = ' class="'

        if (this.cssClass) {
            html += this.cssClass;
        }

        html += '" '
        return html;
    },

    /**
     * Triggers render() on all children and applies the registered events of this view to all child views
     *
     * @private
     */
    renderChildViews:function () {
        if (this.childViews) {
            var childViews = this.getChildViewsAsArray();
            for (var i in childViews) {
                if (this[childViews[i]]) {
                    this[childViews[i]]._name = childViews[i];
                    this[childViews[i]].parentView = this;
                    if (this.events) {
                        this[childViews[i]].events = this.events;
                    }
                    this.html += this[childViews[i]].render();
                } else {
                    this.childViews = this.childViews.replace(childViews[i], ' ');
                    M.Logger.log('There is no child view \'' + childViews[i] + '\' available for ' + this.type + ' (' + (this._name ? this._name + ', ' : '') + '#' + this.id + ')! It will be excluded from the child views and won\'t be rendered.', M.WARN);
                }

                if (this.type === 'M.PageView' && this[childViews[i]].type === 'M.TabBarView') {
                    this.hasTabBarView = YES;
                    this.tabBarView = this[childViews[i]];
                }
            }
            return this.html;
        }
    }
});


/* EXAMPLES */
/*
    To get a better idea using this view look at the following example. Both implementations have the same behaviour

form: M.FormView.design({

    childViews:'childrenEvents',

    childrenEvents:M.ChildrenEventHandler.design({

        childViews: 'street hn city zip',

        events: {
            blur: {
                target: appName.Controller,
                action: 'myFunction'
            }
        },

        street :M.TextFieldView.design({
            label : 'street'
        }),
        hn :M.TextFieldView.design({
            label : 'hn'
        }),
        city :M.TextFieldView.design({
            label : 'city'
        }),
        zip :M.TextFieldView.design({
            label : 'zip'
        })
    })

})


form: M.FormView.design({

    childViews: 'street hn city zip',

    street :M.TextFieldView.design({
        label : 'street',
        events: {
            blur: {
                target: appName.Controller,
                action: 'myFunction'
            }
        }
    }),
    hn :M.TextFieldView.design({
        label : 'hn',
        events: {
            blur: {
                target: appName.Controller,
                action: 'myFunction'
            }
        }
    }),
    city :M.TextFieldView.design({
        label : 'city',
        events: {
            blur: {
                target: appName.Controller,
                action: 'myFunction'
            }
        }
    }),
    zip :M.TextFieldView.design({
        label : 'zip',
        events: {
            blur: {
                target: appName.Controller,
                action: 'myFunction'
            }
        }
    })

})

 */