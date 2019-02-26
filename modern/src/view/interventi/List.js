Ext.define('GeoAssistenza.view.interventi.List', {
    extend: 'Ext.Panel',
    xtype: 'interventi-list',

    requires: [
        'GeoAssistenza.model.Interventi',
        'GeoAssistenza.view.interventi.ListController'
    ],
    
    controller: 'interventi-list',

    title: 'Lista interventi',

    scrollable: true,

    tools: [{
        type: 'search',
        handler: 'onSearchClick'
    }, {
        type: 'plus',
        handler: 'onAddClick'
    }, {
        type: 'pin',
        handler: 'onEditClick'
    }],

    items: [{
        xtype: 'list',
        reference: 'interventiGrid',
        itemTpl: '<b>Intervento in data:</b> {int_data}<br>' + 
            '<b>al cliente:</b> {cli_nome}<br>' + 
            '<b>dalle ore:</b> {int_ora_inizio}<br>' +
            '<b>alle ore:</b> {int_ora_fine}<hr>',
        store: {
            model: 'GeoAssistenza.model.Interventi'
        }
    }]
});
