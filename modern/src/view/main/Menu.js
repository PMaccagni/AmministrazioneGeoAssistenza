Ext.define('GeoAssistenza.view.main.Menu', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-menu',

    requires: [
        'Ext.MessageBox',
        'GeoAssistenza.view.main.MainModel',
        'GeoAssistenza.view.clienti.List',
        'GeoAssistenza.view.interventi.Container',
        'GeoAssistenza.view.main.Info'
    ],

    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [{
        title: 'Clienti',
        iconCls: 'x-fa fa-users',
        layout: 'fit',
        items: [{
            xtype: 'clienti-list'
        }]
    }, {
        title: 'Interventi',
        iconCls: 'x-fa fa-list-ol',
        layout: 'fit',
        items: [{
            xtype: 'interventi-container'
        }]
    }, {
        title: 'Info',
        iconCls: 'x-fa fa-info-circle',
        layout: 'fit',
        items: [{
            xtype: 'info'
        }]
    }]
});
