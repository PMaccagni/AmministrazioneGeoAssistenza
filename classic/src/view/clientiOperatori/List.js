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
        }

        this.items = [{
            xtype: 'form',
            flex: 1,
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
                flex: 0.25
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
                flex: 0.25
            }, { 
                text: 'Nome cliente', 
                dataIndex: 'cli_nome',
                flex: 1
            }]
        }];
        this.callParent();
    }
});
