Ext.define('GeoAssistenza.view.operatori.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'operatori-edit',

    requires: [
        'GeoAssistenza.view.operatori.EditController'
    ],

    controller: 'operatori-edit',

    title: 'Inserisci/Modifica operatore',

    listIndex: 0,

    initComponent() {

        this.dockedItems = {
            xtype: 'toolbar',
            items: [
            '->', {
                xtype: 'button',
                text: 'Salva',
                handler: 'onSaveClick',
                iconCls: 'fa fa-floppy-o'
            }, {
                xtype: 'button',
                text: 'Annulla',
                handler: 'onRevertClick',
                iconCls: 'fa fa-undo'
            }, {
                xtype: 'button',
                text: 'Chiudi',
                handler: 'onCloseClick',
                iconCls: 'fa fa-close'
            }]
        }

        this.items = [{
            xtype: 'form',
            defaults: {
                labelAlign: 'right'
            },
            items: [{
                xtype: 'textfield',
                reference: 'idOperatore',
                hidden: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Codice operatore',
                reference: 'codiceOperatore',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nome operatore',
                reference: 'nomeOperatore',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'combo',
                fieldLabel: 'Admin',
                reference: 'adminOperatore',
                labelStyle: 'font-weight:bold;',
                valueField: 'key',
                displayField: 'value',
                editable: false,
                store: Ext.create('Ext.data.Store', {
                    fields: [
                        'key', 'value'
                    ],
                    data: [{
                        key: 1,
                        value: 'Utente admin'
                    }, {
                        key: 0,
                        value: 'Utente normale'
                    }]
                })
            }, {
                xtype: 'textfield',
                fieldLabel: 'Password operatore',
                reference: 'passwordOperatore',
                labelStyle: 'font-weight:bold;'
            }]
        }];
        this.callParent();
    }
});