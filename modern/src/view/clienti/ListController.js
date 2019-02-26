Ext.define('GeoAssistenza.view.clienti.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clienti-list',

    onSearchClick() {
        let grid = this.lookup('clientiGrid'),
            store = grid.getStore(),
            params;
        params = {
            ope_cod: GeoAssistenza.codiceOperatore
        }
        store.load({
            params: params,
            callback(records, operation, success) {
                if (success) {
                    if (records.length = 0) {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            },
            scope: this
        });
    }

});