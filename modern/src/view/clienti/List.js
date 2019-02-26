Ext.define('GeoAssistenza.view.clienti.List', {
    extend: 'Ext.Panel',
    xtype: 'clienti-list',

    requires: [
        'GeoAssistenza.model.Clienti',
        'GeoAssistenza.view.clienti.ListController'
    ],

    controller: 'clienti-list',

    title: 'Lista clienti',

    scrollable: true,

    tools: [{
        type: 'search',
        handler: 'onSearchClick'
    }],

    items: [{
        xtype: 'list',
        reference: 'clientiGrid',
        itemTpl: '<b>{cli_nome}</b><br>'+
            '<b>cellulare:</b> {cli_cell}<br>'+
            '<b>Fisso:</b> {cli_tell}<br>'+
            '<b>Mail:</b> {cli_mail}<hr>',
        store: {
            model: 'GeoAssistenza.model.Clienti'
        }
    }]
});
