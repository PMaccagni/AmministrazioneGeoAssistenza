Ext.define('GeoAssistenza.view.main.Login', {
    extend: 'Ext.Panel',
    xtype: 'login',

    requires: [
        'GeoAssistenza.view.main.LoginController'
    ],

    controller: 'login',

    title: 'Login',

    layout: 'vbox',

    items: [{
        xtype: 'textfield',
        label: 'Nome operatore',
        reference: 'username'
    }, {
        xtype: 'passwordfield',
        label: 'Password operatore',
        reference: 'password'
    }, {
        xtype: 'button',
        text: 'login',
        handler: 'onLoginClick',
        padding: '20 0 0 0'
    }]
});
