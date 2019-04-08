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
Ext.define('GeoAssistenza.view.clientiOperatori.ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.clienti-operatori-list',

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
                    let clientiGrid = this.lookup('clientiGrid'),
                        store = clientiGrid.getStore();
                    store.removeAll();
                    clientiGrid.setTitle('Lista clienti di ...');
                    if (records.length === 0) {
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
                url: 'server/ClientiOperatori/DeleteClientiOperatori.php',
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