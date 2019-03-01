Ext.define('GeoAssistenza.view.clienti.MonteOre', {
    extend: 'Ext.panel.Panel',
    xtype: 'monte-ore-clienti',

    requires: [
        'GeoAssistenza.model.Interventi',
        'GeoAssistenza.view.clienti.MonteOreController',
        'GeoAssistenza.model.Clienti'
    ],
    
    controller: 'monte-ore-clienti',

    title: 'Monte ore clienti',

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
        }

        this.items = [{
            xtype: 'form',
            flex: 1,
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
            store: {
                model: 'GeoAssistenza.model.Interventi'
            },
            columns: [{ 
                text: 'Operatore', 
                dataIndex: 'ope_nome',
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
