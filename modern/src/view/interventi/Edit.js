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
Ext.define('GeoAssistenza.view.interventi.Edit', {
    extend: 'Ext.Panel',
    xtype: 'interventi-edit',

    requires: [
        'GeoAssistenza.view.interventi.EditController',
        'GeoAssistenza.model.ClientiOperatori'
    ],
    
    controller: 'interventi-edit',

    tools: [{
        type: 'save',
        handler: 'onSaveClick'
    }, {
        type: 'left'
    }, {
        type: 'close',
        handler: 'onCloseClick'
    }],

    title: 'Inserisci/Modifica',

    scrollable: true,

    items: [{
        xtype: 'textfield',
        reference: 'idIntervento',
        hidden: true
    }, {
        xtype: 'selectfield',
        label: 'Cliente',
        reference: 'codiceCliente',
        store: {
            model: 'GeoAssistenza.model.ClientiOperatori'
        },
        valueField: 'cli_cod',
        displayField: 'cli_nome'
    }, {
        xtype: 'datepickerfield',
        label: 'Data intervento',
        reference: 'dataIntervento',
        readOnly: true,
        dateFormat: 'd/m/Y',
        value: new Date()
    }, {
        xtype: 'textfield',
        label: 'Ora inizio (HH:ii)',
        reference: 'oreDa',
        listeners: {
            change: 'onChangeDa'
        }
    }, {
        xtype: 'textfield',
        label: 'Ora fine (HH:ii)',
        reference: 'oreA',
        listeners: {
            change: 'onChangeA'
        }
    }, {
        xtype: 'textfield',
        label: 'Durata',
        readOnly: true,
        reference: 'durataintervento'
    }, {
        xtype: 'textareafield',
        label: 'Materiale',
        reference: 'materialeIntervento'
    }, {
        xtype: 'textareafield',
        label: 'Note',
        reference: 'noteIntervento'
    }]
});
