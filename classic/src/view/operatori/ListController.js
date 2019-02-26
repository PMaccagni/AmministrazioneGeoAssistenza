Ext.define('GeoAssistenza.view.operatori.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.operatori-list',

    onSearchClick() {
        let grid = this.lookup('operatoriGrid'),
            codiceOperatore = this.lookup('codiceOperatore').getValue(),
            nomeOperatore = this.lookup('nomeOperatore').getValue(),
            store = grid.getStore();
        store.load({
            params: {
                codiceOperatore,
                nomeOperatore
            },
            callback(records, operation, success) {
                if (success) {
                    if (records.length = 0) {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            }
        });
    },

    onAddClick() {
        this.getView().up('app-main').setActiveItem(this.editIndex);
    },

    onEditClick() {
        let grid = this.lookup('operatoriGrid');
            records = grid.getSelection();
        if (records.length > 0) {
            let ope_id = records[0].get('ope_id');
            this.getView().up('app-main').setActiveItem(this.editIndex);
            this.getView().up('app-main').down('operatori-edit').getController().loadEdit(ope_id);
        }
    },

    onDeleteClick() {
        let grid = this.lookup('operatoriGrid'),
            store = grid.getStore(),
        records = grid.getSelection();
        if (records.length === 0) {
            Ext.Msg.alert('Attenzione', 'Selezionare un operatore');
        } else {
            let ope_id = records[0].get('ope_id');
            Ext.Ajax.request({
                url: 'server/...',
                params: {
                    ope_id
                },
                success(response, opts) {
                    if (this.checkErrors(response.responseText)) {
                        store.reload();
                    }
                },
                scope: this
            });
        }
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    onRenderAdmin(value) {
        if (value === '1') {
            return 'Utente admin';
        } else if (value === '0') {
            return 'Utente normale';
        } else {
            return 'Privilegi non impostati';
        }
    },

    init() {
        this.callParent();
        this.editIndex = this.getView().editIndex;
    }

});