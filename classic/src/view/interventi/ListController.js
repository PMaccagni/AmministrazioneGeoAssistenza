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
            dataDa = dataDa.toISOString().substr(0, 10);
            dataA = dataA.toISOString().substr(0, 10);
        }
        if (!this.isAdmin(GeoAssistenza.admin)) {
            codiceOperatore = GeoAssistenza.codiceOperatore;
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
                    if (records.length === 0) {
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
        let grid = this.lookup('interventiGrid'),
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
                url: 'server/Interventi/DeleteInterventi.php',
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