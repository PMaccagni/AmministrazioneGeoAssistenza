Ext.define('GeoAssistenza.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'GeoAssistenza.view.main.MainController',
        'GeoAssistenza.view.operatori.List',
        'GeoAssistenza.view.clienti.List',
        'GeoAssistenza.view.clientiOperatori.List',
        'GeoAssistenza.view.clientiOperatori.Edit',
        'GeoAssistenza.view.main.Info'
    ],

    controller: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,
    scollable: 'y',

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            flex: 0
        },
        iconCls: 'fa fa-child'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Lista operatori',
        iconCls: 'fa fa-user',
        items: [{
            xtype: 'operatori-list'
        }]
    }, {
        hidden: true,
        items: [{
            xtype: 'operatori-edit'
        }]
    }, {
        title: 'Lista clienti',
        iconCls: 'fa fa-user',
        items: [{
            xtype: 'clienti-list'
        }]
    }, {
        hidden: true,
        items: [{
            xtype: 'clienti-edit'
        }]
    }, {
        title: 'Lista clienti per operatore',
        iconCls: 'fa fa-users',
        items: [{
            xtype: 'clienti-operatori-list'
        }]
    }, {
        hidden: true,
        items: [{
            xtype: 'clienti-operatori-edit'
        }]
    }, {
        title: 'Lista interventi',
        iconCls: 'fa fa-list-ol',
        items: [{
            xtype: 'interventi-list'
        }]
    }, {
        hidden: true,
        items: [{
            xtype: 'interventi-edit'
        }]
    }, {
        title: 'Monte ore clienti',
        iconCls: 'fa fa-clock-o',
        items: [{
            xtype: 'monte-ore-clienti'
        }]
    }, {
        title: 'Monte ore operatori',
        iconCls: 'fa fa-clock-o',
        items: [{
            xtype: 'monte-ore-operatori'
        }]
    }, {
        title: 'Info',
        iconCls: 'fa fa-info-circle',
        items: [{
            xtype: 'info'
        }]
    }],

    showLogin() {
        let login = Ext.create('GeoAssistenza.view.main.Login');
        login.on('onLoginSuccess', () => {
            this.header.title.setText('GeoAssistenza<br><br>Benvenuto,<br>' + GeoAssistenza.nomeOperatore +
            '<br>Sei: ' + this.getController().getAdminText(GeoAssistenza.admin));
            if (!this.getController().isAdmin(GeoAssistenza.admin)) {
                this.setActiveItem(2);
                this.items.items[0].tab.hide();
                this.items.items[4].tab.hide();
                this.items.items[8].tab.hide();
                this.items.items[9].tab.hide();
                this.down('clienti-list').getController().hideButtons();
                this.down('interventi-edit').getController().hideOperatore();
            }
            this.down('interventi-list').getController().checkAdmin();
        })
    }
});
