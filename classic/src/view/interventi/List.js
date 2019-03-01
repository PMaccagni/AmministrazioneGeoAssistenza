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
