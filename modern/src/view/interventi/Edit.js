Ext.define('GeoAssistenza.view.interventi.Edit', {
    extend: 'Ext.Panel',
    xtype: 'interventi-edit',

    requires: [
        'GeoAssistenza.view.interventi.EditController',
        'GeoAssistenza.model.Clienti'
    ],
    
    controller: 'interventi-edit',

    tools: [{
        type: 'save',
        handler: 'onSaveClick'
    }, {
        type: 'left'
    }, {
        type: 'close',
        handler: 'onCloseClick'
    }],

    title: 'Inserisci/Modifica',

    scrollable: true,

    items: [{
        xtype: 'textfield',
        reference: 'idIntervento',
        hidden: true
    }, {
        xtype: 'selectfield',
        label: 'Cliente',
        reference: 'codiceCliente',
        store: {
            model: 'GeoAssistenza.model.Clienti'
        },
        valueField: 'cli_cod',
        displayField: 'cli_nome'
    }, {
        xtype: 'datepickerfield',
        label: 'Data intervento',
        reference: 'dataIntervento',
        readOnly: true,
        value: new Date()
    }, {
        xtype: 'textfield',
        label: 'Ora inizio (HH:ii)',
        reference: 'oreDa',
        listeners: {
            change: 'onChangeDa'
        }
    }, {
        xtype: 'textfield',
        label: 'Ora fine (HH:ii)',
        reference: 'oreA',
        listeners: {
            change: 'onChangeA'
        }
    }, {
        xtype: 'textfield',
        label: 'Durata',
        readOnly: true,
        reference: 'durataintervento'
    }, {
        xtype: 'textareafield',
        label: 'Materiale',
        reference: 'materialeIntervento'
    }, {
        xtype: 'textareafield',
        label: 'Note',
        reference: 'noteIntervento'
    }]
});
