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
        }

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
