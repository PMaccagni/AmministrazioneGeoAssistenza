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
            };
        } else {
            params = {
                codiceCliente,
                nomeCliente
            };
        }
        store.load({
            params,
            callback(records, operation, success) {
                if (success) {
                    if (records.length === 0) {
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
        let grid = this.lookup('clientiGrid'),
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
                url: 'server/Clienti/DeleteClienti.php',
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