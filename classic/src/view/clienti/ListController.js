Ext.define('GeoAssistenza.view.clienti.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clienti-list',

    onSearchClick() {
        let grid = this.lookup('clientiGrid'),
            codiceCliente = this.lookup('codiceCliente').getValue(),
            nomeCliente = this.lookup('nomeCliente').getValue(),
            store = grid.getStore(),
            params;
        if (!this.isAdmin(GeoAssistenza.admin)) {
            params = {
                ope_cod: GeoAssistenza.codiceOperatore,
                codiceCliente,
                nomeCliente
            }
        } else {
            params = {
                codiceCliente,
                nomeCliente
            }
        }
        store.load({
            params: params,
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
        let grid = this.lookup('clientiGrid');
            records = grid.getSelection();
        if (records.length > 0) {
            let cli_id = records[0].get('cli_id');
            this.getView().up('app-main').setActiveItem(this.editIndex);
            this.getView().up('app-main').down('clienti-edit').getController().loadEdit(cli_id);
        }
    },

    onDeleteClick() {
        let grid = this.lookup('clientiGrid'),
            store = grid.getStore(),
        records = grid.getSelection();
        if (records.length === 0) {
            Ext.Msg.alert('Attenzione', 'Selezionare un cliente');
        } else {
            let cli_id = records[0].get('cli_id');
            Ext.Ajax.request({
                url: 'server/...',
                params: {
                    cli_id
                },
                success(response, opts) {
                    if (this.checkErrors(response.responseText)) {
                        store.reload();
                        Ext.Msg.alert('Info', 'Cliente eliminato');
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

    isAdmin(admin) {
        if (admin === '1') {
            return true;
        } else {
            return false;
        }
    },

    hideButtons() {
        this.getView().down('toolbar').items.items[2].hide();
        this.getView().down('toolbar').items.items[3].hide();
        this.getView().down('toolbar').items.items[4].hide();
    },

    init() {
        this.callParent();
        this.editIndex = this.getView().editIndex;
    }

});