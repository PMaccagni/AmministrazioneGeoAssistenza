Ext.define('GeoAssistenza.model.Interventi', {
    extend: 'Ext.data.Model',

    proxy: {
        type: 'ajax',
        url: 'server/...'
    }
});