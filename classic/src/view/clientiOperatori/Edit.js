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
Ext.define('GeoAssistenza.view.clientiOperatori.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'clienti-operatori-edit',

    requires: [
        'GeoAssistenza.model.Clienti',
        'GeoAssistenza.view.clientiOperatori.EditController'
    ],
    
    controller: 'clienti-operatori-edit',

    title: 'Aggiungi cliente',

    listIndex: 4,

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
                    text: 'Cerca',
                    iconCls: 'fa fa-search',
                    handler: 'onSearchClick'
                }, {
                    xtype: 'button',
                    text: 'Aggiungi cliente',
                    iconCls: 'fa fa-plus',
                    handler: 'onAggiungiCliente'
                }, {
                    xtype: 'button',
                    text: 'Chiudi',
                    iconCls: 'fa fa-close',
                    handler: 'onCloseClick'
                }]
        };

        this.items = [{
            xtype: 'form',
            padding: '0 0 40 0',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Codice cliente',
                reference: 'codiceCliente'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nome cliente',
                reference: 'nomeCliente'
            }]
        }, {
            xtype: 'grid',
            reference: 'clientiGrid',
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.Clienti'
            },
            columns: [{ 
                text: 'Codice', 
                dataIndex: 'cli_cod',
                flex: 0.25
            }, { 
                text: 'Nome', 
                dataIndex: 'cli_nome',
                flex: 1
            }, {
                text: 'Mail', 
                dataIndex: 'cli_mail',
                flex: 0.5
            }]
        }];
        this.callParent();
    }
});
