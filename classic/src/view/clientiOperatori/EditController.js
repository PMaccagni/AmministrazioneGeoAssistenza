Ext.define('GeoAssistenza.view.clientiOperatori.EditController', {
    extend: 'GeoAssistenza.view.clienti.ListController',
    alias: 'controller.clienti-operatori-edit',

    onAggiungiCliente() {
        let clientiGrid = this.lookup('clientiGrid'),
            records = clientiGrid.getSelection();
        if (records.length > 0) {
            let cli_cod = records[0].get('cli_cod');
            Ext.Ajax.request({
                url: 'server/...',
                params: {
                    ope_cod: this.ope_cod,
                    cli_cod
                },
                success(response, opts) {
                    if (this.checkErrors(response.responseText)) {
                        Ext.Msg.alert('Info', 'Cliente aggiunto a ' + this.ope_nome); 
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un cliente');
        }
    },

    onCloseClick() {
        this.lookup('clientiGrid').getStore().removeAll();
        this.getView().up('app-main').setActiveItem(this.listIndex);
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    setOpeCod(ope_cod, ope_nome) {
        this.ope_cod = ope_cod;
        this.ope_nome = ope_nome
    },

    init() {
        this.listIndex = this.getView().listIndex;
    }

});