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
Ext.define('GeoAssistenza.view.clientiOperatori.EditController', {
    extend: 'GeoAssistenza.view.clienti.ListController',
    alias: 'controller.clienti-operatori-edit',

    onAggiungiCliente() {
        let clientiGrid = this.lookup('clientiGrid'),
            records = clientiGrid.getSelection();
        if (records.length > 0) {
            let cli_cod = records[0].get('cli_cod');
            Ext.Ajax.request({
                url: 'http://localhost:8888/ClientiOperatori/PostClientiOperatori.php',
                params: {
                    ope_cod: this.ope_cod,
                    cli_cod
                },
                success(response, opts) {
                    if (this.checkErrors(response.responseText)) {
                        Ext.Msg.alert('Info', 'Cliente aggiunto a ' + this.ope_nome); 
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Attenzione', 'Selezionare un cliente');
        }
    },

    onCloseClick() {
        this.lookup('clientiGrid').getStore().removeAll();
        this.getView().up('app-main').setActiveItem(this.listIndex);
    },

    checkErrors(responseText) {
        if (responseText.substr(0, 1) === 'O') {
            return true;
        } else if (responseText.substr(0, 1) === 'E') {
            Ext.Msg.alert('Attenzione', responseText);
            return false;
        }
    },

    setOpeCod(ope_cod, ope_nome) {
        this.ope_cod = ope_cod;
        this.ope_nome = ope_nome;
    },

    init() {
        this.listIndex = this.getView().listIndex;
    }

});