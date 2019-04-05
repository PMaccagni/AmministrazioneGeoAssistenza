/*
    Copyright 2018, 2019 Pietro Maccagni
    
    This file is part of AmministrazioneGeoAssistenza.

    AmministrazioneGeoAssistenza is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AmministrazioneGeoAssistenza is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AmministrazioneGeoAssistenza.  If not, see <http://www.gnu.org/licenses/>.
*/
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
            url: 'http://localhost:8888/Clienti/PostClienti.php',
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
            url: 'http://localhost:8888/Clienti/GetClienti.php',
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