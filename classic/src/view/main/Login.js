Ext.define('GeoAssistenza.view.main.Login', {
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'GeoAssistenza.view.main.LoginController'
    ],

    controller: 'login',
    title: 'Login',

    closable: false,
    resizable: false,
    draggable: false,
    autoShow: true,
    modal: true,

    items: {
        xtype: 'form',
        bodyPadding: 10,
        reference: 'form',
        items: [{
            xtype: 'textfield',
            reference: 'username',
            fieldLabel: 'Nome operatore'
        }, {
            xtype: 'textfield',
            reference: 'password',
            inputType: 'password',
            fieldLabel: 'Password operatore'
        }]
    },

    buttons: [{
        text: 'Login',
        ui: 'default',
        reference: 'submit',
        formBind: true,
        listeners: {
            click: 'onLoginClick'
        }
    }]
});