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
            this.down('interventi-edit').getController().loadClienti();
        });
    }
});
