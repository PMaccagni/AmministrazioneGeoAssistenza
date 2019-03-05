Ext.define('GeoAssistenza.view.clienti.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'clienti-list',

    requires: [
        'GeoAssistenza.model.Clienti',
        'GeoAssistenza.view.clienti.ListController'
    ],
    
    controller: 'clienti-list',

    title: 'Lista clienti',

    editIndex: 3,

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
                reference: 'codiceCliente',
                hidden: true
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
                text: 'Nome', 
                dataIndex: 'cli_nome',
                flex: 1
            }, {
                text: 'Mail', 
                dataIndex: 'cli_mail',
                flex: 1
            }, {
                text: 'Cellulare', 
                dataIndex: 'cli_cell',
                flex: 1
            }, {
                text: 'Fisso', 
                dataIndex: 'cli_tell',
                flex: 1
            }]
        }];

        this.callParent();
    }
});
