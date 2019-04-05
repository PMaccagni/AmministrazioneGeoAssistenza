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
Ext.define('GeoAssistenza.view.interventi.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'interventi-list',

    requires: [
        'GeoAssistenza.model.Clienti',
        'GeoAssistenza.model.Operatori',
        'GeoAssistenza.model.Interventi',
        'GeoAssistenza.view.interventi.ListController'
    ],
    
    controller: 'interventi-list',

    title: 'Lista interventi',

    editIndex: 7,

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
                xtype: 'combo',
                fieldLabel: 'Cliente',
                reference: 'codiceCliente',
                store: {
                    model: 'GeoAssistenza.model.Clienti'
                },
                valueField: 'cli_cod',
                displayField: 'cli_nome'
            }, {
                xtype: 'combo',
                fieldLabel: 'Operatore',
                reference: 'codiceOperatore',
                store: {
                    model: 'GeoAssistenza.model.Operatori'
                },
                valueField: 'ope_cod',
                displayField: 'ope_nome'
            }, {
                xtype: 'panel',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'datefield',
                    fieldLabel: 'Intervento dal',
                    reference: 'dataDa',
                    format: 'd/m/Y'
                }, {
                    xtype: 'datefield',
                    fieldLabel: 'al',
                    reference: 'dataA',
                    format: 'd/m/Y'
                }]
            }]
        }, {
            xtype: 'grid',
            reference: 'interventiGrid',
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.Interventi'
            },
            columns: [{ 
                text: 'Operatore', 
                dataIndex: 'ope_nome',
                flex: 1
            }, { 
                text: 'Cliente', 
                dataIndex: 'cli_nome',
                flex: 1
            }, {
                xtype: 'datecolumn',
                text: 'Data intervento', 
                dataIndex: 'int_data',
                format: 'd/m/Y',
                flex: 1
            }, {
                text: 'Durata intervento', 
                dataIndex: 'int_durata',
                flex: 1
            }]
        }];
        this.callParent();
    }
});
