Ext.define('GeoAssistenza.view.clienti.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clienti-edit',

    onSaveClick() {
        let cli_cod = this.lookup('codiceCliente').getValue(),
            cli_nome = this.lookup('nomeCliente').getValue(),
            idCliente = this.lookup('idCliente').getValue(),
            cli_mail = this.lookup('mailCliente').getValue(),
            cli_cell = this.lookup('cellulareCliente').getValue(),
            cli_tell = this.lookup('fissoCliente').getValue();
        if ((cli_cod === '') || (cli_nome === '')) {
            Ext.Msg.alert('Attenzione', 'Compilare tutti i campi');
            return;
        }
        Ext.Ajax.request({
            url: 'server/...',
            params: {
                idCliente,
                cli_cod,
                cli_nome,
                cli_mail,
                cli_cell,
                cli_tell
            },
            success(response, opts) {
                if (this.checkErrors(response.responseText)) {
                    if (idCliente !== '') {
                        Ext.Msg.alert('Info', 'Cliente modificato');
                    } else {
                        Ext.Msg.alert('Info', 'Cliente inserito');
                    }
                    this.onRevertClick();
                }
            },
            scope: this
        });
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    loadEdit(cli_id) {
        Ext.Ajax.request({
            url: 'server/...',
            params: {
                cli_id
            },
            success(response, opts) {
                let record = Ext.JSON.decode(response.responseText);
                this.setFormValues(record[0]);
            },
            scope: this
        });
    },

    setFormValues(record) {
        this.lookup('idCliente').setValue(record.cli_id);
        this.lookup('codiceCliente').setValue(record.cli_cod);
        this.lookup('nomeCliente').setValue(record.cli_nome);
        this.lookup('mailCliente').setValue(record.cli_mail);
        this.lookup('cellulareCliente').setValue(record.cli_cell);
        this.lookup('fissoCliente').setValue(record.cli_tell);
    },

    onRevertClick() {
        let form = this.getView().down('form');
        form.reset();
    },

    onCloseClick() {
        this.onRevertClick();
        this.getView().up('app-main').setActiveItem(this.listIndex);
    },

    init() {
        this.callParent();
        this.listIndex = this.getView().listIndex;
    }

});