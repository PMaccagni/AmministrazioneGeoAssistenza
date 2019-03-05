Ext.define('GeoAssistenza.view.clienti.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'clienti-edit',

    requires: [
        'GeoAssistenza.view.clienti.EditController'
    ],

    controller: 'clienti-edit',

    title: 'Inserisci/Modifica cliente',

    listIndex: 2,

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
                reference: 'idCliente',
                hidden: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Codice cliente',
                reference: 'codiceCliente',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Nome cliente',
                reference: 'nomeCliente',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Mail cliente',
                reference: 'mailCliente'
            }, {
                xtype: 'panel',
                layout: {
                    type: 'hbox'
                },
                defaults: {
                    labelAlign: 'right'
                },
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Numero cellulare',
                    reference: 'cellulareCliente'
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Numero fisso',
                    reference: 'fissoCliente'
                }]
            }]
        }];
        this.callParent();
    }
});