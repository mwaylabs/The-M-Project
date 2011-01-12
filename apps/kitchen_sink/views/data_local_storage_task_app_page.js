// ==========================================================================
// Project:   The M-Project - Mobile HTML5 Application Framework
// Copyright: (c) 2010 M-Way Solutions GmbH. All rights reserved.
// Creator:   Sebastian
// Date:      10.01.2011
// License:   Dual licensed under the MIT or GPL Version 2 licenses.
//            http://github.com/mwaylabs/The-M-Project/blob/master/MIT-LICENSE
//            http://github.com/mwaylabs/The-M-Project/blob/master/GPL-LICENSE
// ==========================================================================

m_require('app/views/tabs.js');
m_require('app/views/data_page.js');
m_require('app/views/data_local_storage_task_app_template.js');

KitchenSink.DataLocalStorageTaskAppPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.DataLocalStorageTaskAppController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'backButton centerLabel toggleView',

        centerLabel: M.LabelView.design({
            value: 'LocalStorage ToDo App Example',
            anchorLocation: M.CENTER
        }),

        toggleView: M.ToggleView.design({
            childViews: 'button1 button2',
            anchorLocation: M.RIGHT,
            toggleOnClick: YES,

            button1: M.ButtonView.design({
                value: 'Edit',
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'edit',
                icon: 'gear'
            }),

            button2: M.ButtonView.design({
                value: 'Save',
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'edit',
                icon: 'check'
            })
        }),

        backButton: M.ButtonView.design({
            value: 'Back',
            icon: 'arrow-l',
            anchorLocation: M.LEFT,
            target: KitchenSink.DataController,
            action: 'here'
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'form taskList',

        form: M.FormView.design({
            childViews: 'taskField',

            showAlertDialogOnError: YES,
            alertTitle: 'No text entered.',
            taskField: M.TextFieldView.design({
                name: 'todo_field',
                initialText: 'Enter Task...',
                validators: [M.PresenceValidator.customize({
                    msg: 'Please enter a text describing your task!'
                })],
                target: KitchenSink.DataLocalStorageTaskAppController,
                action: 'addTask',
                triggerActionOnEnter: YES
            })
        }),

        taskList: M.ListView.design({
            listItemTemplateView: KitchenSink.DataLocalStorageTaskAppTemplate,
            contentBinding: 'KitchenSink.DataLocalStorageTaskAppController.tasks'
        })
    }),

    tabBar: KitchenSink.TabBar
});
