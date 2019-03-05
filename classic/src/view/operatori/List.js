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
        }

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
