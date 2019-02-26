Ext.define('GeoAssistenza.view.interventi.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interventi-list',

    onSearchClick() {
        let grid = this.lookup('interventiGrid'),
            store = grid.getStore();
        store.load({
            params: {
                codiceOperatore: GeoAssistenza.codiceOperatore
            },
            callback(records, operation, success) {
                if (success) {
                    if (records.length = 0) {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            },
            scope: this
        });
    },

    onAddClick() {
        this.getView().up('interventi-container').setActiveItem(1);
    },

    onEditClick() {
        let grid = this.lookup('interventiGrid');
            records = grid.getSelection();
        if (records) {
            let int_id = records.get('int_id');
            this.getView().up('interventi-container').setActiveItem(1);
            this.getView().up('interventi-container').down('interventi-edit').getController().loadEdit(int_id);
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un intervento');
        }
    }

});