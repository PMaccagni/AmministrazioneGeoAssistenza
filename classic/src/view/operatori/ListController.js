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
        let grid = this.lookup('operatoriGrid'),
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
                url: 'server/Operatori/DeleteOperatori.php',
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