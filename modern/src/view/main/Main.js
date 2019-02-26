Ext.define('GeoAssistenza.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: [
        'GeoAssistenza.view.main.MainController',
        'GeoAssistenza.view.main.Login',
        'GeoAssistenza.view.main.Menu'
    ],
    
    controller: 'main',

    layout: 'card',

    items: [{
        xtype: 'login'
    }, {
        xtype: 'app-menu'
    }],

    showLogin() {
        this.on('onLoginSuccess', () => {
            this.setActiveItem(1);
        });
    }
});
