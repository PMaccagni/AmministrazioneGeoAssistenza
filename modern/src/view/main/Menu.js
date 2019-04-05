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
Ext.define('GeoAssistenza.view.main.Menu', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-menu',

    requires: [
        'Ext.MessageBox',
        'GeoAssistenza.view.clienti.List',
        'GeoAssistenza.view.interventi.Container',
        'GeoAssistenza.view.main.Info'
    ],

    viewModel: 'main',

    defaults: {
        tab: {
            iconAlign: 'top'
        },
        styleHtmlContent: true
    },

    tabBarPosition: 'bottom',

    items: [{
        title: 'Clienti',
        iconCls: 'x-fa fa-users',
        layout: 'fit',
        items: [{
            xtype: 'clienti-list'
        }]
    }, {
        title: 'Interventi',
        iconCls: 'x-fa fa-list-ol',
        layout: 'fit',
        items: [{
            xtype: 'interventi-container'
        }]
    }, {
        title: 'Info',
        iconCls: 'x-fa fa-info-circle',
        layout: 'fit',
        items: [{
            xtype: 'info'
        }]
    }]
});
