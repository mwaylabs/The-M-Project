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
m_require('app/views/storage_page.js');
m_require('app/views/storage_local_storage_task_app_template.js');

KitchenSink.StorageLocalStorageTaskAppPage = M.PageView.design({

    onLoad : {
        target: KitchenSink.StorageLocalStorageTaskAppController,
        action: 'init'
    },

    childViews: 'header content tabBar',

    header: M.ToolbarView.design({

        childViews: 'centerLabel toggleView',

        centerLabel: M.LabelView.design({
            value: 'LocalStorage Task App',
            anchorLocation: M.CENTER
        }),

        toggleView: M.ToggleView.design({
            childViews: 'button1 button2',
            anchorLocation: M.RIGHT,
            toggleOnClick: YES,

            button1: M.ButtonView.design({
                value: 'Edit',
                target: KitchenSink.StorageLocalStorageTaskAppController,
                action: 'edit',
                icon: 'gear'
            }),

            button2: M.ButtonView.design({
                value: 'Save',
                target: KitchenSink.StorageLocalStorageTaskAppController,
                action: 'edit',
                icon: 'check'
            })
        }),

        anchorLocation: M.TOP
    }),

    content: M.ScrollView.design({

        childViews: 'taskField taskList',

        taskField: M.TextFieldView.design({
            name: 'todo_field',
            initialText: 'Enter Task...',
            target: KitchenSink.StorageLocalStorageTaskAppController,
            action: 'addTask',
            triggerActionOnEnter: YES
        }),

        taskList: M.ListView.design({
            listItemTemplateView: KitchenSink.StorageLocalStorageTaskAppTemplate,
            contentBinding: 'KitchenSink.StorageLocalStorageTaskAppController.tasks'
        })
    }),

    tabBar: KitchenSink.TabBar
});
