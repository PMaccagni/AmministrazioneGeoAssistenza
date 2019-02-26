Ext.define('GeoAssistenza.view.clientiOperatori.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clienti-operatori-list',

    onSearchClick() {
        let grid = this.lookup('operatoriGrid'),
            clientiGrid = this.lookup('clientiGrid'),
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
                    let clientiGrid = this.lookup('clientiGrid'),
                        store = clientiGrid.getStore();
                    store.removeAll();
                    clientiGrid.setTitle('Lista clienti di ...');
                    if (records.length = 0) {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            },
            scope: this
        });
    },

    onSelectOperatore(grid, record, index, eOpts) {
        let ope_cod = record.get('ope_cod'),
            clientiGrid = this.lookup('clientiGrid'),
            store = clientiGrid.getStore();
        clientiGrid.setTitle(clientiGrid.getTitle().substr(0, 17) + record.get('ope_nome'));
        store.load({
            params: {
                ope_cod
            }
        });
    },

    onAggiungiCliente() {
        let grid = this.lookup('operatoriGrid'),
            records = grid.getSelection();
        if (records.length > 0) {
            let ope_cod = records[0].get('ope_cod'),
                ope_nome = records[0].get('ope_nome');
            this.getView().up('app-main').setActiveItem(this.editIndex);
            this.getView().up('app-main').down('clienti-operatori-edit').getController().setOpeCod(ope_cod, ope_nome);
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un operatore');
        }

    },

    onRemoveCliente() {
        let clientiGrid = this.lookup('clientiGrid'),
            records = clientiGrid.getSelection(),
            store = clientiGrid.getStore();
        if (records.length > 0) {
            let cli_ope_id = records[0].get('cli_ope_id');
            Ext.Ajax.request({
                url: 'server/...',
                params: {
                    cli_ope_id
                },
                success(response, opts) {
                    if (this.checkErrors(response.responseText)) {
                        store.reload();
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un cliente');
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

    init() {
        this.callParent();
        this.editIndex = this.getView().editIndex;
    }

});