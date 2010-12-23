CRMLight.ActivitiesEditPage = M.PageView.design({

    childViews: 'header content footer',

    cssClass: 'activitiesNewPage',

    onLoad: {
        target: CRMLight.ActivitiesEditPageController,
        action: 'init'
    },

    header: M.ToolbarView.design({

        childViews: 'back title',

        isFixed: NO,

        back: M.ButtonView.design({

            value: M.I18N.l('back'),

            anchorLocation: M.LEFT,

            cssClass: 'back',

            target: CRMLight.ActivitiesEditPageController,

            action: 'openActivitiesPage'

        }),

        title: M.LabelView.design({

            value: M.I18N.l('edit_activity'),

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

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityProcess',

                isEnabled: NO

            }),

            description: M.TextFieldView.design({

                label: M.I18N.l('description'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityDescription'

            }),

            customerId: M.TextFieldView.design({

                label: M.I18N.l('customerId'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityCustomerId'

            }),

            vkst: M.TextFieldView.design({

                label: M.I18N.l('vkst'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityDescription'

            }),

            companyName: M.TextFieldView.design({

                label: M.I18N.l('companyName'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityCompanyName'

            }),

            responsiblePerson: M.TextFieldView.design({

                label: M.I18N.l('responsiblePerson'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityResponsiblePerson'

            }),

            beginDate: M.TextFieldView.design({

                label: M.I18N.l('beginDate'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityBeginDate'

            }),

            endDate: M.TextFieldView.design({

                label: M.I18N.l('endDate'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityEndDate'

            }),

            activityReason: M.SelectionListView.design({

                label: M.I18N.l('activityReason'),

                removeItemsOnUpdate: YES,

                applyTheme: NO,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityReason'

            }),

            goal: M.TextFieldView.design({

                label: M.I18N.l('goal'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityGoal'

            }),

            status: M.SelectionListView.design({

                label: M.I18N.l('status'),

                removeItemsOnUpdate: YES,

                applyTheme: NO,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityStatus'

            }),

            result: M.SelectionListView.design({

                label: M.I18N.l('result'),

                removeItemsOnUpdate: YES,

                applyTheme: NO,

                selectionMode: M.SINGLE_SELECTION_DIALOG,

                cssClass: 'select',

                isGrouped: YES,

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityResult'

            }),

            resultReason: M.TextFieldView.design({

                label: M.I18N.l('resultReason'),

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityResultReason'

            }),

            text: M.TextFieldView.design({

                label: M.I18N.l('text'),

                hasMultipleLines: YES,

                contentBinding: 'CRMLight.ActivitiesEditPageController.activityText'

            })
            
        })

    }),

    footer: M.ToolbarView.design({

        childViews: 'grid',

        anchorLocation: M.BOTTOM,

        cssClass: 'footer',

        isFixed: NO,

        grid: M.GridView.design({

            childViews: 'cancel save',

            layout: M.TWO_COLUMNS,

            cancel: M.ButtonView.design({

                value: M.I18N.l('cancel'),

                target: CRMLight.ActivitiesEditPageController,

                action: 'cancelEditActivity'

            }),

            save: M.ButtonView.design({

                value: M.I18N.l('save'),

                target: CRMLight.ActivitiesEditPageController,

                action: 'saveEditActivity',

                cssClass: 'save'

            }),

            anchorLocation: M.CENTER

        })

    })

});