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
        if (!this.checkDate(int_ora_inizio, int_ora_fine)) {
            return;
        }
        int_ora_inizio = new Date('2008/01/01 ' + int_ora_inizio);
        int_ora_fine = new Date('2008/01/01 ' + int_ora_fine);
        let int_ora_inizio_send = new Date(int_ora_inizio.setHours(int_ora_inizio.getHours() + 1)),
            int_ora_fine_send = new Date(int_ora_fine.setHours(int_ora_fine.getHours() + 1));
        ope_cod = GeoAssistenza.codiceOperatore;
        Ext.Ajax.request({
            url: 'http://localhost:8888/Interventi/PostInterventi.php',
            params: {
                idIntervento,
                cli_cod,
                ope_cod,
                dataIntervento: dataIntervento.toISOString().substr(0, 10),
                noteIntervento,
                materialeIntervento,
                int_ora_inizio: int_ora_inizio_send.toISOString().substr(0, 10) + ' ' + int_ora_inizio_send.toISOString().substr(11, 8),
                int_ora_fine: int_ora_fine_send.toISOString().substr(0, 10) + ' ' + int_ora_fine_send.toISOString().substr(11, 8),
                int_durata,
                int_ore: this.ore,
                int_minuti: this.minuti
            },
            success(response, opts) {
                if (this.checkErrors(response.responseText)) {
                    if (idIntervento !== '' && idIntervento !== null && idIntervento !== '') {
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

    checkDate(int_ora_inizio, int_ora_fine) {
        let inizioArray = int_ora_inizio.split(':'),
            fineArray = int_ora_fine.split(':');
        if (inizioArray[0] > 23) {
            Ext.Msg.alert('Attenzione', 'Formato errato nell ora di inzio<br>Impossibile inserire ore > 23');
            return false;
        }
        if (inizioArray[1] > 59) {
            Ext.Msg.alert('Attenzione', 'Formato errato nell ora di inzio<br>Impossibile inserire minuti > 59');
            return false;
        }
        if (fineArray[0] > 23) {
            Ext.Msg.alert('Attenzione', 'Formato errato nell ora di fine<br>Impossibile inserire ore > 23');
            return false;
        }
        if (fineArray[1] > 59) {
            Ext.Msg.alert('Attenzione', 'Formato errato nell ora di fine<br>Impossibile inserire minuti > 59');
            return false;
        }
        return true;
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    onRevertClick() {
        this.lookup('idIntervento').reset();
        this.lookup('codiceCliente').reset();
        this.lookup('dataIntervento').reset();
        this.lookup('oreDa').reset();
        this.lookup('oreA').reset();
        this.lookup('durataintervento').reset();
        this.lookup('materialeIntervento').reset();
        this.lookup('noteIntervento').reset();
        this.ore = 0;
        this.minuti = 0;
    },

    onChangeDa(field, newValue, oldValue, eOpts) {
        if (newValue.length < 5) {
            return;
        }
        let oreA = this.lookup('oreA').getValue();
        if (oreA !== null && oreA !== '' && oreA !== '') {
            oreA = new Date('2008/01/01 ' + oreA);
            newValue = new Date('2008/01/01 ' + newValue);
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
        if (newValue.length < 5) {
            return;
        }
        let oreDa = this.lookup('oreDa').getValue();
        if (oreDa !== null && oreDa !== '' && oreDa !== '') {
            oreDa = new Date('2008/01/01 ' + oreDa);
            newValue = new Date('2008/01/01 ' + newValue);
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

    onCloseClick() {
        this.onRevertClick();
        this.lookup('codiceCliente').setReadOnly(false);
        this.lookup('materialeIntervento').setReadOnly(false);
        this.lookup('oreDa').setReadOnly(false);
        this.lookup('oreA').setReadOnly(false);
        this.lookup('durataintervento').setReadOnly(false);
        this.lookup('oreDa').resumeEvents();
        this.lookup('oreA').resumeEvents();
        this.getView().up('interventi-container').setActiveItem(0);
    },

    setFormValues(record) {
        this.lookup('idIntervento').setValue(record.int_id);
        this.lookup('codiceCliente').getStore().load();
        this.lookup('codiceCliente').setValue(record.cli_cod);
        this.lookup('dataIntervento').setValue(new Date(record.int_data));
        this.lookup('noteIntervento').setValue(record.int_note);
        this.lookup('materialeIntervento').setValue(record.int_materiale);
        this.lookup('oreDa').suspendEvents();
        this.lookup('oreDa').setValue(record.int_ora_inizio.substring(11, 16));
        this.lookup('oreDa').resumeEvents();
        this.lookup('oreA').suspendEvents();
        this.lookup('oreA').setValue(record.int_ora_fine.substring(11, 16));
        this.lookup('oreA').resumeEvents();
        this.lookup('durataintervento').setValue(record.int_durata);
        this.lookup('codiceCliente').setReadOnly(true);
        this.lookup('materialeIntervento').setReadOnly(true);
        this.lookup('oreDa').setReadOnly(true);
        this.lookup('oreA').setReadOnly(true);
        this.lookup('durataintervento').setReadOnly(true);
        this.ore = record.int_ore;
        this.minuti = record.int_minuti;
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

    loadClienti() {
        this.lookup('codiceCliente').getStore().load({
            params: {
                ope_cod: GeoAssistenza.codiceOperatore
            }
        });
    }
});