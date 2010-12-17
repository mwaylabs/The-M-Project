CRMLight.ActivitiesNewPage = M.PageView.design({

    childViews: 'header content footer',

    cssClass: 'activitiesNewPage',

    onLoad: {
        target: CRMLight.ActivitiesNewPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesNewPageController,

            action: 'openActivitiesNewSelectPage'

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

            childViews: 'processType description customerId vkst companyName responsiblePerson beginDate endDate activityReason goal status result resultReason text',

            processType: M.TextFieldView.design({

                label: M.I18N.l('processType'),

                contentBinding: 'CRMLight.ActivitiesNewPageController.activityName',

                isEnabled: NO

            }),

            description: M.TextFieldView.design({

                label: M.I18N.l('description')

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

            activityReason: M.SelectionListView.design({

                label: M.I18N.l('activityReason'),

                removeItemsOnUpdate: YES,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesNewPageController.activityReason'

            }),

            goal: M.TextFieldView.design({

                label: M.I18N.l('goal')

            }),

            status: M.SelectionListView.design({

                label: M.I18N.l('status'),

                removeItemsOnUpdate: YES,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesNewPageController.activityStatus'

            }),

            result: M.SelectionListView.design({

                label: M.I18N.l('result'),

                removeItemsOnUpdate: YES,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesNewPageController.activityResult'

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