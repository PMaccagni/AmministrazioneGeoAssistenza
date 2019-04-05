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
Ext.define('GeoAssistenza.view.interventi.EditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.interventi-edit',

    onSaveClick() {
        let cli_cod = this.lookup('codiceCliente').getValue(),
            dataIntervento = this.lookup('dataIntervento').getValue(),
            noteIntervento = this.lookup('noteIntervento').getValue(),
            idIntervento = this.lookup('idIntervento').getValue(),
            materialeIntervento = this.lookup('materialeIntervento').getValue(),
            int_ora_inizio = this.lookup('oreDa').getValue(),
            int_ora_fine = this.lookup('oreA').getValue(),
            int_durata = this.lookup('durataintervento').getValue(),
            ope_cod;
        if ((cli_cod === null) || (dataIntervento === null)
            || (int_ora_inizio === null) || (int_ora_fine === null)) {
            Ext.Msg.alert('Attenzione', 'Compilare tutti i campi');
            return;
        }
        if (!this.lookup('dataIntervento').readOnly) {
            dataIntervento = new Date(dataIntervento.setDate(dataIntervento.getDate() + 1));
        }
        int_ora_inizio = new Date(int_ora_inizio.setHours(int_ora_inizio.getHours() + 1));
        int_ora_fine = new Date(int_ora_fine.setHours(int_ora_fine.getHours() + 1));
        if (!this.isAdmin(GeoAssistenza.admin)) {
            ope_cod = GeoAssistenza.codiceOperatore;
        } else {
            ope_cod = this.lookup('codiceOperatore').getValue();
        }
        Ext.Ajax.request({
            url: 'http://localhost:8888/Interventi/PostInterventi.php',
            params: {
                idIntervento,
                cli_cod,
                ope_cod,
                dataIntervento: dataIntervento.toISOString().substr(0, 10),
                noteIntervento,
                materialeIntervento,
                int_ora_inizio: int_ora_inizio.toISOString().substr(0, 10) + ' ' + int_ora_inizio.toISOString().substr(11, 8),
                int_ora_fine: int_ora_fine.toISOString().substr(0, 10) + ' ' + int_ora_fine.toISOString().substr(11, 8),
                int_durata,
                int_ore: this.ore,
                int_minuti: this.minuti
            },
            success(response, opts) {
                if (this.checkErrors(response.responseText)) {
                    if (idIntervento !== '') {
                        Ext.Msg.alert('Info', 'Intervento modificato');
                    } else {
                        Ext.Msg.alert('Info', 'Intervento inserito');
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

    loadEdit(int_id) {
        Ext.Ajax.request({
            url: 'http://localhost:8888/Interventi/GetInterventi.php',
            params: {
                int_id
            },
            success(response, opts) {
                let record = Ext.JSON.decode(response.responseText);
                this.setFormValues(record[0]);
            },
            scope: this
        });
    },

    setFormValues(record) {
        this.lookup('idIntervento').setValue(record.int_id);
        this.lookup('codiceCliente').getStore().load();
        this.lookup('codiceCliente').setValue(record.cli_cod);
        this.lookup('codiceOperatore').getStore().load();
        this.lookup('codiceOperatore').setValue(record.ope_cod);
        this.lookup('dataIntervento').setValue(record.int_data);
        this.lookup('noteIntervento').setValue(record.int_note);
        this.lookup('materialeIntervento').setValue(record.int_materiale);
        this.lookup('oreDa').suspendEvents();
        this.lookup('oreDa').setValue(new Date(record.int_ora_inizio));
        this.lookup('oreDa').resumeEvents();
        this.lookup('oreA').suspendEvents();
        this.lookup('oreA').setValue(new Date(record.int_ora_fine));
        this.lookup('oreA').resumeEvents();
        this.lookup('durataintervento').setValue(record.int_durata);
        this.ore = record.int_ore;
        this.minuti = record.int_minuti;
        if (!this.isAdmin(GeoAssistenza.admin)) {
            this.lookup('codiceCliente').setDisabled(true);
            this.lookup('dataIntervento').setDisabled(true);
            this.lookup('materialeIntervento').setDisabled(true);
            this.lookup('oreDa').setDisabled(true);
            this.lookup('oreA').setDisabled(true);
            this.lookup('durataintervento').setDisabled(true);
        }
    },

    onRevertClick() {
        let form = this.getView().down('form');
        this.lookup('oreDa').suspendEvents();
        this.lookup('oreA').suspendEvents();
        form.reset();
        this.lookup('oreDa').resumeEvents();
        this.lookup('oreA').resumeEvents();
        this.ore = 0;
        this.minuti = 0;
    },

    onCloseClick() {
        this.onRevertClick();
        this.lookup('codiceCliente').setDisabled(false);
        this.lookup('dataIntervento').setDisabled(false);
        this.lookup('materialeIntervento').setDisabled(false);
        this.lookup('oreDa').setDisabled(false);
        this.lookup('oreA').setDisabled(false);
        this.lookup('durataintervento').setDisabled(false);
        this.lookup('oreDa').resumeEvents();
        this.lookup('oreA').resumeEvents();
        this.getView().up('app-main').setActiveItem(this.listIndex);
    },

    onChangeDa(field, newValue, oldValue, eOpts) {
        let oreA = this.lookup('oreA').getValue();
        if (oreA !== null) {
            if (newValue <= oreA) {
                let dateTime = oreA.getTime() - newValue.getTime(),
                    date = new Date(dateTime),
                    ore = date.getHours() - 1,
                    minuti = date.getMinutes();
                this.lookup('durataintervento').setValue(ore.toString() + ' ore e ' + minuti.toString() + ' minuti');
                this.ore = ore;
                this.minuti = minuti;
            } else {
                Ext.Msg.alert('Attenzione', 'Ora di fine deve essere > di ora inizio');
                field.suspendEvents();
                field.reset();
                field.resumeEvents();
                this.lookup('durataintervento').reset();
            }
        }
    },

    onChangeA(field, newValue, oldValue, eOpts) {
        let oreDa = this.lookup('oreDa').getValue();
        if (oreDa !== null) {
            if (newValue >= oreDa) {
                let dateTime = newValue.getTime() - oreDa.getTime(),
                    date = new Date(dateTime),
                    ore = date.getHours() - 1,
                    minuti = date.getMinutes();
                this.lookup('durataintervento').setValue(ore.toString() + ' ore e ' + minuti.toString() + ' minuti');
                this.ore = ore;
                this.minuti = minuti;
            } else {
                Ext.Msg.alert('Attenzione', 'Ora di fine deve essere > di ora inizio');
                field.suspendEvents();
                field.reset();
                field.resumeEvents();
                this.lookup('durataintervento').reset();
            }
        }
    },

    isAdmin(admin) {
        if (admin === '1') {
            return true;
        } else {
            return false;
        }
    },

    hideOperatore() {
        this.lookup('codiceOperatore').hide();
    },

    filterByOperatore(store, records, successful, operation, eOpts) {
        if (successful) {
            if (!this.isAdmin(GeoAssistenza.admin)) {
                store.filter('ope_cod', GeoAssistenza.codiceOperatore);
            }
        }
    },

    unlockDate() {
        this.lookup('dataIntervento').setReadOnly(false);
    },

    init() {
        this.callParent();
        this.listIndex = this.getView().listIndex;
        this.lookup('codiceCliente').getStore().on('load', this.filterByOperatore, this);
    }

});