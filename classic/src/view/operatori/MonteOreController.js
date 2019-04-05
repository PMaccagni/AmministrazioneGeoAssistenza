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
Ext.define('GeoAssistenza.view.operatori.MonteOreController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.monte-ore-operatori',

    onSearchClick() {
        let grid = this.lookup('interventiGrid'),
            codiceOperatore = this.lookup('codiceOperatore').getValue(),
            dataDa = this.lookup('dataDa').getValue(),
            dataA = this.lookup('dataA').getValue(),
            store = grid.getStore();
        if (codiceOperatore === null) {
            Ext.Msg.alert('Attenzione', 'Selezionare un operatore');
            return;
        }
        if (dataDa === null && dataA === null) {
            Ext.Msg.alert('Attenzione', 'Selezionare un range di date');
            return;
        } else if (dataDa === null && dataA !== null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            Ext.Msg.alert('Attenzione', 'Compilare entrambe le date');
            return;
        } else if (dataDa !== null && dataA === null) {
            dataDa = dataDa.toISOString().substr(0, 10);
            dataA = dataA.toISOString().substr(0, 10);
        }
        store.load({
            params: {
                codiceOperatore,
                dataDa,
                dataA
            },
            callback(records, operation, success) {
                if (success) {
                    if (records.length > 0) {
                        this.setTotale(records);
                    } else {
                        Ext.Msg.alert('Info', 'Nessun risultato');
                    }
                }
            },
            scope: this
        });
    },

    setTotale(records) {
        let ore = 0,
            minuti = 0;
        records.forEach((record) => {
            ore = ore + Number(record.get('int_ore'));
            minuti = minuti + Number(record.get('int_minuti'));
        });
        let hours = (minuti / 60),
            rhours = Math.floor(hours),
            minutes = (hours - rhours) * 60,
            rminutes = Math.round(minutes);
        ore = ore + rhours;
        this.lookup('totOre').setValue(ore + ' ore e ' + rminutes + ' minuti');
    }
});