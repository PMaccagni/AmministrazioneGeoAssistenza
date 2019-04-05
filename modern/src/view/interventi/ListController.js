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
            store = grid.getStore();
        store.load({
            params: {
                codiceOperatore: GeoAssistenza.codiceOperatore
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
        this.getView().up('interventi-container').setActiveItem(1);
    },

    onEditClick() {
        let grid = this.lookup('interventiGrid'),
            records = grid.getSelection();
        if (records) {
            let int_id = records.get('int_id');
            this.getView().up('interventi-container').setActiveItem(1);
            this.getView().up('interventi-container').down('interventi-edit').getController().loadEdit(int_id);
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un intervento');
        }
    },

    loadStore(store, records, successful, operation, eOpts) {
        if (successful) {
            records.forEach((record) => {
                record.beginEdit();
                record.set('int_ora_inizio', record.get('int_ora_inizio').substr(11, 5));
                record.set('int_ora_fine', record.get('int_ora_fine').substr(11, 5));
                let giorno = record.get('int_data').substr(8, 2),
                    mese = record.get('int_data').substr(5, 2),
                    anno = record.get('int_data').substr(0, 4),
                    data = giorno + '/' + mese + '/' + anno;
                record.set('int_data', data);
                record.endEdit();
            });

        }
    }, 

    init() {
        this.callParent();
        this.lookup('interventiGrid').getStore().on('load', this.loadStore, this);
    }

});