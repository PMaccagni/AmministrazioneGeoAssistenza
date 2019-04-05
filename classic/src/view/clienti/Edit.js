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
Ext.define('GeoAssistenza.view.clienti.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'clienti-edit',

    requires: [
        'GeoAssistenza.view.clienti.EditController'
    ],

    controller: 'clienti-edit',

    title: 'Inserisci/Modifica cliente',

    listIndex: 2,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    initComponent() {

        this.dockedItems = {
            xtype: 'toolbar',
            items: [
                '->', {
                    xtype: 'button',
                    text: 'Salva',
                    handler: 'onSaveClick',
                    iconCls: 'fa fa-floppy-o'
                }, {
                    xtype: 'button',
                    text: 'Annulla',
                    handler: 'onRevertClick',
                    iconCls: 'fa fa-undo'
                }, {
                    xtype: 'button',
                    text: 'Chiudi',
                    handler: 'onCloseClick',
                    iconCls: 'fa fa-close'
                }]
        };

        this.items = [{
            xtype: 'form',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                reference: 'idCliente',
                hidden: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Codice cliente',
                reference: 'codiceCliente',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nome cliente',
                reference: 'nomeCliente',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Mail cliente',
                reference: 'mailCliente'
            }, {
                xtype: 'panel',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Numero cellulare',
                    reference: 'cellulareCliente'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Numero fisso',
                    reference: 'fissoCliente'
                }]
            }]
        }];
        this.callParent();
    }
});