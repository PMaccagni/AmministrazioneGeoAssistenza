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
Ext.define('GeoAssistenza.view.operatori.MonteOre', {
    extend: 'Ext.panel.Panel',
    xtype: 'monte-ore-operatori',

    requires: [
        'GeoAssistenza.model.Interventi',
        'GeoAssistenza.view.operatori.MonteOreController',
        'GeoAssistenza.model.Operatori'
    ],
    
    controller: 'monte-ore-operatori',

    title: 'Monte ore operatori',

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
                fieldLabel: 'Operatore',
                reference: 'codiceOperatore',
                store: {
                    model: 'GeoAssistenza.model.Operatori'
                },
                valueField: 'ope_cod',
                displayField: 'ope_nome'
            }, {
                xtype: 'panel',
                padding: '0 0 20 0',
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
            }, {
                xtype: 'textfield',
                fieldLabel: 'Totale ore',
                reference: 'totOre',
                labelStyle: 'font-weight:bold;',
                editable: false
            }]
        }, {
            xtype: 'grid',
            reference: 'interventiGrid',
            flex: 1,
            store: {
                model: 'GeoAssistenza.model.Interventi'
            },
            columns: [{ 
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
