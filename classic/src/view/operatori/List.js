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
Ext.define('GeoAssistenza.view.operatori.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'operatori-list',

    requires: [
        'GeoAssistenza.model.Operatori',
        'GeoAssistenza.view.operatori.ListController',
    ],
    
    controller: 'operatori-list',

    title: 'Lista operatori',

    editIndex: 1,

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
                    text: 'Nuovo',
                    iconCls: 'fa fa-plus',
                    handler: 'onAddClick'
                }, {
                    xtype: 'button',
                    text: 'Modifica',
                    iconCls: 'fa fa-pencil',
                    handler: 'onEditClick'
                }, {
                    xtype: 'button',
                    text: 'Elimina',
                    iconCls: 'fa fa-minus',
                    handler: 'onDeleteClick'
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
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.Operatori'
            },
            columns: [{ 
                text: 'Codice', 
                dataIndex: 'ope_cod',
                hidden: true
            }, { 
                text: 'Nome', 
                dataIndex: 'ope_nome',
                flex: 1
            }, { 
                text: 'Admin', 
                dataIndex: 'ope_admin',
                flex: 1,
                renderer: 'onRenderAdmin'
            }]
        }];
        this.callParent();
    }
});
