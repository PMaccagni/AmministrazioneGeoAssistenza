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
Ext.define('GeoAssistenza.view.clientiOperatori.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'clienti-operatori-list',

    requires: [
        'GeoAssistenza.model.Operatori',
        'GeoAssistenza.view.clientiOperatori.ListController',
        'GeoAssistenza.model.ClientiOperatori'
    ],
    
    controller: 'clienti-operatori-list',

    title: 'Lista clienti per operatore',

    editIndex: 5,

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
                    text: 'Rimuovi cliente',
                    iconCls: 'fa fa-minus',
                    handler: 'onRemoveCliente'
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
                fieldLabel: 'Codice operatore',
                reference: 'codiceOperatore'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nome operatore',
                reference: 'nomeOperatore'
            }]
        }, {
            xtype: 'grid',
            reference: 'operatoriGrid',
            title: 'Lista operatori',
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.Operatori'
            },
            columns: [{ 
                text: 'Codice operatore', 
                dataIndex: 'ope_cod',
                hidden: true
            }, { 
                text: 'Nome operatore', 
                dataIndex: 'ope_nome',
                flex: 1
            }],
            listeners: {
                select: 'onSelectOperatore'
            }
        }, {
            xtype: 'grid',
            reference: 'clientiGrid',
            title: 'Lista clienti di ...',
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.ClientiOperatori'
            },
            columns: [{ 
                text: 'Codice cliente', 
                dataIndex: 'cli_cod',
                hidden: true
            }, { 
                text: 'Nome cliente', 
                dataIndex: 'cli_nome',
                flex: 1
            }]
        }];
        this.callParent();
    }
});
