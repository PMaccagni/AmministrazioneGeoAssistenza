Ext.define('GeoAssistenza.view.interventi.Container', {
    extend: 'Ext.Panel',
    xtype: 'interventi-container',

    requires: [
        'GeoAssistenza.view.interventi.List',
        'GeoAssistenza.view.interventi.Edit'
    ],

    layout: 'card',

    items: [{
        xtype: 'interventi-list'
    }, {
        xtype: 'interventi-edit'
    }]
});
