sensalytics = Kitchensink;

sensalytics.BusinessAnalytics = sensalytics.BusinessAnalytics || {};

sensalytics.BusinessAnalytics.Main = M.View.design({
    events: {
        preRender: {
            target: sensalytics.BusinessAnalyticsController,
            action: 'show'
        }
    },

    childViews: 'filterBox subHeader messageBox content',

    filterBox: M.View.design({
        cssClass: 'filterBox',
        hasHandle: YES,
        //handleIcon: M.SideBarView.icons.filter,
        childViews: 'filterBoxInner filterBoxBottom',
        events: {
            open: {
                target: sensalytics.FilterController,
                action: 'open'
            },
            close: {
                target: sensalytics.FilterController,
                action: 'close'
            }
        },
        filterBoxInner: M.View.design({
            cssClass: 'filterBoxInner',
            childViews: 'filterBoxTitle filterBoxContent',
            filterBoxTitle: M.View.design({
                cssClass: 'filterBoxTitle',
                value: M.I18N.l('filter')
            }),
            filterBoxContent: M.View.design({
                cssClass: 'filterBoxContent'
            })
        }),
        filterBoxBottom: M.View.design({
            cssClass: 'filterBoxBottom',
            childViews: 'cancelButtonBox applyButtonBox',
            cancelButtonBox: M.View.design({
                childViews: 'cancelButton',
                width: 50,
                numColumns: 2,
                cancelButton: M.ButtonView.design({
                    value: M.I18N.l('cancel_filters'),
                    events: {
                        click: {
                            target: sensalytics.FilterController,
                            action: 'cancelFilters'
                        }
                    }
                })
            }),
            applyButtonBox: M.View.design({
                childViews: 'applyButton',
                width: 50,
                numColumns: 2,
                applyButton: M.ButtonView.design({
                    cssClass: 'important',
                    value: M.I18N.l('apply_filters'),
                    events: {
                        click: {
                            target: sensalytics.FilterController,
                            action: 'applyFilters'
                        }
                    }
                })
            })
        })
    }),

    subHeader: M.View.design({
        cssClass: 'subheader withFilterBox',
        childViews: 'label dashboard_selector',
        label: M.View.design({
            cssClass: 'subheader-label',
            value: M.I18N.l('pick_dashboard')
        }),
        dashboard_selector: M.View.design({
            contentBinding: {
                target: sensalytics.BusinessAnalyticsController,
                property: 'dashboards'
            },
            contentMapping: {
                value: 'dashboardId',
                label: 'dashboardName'
            },
            events: {
                change: {
                    target: sensalytics.BusinessAnalyticsController,
                    action: 'dashboardSelected'
                }
            }
        })
    }),

    messageBox: M.View.design({
        cssClass: 'subheader',
        hideAutomatically: YES,
        isClosable: YES,
        titleAndValueSeparator: '!'
    }),

    content: M.View.design({
        cssClass: 'mainContent'
    })
});