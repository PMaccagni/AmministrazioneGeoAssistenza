/*
    Copyright 2018, 2019 Pietro Maccagni
    
    This file is part of AmministrazioneGeoAssistenza.

    AmministrazioneGeoAssistenza is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    AmministrazioneGeoAssistenza is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with AmministrazioneGeoAssistenza.  If not, see <http://www.gnu.org/licenses/>.
*/
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
    scollable: true,

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
        layout: 'fit',
        items: [{
            xtype: 'operatori-list'
        }]
    }, {
        hidden: true,
        layout: 'fit',
        items: [{
            xtype: 'operatori-edit'
        }]
    }, {
        title: 'Lista clienti',
        iconCls: 'fa fa-user',
        layout: 'fit',
        items: [{
            xtype: 'clienti-list'
        }]
    }, {
        hidden: true,
        layout: 'fit',
        items: [{
            xtype: 'clienti-edit'
        }]
    }, {
        title: 'Lista clienti per operatore',
        iconCls: 'fa fa-users',
        layout: 'fit',
        items: [{
            xtype: 'clienti-operatori-list'
        }]
    }, {
        hidden: true,
        layout: 'fit',
        items: [{
            xtype: 'clienti-operatori-edit'
        }]
    }, {
        title: 'Lista interventi',
        iconCls: 'fa fa-list-ol',
        layout: 'fit',
        items: [{
            xtype: 'interventi-list'
        }]
    }, {
        hidden: true,
        layout: 'fit',
        items: [{
            xtype: 'interventi-edit'
        }]
    }, {
        title: 'Monte ore clienti',
        iconCls: 'fa fa-clock-o',
        layout: 'fit',
        items: [{
            xtype: 'monte-ore-clienti'
        }]
    }, {
        title: 'Monte ore operatori',
        iconCls: 'fa fa-clock-o',
        layout: 'fit',
        items: [{
            xtype: 'monte-ore-operatori'
        }]
    }, {
        title: 'Info',
        iconCls: 'fa fa-info-circle',
        layout: 'fit',
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
            } else {
                this.down('interventi-edit').getController().unlockDate();
            }
            this.down('interventi-list').getController().checkAdmin();
        });
    }
});
