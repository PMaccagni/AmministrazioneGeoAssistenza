Ext.define('GeoAssistenza.view.interventi.Edit', {
    extend: 'Ext.panel.Panel',
    xtype: 'interventi-edit',

    requires: [
        'GeoAssistenza.view.interventi.EditController',
        'GeoAssistenza.model.ClientiOperatori',
        'GeoAssistenza.model.Operatori'
    ],

    controller: 'interventi-edit',

    title: 'Inserisci/Modifica intervento',

    listIndex: 6,

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
                reference: 'idIntervento',
                hidden: true
            }, {
                xtype: 'combo',
                fieldLabel: 'Cliente',
                reference: 'codiceCliente',
                store: {
                    model: 'GeoAssistenza.model.ClientiOperatori'
                },
                valueField: 'cli_cod',
                displayField: 'cli_nome',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'combo',
                fieldLabel: 'Operatore',
                reference: 'codiceOperatore',
                store: {
                    model: 'GeoAssistenza.model.Operatori'
                },
                valueField: 'ope_cod',
                displayField: 'ope_nome',
                labelStyle: 'font-weight:bold;'
            }, {
                xtype: 'datefield',
                fieldLabel: 'Data intervento',
                reference: 'dataIntervento',
                labelStyle: 'font-weight:bold;',
                format: 'd/m/Y',
                readOnly: true,
                value: new Date()
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
                    xtype: 'timefield',
                    fieldLabel: 'Ora inizio',
                    reference: 'oreDa',
                    labelStyle: 'font-weight:bold;',
                    format: 'H:i',
                    listeners: {
                        change: 'onChangeDa'
                    }
                }, {
                    xtype: 'timefield',
                    fieldLabel: 'Ora fine',
                    reference: 'oreA',
                    labelStyle: 'font-weight:bold;',
                    format: 'H:i',
                    listeners: {
                        change: 'onChangeA'
                    }
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Durata',
                reference: 'durataintervento',
                editable: false
            }, {
                xtype: 'textarea',
                fieldLabel: 'Materiale',
                reference: 'materialeIntervento',
                width: 600
            }, {
                xtype: 'textarea',
                fieldLabel: 'Note',
                reference: 'noteIntervento',
                width: 600
            }]
        }];
        this.callParent();
    }
});