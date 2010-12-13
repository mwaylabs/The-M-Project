CRMLight.ActivitiesNewPage = M.PageView.design({

    childViews: 'header content footer',

    cssClass: 'activitiesNewPage',

    onLoad: {
        target: CRMLight.ActivitiesPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesNewPageController,

            action: 'openActivitiesPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('new_activity'),

            anchorLocation: M.CENTER

        }),

        anchorLocation: M.TOP,

        cssClass: 'header'

    }),

    content: M.ScrollView.design({

        childViews: 'form',

        form: M.FormView.design({

            childViews: 'description customerId vkst companyName responsiblePerson beginDate endDate processType activityReason goal status result resultReason text',

            description: M.SelectionListView.design({

                label: M.I18N.l('description'),

                isInsideFormView: YES,

                cssClass: 'select',

                childViews: 'test test2 test3',

                test: M.SelectionListItemView.design({

                    value: 'test',
                    
                    label: 'Test'

                }),

                test2: M.SelectionListItemView.design({

                    value: 'test2',

                    label: 'Test2'

                }),

                test3: M.SelectionListItemView.design({

                    value: 'test3',
                    
                    label: 'Test3'

                })

            }),

            customerId: M.TextFieldView.design({

                label: M.I18N.l('customerId')

            }),

            vkst: M.TextFieldView.design({

                label: M.I18N.l('vkst')

            }),

            companyName: M.TextFieldView.design({

                label: M.I18N.l('companyName')

            }),

            responsiblePerson: M.TextFieldView.design({

                label: M.I18N.l('responsiblePerson')

            }),

            beginDate: M.TextFieldView.design({

                label: M.I18N.l('beginDate')

            }),

            endDate: M.TextFieldView.design({

                label: M.I18N.l('endDate')

            }),

            processType: M.TextFieldView.design({

                label: M.I18N.l('processType')

            }),

            activityReason: M.TextFieldView.design({

                label: M.I18N.l('activityReason')

            }),

            goal: M.TextFieldView.design({

                label: M.I18N.l('goal')

            }),

            status: M.TextFieldView.design({

                label: M.I18N.l('status')

            }),

            result: M.TextFieldView.design({

                label: M.I18N.l('result')

            }),

            resultReason: M.TextFieldView.design({

                label: M.I18N.l('resultReason')

            }),

            text: M.TextFieldView.design({

                label: M.I18N.l('text'),

                hasMultipleLines: YES

            })
            
        })

    }),

    footer: M.ToolbarView.design({

        childViews: 'grid',

        anchorLocation: M.BOTTOM,

        cssClass: 'footer',

        grid: M.GridView.design({

            childViews: 'cancel save',

            layout: M.TWO_COLUMNS,

            cancel: M.ButtonView.design({

                value: M.I18N.l('cancel'),

                target: CRMLight.ActivitiesNewPageController,

                action: 'cancelNewActivity'

            }),

            save: M.ButtonView.design({

                value: M.I18N.l('save'),

                target: CRMLight.ActivitiesNewPageController,

                action: 'saveNewActivity',

                cssClass: 'save'

            }),

            anchorLocation: M.CENTER

        })

    })

});