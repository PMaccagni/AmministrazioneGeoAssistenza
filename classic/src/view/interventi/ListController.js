Ext.define('GeoAssistenza.view.interventi.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interventi-list',

    onSearchClick() {
        let grid = this.lookup('interventiGrid'),
            codiceOperatore = this.lookup('codiceOperatore').getValue(),
            codiceCliente = this.lookup('codiceCliente').getValue(),
            dataDa = this.lookup('dataDa').getValue(),
            dataA = this.lookup('dataA').getValue(),
            store = grid.getStore();
        if (dataDa === null && dataA !== null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            dataDa = dataDa.toISOString().substr(0, 10),
            dataA = dataA.toISOString().substr(0, 10)
        }
        if (!this.isAdmin(GeoAssistenza.admin)) {
            codiceOperatore = GeoAssistenza.codiceOperatore
        }
        store.load({
            params: {
                codiceOperatore,
                codiceCliente,
                dataDa,
                dataA
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
        this.getView().up('app-main').setActiveItem(this.editIndex);
    },

    onEditClick() {
        let grid = this.lookup('interventiGrid');
            records = grid.getSelection();
        if (records.length > 0) {
            let int_id = records[0].get('int_id');
            this.getView().up('app-main').setActiveItem(this.editIndex);
            this.getView().up('app-main').down('interventi-edit').getController().loadEdit(int_id);
        }
    },

    onDeleteClick() {
        let grid = this.lookup('interventiGrid'),
            store = grid.getStore(),
        records = grid.getSelection();
        if (records.length === 0) {
            Ext.Msg.alert('Attenzione', 'Selezionare un intervento');
        } else {
            let int_id = records[0].get('int_id');
            Ext.Ajax.request({
                url: 'server/...',
                params: {
                    int_id
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

    isAdmin(admin) {
        if (admin === '1') {
            return true;
        } else {
            return false;
        }
    },

    checkAdmin() {
        if (!this.isAdmin(GeoAssistenza.admin)) {
            this.lookup('codiceOperatore').hide();
            this.getView().down('toolbar').items.items[4].hide();
            this.lookup('codiceCliente').getStore().getProxy().setExtraParams({
                'ope_cod': GeoAssistenza.codiceOperatore
            });
        }
    },

    init() {
        this.callParent();
        this.editIndex = this.getView().editIndex;
    }

});